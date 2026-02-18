'use client'

import { useRouter } from 'next/router'
import { useEffect } from 'react'

function base64DecodeUnicode(str) {
  try {
    // handle spaces turned from '+' in URLs by replacing them back
    const cleaned = String(str).replace(/ /g, '+')
    return decodeURIComponent(escape(atob(cleaned)))
  } catch (e) {
    // fallback if decoding fails
    try {
      const cleaned = String(str).replace(/ /g, '+')
      return atob(cleaned)
    } catch (err) {
      return ''
    }
  }
}

export default function Standalone() {
  const router = useRouter()

  useEffect(() => {
    if (!router.isReady) return
    const { html } = router.query
    if (!html) {
      document.body.innerHTML = '<p>No HTML provided</p>'
      return
    }

    let decoded = ''
    try {
      decoded = base64DecodeUnicode(Array.isArray(html) ? html[0] : html)
    } catch (e) {
      decoded = ''
    }

    // Replace the current document with decoded HTML so scripts run in top-level context
    if (decoded) {
      document.open()
      document.write(decoded)
      document.close()
    } else {
      document.body.innerHTML = '<p>Failed to decode HTML</p>'
    }
  }, [router])

  return null
}

