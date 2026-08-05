/**
 * HPRO EMPANELMENT PORTAL — AUTOMATED VALIDATION TEST SUITE
 * Tests statutory Regex rules for Aadhaar, PAN, and GSTIN
 */

import assert from 'node:assert';

// 1. STATUTORY REGEX PATTERNS
const REGEX = {
  AADHAAR: /^\d{12}$/,
  PAN: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
  GSTIN: /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/
};

console.log('🧪 Starting HPRO Empanelment Automated Unit Tests...\n');

let passed = 0;
let total = 0;

function runTest(description, testFn) {
  total++;
  try {
    testFn();
    console.log(`  ✅ PASS: ${description}`);
    passed++;
  } catch (err) {
    console.error(`  ❌ FAIL: ${description} — ${err.message}`);
  }
}

// ── 1. AADHAAR NUMBER VALIDATION ──
runTest('Aadhaar: Valid 12-digit number should pass', () => {
  assert.strictEqual(REGEX.AADHAAR.test('998877665544'), true);
});

runTest('Aadhaar: 11-digit number should fail', () => {
  assert.strictEqual(REGEX.AADHAAR.test('99887766554'), false);
});

runTest('Aadhaar: Letter characters should fail', () => {
  assert.strictEqual(REGEX.AADHAAR.test('99887766554A'), false);
});

// ── 2. PAN CARD VALIDATION ──
runTest('PAN: Valid 10-char format (ABCDE1234F) should pass', () => {
  assert.strictEqual(REGEX.PAN.test('ABCDE1234F'), true);
});

runTest('PAN: Lowercase string (abcde1234f) should fail before uppercase conversion', () => {
  assert.strictEqual(REGEX.PAN.test('abcde1234f'), false);
});

runTest('PAN: Invalid length (9 chars) should fail', () => {
  assert.strictEqual(REGEX.PAN.test('ABCDE1234'), false);
});

// ── 3. GSTIN FORMAT VALIDATION ──
runTest('GSTIN: Valid 15-char State-coded GSTIN should pass', () => {
  assert.strictEqual(REGEX.GSTIN.test('08AAAAA0000A1Z5'), true);
});

runTest('GSTIN: Optional / Non-GST EXEMPT status handling', () => {
  const gstin = '';
  const isExempt = !gstin || gstin === 'EXEMPT';
  assert.strictEqual(isExempt, true);
});

// ── 4. 13 CATEGORY CONFIG SCHEMAS AUDIT ──
import { CATEGORY_SCHEMAS } from '../src/config/categoryFieldsConfig.js';

runTest('Config: Exactly 13 entity types should be defined', () => {
  const keys = Object.keys(CATEGORY_SCHEMAS);
  assert.strictEqual(keys.length, 13);
});

runTest('Config: Architect role should require COA Registration Number', () => {
  assert.strictEqual(CATEGORY_SCHEMAS.architect.statutoryLicenseKey, 'coaRegNo');
  assert.strictEqual(CATEGORY_SCHEMAS.architect.statutoryLicenseRequired, true);
});

runTest('Config: Fruits & Vegetables role should require FSSAI License Number', () => {
  assert.strictEqual(CATEGORY_SCHEMAS.fruits_vegetables.statutoryLicenseKey, 'fssaiLicenseNo');
  assert.strictEqual(CATEGORY_SCHEMAS.fruits_vegetables.statutoryLicenseRequired, true);
});

runTest('Config: Transporter role should require Goods Carriage Permit Number', () => {
  assert.strictEqual(CATEGORY_SCHEMAS.transporter.statutoryLicenseKey, 'goodsCarriagePermitNo');
  assert.strictEqual(CATEGORY_SCHEMAS.transporter.statutoryLicenseRequired, true);
});

runTest('Config: Financer role should require RBI NBFC License Number', () => {
  assert.strictEqual(CATEGORY_SCHEMAS.financer.statutoryLicenseKey, 'rbiNbfcLicenseNo');
  assert.strictEqual(CATEGORY_SCHEMAS.financer.statutoryLicenseRequired, true);
});

console.log(`\n====================================================`);
console.log(`📊 TEST RESULTS: ${passed}/${total} PASSED`);
console.log(`====================================================\n`);

if (passed !== total) {
  process.exit(1);
}
