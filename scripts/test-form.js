/**
 * ════════════════════════════════════════════════════════════════
 * HINDUSTAN PROJECTS — UNIVERSAL FORM TESTER (LOCAL & LIVE)
 * Usage:
 *   Local Test : npm run test:form
 *   Live Test  : npm run test:form https://api.yourdomain.com
 *                OR TARGET_URL=https://... npm run test:form
 * ════════════════════════════════════════════════════════════════
 */

import http from 'http';
import https from 'https';
import { URL } from 'url';

// Target URL resolution (CLI arg > ENV var > Local default)
const cliTarget = process.argv[2];
const envTarget = process.env.TARGET_URL;
const rawTargetUrl = cliTarget || envTarget || 'http://localhost:5000';

// Format target URL to endpoint
let targetEndpoint = rawTargetUrl;
if (!targetEndpoint.endsWith('/api/empanelment/submit')) {
  targetEndpoint = targetEndpoint.replace(/\/+$/, '') + '/api/empanelment/submit';
}

const parsedUrl = new URL(targetEndpoint);
const isHttps = parsedUrl.protocol === 'https:';
const clientModule = isHttps ? https : http;

// Generate dynamic test vendor data
const randomNum = Math.floor(1000 + Math.random() * 9000);
const testPayload = {
  category: 'civil',
  primaryRole: 'contractor',
  companyName: `Apex Infra Solutions Pvt Ltd (Test ${randomNum})`,
  entityType: 'pvt_ltd',
  estYear: '2018',
  contactName: 'Rajesh Kumar Sharma',
  designation: 'Managing Director',
  email: `rajesh.test${randomNum}@apexinfra.com`,
  phone: '9876543210',
  address: 'Plot 45, Sector 62, Industrial Area',
  city: 'Noida',
  state: 'Uttar Pradesh',
  pincode: '201301',
  gstin: `09AAACA${randomNum}B1Z5`,
  pan: `AAACA${randomNum}B`,
  msmeNo: `UDYAM-UP-00-${randomNum}`,
  bankAccount: `9180200${randomNum}5432`,
  bankName: 'HDFC Bank Ltd',
  ifsc: 'HDFC0000123',
  turnover2023: '45000000',
  turnover2024: '68000000',
  turnover2025: '85000000',
  largestOrder: '25000000',
  existingEmpanels: 'CPWD, NBCC, UP PWD',
  signatoryName: 'Rajesh Kumar Sharma'
};

console.log('\n🚀 ========================================================');
console.log(`   HINDUSTAN PROJECTS — FORM TESTER (${isHttps ? '🔒 LIVE HTTPS' : '💻 LOCAL HTTP'})`);
console.log('========================================================\n');

console.log(`🎯 Target API Endpoint: ${targetEndpoint}`);
console.log('\n📋 Generated Test Form Payload:');
console.log('--------------------------------------------------------');
console.log(`🏢 Company Name   : ${testPayload.companyName}`);
console.log(`👤 Contact Person : ${testPayload.contactName} (${testPayload.designation})`);
console.log(`📧 Email          : ${testPayload.email}`);
console.log(`📞 Phone          : ${testPayload.phone}`);
console.log(`🏛️ GSTIN          : ${testPayload.gstin}`);
console.log(`💳 PAN            : ${testPayload.pan}`);
console.log(`💰 2025 Turnover  : ₹${testPayload.turnover2025}`);
console.log('--------------------------------------------------------\n');

console.log(`⏳ Submitting Form Data to Server (${parsedUrl.hostname})...`);

const postData = JSON.stringify(testPayload);

const options = {
  hostname: parsedUrl.hostname,
  port: parsedUrl.port || (isHttps ? 443 : 80),
  path: parsedUrl.pathname + parsedUrl.search,
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData)
  }
};

const req = clientModule.request(options, (res) => {
  let responseData = '';

  res.on('data', (chunk) => {
    responseData += chunk;
  });

  res.on('end', () => {
    console.log(`\n📡 HTTP Response Status: ${res.statusCode} ${res.statusMessage}`);

    try {
      const json = JSON.parse(responseData);
      if (json.success) {
        console.log('\n✅ ========================================================');
        console.log('   SUCCESS! Application Submitted Successfully');
        console.log('========================================================');
        console.log(`📌 Tracking ID    : ${json.trackingId}`);
        console.log(`🔐 SHA-256 Hash   : ${json.hashSignature}`);
        console.log(`📅 Timestamp      : ${json.submittedAt || new Date().toISOString()}`);
        console.log('========================================================\n');
      } else {
        console.error('\n❌ Submission Failed Error:', json.error || json);
      }
    } catch (e) {
      console.log('\n📄 Raw Server Response:', responseData);
    }
  });
});

req.on('error', (err) => {
  console.error(`\n❌ Failed to connect to server: ${targetEndpoint}`);
  console.error('   Details:', err.message);
});

req.write(postData);
req.end();
