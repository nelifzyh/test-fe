"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { Category } from "@/types/article";

interface Props {
    show: boolean;
    onClose: () => void;
    title: string;
    category: string;
    categories: Category[];
    content: string;
    thumbnail: File | null;
}

export default function PreviewModal({
    show,
    onClose,
    title,
    category,
    categories,
    content,
    thumbnail,
}: Props) {
    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg w-3/4 max-w-2xl p-6 relative">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-black"
                >
                    <X className="w-5 h-5" />
                </button>
                <h2 className="text-lg font-semibold mb-4">Preview Article</h2>                
                <h3 className="text-xl font-bold mb-2 text-center">{title || "No Title"}</h3>
                {thumbnail && (
                    <Image
                        src={URL.createObjectURL(thumbnail)}
                        alt="Preview Thumbnail"
                        className="w-full h-48 object-cover rounded mb-4"
                        width={600}
                        height={240}
                    />
                )}
                <div
                    className="prose max-w-none"
                    dangerouslySetInnerHTML={{ __html: content }}
                />
            </div>
        </div>
    );
}
