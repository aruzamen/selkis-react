"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import type { ReactNode } from "react";

const AuthGuard = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const router   = useRouter();

  useEffect(() => {
    if (!user) router.replace("/login");
  }, [user, router]);

  if (!user) return null;
  return <>{children}</>;
};

export default AuthGuard;
