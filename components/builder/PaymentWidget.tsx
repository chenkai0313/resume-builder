'use client'

import { useState } from 'react'

const ALIPAY_QR = 'http://babayimg.schg.xyz/pay/36d383a601abba60466147f1aab2cc81.jpg'
const WECHAT_QR = 'http://babayimg.schg.xyz/pay/413a11aa2e6054239b0b180e88daece5.jpg'
const EMAIL = 'ckck0313@gmail.com'

export default function PaymentWidget() {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="fixed right-4 top-1/2 -translate-y-1/2 z-50"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className={[
          'relative flex items-center transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]',
          hovered ? 'translate-x-0' : 'translate-x-[calc(100%-3rem)]',
        ].join(' ')}
      >
        {/* ─── Tab: always visible ─── */}
        <div className="relative order-1 shrink-0 w-12 h-48 flex flex-col items-center justify-center gap-2 cursor-pointer rounded-l-2xl bg-gradient-to-b from-amber-600/90 via-amber-500/90 to-orange-600/90 shadow-[0_8px_32px_rgba(217,119,6,0.3)] border border-amber-400/20 group">
          {/* Coffee cup icon */}
          <svg
            className="w-5 h-5 text-white/90 group-hover:scale-110 transition-transform duration-300"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
            <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8Z" />
            <line x1="6" y1="2" x2="6" y2="4" />
            <line x1="10" y1="2" x2="10" y2="4" />
            <line x1="14" y1="2" x2="14" y2="4" />
          </svg>

          {/* Steam animation */}
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 flex gap-[3px] opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <span className="w-[2px] h-3 rounded-full bg-white/40 animate-[steam_2s_ease-out_infinite]" />
            <span className="w-[2px] h-2 rounded-full bg-white/30 animate-[steam_2s_ease-out_0.4s_infinite]" />
            <span className="w-[2px] h-2.5 rounded-full bg-white/35 animate-[steam_2s_ease-out_0.8s_infinite]" />
          </div>

        </div>

        {/* ─── Content panel ─── */}
        <div
          className={[
            'order-0 overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]',
            hovered
              ? 'max-w-[360px] opacity-100'
              : 'max-w-0 opacity-0',
          ].join(' ')}
        >
          <div className="relative bg-card/95 backdrop-blur-xl border border-amber-400/15 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.4),0_0_0_1px_rgba(217,119,6,0.08)] mr-[-1px]">
            {/* Subtle top glow */}
            <div className="absolute inset-x-0 -top-px h-8 bg-gradient-to-b from-amber-400/10 to-transparent rounded-t-2xl pointer-events-none" />

            <div className="p-5 space-y-4">
              {/* QR Codes - stacked vertically */}
              <div className="flex flex-col items-center gap-4">
                {[
                  { src: ALIPAY_QR, label: '支付宝', delay: '0ms' },
                  { src: WECHAT_QR, label: '微信', delay: '100ms' },
                ].map((qr) => (
                  <div
                    key={qr.label}
                    className={[
                      'flex flex-col items-center gap-1.5 transition-all duration-500',
                      hovered ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0',
                    ].join(' ')}
                    style={{ transitionDelay: qr.delay }}
                  >
                    <div className="relative group/qr">
                      <div className="absolute -inset-1.5 bg-gradient-to-br from-amber-400/20 to-orange-500/20 rounded-xl blur-sm opacity-0 group-hover/qr:opacity-100 transition-opacity duration-300" />
                      <img
                        src={qr.src}
                        alt={`${qr.label}打赏`}
                        className="relative w-[280px] h-[280px] rounded-xl border border-amber-400/20 object-contain bg-amber-50/5 backdrop-blur-sm shadow-lg"
                      />
                    </div>
                    <span className="text-[11px] font-medium text-amber-400/80 tracking-wider">
                      {qr.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div className="relative flex items-center gap-3">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-amber-400/20 to-transparent" />
                <svg className="w-4 h-4 text-amber-400/40 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
                  <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8Z" />
                </svg>
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-amber-400/20 to-transparent" />
              </div>

              {/* Text */}
              <div
                className="space-y-2 text-center transition-all duration-500 delay-150"
                style={{
                  transitionDelay: hovered ? '150ms' : '0ms',
                  transform: hovered ? 'translateY(0)' : 'translateY(4px)',
                  opacity: hovered ? 1 : 0,
                }}
              >
                <p className="text-sm font-medium text-foreground/90 tracking-wide">
                  开发不易，请作者喝杯咖啡<br/>后续不断更新简历模版 ☕
                </p>
                <p className="text-[11px] text-muted-foreground/70 leading-relaxed">
                  有什么问题反馈，请 email 作者
                </p>
                <a
                  href={`mailto:${EMAIL}`}
                  className="inline-block text-[11px] text-amber-400/80 hover:text-amber-300 transition-colors font-mono tracking-tight"
                >
                  {EMAIL}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Steam animation keyframes injected once */}
      <style jsx>{`
        @keyframes steam {
          0%   { transform: translateY(0) scaleX(1); opacity: 0.6; }
          50%  { transform: translateY(-8px) scaleX(0.6); opacity: 0.3; }
          100% { transform: translateY(-16px) scaleX(0.3); opacity: 0; }
        }
      `}</style>
    </div>
  )
}
