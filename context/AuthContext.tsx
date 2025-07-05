'use client'
import { createContext, useState, useContext, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

type AuthContextType = {
  isLoggedIn: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Check auth state on initial load and route changes
  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);

    if (!loggedIn && !['/home', '/login'].includes(pathname)) {
      router.push('/home');
    }
  }, [pathname, router]);

  const login = (username: string, password: string) => {
    if (username === "admin" && password === "123") {
      setIsLoggedIn(true);
      localStorage.setItem('isLoggedIn', 'true');
      router.push('/dashboard');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
    router.push('/home');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}