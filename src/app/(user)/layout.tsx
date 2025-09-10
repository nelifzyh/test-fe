"use client";

import Navbar from "@/components/Navbar";

export default function UserLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen">
            {/* Navbar hanya muncul di halaman dalam (user) */}
            <Navbar />
            <main>{children}</main>
        </div>
    );
}
