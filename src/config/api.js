/**
 * ════════════════════════════════════════════════════════════════
 * HINDUSTAN PROJECTS — FRONTEND API & ENVIRONMENT CONFIGURATION
 * Centralized endpoint URLs, admin headers, and corporate details
 * ════════════════════════════════════════════════════════════════
 */

const isLocalHost = typeof window !== 'undefined' && (
  window.location.hostname === 'localhost' ||
  window.location.hostname === '127.0.0.1' ||
  window.location.hostname.startsWith('192.168.') ||
  window.location.hostname.startsWith('10.') ||
  window.location.port === '5173'
);

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL !== undefined 
  ? import.meta.env.VITE_API_BASE_URL 
  : (isLocalHost ? 'http://localhost:5000' : '');

export const ADMIN_API_KEY = import.meta.env.VITE_ADMIN_API_KEY || 'hipro_admin_vps_key_99201';

export const CORPORATE_EMAIL = 'empanelment@hindustanprojects.in';

export const HELPLINE_PHONE = '+91 75970 00601';

export const getAdminAuthHeader = () => {
  const token = localStorage.getItem('hipro_admin_key') || ADMIN_API_KEY;
  return {
    'x-admin-key': token,
    'Content-Type': 'application/json'
  };
};
