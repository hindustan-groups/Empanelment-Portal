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

  // Direct IP access or Vite Dev Server (e.g., http://187.127.142.137:5173 or localhost:5173)
  if (port === '5173' || (hostname !== 'localhost' && hostname !== '127.0.0.1' && /^\d+\.\d+\.\d+\.\d+$/.test(hostname))) {
    return `${protocol}//${hostname}:5000`;
  }
  
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return 'http://localhost:5000';
  }

  // Relative path for Production domain (e.g. empanelment.hindustanprojects.in)
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
