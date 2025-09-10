"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { getProfile } from "@/lib/api";

interface Profile {
    id: string;
    username: string;
    role: string;
}

export default function Navbar() {
    const [profile, setProfile] = useState<Profile | null>(null);

    useEffect(() => {
        async function fetchProfile() {
            try {
                const res = await getProfile();
                setProfile(res);
            } catch (err) {
                console.error("Failed to fetch profile:", err);
            }
        }
        fetchProfile();
    }, []);

    return (
        <nav
            className={`
        w-full px-4 md:px-24 py-2 md:py-6 flex items-center justify-between
        bg-white md:bg-transparent md:absolute md:top-0 md:left-0 md:z-10
      `}
        >
            {/* Logo */}
            <div className="flex items-center">
                {/* Mobile logo */}
                <Image
                    src="/logo.svg"
                    alt="Logo"
                    width={96}
                    height={18}
                    priority
                    className="block md:hidden w-24 h-auto"
                />
                {/* Desktop logo */}
                <Image
                    src="/logo-white.svg"
                    alt="Logo White"
                    width={132}
                    height={24}
                    priority
                    className="hidden md:block w-[132px] h-[24px]"
                />
            </div>

            {/* Profile */}
            <div className="flex items-center gap-2 md:gap-3">
                {/* Username hanya muncul di desktop */}
                <span className="hidden md:inline text-sm md:text-base font-medium text-white">
                    {profile?.username || "Guest"}
                </span>
                <Image
                    src="/profile.jpg"
                    alt="Profile"
                    width={32}
                    height={32}
                    className="w-8 h-8 md:w-10 md:h-10 rounded-full border"
                />
            </div>
        </nav>
    );
}
