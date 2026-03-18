/**
 * Base API URL — reads from VITE_API_URL env var.
 * Dev default: http://localhost:5000/api
 *
 * Set in frontend/.env:
 *   VITE_API_URL=http://localhost:5000/api
 *
 * Set in frontend/.env.production before deployment:
 *   VITE_API_URL=https://your-production-domain.com/api
 */
const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:5000/api';

export default API_BASE;
