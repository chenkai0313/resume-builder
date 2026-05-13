'use client'

import { useEffect, useState } from 'react'

export default function ScriptsLoader() {
  const [consent, setConsent] = useState<string | null>(null)

  useEffect(() => {
    setConsent(localStorage.getItem('cookie-consent'))
  }, [])

  // Don't load analytics/ads scripts if user declined
  if (consent === 'declined') return null

  return (
    <>
      <script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2997084266989115"
        crossOrigin="anonymous"
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?9b959e198583587f1266dfee59545ea4";
  var s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(hm, s);
})();
`,
        }}
      />
    </>
  )
}
