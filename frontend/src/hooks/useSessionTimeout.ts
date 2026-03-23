import { useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import API_BASE from '../config/api';

const TIMEOUT_MS = 2 * 60 * 60 * 1000; // 2 hours

/**
 * Monitors user activity inside the admin dashboard.
 * After TIMEOUT_MS of inactivity, logs the admin out and redirects to /admin/login.
 */
export const useSessionTimeout = () => {
  const navigate = useNavigate();
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const logout = useCallback(async () => {
    try {
      await fetch(`${API_BASE}/admin/auth/logout`, { method: 'POST', credentials: 'include' });
    } catch { /* ignore */ }
    navigate('/admin/login', { replace: true });
  }, [navigate]);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(logout, TIMEOUT_MS);
  }, [logout]);

  useEffect(() => {
    const events = ['mousemove', 'keydown', 'mousedown', 'touchstart', 'scroll'];
    events.forEach((e) => window.addEventListener(e, resetTimer, { passive: true }));
    resetTimer(); // start the timer on mount

    return () => {
      events.forEach((e) => window.removeEventListener(e, resetTimer));
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [resetTimer]);
};
