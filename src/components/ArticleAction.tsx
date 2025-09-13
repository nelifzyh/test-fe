"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Article } from "@/types/article";
import PreviewModal from "./PreviewModal";

type Props = {
    article: Article;
};

export default function ArticleActions({ article }: Props) {
    const [open, setOpen] = useState(false);
    const router = useRouter();

    return (
        <td className="p-2 space-x-2">
            <button
                className="text-blue-600"
                onClick={() => setOpen(true)}
            >
                Preview
            </button>
            <button
                className="text-green-600"
                onClick={() => router.push(`/articles/${article.id}/edit-articles`)}
            >
                Edit
            </button>
            <button className="text-red-600">Delete</button>

            {open && (
                <PreviewModal
                    show={open}
                    onClose={() => setOpen(false)}
                    article={article}
                    username={article.user?.username || "Unknown"}
                />
            )}
        </td>
    );
}
