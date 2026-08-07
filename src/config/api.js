/**
 * ════════════════════════════════════════════════════════════════
 * HINDUSTAN PROJECTS — FRONTEND API & ENVIRONMENT CONFIGURATION
 * Centralized endpoint URLs, admin headers, and corporate details
 * ════════════════════════════════════════════════════════════════
 */

export const getApiBaseUrl = () => {
  if (import.meta.env.VITE_API_BASE_URL !== undefined && import.meta.env.VITE_API_BASE_URL !== '') {
    return import.meta.env.VITE_API_BASE_URL;
  }
  if (typeof window === 'undefined') return 'http://localhost:5000';

  const hostname = window.location.hostname;
  const protocol = window.location.protocol;
  const port = window.location.port;

  // Running via Vite Dev Server (e.g., http://localhost:5173)
  if (port === '5173') {
    return `${protocol}//${hostname}:5000`;
  }
  
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return port === '5000' ? '' : 'http://localhost:5000';
  }

  // Production VPS (Domain or direct IP access via Express/Nginx)
  return '';
};

export const API_BASE_URL = getApiBaseUrl();

export const ADMIN_API_KEY = import.meta.env.VITE_ADMIN_API_KEY || 'hipro_admin_vps_key_99201';

export const CORPORATE_EMAIL = 'industrial@hindustanprojects.in';

export const HELPLINE_PHONE = '+91 75970 00601';

export const getAdminAuthHeader = () => {
  const token = localStorage.getItem('hipro_admin_key') || ADMIN_API_KEY;
  return {
    'x-admin-key': token,
    'Content-Type': 'application/json'
  };
};
