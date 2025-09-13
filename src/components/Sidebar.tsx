"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import LogoutModal from "./LogoutModal"; // pastikan path sesuai

export default function Sidebar() {
    const router = useRouter();
    const pathname = usePathname();
    const [isLogoutOpen, setIsLogoutOpen] = useState(false);

    const handleConfirmLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        setIsLogoutOpen(false);
        router.push("/login");
    };

    const menuItems = [
        {
            name: "Articles",
            href: "/articles",
            icon: "/articles.svg",
            action: "link",
        },
        {
            name: "Category",
            href: "/category",
            icon: "/category.svg",
            action: "link",
        },
        {
            name: "Logout",
            href: "#",
            icon: "/logout.svg",
            action: "logout",
        },
    ];

    return (
        <>
            <aside className="w-56 bg-blue-600 text-white h-screen fixed left-0 top-0 flex flex-col">
                {/* Logo */}
                <div className="p-6">
                    <Image
                        src="/logo-white.svg"
                        alt="Logo"
                        width={120}
                        height={40}
                        priority
                    />
                </div>

                {/* Menu */}
                <nav className="flex-1 px-4 space-y-2">
                    {menuItems.map((item) => {
                        const isActive = pathname === item.href;

                        if (item.action === "logout") {
                            return (
                                <button
                                    key={item.name}
                                    onClick={() => setIsLogoutOpen(true)}
                                    className="flex items-center gap-3 px-3 py-2 rounded-md bg-blue-600 w-full"
                                >
                                    <Image
                                        src={item.icon}
                                        alt={`${item.name} icon`}
                                        width={18}
                                        height={18}
                                    />
                                    {item.name}
                                </button>
                            );
                        }

                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`flex items-center gap-3 px-3 py-2 rounded-md transition 
                                    ${isActive ? "bg-blue-500" : "bg-blue-600"}`}
                            >
                                <Image
                                    src={item.icon}
                                    alt={`${item.name} icon`}
                                    width={18}
                                    height={18}
                                />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>
            </aside>

            {/* Logout Modal */}
            <LogoutModal
                isOpen={isLogoutOpen}
                onClose={() => setIsLogoutOpen(false)}
                onConfirm={handleConfirmLogout}
            />
        </>
    );
}
