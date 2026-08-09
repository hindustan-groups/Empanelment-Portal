/**
 * ─────────────────────────────────────────────────────────────────
 * SITE CONFIG SERVICE — Shared One-Shot Cache
 * Prevents multiple components (Header, Footer, ContactPage, etc.)
 * from each firing separate API calls and hitting the 429 rate limit.
 *
 * Only 1 fetch fires per session. Subsequent calls get the same
 * in-memory result immediately. localStorage is the offline fallback.
 * ─────────────────────────────────────────────────────────────────
 */

import { API_BASE_URL } from './api';

const LS_KEY = 'hipro_site_config';
const SESSION_KEY = 'hipro_site_config_fetched';

// In-memory promise — shared across all consumers in the same page lifecycle
let _fetchPromise = null;

/**
 * Load site config — returns the merged config object.
 * Reads localStorage immediately (for instant render), then fetches
 * from VPS once per session and updates localStorage + memory.
 *
 * @returns {Promise<object>} resolved config
 */
export function loadSiteConfig() {
  // If already fetched this session, return cached memory promise
  if (_fetchPromise) return _fetchPromise;

  // Check sessionStorage flag to avoid re-fetching on tab switches / hot reload
  // We still fetch once per hard-page-load, but not on every re-render
  _fetchPromise = (async () => {
    // 1. Start with localStorage as the baseline (instant)
    let base = {};
    try {
      const saved = localStorage.getItem(LS_KEY);
      if (saved) base = JSON.parse(saved);
    } catch {}

    // 2. Fetch from VPS (one time per page load lifecycle)
    try {
      const res = await fetch(`${API_BASE_URL}/api/empanelment/public/site-config`, {
        // Cache the response for 5 minutes at the browser level
        cache: 'default',
        headers: { 'Cache-Control': 'max-age=300' }
      });
      if (res.ok) {
        const data = await res.json();
        if (data && data.success && data.data && Object.keys(data.data).length > 0) {
          const merged = { ...base, ...data.data };
          try { localStorage.setItem(LS_KEY, JSON.stringify(merged)); } catch {}
          return merged;
        }
      }
    } catch {
      // Network error — return whatever localStorage had
    }

    return base;
  })();

  return _fetchPromise;
}

/**
 * Synchronously read from localStorage only (for useState initializer).
 * @returns {object}
 */
export function getSiteConfigSync() {
  try {
    return JSON.parse(localStorage.getItem(LS_KEY) || '{}');
  } catch {
    return {};
  }
}
