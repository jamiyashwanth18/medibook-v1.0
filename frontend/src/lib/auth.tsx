import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

import {
  apiFetch,
  clearSessionToken,
  getSessionToken,
  setSessionToken,
  setUnauthorizedHandler,
} from "@/lib/api";

export type Role = "patient" | "doctor" | "admin";

export interface AuthUser {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  role: Role;
  is_active: boolean;
}

interface LoginResponse {
  token: string;
  user: AuthUser;
}

interface AuthContextValue {
  user: AuthUser | null;
  loading: boolean;
  message: string | null;
  login: (identifier: string, password: string) => Promise<AuthUser>;
  logout: () => Promise<void>;
  clearMessage: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    let cancelled = false;
    async function load() {
      if (!getSessionToken()) {
        setLoading(false);
        return;
      }
      try {
        const me = await apiFetch<AuthUser>("/auth/me");
        if (!cancelled) setUser(me);
      } catch {
        if (!cancelled) setUser(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    setUnauthorizedHandler(() => {
      setUser(null);
      setMessage("Your session ended. Please sign in again.");
      navigate("/login", { replace: true });
    });
    return () => setUnauthorizedHandler(null);
  }, [navigate]);

  const login = useCallback(async (identifier: string, password: string) => {
    const res = await apiFetch<LoginResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ identifier, password }),
    });
    setSessionToken(res.token);
    setUser(res.user);
    setMessage(null);
    return res.user;
  }, []);

  const logout = useCallback(async () => {
    try {
      await apiFetch("/auth/logout", { method: "POST" });
    } catch {
      // Clear locally regardless of whether the server call succeeded.
    }
    clearSessionToken();
    setUser(null);
  }, []);

  const clearMessage = useCallback(() => setMessage(null), []);

  return (
    <AuthContext.Provider value={{ user, loading, message, login, logout, clearMessage }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}

function AccessDenied() {
  return (
    <div className="mx-auto max-w-md px-6 py-20 text-center">
      <h1 className="text-xl font-semibold text-slate-900">Access denied</h1>
      <p className="mt-2 text-sm text-slate-500">
        Your account does not have permission to view this page.
      </p>
    </div>
  );
}

// Route guard: redirects an unauthenticated visitor to login (AC-008/AC-009/AC-012),
// and shows an access-denied view -- never the page's data -- when the signed-in user's
// role is not one of `roles` (AC-010/AC-011/NFR-005).
export function RequireAuth({ roles, children }: { roles?: Role[]; children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div className="px-6 py-20 text-center text-sm text-slate-500">Loading…</div>;
  }
  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  if (roles && !roles.includes(user.role)) {
    return <AccessDenied />;
  }
  return <>{children}</>;
}
