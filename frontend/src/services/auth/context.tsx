import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthService, User } from "./types";

type AuthContextValue = {
  user: User | null;
  loading: boolean;
  error: Error | null;
  authenticated: boolean;
  signUp(email: string, password: string, fullname: string): void;
  login(email: string, password: string): void;
  signOut(): void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

type AuthProviderProps = {
  service: AuthService;
  children: React.ReactNode;
};

export function AuthProvider({ service, children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setLoading(true);
    service
      .currentUser()
      .then(setUser)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [service]);

  const signUp = (email: string, password: string, fullname: string) => {
    setLoading(true);
    service
      .signUp({ email, password, fullname })
      .then(() => {
        setError(null);
      })
      .catch((err) => {
        console.error(err);
        setError(err);
      })
      .finally(() => setLoading(false));
  };

  const login = (email: string, password: string) => {
    setLoading(true);
    service
      .login({ email, password })
      .then((user) => {
        setUser(user);
        setError(null);
      })
      .catch((err) => {
        console.error(err);
        setError(err);
      })
      .finally(() => setLoading(false));
  };

  const signOut = () => {
    setLoading(true);
    service
      .signOut()
      .then(() => {
        setUser(null);
        setError(null);
      })
      .catch((err) => {
        console.error(err);
        setError(err);
      })
      .finally(() => setLoading(false));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        authenticated: user !== null,
        signUp,
        login,
        signOut,
      }}
      children={children}
    />
  );
}

export function useAuth() {
  const auth = useContext(AuthContext);
  if (auth === null)
    throw new Error(
      "useAuth() may only be used within the context of a <AuthProvider> component.",
    );
  return auth;
}
