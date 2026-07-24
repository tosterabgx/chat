import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

export default function AuthProvider({ children }) {
  const [auth, setAuth] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async function () {
      try {
        const res = await fetch("/api/auth/me");
        if (!res.ok) return;
        const data = await res.json();
        setAuth(data.user);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <AuthContext value={{ auth, setAuth, isLoading }}>{children}</AuthContext>
  );
}
