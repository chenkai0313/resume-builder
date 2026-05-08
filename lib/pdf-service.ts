const PDF_API = process.env.NODE_ENV === 'development'
  ? 'http://127.0.0.1:8088/api/v1/pdf/generate'
  : 'https://sitehub.schg.xyz/api/v1/pdf/generate'

function inlineComputedStyles(node: HTMLElement) {
  // 跳过非 Element 节点
  if (!(node instanceof HTMLElement)) return

  const computed = window.getComputedStyle(node)
  // 将计算后的样式内联到 style 属性
  for (let i = 0; i < computed.length; i++) {
    const prop = computed[i]
    const val = computed.getPropertyValue(prop)
    // 跳过 inherit 值，保持层叠
    if (val && val !== 'inherit') {
      node.style.setProperty(prop, val, computed.getPropertyPriority(prop) || undefined)
    }
  }

  // 递归子节点
  for (const child of node.children) {
    inlineComputedStyles(child as HTMLElement)
  }
}

export async function generatePDF(element: HTMLElement): Promise<Blob> {
  // 收集页面样式
  const cssParts: string[] = []
  for (let i = 0; i < document.styleSheets.length; i++) {
    const sheet = document.styleSheets[i]
    try {
      const rules = sheet.cssRules || sheet.rules
      for (let j = 0; j < rules.length; j++) {
        cssParts.push(rules[j].cssText)
      }
    } catch {
      // 跨域样式表跳过
    }
  }
  document.querySelectorAll('style').forEach((el) => {
    const text = el.textContent
    if (text && !cssParts.some(c => text.includes(c.substring(0, 40)))) {
      cssParts.push(text)
    }
  })

  // 克隆 + 内联计算样式（保证 PDF 渲染与预览一致）
  const clone = element.cloneNode(true) as HTMLElement
  clone.style.width = ''
  inlineComputedStyles(clone)

  const html = '<!DOCTYPE html><html><head><meta charset="utf-8"><style>' +
    cssParts.join('\n') +
    '</style></head><body>' +
    clone.outerHTML +
    '</body></html>'

  console.log(`[PDF] CSS rules: ${cssParts.length}, HTML size: ${html.length}bytes`)

  // 调用 Go 服务
  const res = await fetch(PDF_API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ html }),
  })

  const buf = await res.arrayBuffer()
  const preview = new Uint8Array(buf, 0, Math.min(buf.byteLength, 100))
  const head = new TextDecoder().decode(preview)

  if (head.trimStart().startsWith('{')) {
    const text = new TextDecoder().decode(buf)
    let errMsg: string
    try {
      const json = JSON.parse(text)
      errMsg = json.message || json.error || text
    } catch {
      errMsg = text
    }
    throw new Error(errMsg)
  }

  return new Blob([buf], { type: 'application/pdf' })
}

export function downloadPDF(blob: Blob, filename = 'resume.pdf') {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
