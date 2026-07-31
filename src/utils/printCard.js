/**
 * 1:1 Exact Visual Print Engine for Vendor Dashboard & Smart PVC ID Cards
 * Preserves exact CR80 Front & Back Cards, colors, logos, signature, and layout 100% as rendered on screen.
 */
export function printCard(cardElementId, title = 'Hindustan Projects - Empanelment Card') {
  const element = document.getElementById(cardElementId);
  if (!element) {
    window.print();
    return;
  }

  // Clone exact element HTML
  const cardHtml = element.innerHTML;

  // Get or create hidden iframe
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

          html, body {
            margin: 0;
            padding: 0;
            background-color: #ffffff !important;
            font-family: 'Plus Jakarta Sans', Arial, sans-serif;
            width: 100%;
            height: 100%;
          }

          body {
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 30px 15px;
          }

          /* Hide control buttons or search inputs during print */
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
        <div style="display: flex; gap: 2rem; justify-content: center; align-items: flex-start; flex-wrap: wrap; margin: 0 auto; width: 100%;">
          ${cardHtml}
        </div>
      </body>
    </html>
  `);
  doc.close();

  // Trigger print after iframe renders
  setTimeout(() => {
    try {
      iframe.contentWindow.focus();
      iframe.contentWindow.print();
    } catch {
      window.print();
    }
  }, 350);
}
