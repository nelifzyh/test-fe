"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Category } from "@/types/article";
import { getProfile } from "@/lib/api";

type Props = {
    show: boolean;
    onClose: () => void;
    title: string;
    category: string;
    categories: Category[];
    content: string;
    thumbnail: File | null;
};

export default function PreviewCreateModal({
    show,
    onClose,
    title,
    category,
    categories,
    content,
    thumbnail,
}: Props) {
    const [username, setUsername] = useState<string>("");

    useEffect(() => {
        if (!show) return;

        const fetchProfile = async () => {
            try {
                const res = await getProfile();
                console.log("👤 Profile fetched:", res);
                setUsername(res?.username || "Unknown");
            } catch (error) {
                console.error("❌ Failed to fetch profile:", error);
                setUsername("Unknown");
            }
        };

        fetchProfile();
    }, [show]);

    if (!show) return null;

    const today = new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 overflow-y-auto">
            <div className="bg-white rounded-lg w-full max-w-5xl p-6 relative mx-4 my-8">
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-black"
                >
                    ✕
                </button>

                {/* Info */}
                <p className="text-sm text-gray-700 mb-2 text-center">
                    {today} • Created by{" "}
                    <span className="font-medium">{username}</span>
                </p>

                {/* Judul */}
                <h1 className="text-3xl font-bold mb-6 text-center text-black">
                    {title || "No Title"}
                </h1>

                {/* Thumbnail */}
                <div className="w-full h-[400px] relative mb-6">
                    <Image
                        src={
                            thumbnail ? URL.createObjectURL(thumbnail) : "/background.jpg"
                        }
                        alt={title || "Thumbnail"}
                        fill
                        className="object-cover rounded-lg"
                    />
                </div>

                {/* Konten */}
                <div
                    className="prose max-w-none text-gray-700 whitespace-pre-line mb-6"
                    dangerouslySetInnerHTML={{ __html: content }}
                />
            </div>
        </div>
    );
}
