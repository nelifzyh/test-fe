"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { getProfile } from "@/lib/api";

export default function TopNavbar() {
    const pathname = usePathname();
    const [username, setUsername] = useState("");

    // Tentukan judul menu berdasarkan path
    const getPageTitle = () => {
        if (pathname.startsWith("/list-article")) return "Articles";
        if (pathname.startsWith("/category")) return "Category";
        return "Dashboard";
    };

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const profile = await getProfile();
                setUsername(profile.username);
            } catch (error) {
                console.error("Failed to fetch profile:", error);
            }
        };

        fetchProfile();
    }, []);

    return (
        <header className="h-16 bg-white shadow flex items-center justify-between px-6 sticky top-0 z-50">
            {/* Left: Page title */}
            <h1 className="text-lg font-semibold text-gray-700">
                {getPageTitle()}
            </h1>

            {/* Right: User info */}
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-blue-200 text-blue-900 flex items-center justify-center text-sm font-bold">
                    {username ? username[0].toUpperCase() : "U"}
                </div>
                <span className="text-gray-700">{username}</span>
            </div>
        </header>
    );
}
