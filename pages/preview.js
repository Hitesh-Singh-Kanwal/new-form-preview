'use client'

import { useEffect, useRef, useState } from 'react'

export default function Preview() {
  const [html, setHtml] = useState(null)
  const iframeRef = useRef(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const stored = sessionStorage.getItem('previewFormHtml')
    setHtml(stored)
  }, [])

  const openStandalone = () => {
    const w = window.open()
    if (!w) return
    w.document.open()
    w.document.write(html || '<p>No HTML provided</p>')
    w.document.close()
  }

  if (html === null) {
    return <div className="min-h-screen p-6">Loading preview…</div>
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-medium">Preview</h2>
          <div className="flex gap-2">
            <button
              onClick={() => {
                sessionStorage.removeItem('previewFormHtml')
                window.location.href = '/'
              }}
              className="px-3 py-1 bg-red-500 text-white rounded"
            >
              Back
            </button>
            <button onClick={openStandalone} className="px-3 py-1 bg-gray-200 rounded">
              Open Standalone
            </button>
          </div>
        </div>

        <div className="border rounded overflow-hidden">
          <iframe
            ref={iframeRef}
            title="form-preview"
            srcDoc={html || '<p>No HTML provided</p>'}
            sandbox="allow-scripts allow-forms allow-same-origin"
            className="w-full h-[80vh]"
          />
        </div>
      </div>
    </div>
  )
}

