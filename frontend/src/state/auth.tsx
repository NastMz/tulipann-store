import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { api } from "../api/client";
import type { User } from "../api/types";

type AuthState = {
  user: User | null;
  ready: boolean;
  login: (email: string, password: string) => Promise<User>;
  /** Resolves with the server's message; the account is activated by e-mail. */
  register: (data: { email: string; first_name: string; last_name: string; phone: string; password: string }) => Promise<string>;
  activate: (uid: string, token: string) => Promise<User>;
  logout: () => Promise<void>;
  setUser: (user: User) => void;
};

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    api<{ user: User | null }>("/auth/me")
      .then((body) => setUser(body.user))
      .catch(() => setUser(null))
      .finally(() => setReady(true));
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const body = await api<{ user: User }>("/auth/login", { method: "POST", body: { email, password } });
    setUser(body.user);
    return body.user;
  }, []);

  const register = useCallback<AuthState["register"]>(async (data) => {
    const body = await api<{ detail: string }>("/auth/register", { method: "POST", body: data });
    return body.detail;
  }, []);

  const activate = useCallback(async (uid: string, token: string) => {
    const body = await api<{ user: User }>("/auth/activate", { method: "POST", body: { uid, token } });
    setUser(body.user);
    return body.user;
  }, []);

  const logout = useCallback(async () => {
    await api("/auth/logout", { method: "POST" });
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({ user, ready, login, register, activate, logout, setUser }),
    [user, ready, login, register, activate, logout],
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthState {
  const value = useContext(AuthContext);
  if (!value) throw new Error("useAuth must be used inside <AuthProvider>");
  return value;
}
