/**
 * Utility to print any card element in 1:1 full color across all web browsers
 * (Chrome, Edge, Firefox, Safari) without blank pages or missing backgrounds.
 */
export function printCard(cardElementId, title = 'Empanelment Card') {
  const element = document.getElementById(cardElementId);
  if (!element) {
    window.print();
    return;
  }

  // Clone element content
  const cardHtml = element.innerHTML;

  // Open dedicated print window
  const printWindow = window.open('', '_blank', 'width=800,height=900');

  if (!printWindow) {
    // Fallback if popup blocker is active
    window.print();
    return;
  }

  printWindow.document.write(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <title>${title}</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=Outfit:wght@600;700;800;900&display=swap');
          
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
            padding: 40px 20px;
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
          }

          /* Top Red/Navy Decorative Bar */
          .print-card-wrapper .bg-gradient-to-r {
            background: linear-gradient(90deg, #ED1C24 0%, #0047AB 50%, #ED1C24 100%) !important;
            height: 12px !important;
            position: absolute !important;
            top: 0 !important;
            left: 0 !important;
            right: 0 !important;
          }

          /* Text colors */
          .text-\\[\\#0047AB\\], .text-blue-600, .text-blue-400 {
            color: #0047AB !important;
          }
          .text-\\[\\#ED1C24\\], .text-red-500 {
            color: #ED1C24 !important;
          }
          .text-slate-900 { color: #0F172A !important; }
          .text-slate-600, .text-slate-500 { color: #475569 !important; }
          .text-slate-400 { color: #94A3B8 !important; }
          
          /* Badges and Boxes */
          .bg-emerald-100, .bg-emerald-950 {
            background-color: #D1FAE5 !important;
            color: #059669 !important;
          }
          .bg-slate-50, .bg-slate-800\\/80 {
            background-color: #F8FAFC !important;
            border-color: #CBD5E1 !important;
          }
          .bg-slate-100, .bg-slate-800\\/50 {
            background-color: #F1F5F9 !important;
            border-color: #E2E8F0 !important;
          }
          .bg-amber-100 {
            background-color: #FEF3C7 !important;
            color: #92400E !important;
          }

          /* Hide action buttons during print */
          .no-print, button, form input, form button {
            display: none !important;
          }

          @page {
            size: A4 portrait;
            margin: 10mm;
          }
        </style>
      </head>
      <body>
        <div className="print-card-wrapper">
          ${cardHtml}
        </div>
      </body>
    </html>
  `);

  printWindow.document.close();
  printWindow.focus();

  // Trigger print after styles load
  setTimeout(() => {
    printWindow.print();
    printWindow.close();
  }, 400);
}
