"use client";

import Image from "next/image";
import { Article } from "@/types/article";
import ArticleActions from "./ArticleAction";

type Props = {
    article: Article;
};

export default function ArticleRow({ article }: Props) {
    return (
        <tr className="border-b border-gray-200 text-slate-600 text-center items-center text-sm">
            {/* Thumbnail */}
            <td className="p-2">
                <div className="w-12 h-12 relative overflow-hidden">
                    <Image
                        src={article.imageUrl || "/background.jpg"}
                        alt={article.title}
                        fill
                        className="rounded object-cover"
                    />
                </div>
            </td>

            {/* Title */}
            <td className="p-2 max-w-xs">{article.title}</td>

            {/* Category */}
            <td className="p-2">{article.category?.name}</td>

            {/* Created At */}
            <td className="p-2">
                {new Date(article.createdAt).toLocaleString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: false,
                })}
            </td>

            {/* Actions */}
            <ArticleActions article={article} />
        </tr>
    );
}
