'use client'

import { useState } from 'react'
import { useRouter } from 'next/router'

export default function Home() {
  const [html, setHtml] = useState('')
  const router = useRouter()

  const handlePreview = () => {
    if (typeof window === 'undefined') return
    sessionStorage.setItem('previewFormHtml', html)
    router.push('/preview')
  }

  const handleOpenWindow = () => {
    if (!html) {
      const newWindow = window.open()
      if (!newWindow) return
      newWindow.document.open()
      newWindow.document.write('<p>No HTML provided</p>')
      newWindow.document.close()
      return
    }

    try {
      // base64-encode Unicode-safe
      const encoded = btoa(unescape(encodeURIComponent(html)))
      const url = `/standalone?html=${encodeURIComponent(encoded)}`
      window.open(url, '_blank')
    } catch (e) {
      // fallback: open raw HTML in new window
      const newWindow = window.open()
      if (!newWindow) return
      newWindow.document.open()
      newWindow.document.write(html)
      newWindow.document.close()
    }
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto bg-white shadow rounded p-6">
        <h1 className="text-2xl font-semibold mb-2">Form HTML Preview</h1>
        <p className="text-sm text-gray-600 mb-4">
          Paste the HubSpot form HTML (including any tracking scripts) and click Preview.
        </p>

        <textarea
          value={html}
          onChange={(e) => setHtml(e.target.value)}
          rows={14}
          className="w-full p-3 border rounded mb-4 font-mono text-sm"
          placeholder="Paste full form HTML here..."
        />

        <div className="flex gap-3">
          <button onClick={handlePreview} className="bg-blue-600 text-white px-4 py-2 rounded">
            Open Preview
          </button>
          <button onClick={handleOpenWindow} className="bg-gray-200 px-4 py-2 rounded">
            Open in New Window
          </button>
        </div>
      </div>
    </div>
  )
}

