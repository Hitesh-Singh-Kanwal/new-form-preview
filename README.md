# HTML Form Preview

Simple Next.js + Tailwind app to paste HTML for a form and preview it in an iframe.

How to use:
- Run `npm install` then `npm run dev`.
- Open `http://localhost:3000`.
- Paste your HubSpot form HTML (include any tracking scripts) into the textarea and click "Open Preview".
- The preview page renders the pasted HTML inside a sandboxed iframe so you can submit and test analytics.

Notes:
- If your HubSpot analytics require the page to be same-origin or special permissions, use "Open in New Window" or "Open Standalone" from the preview page.

