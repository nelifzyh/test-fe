"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getProfile } from "@/lib/api";
import LoadingOverlay from "@/components/LoadingOverlay";

interface Profile {
    id: string;
    username: string;
    role: string;
}

export default function ProfilePage() {
    const [profile, setProfile] = useState<Profile | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await getProfile();
                setProfile(res);
            } catch (error) {
                console.error("Failed to fetch profile:", error);
                router.push("/login"); // kalau token invalid, kembali ke login
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [router]);

    if (loading) return <LoadingOverlay/>;
    if (!profile) return <p className="text-center py-10">Profile not found</p>;

    return (
        <div className="min-h-screen flex items-center justify-center bg-white px-4">
            <div className="w-full max-w-md p-8 text-center">
                {/* Title */}
                <h1 className="text-lg font-semibold mb-6 text-black">User Profile</h1>

                {/* Default Profile Picture (initial username) */}
                <div className="w-20 h-20 mx-auto flex items-center justify-center rounded-full bg-blue-200 text-blue-700 text-2xl font-bold mb-6">
                    {profile.username.charAt(0).toUpperCase()}
                </div>

                {/* Profile Info */}
                <div className="space-y-3 text-left text-gray-800">
                    <div className="flex justify-between items-center bg-gray-100 px-4 py-2 rounded">
                        <span className="font-medium">Username :</span>
                        <span>{profile.username}</span>
                    </div>
                    <div className="flex justify-between items-center bg-gray-100 px-4 py-2 rounded">
                        <span className="font-medium">Role :</span>
                        <span>{profile.role}</span>
                    </div>
                </div>

                {/* Back Button */}
                <button
                    onClick={() => router.push("/article")}
                    className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
                >
                    Back to home
                </button>
            </div>
        </div>
    );
}
