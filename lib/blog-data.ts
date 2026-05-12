export type BlogCategory = 'ai-tools' | 'tech' | 'interview'

export interface BlogPostMeta {
  slug: string
  category: BlogCategory
  date: string
  title: { en: string; zh: string }
  excerpt: { en: string; zh: string }
  content?: { en: string; zh: string }
  readTime: number
}

export function getPost(slug: string): BlogPostMeta | undefined {
  return posts.find((p) => p.slug === slug)
}

export const categories: { id: BlogCategory; name: { en: string; zh: string }; color: string }[] = [
  { id: 'ai-tools', name: { en: 'AI Tools News', zh: 'AI工具新闻' }, color: '#00E676' },
  { id: 'tech', name: { en: 'Tech Articles', zh: '技术文章分享' }, color: '#00BFA5' },
  { id: 'interview', name: { en: 'Interview Prep', zh: '面试题分享' }, color: '#69F0AE' },
]

export const posts: BlogPostMeta[] = [
  {
    slug: 'backend-system-design-interview-guide',
    category: 'interview',
    date: '2026-05-11',
    title: {
      en: 'Backend System Design Interview Guide: Flash Sales, Membership, Points & Balance Systems',
      zh: '后端常见项目与架构设计面试题：秒杀、会员、积分、余额系统',
    },
    excerpt: {
      en: 'A comprehensive walkthrough of the most common backend system design interview questions — flash sale architecture, membership tier systems, points engines, and balance/ledger design — with real-world data consistency patterns.',
      zh: '涵盖秒杀、会员、积分、余额等热门后端架构面试题的设计思路与数据一致性方案，从表结构到分布式方案一网打尽。',
    },
    content: {
      en: `If you are preparing for a backend system design interview, you will almost certainly encounter questions about building high-traffic, transactional systems. Flash sales, membership tiers, points engines, and balance ledgers are the bread and butter of senior backend roles. I have spent years working on precisely these systems, and in this guide I will walk you through the architecture, data models, and consistency patterns that actually work in production — not just textbook answers.

## Flash Sale / High-Concurrency Purchase System

### How do you design a flash sale system architecture?

The core tension in any flash sale system is simple: massive instantaneous traffic, limited inventory, zero tolerance for overselling, and the system must not collapse under peak load.

Here is the layered architecture that actually works in production.

**Frontend / Gateway Layer**

First, filter out bots and scripted traffic at the outermost layer. CAPTCHAs, slider puzzles, and quiz questions all serve the same purpose — shaving peaks and blocking automated scripts. Gray out the purchase button until the sale window opens and implement client-side rate limiting to cut down meaningless clicks. Serve product detail pages and activity landing pages from CDN as static content so origin traffic stays low.

**Access Layer**

Nginx or your API gateway enforces rate limits by IP, user ID, and per-endpoint QPS. Deduplication is critical: the same user, the same activity, within a short time window, only one purchase request gets through. Use a token or idempotency key to enforce this.

**Service Layer**

This is a read-heavy, write-light pattern. Cache inventory counts and activity metadata in Redis so reads never hit the database. For writes, pre-deduct inventory in Redis using DECR or an atomic Lua script. Once the counter hits zero (or goes negative), immediately reject further requests — fail fast. The remaining successful requests go into a message queue, where order services consume them at a controlled pace. Database writes happen asynchronously or in batch, only for eventual consistency.

**Data Layer**

The inventory table uses optimistic locking (a version column) or conditional updates with \`WHERE stock >= ?\` to prevent overselling at the database level. Shard orders and inventory by user or order ID to spread write pressure.

Summary: gateway edge trimming → cache-based read + pre-deduction → MQ peak shaving → DB final consistency + oversell guard.

### How to prevent overselling in flash sales?

Multiple layers of defense.

**Redis pre-deduction**

Use \`DECR\` to decrement inventory, checking \`GET\` first, or better — use a Lua script that atomizes the "check + decrement" operation. Success means the request proceeds to order creation. Failure means "sold out" returned immediately.

**Database-level guard**

Optimistic locking: add a \`version\` column, update with \`UPDATE ... SET stock=stock-1, version=version+1 WHERE id=? AND version=? AND stock>=1\`. If affected rows is zero, retry or fail. Alternatively, conditional update: \`UPDATE product SET stock=stock-1 WHERE id=? AND stock>=1\`. This relies on the database row lock and atomicity — if no rows are updated, inventory is insufficient.

**Unique constraints for dedup**

A composite unique index on (user_id, activity_id, product_id) ensures one user can only succeed once per flash sale item. Combine this with an idempotent API.

The winning combination: Redis for fast pre-deduction + sold-out gating, database for final deduction and oversell prevention.

### How to keep Redis and DB inventory in sync?

The principle: the database is the source of truth. Redis is a cache and pre-deduction layer for "sellable quantity."

On initialization (before the sale starts), sync DB inventory into Redis (\`SET stock:activity_id 1000\`). During the sale, deduct in Redis first. Successful deductions flow to order creation, then asynchronously sync remaining or deducted counts back to the database — typically via a scheduled job or an MQ consumer that executes the actual DB decrement.

Run a reconciliation job periodically comparing Redis remaining vs. DB remaining. If the gap exceeds a threshold, correct Redis from the database and alert. Short-term inconsistency between Redis and DB is acceptable as long as overselling is impossible — the database conditional update acts as the final gate.

## Membership System: Tiers, Benefits & Growth Points

### How to design a membership tier / growth-value system?

Key tables:

- **User membership table**: user_id, tier level, growth points, expiration date, activation/renewal time.
- **Tier config table**: level, required growth points, benefits (discount, free shipping, priority support).
- **Growth point ledger**: user_id, delta, source (order, check-in, task), business reference number, timestamp — essential for reconciliation and auditing.

Tier calculation:

Option A — Real-time: query the ledger summary or current growth points, compare against tier config. Works when rules are simple and query volume is manageable.

Option B — Cached tier: when growth points change, asynchronously or periodically recalculate the tier, writing it to the user membership table. Reads just grab the cached tier. Better for high concurrency.

Consistency: when growth points change, insert into the ledger first (with a unique constraint for idempotency), then update the user's current growth points. Use a transaction or an outbox pattern with async compensation — the invariant is "every ledger entry has a corresponding balance update."

### How to not over-issue or double-use membership benefits?

Treat benefits as: total allowance + used amount. Every usage performs "deduction + validation."

A benefits table, scoped by user or user + benefit type, records total count/amount, used count, and reset cycle (monthly/yearly). On use, check remaining count first, then \`UPDATE ... SET used = used + 1 WHERE user_id=? AND type=? AND used < total\` (or optimistic locking). Only after a successful update do you actually issue the benefit — a coupon, a discount, etc.

Idempotency: every usage carries a business reference number (order ID, request ID). A table or Redis-based unique constraint on this key ensures one reference only takes effect once. Expiration and reset are handled by scheduled jobs that zero out or recalculate \`used\` by cycle, taking care to handle concurrent "in-use" operations with version numbers or time windows.

## Points System

### How to design the points system tables and flow?

Tables:

- **Account table**: user_id, current point balance, last updated timestamp.
- **Ledger table**: user_id, point delta (positive or negative), balance snapshot (optional), business type (order, refund, activity, expiry), business reference number, creation time. Shard by user_id or time.

Flow for earning points: insert into the ledger first (unique business reference prevents duplicates), then \`UPDATE account SET balance = balance + ? WHERE user_id = ?\`. Wrap both in a transaction — the rule is "if a ledger entry exists, the balance reflects it." Roll back entirely on failure.

Flow for spending points: check if balance is sufficient first, then insert the deduction ledger entry, then \`UPDATE ... SET balance = balance - ? WHERE user_id = ? AND balance >= ?\` to prevent over-spending.

Expiry: a scheduled job scans "about to expire" points, generates deduction ledger entries, and updates balances. The ledger type is marked as "expiry deduction."

Key consistency points: ledger and balance change within the same transaction; spending uses conditional updates to prevent over-deduction; unique business references prevent double-issuance or double-deduction.

### How to keep points consistent with orders and payments?

This is eventual consistency + idempotency + compensation.

When an order is paid (or completed), the event goes to MQ. The points service consumes the message and uses "order ID + type" as an idempotency key: if already processed, skip. Otherwise, insert the ledger entry and increase the balance.

When a refund happens, the refund event goes to MQ. The points service deducts the points earned from that order, using the same idempotency key. The deduction uses a \`balance >= ?\` conditional update — if the balance is insufficient (the user already spent those points), log an anomaly for manual or automated handling.

The key insight: don't try to keep points and orders in the same database transaction. Treat the order/payment state as authoritative, and let points follow asynchronously. A reconciliation job periodically compares orders with points ledger entries — discrepancies trigger alerts or auto-compensation.

### Two approaches to calculating balance: ledger aggregation vs. account field

A critical design choice: should the current balance be computed by summing the ledger in real time, or stored as a field on the account table that gets incremented/decremented on every transaction?

**Approach A: Ledger as source of truth, real-time aggregation**

No standalone balance field (or it exists only as a cache). Current balance = \`SUM(delta) WHERE user_id = ?\`.

Pros: the ledger is the single source of truth — balance and ledger can never diverge. Reconciliation is trivial or unnecessary. Audit and historical balance at any point in time are naturally supported.

Cons: every balance read requires aggregating the ledger, which gets slow and expensive at scale. High-concurrency reads need an aggregation layer or cache, adding architectural complexity.

Best for: compliance-heavy, strong audit requirements, manageable read volume (e.g., some B2B financial systems).

**Approach B: Account field stores balance, read the field directly (the common choice)**

An account table has a \`balance\` column (and optionally \`frozen\`). Every transaction inserts a ledger entry, then \`UPDATE account SET balance = balance ± ?\`. Reads just grab the field.

Pros: reads are simple, fast, and high-concurrency friendly. Implementation is straightforward — the ledger records "what happened," the balance field says "what the current state is."

Cons: balance and ledger are two sources of data. Bugs or exceptions can cause them to diverge. Reconciliation is mandatory: periodically compare "opening balance + ledger sum" against the current \`balance\` field. Discrepancies trigger alerts or auto-correction.

Best for: high-concurrency, read-heavy points, balance, and wallet systems in consumer internet.

Verdict: most points/balance systems use Approach B (account field + ledger table). Reads use the field, writes use "insert ledger + update balance" in one transaction, with reconciliation as a safety net. Approach A fits scenarios with low read volume or strict regulatory requirements.

## Balance / Fund Account System

### How to design a user balance system (top-up, spend, refund)?

Tables:

- **Account table**: user_id, balance, frozen amount, version (optimistic lock), updated timestamp.
- **Ledger table**: user_id, amount, direction (credit/debit), type (top-up/spend/refund/withdraw/freeze/unfreeze), business reference number, balance snapshot, timestamp. Shard by user_id.

Operations:

- **Top-up**: insert credit ledger entry (idempotent by order number), then \`UPDATE account SET balance = balance + ?, version = version + 1 WHERE user_id = ? AND version = ?\`.
- **Spend**: verify balance >= amount first, insert debit ledger entry, then \`UPDATE ... SET balance = balance - ? WHERE user_id = ? AND version = ? AND balance >= ?\`. If no rows updated, return "insufficient balance."
- **Refund**: insert credit ledger entry (original order number + refund ID as idempotency key), increase balance with the same conditional update.
- **Freeze/unfreeze**: deduct from balance and add to frozen; unfreeze deducts from frozen and adds to balance, or deducts from frozen as a spend. Each leg has its own ledger entry. The invariant: balance + frozen = ledger sum.

Consistency: ledger insertion and balance update happen in the same database transaction. All mutations carry a business reference number with a unique constraint for idempotency. Use optimistic locking or conditional updates to prevent concurrent over-deduction.

### How to prevent over-deduction and accounting errors under high concurrency?

1. Database-level: conditional updates — \`UPDATE account SET balance = balance - ? WHERE user_id = ? AND balance >= ?\`. Zero affected rows means the deduction failed. Or optimistic locking with \`WHERE version = ?\`, retrying or failing on conflict.
2. Idempotency: every debit/credit maps to a unique business reference (order number, payment number). The ledger table has a unique constraint on this key — duplicate requests only take effect once.
3. Same transaction: insert the ledger entry first, then update the balance, commit together. Never allow "balance changed but no ledger entry" or the reverse.
4. Reconciliation: periodically compare "opening balance + ledger sum" with current balance and frozen amount. Discrepancies trigger alerts and correction (adjust balance from ledger or manual review).

### How to prevent duplicate deductions in a distributed system?

Use an idempotency key. The caller generates a unique request_id or uses the business reference (order number + operation type). The server enforces this with a unique constraint or a "check then insert" pattern on the ledger.

The ledger table has a composite unique index like (user_id, biz_type, biz_no). One business reference can only produce one ledger entry. A duplicate request hits a unique conflict and returns "already processed" or the original result immediately.

A state machine also helps: a deduction record has states (processing / success / failed). Set it to "processing" first, then upon success update to "success." A duplicate request sees "success" and returns directly.

## General Design Questions

### How to prevent duplicate submissions / duplicate orders?

Frontend: disable the submit button after the first click.

Backend: issue an idempotency token (or order token) when the user enters the checkout page. The submission must carry this token. The server records "this token has been used" in Redis or a database table — one-time use, expire after a window.

Alternative: business-level uniqueness — a composite unique index on (user_id, product_id, activity_id, time_window) in the orders table. A duplicate order hits the unique constraint and returns "please do not resubmit."

### Cache and DB inconsistency: update cache first or DB first?

The standard pattern is Cache Aside. On reads, check the cache first. On a miss, load from DB and backfill the cache. On writes, update the database first, then delete the cache (not update it). The next read will reload from the database.

Why delete rather than update? If you update the cache and the update fails, or a concurrent write produces a dirty cache, you have corrupted data. Deleting is safer.

For tighter consistency, use delayed double-delete: after updating the DB and deleting the cache, wait a few hundred milliseconds and delete again. This shrinks the window where a concurrent "read old data + backfill cache" race can occur.

For complex scenarios, subscribe to the binlog. The database change goes through Canal or similar to a message queue, and a dedicated consumer deletes or updates the cache. Business code only writes to the database — consistency concerns are decoupled.

Principle: treat the database as the source of truth. The write path follows "update DB + delete cache." The read path follows "no cache → load from DB." Complex cases use binlog-based sync or delayed double-delete.

### How to design API idempotency?

Use a unique business key. For payment callbacks, use the payment number or "order number + payment channel + status" as the idempotency key. The processing table or ledger table has a unique constraint on this key — one reference only processes once. Before processing, check if it exists; if yes, return success directly.

An idempotency table stores request_id or tokens in Redis or a database with expiration. Use "check then insert" or \`SET NX\` — only proceed with business logic if the key was not previously set, then mark it as used.

State machines help too: an order or record has states (pending / paid / refunded). Only transition from "pending" to "paid" triggers balance increases or point grants. A duplicate callback sees "paid" and returns success immediately.

### How to protect the system during mega-sales or peak events?

Rate limiting: the gateway or access layer enforces QPS and concurrency limits by IP, user, and endpoint. Token bucket or leaky bucket algorithms. Core endpoints get separate, stricter limits.

Degradation: non-core features (recommendations, points display, activity banners) are turned off or return defaults. The primary chain — ordering, payment, inventory — stays protected.

Circuit breaking: if a downstream service times out or its error rate exceeds a threshold, the circuit opens and calls are short-circuited with a fallback response. This prevents cascading failures.

Scaling and isolation: core databases and services get dedicated resources. Read replicas and caches absorb read traffic. Message queues shave write peaks so the database is never overwhelmed.

Preparation: load testing before the event, capacity planning, and feature flags that can turn off non-critical functionality at any moment.`,
      zh: `如果你正在准备后端系统设计面试，你几乎一定会遇到高流量事务系统的设计问题——秒杀、会员体系、积分引擎、余额账本，这些都是高级后端岗位的核心考点。我在实际工作中长期维护这类系统，本文将从架构设计、数据模型到一致性方案，逐一拆解生产环境中真正有效的做法。

## 秒杀 / 高并发抢购系统

### 秒杀系统整体架构思路？

核心矛盾：瞬时流量极大（读多写少）、库存有限、不能超卖、要抗住峰值。

分层设计：

**前端 / 网关层**

答题、滑块、验证码：把一部分请求挡在入口，削峰、防脚本。按钮置灰、前端限流：减少无效点击。静态化：活动页、商品详情 CDN + 静态页，减少回源。

**接入层**

限流：Nginx/网关按 IP、用户、接口 QPS 限流。防重：同一用户同一活动短时间只允许一次"下单请求"（token/幂等键）。

**服务层**

读多写少：缓存库存 / 活动信息（Redis），读请求尽量走缓存，减轻 DB。写一致：预扣减在 Redis（DECR），扣到 0 或负数即售罄，快速失败；异步或定时同步到 DB，或 DB 只做最终一致性校验。队列削峰：请求通过 Redis 预检后，写入 MQ，下游订单服务按能力消费，避免 DB 被打挂。

**数据层**

库存表：可加乐观锁（version）或 \`WHERE stock >= ?\` 做扣减，防止超卖。分库分表：按订单/用户分片，分散写压力。

小结：前端与网关削峰防刷 → 缓存扛读与预扣减 → MQ 削峰写 → DB 做最终一致与防超卖。

### 秒杀如何防止超卖？

多层保证：

1. Redis 预扣减：用 \`DECR\` 扣减库存，扣前判断 \`GET\` 是否 > 0；或 Lua 脚本把"判断 + 扣减"做成原子操作。扣成功再进下单流程；扣失败直接返回"已售罄"。

2. 数据库防超卖：乐观锁——表加 \`version\`，更新时 \`UPDATE ... SET stock=stock-1, version=version+1 WHERE id=? AND version=? AND stock>=1\`，影响行数为 0 则重试或返回失败。条件更新——\`UPDATE product SET stock=stock-1 WHERE id=? AND stock>=1\`，依赖 DB 的行锁/原子性，未更新到则说明已不足。

3. 唯一约束防重复：用户+活动+商品 唯一索引，同一用户同一秒杀只能成功一笔，配合幂等接口。

建议：Redis 做"快速预扣减 + 售罄判断"，DB 做"最终扣减 + 防超卖"，两者结合。

### 秒杀库存 Redis 和 DB 如何保持一致？

以 DB 为准，Redis 做"可售数量"的缓存与预扣减。

初始化：活动开始前，把 DB 库存同步到 Redis（如 \`SET stock:activity_id 1000\`）。扣减：先 Redis DECR（或 Lua），扣成功再落单；异步或定时任务把"已扣减量"或"剩余量"同步回 DB；或下单成功时写 MQ，消费者去 DB 扣减。对账：定时任务对比 Redis 剩余与 DB 剩余，差异大时以 DB 为准修正 Redis，并记录告警。注意：允许短时间 Redis 与 DB 不完全一致，但最终一致；关键是不超卖（DB 扣减时用条件更新再次校验）。

## 会员系统（等级、权益、成长值）

### 会员等级 / 成长值系统怎么设计？

表设计要点：

- 用户会员表：user_id、等级、成长值、过期时间、开通/续费时间等。
- 等级配置表：level、所需成长值、权益（折扣、免邮、专属客服等）。
- 成长值流水表：user_id、变动值、来源（订单、签到、任务）、业务单号、时间，便于对账与审计。

等级计算：

- 方案一（实时计算）：查流水汇总或当前成长值，和配置表比对得出等级；适合规则简单、查询量不大。
- 方案二（等级缓存）：成长值变动时异步或定时重算等级，写入用户会员表；读时直接取等级，适合高并发。

一致性：成长值变更——先写流水表（可加唯一约束防重），再更新用户当前成长值；用事务或消息表+异步补偿，保证"有流水就有更新"。等级变更——由成长值更新触发重算，或定时任务扫"成长值跨档"的用户批量更新等级。

### 会员权益（如折扣、次数）如何不超发、不重复用？

权益 = 总量 + 已使用量，每次使用做"扣减 + 校验"。

权益表：用户维度或 用户+权益类型 维度，记录总次数/总量、已用次数、重置周期（月/年）。使用：先查剩余次数，再 \`UPDATE ... SET used = used + 1 WHERE user_id=? AND type=? AND used < total\`（或乐观锁），更新成功再发权益（发券、打折等）。幂等：每次使用带业务单号（订单号、请求 id），表或 Redis 做唯一约束/幂等键，同一单号只生效一次。过期与重置：定时任务按周期把 used 清零或按规则重置 total，注意和"使用中"的并发（用版本号或时间窗口）。

## 积分系统

### 积分系统表与流程设计？

表设计：

- 账户表：user_id、当前积分余额、更新时间。
- 流水表：user_id、变动积分（正负）、余额快照（可选）、业务类型（下单、退款、活动、过期）、业务单号、创建时间。流水表可分表分库按 user_id 或时间。

流程：

- 发放：先插流水（业务单号唯一防重），再 \`UPDATE account SET balance = balance + ? WHERE user_id = ?\`；用事务保证"有流水就改余额"，失败则整体回滚。
- 扣减：先判断余额是否足够，再插扣减流水，再 \`UPDATE ... SET balance = balance - ? WHERE user_id = ? AND balance >= ?\`，防止超扣。
- 过期：定时任务扫"将过期积分"，生成扣减流水并更新余额；流水类型标为"过期扣减"。

一致性要点：流水与余额在同一事务中变更；扣减用条件更新防超扣；业务单号唯一防重复发放/扣减。

### 积分和订单、支付如何保证一致？（例如下单送积分）

思路：最终一致性 + 幂等 + 补偿。

下单送积分：支付成功或订单完成事件发 MQ，积分服务消费消息，按"订单号+类型"做幂等：已处理过则跳过；否则写流水并增加余额。退款扣积分：退款成功发 MQ，积分服务扣减该订单所得积分，同样订单号幂等；扣减时用 \`balance >= ?\` 条件更新，不足则记录异常人工/自动处理。一致性：不强求与订单库同一事务，而是"支付/订单状态为准，积分异步跟单"；对账任务定期用订单与积分流水核对，差异则告警或自动补发/扣减。

### 积分/余额的两种统计设计：流水汇总 vs 账户字段

问题：当前余额/积分，是每次从流水表实时汇总，还是用账户表的一个字段实时加减、读时直接读该字段？

设计一（以流水表为准，实时汇总）：不单独存"余额"字段（或只作缓存）；当前余额 = \`SUM(变动额) WHERE user_id = ?\`（或按账户维度汇总）。优点：流水是唯一真相，不会出现"余额和流水对不上"；对账简单甚至不需要；审计、查历史任意时点余额都自然支持。缺点：每次查余额都要聚合流水，数据量大时慢、费资源；高并发读需要做汇总层或缓存，架构更复杂。适用：强审计、合规、对账要求高，且读量可控或能接受缓存的场景（如部分 To B 资金）。

设计二（账户表存余额字段，写时加减、读时直接读字段，常用）：账户表有 \`balance\`（及可选 \`freeze\`）；每笔变动先插流水，再 \`UPDATE account SET balance = balance ± ?\`；读余额直接读该字段。优点：读简单、快，高并发友好；实现简单，流水记"发生了什么"，余额表示"当前是多少"。缺点：余额与流水是两处数据，可能因 bug 或异常不一致；必须通过对账发现并修复：用"期初 + 流水汇总"与当前 \`balance\` 比对，差异告警或自动纠偏。适用：高并发、读多写多的互联网积分、余额、钱包等。

结论：积分/余额场景多数采用设计二（账户字段 + 流水表），读用字段，写时"插流水 + 改余额"同一事务，再通过对账兜底；设计一适合读量不大或强合规、以账为准的场景。

## 余额 / 资金账户系统

### 用户余额系统如何设计（充值、消费、退款）？

表设计：

- 账户表：user_id、余额、冻结金额、版本号（乐观锁）、更新时间。
- 流水表：user_id、变动金额、方向（收入/支出）、类型（充值/消费/退款/提现/冻结/解冻）、业务单号、余额快照、时间。流水表建议按 user_id 分表。

操作规范：

- 充值：插收入流水（订单号幂等），\`UPDATE account SET balance = balance + ?, version = version + 1 WHERE user_id = ? AND version = ?\`。
- 消费：先判断余额 >= 消费额，再插支出流水，再 \`UPDATE ... SET balance = balance - ? WHERE user_id = ? AND version = ? AND balance >= ?\`；失败则返回余额不足。
- 退款：插收入流水（原订单号+退款单号幂等），余额增加，同上条件更新。
- 冻结/解冻：先扣 balance、加 freeze；解冻时扣 freeze、加 balance 或直接扣 freeze 转支出；流水分别记录，保证 balance + freeze 与流水汇总一致。

一致性：流水与余额更新在同一 DB 事务；所有变更带业务单号并做唯一约束防重；用乐观锁或条件更新防并发超扣。

### 余额场景如何保证高并发下不超扣、不错账？

1. 数据库层：扣减用条件更新——\`UPDATE account SET balance = balance - ? WHERE user_id = ? AND balance >= ?\`，未更新到则返回失败；或用乐观锁 \`WHERE version = ?\`，更新失败重试或返回。
2. 幂等：每笔扣款/退款对应唯一业务单号（订单号、支付单号），流水表或单独幂等表唯一约束，重复请求只生效一次。
3. 流水与余额同一事务：先插流水，再改余额，事务提交；避免"余额改了流水没写"或反过来。
4. 对账：定时用"期初 + 流水汇总"与当前余额、冻结比对，不一致则告警并修复（以流水为准调余额或人工处理）。

### 分布式下余额/积分"扣减"如何避免重复扣？（网络重试、重复请求）

幂等键：请求方生成唯一 request_id 或使用业务单号（订单号+操作类型），服务端以该键做"唯一约束"或"先查再插流水"。流水表唯一索引：如 (user_id, biz_type, biz_no)，同一业务单号只能插一条流水，重复请求会唯一冲突，直接返回"已处理"或原结果。状态机：扣减有"处理中/成功/失败"，先置为处理中再落库，成功再改成功；重复请求看到已成功则直接返回。

## 通用设计题

### 如何设计一个"防止重复提交 / 重复下单"的机制？

- 前端：提交后按钮禁用、防重复点击。
- 后端：同一接口带幂等键（如 token、order_token），用户进入下单页时下发，提交时带上；服务端 Redis 或 DB 记录"该 token 已使用"，用后即废。或用业务维度唯一：用户+商品+活动+时间窗口 唯一，重复则返回"请勿重复下单"。
- DB：订单表 用户+商品+活动 唯一索引，从根上杜绝重复单。

### 分布式环境下如何保证"扣库存 / 扣余额"这类操作的一致性？

- 尽量单库事务：流水与余额/库存同库同事务，先写流水再改数值，条件更新防超扣。
- 若跨服务：最终一致——上游先改自己的库并发 MQ，下游消费 MQ 做本地扣减，幂等 + 重试；对账补齐差异。Saga / 补偿——先扣 A，再扣 B；若 B 失败则发"补偿 A"的消息，A 回滚或记欠款。两阶段/Seata——强一致场景，成本高，一般只在核心资金场景考虑。
- 幂等：所有参与方用同一业务单号做幂等，避免重试导致重复扣。

### 缓存和 DB 不一致时，先更新缓存还是先更新 DB？有哪些常见方案？

- Cache Aside：读时先读缓存，没有则读 DB 并回写缓存；写时先更新 DB，再删缓存（而不是更新缓存），下次读时再加载。避免"更新缓存失败"或并发写导致脏缓存。
- 延迟双删：更新 DB 后删缓存，再延迟几百 ms 再删一次，降低"读旧数据并回写"的脏读窗口。
- 订阅 binlog：DB 变更后通过 canal 等同步到 MQ，专门服务消费后删/更新缓存，业务只写 DB，解耦一致性问题。

原则：以 DB 为准；写路径尽量"改 DB + 删缓存"，读路径"没缓存再加载"；复杂场景用 binlog 同步或延迟双删。

### 接口幂等如何设计？（支付回调、重试、重复点击）

- 唯一业务键：支付回调用"支付单号"或"订单号+支付渠道+状态"，流水表或处理表唯一约束，同一单只处理一次；处理前先查是否已存在，存在则直接返回成功。
- 幂等表：request_id / token 存 Redis 或表，设置过期时间；"先查再 set"或" set NX"，未设置过才执行业务并标记已用。
- 状态机：订单/单号有状态（待支付/已支付/已退款），只有从"待支付"到"已支付"才加余额、发积分，重复回调看到已支付则直接返回成功。

### 大促/活动时，如何从架构上保护系统？（限流、降级、熔断）

- 限流：网关或接入层按 IP、用户、接口做 QPS/并发限制；令牌桶、漏桶；核心接口单独限流。
- 降级：非核心功能关掉或返回默认值（如推荐、积分展示），保证下单、支付、库存主链路。
- 熔断：下游超时或错误率过高时，短时间内不再调用，直接返回降级结果，避免雪崩。
- 扩容与隔离：核心库、核心服务独立资源；读从库、缓存扛读；MQ 削峰，避免 DB 被打满。
- 预案：提前压测、容量评估、开关配置（如关掉积分、关掉部分活动页），随时可降级。`,
    },
    readTime: 22,
  },
  {
    slug: 'architect-tob-interview-guide',
    category: 'interview',
    date: '2026-05-12',
    title: {
      en: 'Architect & To B Interview Guide: High Availability, Distributed Systems & Multi-Tenancy',
      zh: '架构师 / To B 常见面试题：高可用、分布式、多租户与权限',
    },
    excerpt: {
      en: '23 real-world architecture interview questions covering high availability design, concurrency bottlenecks, microservices, distributed transactions, message queues, caching strategies, multi-tenant data isolation, RBAC, and tech leadership — with battle-tested answers.',
      zh: '23 道架构师与 To B 方向高频面试题，覆盖高可用设计、高并发优化、微服务拆分、分布式事务、消息队列、缓存策略、多租户隔离、权限设计及技术管理，附实战答案。',
    },
    content: {
      en: `If you are interviewing for a staff engineer, architect, or technical lead role — especially one with a To B or enterprise focus — the questions shift. They stop being about how to invert a binary tree and start being about how to keep a system alive at 3 AM when a downstream dependency melts down, or how to design tenant isolation that won't leak customer data when someone fat-fingers a SQL query.

I have sat on both sides of this table. Here are the 23 questions that actually get asked, with answers grounded in production experience rather than textbook recitation.

## System Design & High Availability

### How do you design a high-availability system? What dimensions do you evaluate?

No single points of failure anywhere. Services run in multiple instances behind a load balancer. Databases use primary-standby or multi-primary replication. Storage has redundant copies. Avoid single-machine, single-AZ, single-region architectures.

Fault isolation is equally important. Split services with independent thread pools or coroutine pools. Use circuit breakers and fallbacks so one failing dependency does not cascade.

Observability is non-negotiable. Metrics, distributed tracing, structured logging, and alerting must let you detect, locate, and postmortem any incident. Then disaster recovery: multi-region active-active or active-passive, regular backup drills, and clearly defined RTO and RPO targets. Finally, shipping: canary deploys, blue-green, feature flags, and a rollback plan for every release.

### What do SLA, RTO, and RPO mean in practice?

Availability is measured in nines. 99.9% means roughly 8.76 hours of downtime per year. 99.99% means about 52 minutes. You measure it as successful requests over total requests, or uptime over total time.

SLA — Service Level Agreement — is the external promise you make: latency, error rate, availability. It is often tied to billing or compensation clauses. RTO — Recovery Time Objective — is "how long can the service be down before the business screams." RPO — Recovery Point Objective — is "how much data can we afford to lose," measured in time. RPO dictates whether you go synchronous replication (near-zero RPO, higher latency and cost) or asynchronous (some data loss window, cheaper).

### How do you do capacity planning? What happens before a major sale or new product launch?

You start by estimating QPS, data volume, and downstream call fan-out. Then benchmark a single instance to find its ceiling. From there, calculate how many instances, how many DB connections, how much Redis memory you need.

Stress testing follows. Full-link tests with shadow tables or isolated traffic. Single-API benchmarks. Push to 1.2x-1.5x of expected peak and find the bottleneck — usually the database, sometimes a downstream RPC, a thread pool, or GC.

Then provisioning: set elastic scaling policies or reserve capacity. Pre-configure rate limits and degradation switches. Write runbooks for what gets degraded first. After the event, compare actual QPS, latency, and error rates against predictions and update your capacity model.

## High Concurrency & Performance

### Where do bottlenecks hide in high-concurrency systems? How do you find and fix them?

The usual suspects: the database (connection pool exhaustion, slow queries, row-level locks), cache stampedes, downstream RPC timeouts, saturated thread pools, GC pauses, or single-machine CPU/IO saturation.

Tracing is your first tool — follow a single request through every hop and find where time disappears. Then dig into DB slow logs and lock waits. Profile CPU, memory, and goroutines with pprof or async profiler. Check Redis for big keys, hot keys, and slow commands.

Fixes are layered: add caching, separate reads from writes, shard databases, apply backpressure with rate limiting and circuit breakers, offload work to message queues, tune connection pools and timeouts, and in code reduce lock contention, reduce serialization overhead, and batch where possible.

### How do you design a read service that handles millions of QPS?

Multiple cache tiers. First, in-process cache (like a bounded LRU). Then a distributed cache layer (Redis cluster). Hot data lives as close to the CPU as possible — the fewer network hops, the better.

Shard everything. Data sharded by key means stateless service instances scale horizontally. Route read requests by user ID or key hash to a fixed node so local cache hit rates stay high.

Serve from the edge where possible. CDN for static assets and even short-lived API responses. Multi-region deployment with geo-routed traffic.

Degrade gracefully. If cache expires and the downstream is slow, return stale data rather than nothing. Rate-limit to protect the origin. Use read replicas or specialized read-optimized stores for the hot path.

### When the database is the bottleneck, what optimization and sharding strategies work?

Start with the easy wins: indexing, slow query optimization, avoiding large transactions and long-held locks, connection pooling, and read-write splitting with read replicas.

When that stops working, shard. Vertical sharding first — split by business domain (users in one cluster, orders in another). Then horizontal sharding: pick a shard key (user_id modulo N, or a hash range) and route queries accordingly. Use a sharding middleware or a smart client library.

Separate hot and cold data. Archive old records to cold storage or object stores. Keep only the working set in the online database. Introduce fit-for-purpose stores: Elasticsearch for search, Redis for cache, columnar or OLAP engines for analytics.

## Microservices & Distributed Systems

### What are the principles for splitting microservices? What happens if you go too fine-grained?

Split along business boundaries and bounded contexts. High cohesion within a service, loose coupling between them. Each service should be independently deployable and independently scalable. Start with business closure — what does the business need to function — before technical seams. Avoid circular dependencies.

When you over-split, call chains grow long, latency stacks up, and the blast radius of any failure widens. Operational overhead explodes: more pipelines, more dashboards, more on-call rotations. Distributed transactions become harder. Team coordination costs rise. The right grain size is what a single team can own and reason about, balanced against how often the boundary actually changes.

### How do service discovery and load balancing work in a microservice world?

When an instance starts, it registers with a registry — Nacos, Consul, Etcd — providing its address and metadata. Callers pull or subscribe to the registry for the service's instance list and cache it locally, refreshing periodically. When instances go down, they deregister or their heartbeat times out and they are evicted.

For load balancing, client-side LB is common: the caller picks an instance from the cached list using round-robin, random, weighted, or least-connections. Server-side LB routes through a gateway or LB appliance. Canary deployments route by version tag or header to a subset of instances.

### What are the common distributed transaction patterns and when do you use each?

Two-phase commit (2PC): A coordinator orchestrates prepare and commit across participants. Strong consistency but blocking, and the coordinator is a single point of failure. Use it for short transactions with few participants where strong consistency is mandatory.

TCC (Try-Confirm-Cancel): Try reserves resources, Confirm finalizes, Cancel releases. You write the compensation logic yourself. Flexible but expensive to build. Good for business workflows that demand precise control.

Saga: Decompose a long transaction into a sequence of local transactions, each with a compensating action. If any step fails, run the compensations for completed steps in reverse order. Eventually consistent. Works well for long-running flows like order-plus-inventory-plus-points.

Transactional outbox / transactional messaging: Write the business change and the message in the same database transaction. A separate process polls and publishes to MQ. Consumers are idempotent. Simple, eventually consistent, and suitable for most async decoupling needs.

My rule of thumb: if eventual consistency is acceptable, use MQ + idempotent consumers. If strong consistency is required and the scope is small, 2PC or TCC. Long workflows, use Saga.

### How do you design a distributed ID? What are the trade-offs of Snowflake?

Requirements: globally unique, roughly ordered (helps database indexes), highly available, compact.

Options: UUID (random, long, ruins index locality). Database auto-increment (single point, poor scalability). Segment-based allocation like Meituan Leaf (batch allocate ID ranges). Snowflake: timestamp + worker ID + sequence number, generated locally, time-ordered.

Snowflake's strength is that it requires no coordination and is very fast. Its weakness is clock dependency — clock rollback can cause duplicates and must be handled explicitly. Worker ID assignment across machines and regions needs careful planning. Variants like Leaf-snowflake use etcd or Redis for worker ID allocation.

## Message Queues & Async Processing

### How do you choose an MQ? When Kafka vs RocketMQ vs RabbitMQ?

The decision matrix: throughput, latency, durability, ordering guarantees, transaction/delay message support, operational complexity, ecosystem, and team familiarity.

Kafka: extreme throughput, log-oriented, great for streaming, event sourcing, and analytics workloads. Excellent persistence and replay capability.

RocketMQ: strong support for ordered messages, delayed messages, and transactional messages. Rich Chinese documentation. Well suited for order processing, trading systems, and peak-shaving.

RabbitMQ: flexible routing with exchanges and bindings. Good for complex routing topologies and when latency and feature richness matter more than raw throughput.

Choose based on which dimension matters most: throughput (Kafka), messaging features (RocketMQ), or routing flexibility (RabbitMQ).

### How do you guarantee no message loss, no duplicates, and ordered consumption?

No loss: producer waits for broker acknowledgment after persistence (acks=all). Broker replicates to multiple nodes. Consumer processes first, then commits offset. Failures trigger retry or dead-letter routing.

No duplicates: make consumers idempotent. Deduplicate by business key (order ID, etc.) or check-before-write. Attach a unique message ID and enforce a uniqueness constraint in the database.

Ordering: within a single partition, order is preserved. Publish with the same key to land in the same partition. Single consumer within a partition processes sequentially. If global order is not required — and it rarely is — partition by business key and you are done.

## Caching & Storage

### What are cache penetration, hot-key invalidation, and cache avalanche? How do you handle each?

Penetration: a request for a key that does not exist in the database either, so it passes straight through cache and DB every time. Fix with a Bloom filter to reject impossible keys, or cache a nil value with a short TTL.

Hot-key invalidation: a heavily accessed key expires and suddenly all requests pound the database. Fix by never expiring hot keys (use logical expiry with async refresh) or use a mutex so only one caller goes to origin while others wait.

Avalanche: many keys expire simultaneously, or the cache cluster goes down entirely. Fix by adding random jitter to expiration times, using multi-level caching, circuit breaking, and running the cache in a highly available cluster so it does not fail as a single point.

### How do you design a multi-level cache (local + Redis)? How to handle consistency?

Requests hit the local cache first (in-process, bounded LRU). On miss, go to Redis. On Redis miss, query the database and backfill both Redis and the local cache.

Consistency anchors on the database. On writes: update DB first, then invalidate Redis, then broadcast to all instances to invalidate their local caches (or just wait for short TTL expiry). For read paths, if a brief dirty read is tolerable, rely on TTL alone. For tighter consistency, use a binlog listener like Canal to trigger cache invalidation.

Watch for local cache memory pressure, eviction policies, and the risk of thundering herd when many nodes discover a cold key simultaneously. Mutual exclusion or single-flight patterns help.

## To B / Enterprise & Multi-Tenancy

### What are the key architectural differences between To B and To C systems?

Tenancy and isolation: To B systems are inherently multi-tenant — enterprises, organizations — each needing data, configuration, and resource isolation. Roles and permissions are far more complex: RBAC, data-level ACLs, approval workflows.

Customization: enterprises demand customizations, private deployments, and integration with their internal systems. This requires configurability, plugin architectures, open APIs, and metadata-driven design to avoid one-off code branches.

Compliance and security: audit logs, data masking, regulatory requirements. Permissions must be fine-grained and every operation must be traceable.

Stability and SLAs: enterprise customers care deeply about availability and data security. Contracts often include SLAs with penalties. You need multi-AZ or multi-region disaster recovery, backup and restore, and defined change windows.

Performance profile: To C is spiky high-concurrency. To B may have lower concurrency but each request is complex, data volumes are large, and there are heavy reporting and export workloads. Optimize for single-request depth and batch throughput.

### What are the common approaches to multi-tenant data isolation?

Database-per-tenant: each tenant gets its own database. Maximum isolation, independent backup and scaling, highest cost. For large customers or strict compliance requirements.

Shared database, separate schema: within a single instance, each tenant has its own schema. Good isolation, backup and scaling per schema. For mid-to-large tenants.

Shared tables with tenant_id: all tenants share tables, differentiated by a tenant_id column. Simplest to implement, lowest cost, but requires strict discipline — every query must include the tenant_id filter or you leak data. For SaaS with many small tenants.

Hybrid: flagship customers get dedicated databases; the long tail shares tables. Choose based on customer tier and isolation requirements.

### How do you design enterprise-grade permissions (RBAC + data scope)?

RBAC at its core: users are assigned roles, roles carry permissions (menu items, buttons, API endpoints). Roles can inherit or compose. The API layer checks "does the current user's role include this permission before executing."

Data scope controls what data a user can see, not just what they can do. For example: only their own records, their department's, their department and sub-departments, or everything. Implement by injecting data scope conditions into queries automatically (e.g., WHERE dept_id IN (...)). Data scope is typically configured per role or via a rules engine.

Extensions: approval workflows, step-up authentication for sensitive operations, permission change auditing, SSO and LDAP integration.

### How do you design an open API platform for enterprise customers?

Authentication: AppKey + AppSecret for server-to-server, or OAuth2 for delegated access. The gateway validates tokens or signatures and identifies the caller.

Authorization and rate limiting: throttle by application or tenant — QPS, concurrent connections, daily quotas. Authorize per API or per subscription tier. Reject unauthorized calls at the gateway.

Security: HTTPS everywhere, request signing to prevent tampering, sensitive field encryption, IP allowlists, anti-replay via timestamp and nonce.

Observability: log every call with latency and error codes. Give customers a dashboard showing their usage, quota, and error breakdowns.

Versioning and compatibility: API versioning via URL path or header. Deprecate old versions with advance notice and canary cutovers. Maintain backward compatibility wherever possible.

## Technology Selection & Execution

### What factors do you weigh when making a technology choice?

Business fit first: does it solve the functional, performance, and scalability needs? Are there proven reference cases at similar scale?

Team and operations: does the team know it or can ramp up quickly? Is the community healthy, documentation solid, hiring pool deep? How complex is the operational surface — monitoring, troubleshooting, upgrading?

Cost: licensing, cloud service fees, and engineering maintenance cost. Build vs. buy vs. self-host vs. managed service.

Ecosystem and lock-in: how well does it integrate with the existing stack? Avoid excessive vendor lock-in unless the benefits clearly outweigh the cost.

Evolution: can you upgrade smoothly? Is there a migration path? Is the community active and the project likely to be maintained for years?

### How do you drive technical decisions through a team? What if there is resistance?

Build alignment first. Explain the context, the goals, the expected payoff, and the risks. Back it with data or a proof of concept. Connect the decision to business value.

Ship incrementally. Pilot first, then expand. Feature flags, canary deploys, rollback plans — all reduce perceived risk and make adoption easier.

Bring key engineers into the design review. Incorporate their feedback genuinely. People resist less when they helped shape the outcome.

When there is pushback, listen for the real concern — technical doubt, historical scar tissue, resource anxiety. Address it concretely: compatibility plans, migration tooling, training. Escalate priority alignment with leadership only when necessary. Let the pilot results speak louder than any argument.

## Soft Skills & Architectural Thinking

### How do you run a technical design review? What do you look at first?

Scope and boundaries: are the requirements clear? Are non-functional concerns — performance, availability, security — explicitly addressed?

Architecture soundness: module boundaries, dependency direction, extension points. Are there single points of failure? Can a failure cascade?

Data and consistency: storage design, sharding strategy, consistency guarantees. Are there risks of double-charge, oversell, or data corruption?

Operability: deployment, rollback, monitoring, alerting, capacity planning, rate limiting. What does the on-call experience look like?

Risk and cost: technical risk, migration risk, resource and timeline estimates. Is there a fallback or rollback path if it does not work?

### What does an architect do during a production incident?

Stop the bleeding first. Work with the on-call engineer to execute immediate mitigation — rate limit, degrade, rollback, drain traffic, remove the sick node. Restore service before finding root cause.

Then triage. Look at dashboards, logs, and traces. Narrow the scope: which service, which instance, which dependency. Preserve evidence — thread dumps, heap dumps, core dumps — before restarting anything.

Afterward, postmortem. Root cause analysis using 5 Whys and a timeline. Turn findings into concrete improvements: code changes, config changes, process changes, monitoring gaps. Assign owners and track follow-through. The goal is not to assign blame but to prevent recurrence.

### How do you manage technical debt? When do you refactor vs. live with it?

Identify and quantify. Code complexity, duplication, testability. Incident frequency and change difficulty. The modules the team is afraid to touch.

Prioritize ruthlessly. Debt that threatens stability, security, or team velocity gets paid first. Purely cosmetic issues can wait.

Refactor when there is a business need touching that area, or when incidents keep happening there, or when new team members need to ramp up. Always refactor with tests alongside the actual feature work — never refactor for its own sake.

Live with it when business pressure is high, the team is stretched, and the module is stable and rarely changed. Document the known issues, add guardrails (monitoring, integration tests), and schedule the cleanup for a quieter period. Never do a big-bang rewrite on a critical path unless you have no choice.`,
      zh: `## 一、系统设计与高可用

### 1. 如何设计一个高可用的系统？从哪些维度考虑？

- **无单点**：服务多实例部署，负载均衡；DB 主从/多主，存储多副本；避免单机、单机房、单运营商。
- **故障隔离**：服务拆分、线程池/协程池隔离、熔断降级，避免一个依赖拖垮整体。
- **可观测**：日志、指标、链路追踪、告警；故障可发现、可定位、可复盘。
- **容灾与恢复**：多机房/多活或主备；定期备份与恢复演练；RTO/RPO 目标明确。
- **变更与发布**：灰度、蓝绿、金丝雀；回滚预案；配置与特性开关，出问题可快速关闭。

### 2. 高可用指标有哪些？如何理解 SLA、RTO、RPO？

- **可用性**：如 99.9%（年停机约 8.76 小时）、99.99%（约 52 分钟），通常用"正常请求数/总请求数"或"正常时间/总时间"衡量。
- **SLA（服务等级协议）**：对外的可用性、延迟、错误率等承诺；常与赔偿、计费挂钩。
- **RTO（恢复时间目标）**：从故障发生到业务恢复可接受的最长时间，即"能停多久"。
- **RPO（恢复点目标）**：能接受丢失多少数据，即"最多丢到哪个时间点"；决定备份与同步策略（同步复制 vs 异步）。

### 3. 如何做容量规划？大促/新业务上线前要做哪些事？

- **容量评估**：根据 QPS、数据量、依赖调用量，估算 CPU/内存/磁盘/网络；单机压测得到单机能力，再算需要多少实例、多少 DB 连接等。
- **压测**：全链路压测（流量隔离或影子表）、单接口压测、峰值压测到 1.2～1.5 倍预期流量，找到瓶颈（DB、缓存、下游、线程池）。
- **扩容与限流**：确定弹性伸缩策略或预留机器；限流阈值、降级开关提前配置；预案（降级哪些功能、关哪些入口）写好并演练。
- **复盘**：大促后看实际 QPS、延迟、错误率，与预估对比，迭代容量模型。

## 二、高并发与性能

### 4. 高并发下常见瓶颈在哪？如何排查和优化？

- **常见瓶颈**：DB（连接数、慢 SQL、锁）、缓存穿透/击穿/雪崩、下游 RPC 超时、线程池/协程池打满、GC 停顿、单机 CPU/IO。
- **排查**：链路追踪看慢在哪一环；DB 慢查询、锁等待；CPU/内存/GC 用 pprof；Redis 大 key、热 key、慢命令。
- **优化**：加缓存、读写分离、分库分表；限流熔断；异步化、MQ 削峰；连接池、协程数、超时时间调优；代码层减少锁、减少序列化、批量处理。

### 5. 如何设计一个能支撑百万 QPS 的读服务？

- **多级缓存**：本地缓存（进程内）+ 分布式缓存（Redis/集群），热点数据尽量在本地，减少网络与 Redis 压力。
- **分片与水平扩展**：数据按 key 分片，服务无状态水平扩容；读请求可按 user_id 或 key hash 到固定节点，利于本地缓存命中。
- **就近接入**：CDN 做静态或接口缓存；多机房部署，用户就近访问。
- **降级与限流**：缓存失效或下游挂时返回默认/旧数据，避免打穿 DB；限流保护下游与自身。
- **存储**：读多写少可读写分离、从库/只读实例扩展；或时序/列存等适合大批量读的引擎。

### 6. 数据库成为瓶颈时，有哪些常见优化与拆分手段？

- **单机优化**：索引、慢 SQL 优化、避免大事务与长锁；连接池；读写分离，读走从库。
- **分库分表**：按业务维度（用户、订单、商户）做垂直拆库；单表过大按 shard key（如 user_id、order_id 取模或范围）分表；路由层或中间件按 key 查库表。
- **冷热分离**：历史数据归档到冷库或对象存储，在线库只保留热数据。
- **引入其他存储**：搜索用 ES；缓存用 Redis；宽表/分析用数仓或 OLAP，减轻主库压力。

## 三、微服务与分布式

### 7. 微服务拆分原则？拆得过细会有什么问题？

- **原则**：按业务边界、领域拆分，高内聚低耦合；服务可独立部署、独立扩展；先考虑业务闭环，再考虑技术边界；避免循环依赖。
- **过细的问题**：调用链长、延迟与故障放大的概率增加；运维与治理成本高（发布、监控、链路）；分布式事务与一致性更复杂；团队协作与边界划分成本上升。一般按"团队能维护的粒度"和"变更频率"平衡。

### 8. 服务发现、负载均衡在微服务里怎么做的？

- **服务发现**：实例启动时向注册中心（Nacos、Consul、Etcd 等）注册自身地址与元数据；调用方从注册中心拉取或订阅实例列表，本地缓存并定期刷新；下线时反注册或心跳超时剔除。
- **负载均衡**：客户端 LB：调用方从实例列表中按轮询、随机、加权、最少连接等策略选一个；服务端 LB：经过网关或 LB 设备再转发。灰度可按版本/标签路由到部分实例。

### 9. 分布式事务有哪些常见方案？各适合什么场景？

- **两阶段提交（2PC）**：协调者协调多参与者 prepare/commit，强一致但阻塞、协调者单点；适合短事务、强一致、参与方少的场景（如传统 DB 的 XA）。
- **TCC**：Try 预留资源，Confirm 确认，Cancel 取消；业务自己实现补偿，灵活但开发成本高；适合对一致性和可控性要求高的场景。
- **Saga**：长事务拆成多个本地事务，每个有对应补偿；顺序执行，失败则执行已完成的补偿；最终一致，适合长流程、可补偿的业务（订单+库存+积分）。
- **本地消息表 / 事务消息**：业务与消息在同一 DB 事务中写入，异步投递 MQ，消费者幂等消费；最终一致，实现简单，适合大部分异步解耦场景。
- **选型**：能接受最终一致优先 MQ+幂等；必须强一致且参与方少可考虑 2PC/TCC；长流程用 Saga。

### 10. 分布式 ID 如何设计？雪花算法有什么优缺点？

- **要求**：全局唯一、趋势递增（利于 DB 索引）、高可用、尽量短。
- **方案**：UUID（无序、较长）；DB 自增（单点、扩展性差）；号段/批号（如美团 Leaf 号段模式）；雪花（Snowflake）：时间戳+机器位+序列号，本地生成、趋势递增。
- **雪花优点**：无中心、高性能、趋势递增；**缺点**：依赖时钟，时钟回拨要处理；机器位需要分配，多机房/多实例要规划好，否则可能冲突。改进：用 etcd/Redis 分配 workerId、或引入"序列号+时间"的变种（如 Leaf-snowflake）。

## 四、消息队列与异步

### 11. MQ 选型会考虑哪些因素？Kafka 和 RocketMQ 适用场景？

- **因素**：吞吐、延迟、持久化与可靠性、顺序、事务/延迟消息、运维与生态、团队熟悉度。
- **Kafka**：高吞吐、日志/大数据场景、多消费者组、持久化与回溯能力强；适合日志采集、流计算、事件总线。
- **RocketMQ**：顺序消息、延迟消息、事务消息支持好；阿里系、中文文档多；适合订单、交易、削峰填谷。
- **RabbitMQ**：协议丰富、路由灵活；适合复杂路由、对延迟和功能要求高的业务。选型看业务侧重吞吐、顺序还是功能丰富度。

### 12. 如何保证消息不丢、不重复、顺序消费？

- **不丢**：生产者发后等 broker 持久化确认（acks=all）；broker 多副本；消费者先处理再 commit offset，处理失败可重试或进死信。
- **不重复**：消费者幂等——以业务键（订单号等）去重，或"先查再写"；必要时消息带唯一 id，落表唯一约束。
- **顺序**：单分区内有序；发消息时指定同一 key 进同一分区；单分区单消费者顺序处理；不要求全局顺序时可按业务键分区即可。

## 五、缓存与存储

### 13. 缓存穿透、击穿、雪崩分别是什么？如何应对？

- **穿透**：查不存在的数据，请求直打 DB。应对：布隆过滤器挡掉不可能存在的 key；或对"空值"也缓存短 TTL，避免重复查库。
- **击穿**：热点 key 过期瞬间大量请求打到 DB。应对：热点 key 永不过期或逻辑过期（异步刷新）；或加互斥锁，只有一个请求回源，其他等锁后读缓存。
- **雪崩**：大量 key 同时过期或缓存整体不可用，流量压到 DB。应对：过期时间加随机偏移；多级缓存、限流降级；集群与高可用，避免单点挂掉。

### 14. 如何设计一个多级缓存（本地 + Redis）？一致性怎么处理？

- **结构**：请求先查本地缓存（如进程内 LRU），未命中再查 Redis，再未命中查 DB 并回写 Redis 与本地。
- **一致性**：以 DB 为准；写时先更新 DB，再删 Redis，再通知或广播各节点删本地缓存（或设短 TTL 自然过期）；读时允许短暂脏读则只设 TTL。复杂场景可用 canal 等同步 binlog 触发删缓存。
- **注意**：本地缓存容量与淘汰策略、与 Redis 的更新顺序、避免缓存风暴（互斥或单飞）。

## 六、To B / 企业级与多租户

### 15. To B 和 To C 在架构上主要差异有哪些？

- **租户与隔离**：To B 常多租户（企业/组织），数据、配置、资源要按租户隔离；权限与角色更复杂（RBAC、数据权限、审批流）。
- **定制与扩展**：企业客户常有定制需求、私有化部署、对接内部系统；需要配置化、插件化、开放 API、元数据驱动，减少改代码。
- **合规与安全**：审计日志、数据脱敏、合规要求（等保、行业规范）；权限细粒度、操作可追溯。
- **稳定性与 SLA**：企业客户对可用性、数据安全敏感；合同常有 SLA，需要多活/容灾、备份与恢复、变更窗口。
- **性能模型**：To C 偏瞬时高并发；To B 可能并发不高但单请求复杂、数据量大、报表与导出多，需优化单请求与批处理。

### 16. 多租户数据隔离有哪几种常见方案？各有什么优缺点？

- **独立库（库级隔离）**：每租户一个 DB，隔离最好、可独立备份与扩展，成本高，适合大客户或强合规。
- **共享库、独立 schema**：同一实例下每租户一个 schema，隔离较好，备份与扩展按 schema，适合中大型客户。
- **共享库表、tenant_id 隔离**：所有租户同一套表，用 tenant_id 区分；实现简单、成本低，需严格在查询和索引中带 tenant_id，否则易数据泄露；适合 SaaS、小租户多。
- **混合**：核心大客户独立库，长尾共享表；按客户等级选择策略。

### 17. 企业级权限设计（RBAC、数据权限）一般怎么做？

- **RBAC**：用户 → 角色 → 权限（菜单、按钮、接口）；角色可继承或组合；接口层校验"当前用户角色是否包含该接口权限"。
- **数据权限**：在"能看到哪些数据"的维度控制，如：仅本人、本部门、本部门及子部门、全部；实现上在查询条件中自动加"数据范围"（如 dept_id in (?)），可由角色配置或规则引擎生成条件。
- **扩展**：审批流、敏感操作二次校验、权限变更审计；与 SSO、LDAP 等集成。

### 18. 如何设计开放平台 / API 给企业客户对接？

- **认证**：AppKey + AppSecret、或 OAuth2；网关层校验 token 或签名，识别调用方。
- **鉴权与限流**：按应用/租户限流（QPS、并发、日调用量）；按 API 或套餐授权，未授权接口拒绝。
- **安全**：HTTPS、签名防篡改、敏感参数加密；IP 白名单、防重放（timestamp+nonce）。
- **可观测**：调用日志、耗时、错误率；给客户控制台查看调用量、配额、问题排查。
- **版本与兼容**：API 版本（路径或 Header）；废弃旧版本时提前通知与灰度，保证兼容性。

## 七、技术选型与落地

### 19. 做技术选型时会考虑哪些因素？

- **业务匹配**：能否满足功能、性能、扩展性需求；是否有成功案例。
- **团队与运维**：团队是否熟悉、社区与文档是否完善、招聘与培训成本；运维复杂度、监控与故障处理是否成熟。
- **成本**： license、云服务费用、人力维护成本；自建 vs 托管。
- **生态与绑定**：与现有技术栈、中间件、云厂商的集成；避免过度绑定单一厂商。
- **演进**：是否支持平滑升级、迁移路径；社区活跃度与长期维护预期。

### 20. 如何推动技术方案在团队内落地？遇到阻力怎么处理？

- **共识**：讲清背景、目标、收益与风险；用数据或 POC 证明可行性；和业务/产品对齐价值。
- **分步**：先试点再推广；灰度、开关、可回滚，降低风险感知。
- **参与**：让核心开发参与方案讨论与评审，采纳合理意见，减少"被推行"的感觉。
- **阻力**：倾听反对原因（技术顾虑、历史包袱、资源）；针对性地补充方案（兼容、迁移、培训）；必要时找上级或协作方一起对齐优先级与资源；用试点结果说话，而不是强推。

## 八、软技能与架构思维

### 21. 如何做技术方案评审？你会重点看哪些点？

- **目标与范围**：需求与边界是否清晰；非功能需求（性能、可用性、安全）是否考虑。
- **架构合理性**：模块划分、依赖关系、扩展点；是否有单点、是否易故障扩散。
- **数据与一致性**：存储与拆分、一致性方案是否合理、是否有超卖/重复等风险。
- **可运维与可观测**：发布、回滚、监控、告警、容量与限流。
- **风险与成本**：技术风险、迁移风险、资源与时间成本；是否有降级与回退方案。

### 22. 线上故障时，作为架构师你会怎么参与处理？

- **先止血**：配合 on-call 快速止损——限流、降级、回滚、切流量、摘除故障节点；优先恢复服务再查根因。
- **再定位**：看监控、日志、链路；缩小范围（哪一环节、哪一实例）；必要时保留现场（线程 dump、内存 dump）再重启。
- **后复盘**：根因分析（5 Why、时间线）；改进措施（代码、配置、流程、监控）；责任与改进落实到人，避免同类问题再发生。

### 23. 如何做技术债务管理？什么时候该重构、什么时候先扛？

- **识别与量化**：代码复杂度、重复度、可测试性；线上故障与变更成本；团队反馈的"不敢改"模块。
- **优先级**：影响稳定性、安全、多人协作的优先还；纯代码风格可延后。
- **何时重构**：有明确业务需求要改这块、或故障/缺陷频繁、或新人要接手时，结合需求一起重构并加测试；避免为重构而重构。
- **何时先扛**：业务压力大、人手紧、模块稳定且动得少时，可先文档化、加防护（测试、监控），排期再还债；避免在关键路径上大动。

*以上覆盖高可用、高并发、微服务、分布式、MQ、缓存、To B 多租户与权限、技术选型与落地、软技能等，可作为架构师与 To B 方向面试准备。*`,
    },
    readTime: 25,
  },
]
