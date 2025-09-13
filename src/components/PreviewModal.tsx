"use client";

import Image from "next/image";
import { Article } from "@/types/article";

type Props = {
    show: boolean;
    onClose: () => void;
    article: Article;
    username: string;
};

export default function PreviewModal({ show, onClose, article, username }: Props) {
    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 overflow-y-auto">
            <div className="bg-white rounded-lg w-full max-w-4xl p-6 relative mx-4 my-8">
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-black"
                >
                    ✕
                </button>

                {/* Info */}
                <p className="text-sm text-gray-700 mb-2 text-center">
                    {new Date(article.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    })}{" "}
                    • Created by <span className="font-medium">{username}</span>
                </p>

                {/* Judul */}
                <h1 className="text-3xl font-bold mb-6 text-center text-black">
                    {article.title}
                </h1>

                {/* Gambar */}
                <div className="w-full h-[400px] relative mb-6">
                    <Image
                        src={article.imageUrl || "/background.jpg"}
                        alt={article.title}
                        fill
                        className="object-cover rounded-lg"
                    />
                </div>

                {/* Konten */}
                <div
                    className="prose max-w-none text-gray-700 whitespace-pre-line mb-6 text-left text-justify"
                    dangerouslySetInnerHTML={{ __html: article.content }}
                />
            </div>
        </div>
    );
}
