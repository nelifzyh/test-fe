"use client";

import Image from "next/image";

export default function Footer() {
    return (
        <footer className="bg-blue-600 text-white py-4 mt-10">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 px-4 text-center md:text-left">
                <Image
                    src="/logo-white.svg"
                    alt="Logo"
                    width={132}
                    height={24}
                    className="w-24 md:w-32 h-auto"
                />
                <span className="text-xs md:text-sm mt-1 md:mt-0">
                    © {new Date().getFullYear()} Blog genzet. All rights reserved.
                </span>
            </div>
        </footer>
    );
}
