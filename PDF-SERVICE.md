# PDF 生成服务接口文档 (Go)

## 接口

```
POST /api/pdf/generate
```

## Request

`Content-Type: application/json`

```json
{
  "html": "<!DOCTYPE html><html>...</html>"
}
```

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `html` | string | 是 | 完整 HTML 文档，含 `<style>` 和 `<body>` |

> 前端发送的是完整 HTML 字符串 — 预览 DOM 的 `outerHTML` + 页面所有 `<style>` 合并。

## Response

**成功：** `200 OK`，`Content-Type: application/pdf`
Body 为 PDF 二进制流，浏览器直接触发下载

**失败：**
```json
{
  "error": "错误描述"
}
```

## 依赖包

```go
import (
    "context"
    "encoding/json"
    "log"
    "net/http"
    "time"

    "github.com/chromedp/chromedp"
)
```
[
]()安装：

```bash
go get github.com/chromedp/chromedp
```

## 核心实现

```go
package main

import (
    "context"
    "encoding/json"
    "log"
    "net/http"
    "time"

    "github.com/chromedp/chromedp"
)

type GenerateRequest struct {
    HTML string `json:"html"`
}

type GenerateResponse struct {
    Error string `json:"error,omitempty"`
}

func GeneratePDF(w http.ResponseWriter, r *http.Request) {
    var req GenerateRequest
    if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
        w.WriteHeader(400)
        json.NewEncoder(w).Encode(GenerateResponse{Error: "invalid json"})
        return
    }
    if req.HTML == "" {
        w.WriteHeader(400)
        json.NewEncoder(w).Encode(GenerateResponse{Error: "html is required"})
        return
    }

    ctx, cancel := chromedp.NewContext(context.Background())
    defer cancel()

    ctx, cancel = context.WithTimeout(ctx, 30*time.Second)
    defer cancel()

    var pdfBuf []byte
    err := chromedp.Run(ctx,
        // 1. 先开一个空白页
        chromedp.ActionFunc(func(ctx context.Context) error {
            _, err := page.Navigate("about:blank").Do(ctx)
            return err
        }),
        // 2. 注入 HTML
        chromedp.ActionFunc(func(ctx context.Context) error {
            tree, err := page.GetFrameTree().Do(ctx)
            if err != nil {
                return err
            }
            return page.SetDocumentContent(tree.Frame.ID, req.HTML).Do(ctx)
        }),
        // 3. 等字体和 CSS 渲染完成
        chromedp.Sleep(1 * time.Second),
        // 4. 生成 PDF
        chromedp.ActionFunc(func(ctx context.Context) error {
            var err error
            pdfBuf, err = page.PrintToPDF().
                WithPrintBackground(true).
                WithPreferCSSPageSize(false).
                WithPaperWidth(210).
                WithPaperHeight(297).
                WithMarginTop(15).
                WithMarginBottom(15).
                WithMarginLeft(10).
                WithMarginRight(10).
                Do(ctx)
            return err
        }),
    )
    if err != nil {
        log.Printf("pdf generation error: %v", err)
        w.WriteHeader(500)
        json.NewEncoder(w).Encode(GenerateResponse{Error: err.Error()})
        return
    }

    w.Header().Set("Content-Type", "application/pdf")
    w.Header().Set("Content-Disposition", "attachment; filename=resume.pdf")
    w.Write(pdfBuf)
}
```

## PDF 参数说明

| 参数 | 值 | 说明 |
|------|----|------|
| `PaperWidth` | 210 | A4 宽度 (mm) |
| `PaperHeight` | 297 | A4 高度 (mm) |
| `MarginTop/Bottom` | 15 | 上下边距 (mm) |
| `MarginLeft/Right` | 10 | 左右边距 (mm) |
| `PrintBackground` | true | 打印背景色 |
| `PreferCSSPageSize` | false | 不依赖 CSS @page |

## 注意事项

1. **字体** — 服务器需要安装中文字体，推荐 Noto Sans CJK
   ```dockerfile
   # Dockerfile
   FROM chromedp/headless-shell:latest
   RUN apt-get update && apt-get install -y fonts-noto-cjk
   ```

2. **等待渲染** — `chromedp.Sleep(1 * time.Second)` 确保字体加载完毕
   如果遇到字体闪烁，可以把这个时间加到 2-3s

3. **超时** — `context.WithTimeout(ctx, 30*time.Second)` 防止请求卡死

4. **Chrome 路径** — 默认自动查找 Chrome，如需指定：
   ```go
   allocCtx, _ := chromedp.NewExecAllocator(context.Background(),
       append(chromedp.DefaultExecAllocatorOptions[:],
           exec.Allocator("CHROME_PATH")...,
       )...,
   )
   ```

5. **并发** — `chromedp.NewContext` 每次调用会自动排队，高并发场景建议上任务队列

## 前端发送的 HTML 示例

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    /* 所有页面 CSS 合并到这里 */
    *,*::before,*::after{box-sizing:border-box}
    body{margin:0;padding:40px;font-family:...}
    .bg-white{background:#fff}
    /* ... 所有 Tailwind + 自定义样式 */
  </style>
</head>
<body>
  <!-- 预览 DOM outerHTML -->
  <div id="resume-preview">
    ...
  </div>
</body>
</html>
```

> 前端发送时不需要内联计算样式，只需要页面 CSS + DOM 结构即可。
> Chrome 会像普通浏览器一样解析 CSS，包括 `oklch()` 等现代颜色函数。
