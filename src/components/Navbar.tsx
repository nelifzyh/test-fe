import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { getProfile } from "@/lib/api";
import { LogOut } from "lucide-react";
import LogoutModal from "./LogoutModal";

interface Profile {
    id: string;
    username: string;
    role: string;
}

interface NavbarProps {
    variant?: "light" | "dark";
}

export default function Navbar({ variant = "dark" }: NavbarProps) {
    const [profile, setProfile] = useState<Profile | null>(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
    const router = useRouter();

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

    const isLight = variant === "light";
    const logoSrcMobile = "/logo.svg";
    const logoSrcDesktop = isLight ? "/logo.svg" : "/logo-white.svg";
    const textColor = isLight ? "text-gray-800" : "text-white";
    const navBg = isLight
        ? "bg-white"
        : "bg-transparent md:absolute md:top-0 md:left-0 md:z-10";

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        setIsLogoutModalOpen(false);
        router.push("/login");
    };

    return (
        <>
            <nav
                className={`w-full px-4 md:px-24 py-2 md:py-6 flex items-center justify-between ${navBg}`}
            >
                {/* Logo */}
                <div className="flex items-center">
                    <Image src={logoSrcMobile} alt="Logo" width={96} height={18} className="block md:hidden w-24 h-auto" />
                    <Image src={logoSrcDesktop} alt="Logo Desktop" width={132} height={24} className="hidden md:block w-[132px] h-[24px]" />
                </div>

                {/* Profile */}
                <div
                    className="flex items-center gap-2 md:gap-3 cursor-pointer relative"
                    onClick={() => setIsDropdownOpen(true)}
                >
                    <span className={`hidden md:inline text-sm md:text-base font-medium ${textColor}`}>
                        {profile?.username || "Guest"}
                    </span>
                    <div className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-200 text-blue-700 text-sm font-bold">
                        {profile?.username?.charAt(0).toUpperCase() || "U"}
                    </div>
                </div>
            </nav>

            {/* Overlay + Dropdown */}
            {isDropdownOpen && (
                <div
                    className="fixed inset-0 bg-black/40 flex justify-end items-start z-50"
                    onClick={() => setIsDropdownOpen(false)}
                >
                    <div
                        className="bg-white shadow-lg rounded-md w-48 mt-16 mr-6 py-2 animate-fadeIn"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                            onClick={() => {
                                setIsDropdownOpen(false);
                                router.push("/profile");
                            }}
                        >
                            My Account
                        </button>
                        <button
                            className="block w-full px-4 py-2 text-left text-red-500 hover:bg-gray-100 flex items-center gap-2"
                            onClick={() => {
                                setIsDropdownOpen(false);
                                setIsLogoutModalOpen(true);
                            }}
                        >
                            <LogOut size={16} /> Log out
                        </button>
                    </div>
                </div>
            )}

            {/* Logout Confirmation Modal */}
            <LogoutModal
                isOpen={isLogoutModalOpen}
                onClose={() => setIsLogoutModalOpen(false)}
                onConfirm={handleLogout}
            />
        </>
    );
}
