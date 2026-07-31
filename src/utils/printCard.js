/**
 * Bulletproof Hidden Iframe Print Engine for Live Servers & All Browsers
 * Guarantees 1:1 full color card printing without popup blocks or blank pages.
 */
export function printCard(cardElementId, title = 'Empanelment Card') {
  const element = document.getElementById(cardElementId);
  if (!element) {
    window.print();
    return;
  }

  // Clone element content
  const cardHtml = element.innerHTML;

  // 1. Get or create hidden print iframe
  let iframe = document.getElementById('hipro-print-iframe');
  if (!iframe) {
    iframe = document.createElement('iframe');
    iframe.id = 'hipro-print-iframe';
    iframe.style.position = 'fixed';
    iframe.style.right = '0';
    iframe.style.bottom = '0';
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = '0';
    iframe.style.visibility = 'hidden';
    document.body.appendChild(iframe);
  }

  const doc = iframe.contentWindow.document;
  doc.open();
  doc.write(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <title>${title}</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
          
          * {
            box-sizing: border-box;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
          }

          body {
            font-family: 'Plus Jakarta Sans', -apple-system, sans-serif;
            background-color: #ffffff !important;
            color: #0F172A !important;
            margin: 0;
            padding: 24px;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
          }

          .print-card-wrapper {
            width: 100%;
            max-width: 580px;
            background: #ffffff !important;
            border: 2px solid #0047AB !important;
            border-radius: 24px !important;
            padding: 32px !important;
            box-shadow: 0 10px 30px rgba(0, 71, 171, 0.1) !important;
            position: relative !important;
            overflow: hidden !important;
            text-align: center !important;
            margin: 0 auto;
          }

          /* Force high contrast dark text across all elements */
          .print-card-wrapper, 
          .print-card-wrapper * {
            color: #0F172A !important;
          }

          /* Top Red/Navy Decorative Banner */
          .print-card-wrapper .bg-gradient-to-r {
            background: linear-gradient(90deg, #ED1C24 0%, #0047AB 50%, #ED1C24 100%) !important;
            height: 12px !important;
            position: absolute !important;
            top: 0 !important;
            left: 0 !important;
            right: 0 !important;
            display: block !important;
          }

          /* Brand Colors */
          .print-card-wrapper .text-\\[\\#0047AB\\], 
          .print-card-wrapper .text-blue-600, 
          .print-card-wrapper .text-blue-400 {
            color: #0047AB !important;
          }

          .print-card-wrapper .text-\\[\\#ED1C24\\], 
          .print-card-wrapper .text-red-500 {
            color: #ED1C24 !important;
          }

          .print-card-wrapper .text-slate-400,
          .print-card-wrapper .text-slate-500 {
            color: #475569 !important;
          }

          /* Circle Checkmark Icon */
          .print-card-wrapper .bg-emerald-100, 
          .print-card-wrapper .bg-emerald-950,
          .print-card-wrapper .dark\\:bg-emerald-950 {
            background-color: #D1FAE5 !important;
            color: #059669 !important;
          }

          /* Reference Code & Details Boxes */
          .print-card-wrapper .bg-slate-50, 
          .print-card-wrapper .dark\\:bg-slate-800\\/80 {
            background-color: #F8FAFC !important;
            border: 1px solid #CBD5E1 !important;
          }

          .print-card-wrapper .bg-slate-100, 
          .print-card-wrapper .dark\\:bg-slate-800\\/50 {
            background-color: #F1F5F9 !important;
            border: 1px solid #E2E8F0 !important;
          }

          .print-card-wrapper .bg-amber-100,
          .print-card-wrapper .dark\\:bg-amber-950 {
            background-color: #FEF3C7 !important;
            color: #92400E !important;
          }

          /* Layout utilities */
          .print-card-wrapper .flex { display: flex !important; }
          .print-card-wrapper .justify-between { justify-content: space-between !important; }
          .print-card-wrapper .justify-center { justify-content: center !important; }
          .print-card-wrapper .items-center { align-items: center !important; }
          .print-card-wrapper .text-left { text-align: left !important; }
          .print-card-wrapper .text-right { text-align: right !important; }
          .print-card-wrapper .text-center { text-align: center !important; }
          .print-card-wrapper .uppercase { text-transform: uppercase !important; }
          .print-card-wrapper .capitalize { text-transform: capitalize !important; }
          .print-card-wrapper .font-mono { font-family: monospace !important; }
          .print-card-wrapper .font-black { font-weight: 900 !important; }
          .print-card-wrapper .font-bold { font-weight: 700 !important; }
          .print-card-wrapper .space-y-2 > * + * { margin-top: 0.5rem !important; }
          .print-card-wrapper .space-y-3 > * + * { margin-top: 0.75rem !important; }
          .print-card-wrapper .space-y-4 > * + * { margin-top: 1rem !important; }

          /* Hide action buttons during print */
          .no-print, button, form {
            display: none !important;
          }

          @page {
            size: A4 portrait;
            margin: 10mm;
          }
        </style>
      </head>
      <body>
        <div class="print-card-wrapper">
          ${cardHtml}
        </div>
      </body>
    </html>
  `);
  doc.close();

  // Trigger print cleanly
  setTimeout(() => {
    try {
      iframe.contentWindow.focus();
      iframe.contentWindow.print();
    } catch (err) {
      window.print();
    }
  }, 300);
}
