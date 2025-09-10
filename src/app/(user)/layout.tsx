"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { usePathname } from "next/navigation";

export default function UserLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    const isArticleDetail = pathname.startsWith("/article/");
    const isProfilePage = pathname.startsWith("/profile");

    const variant = isArticleDetail || isProfilePage ? "light" : "dark";

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar variant={variant} />
            <main className="flex-1">{children}</main>
            <Footer />
        </div>
    );
}
