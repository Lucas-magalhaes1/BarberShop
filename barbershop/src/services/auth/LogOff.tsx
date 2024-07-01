import { useRouter } from "next/router";
import { useEffect } from "react";

export default function LogOff() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.removeItem("username");
      localStorage.removeItem("id");
      localStorage.removeItem("isLoggedIn");
      router.push('/');
    }
  }, [router]);

  return null;
}