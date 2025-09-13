"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Cek token & role di localStorage
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || !role) {
      // Belum login
      router.replace("/login");
    } else if (role === "Admin") {
      router.replace("/articles");
    } else if (role === "User") {
      router.replace("/article");
    } else {
      // Role tidak dikenal → paksa login
      router.replace("/login");
    }
  }, [router]);

  return null; // tidak render apapun, langsung redirect
}
