import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAdminSession, logoutAdmin } from "../services/api";

export const useAdminAuth = () => {
  const navigate = useNavigate();
  const [adminEmail, setAdminEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await getAdminSession();
        setAdminEmail(response.data.data?.email || "");
      } catch (err: any) {
        if (err.response?.status === 401) {
          navigate("/admin/login", { replace: true });
        } else {
          setError(err.response?.data?.message || "Failed to verify session");
        }
      } finally {
        setLoading(false);
      }
    };

    void checkSession();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await logoutAdmin();
    } finally {
      navigate("/admin/login", { replace: true });
    }
  };

  return {
    adminEmail,
    loading,
    error,
    handleLogout,
  };
};
