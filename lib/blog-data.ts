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
]
