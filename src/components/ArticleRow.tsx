"use client";

import Image from "next/image";
import { Article } from "@/types/article";

type Props = {
    article: Article;
};

export default function ArticleRow({ article }: Props) {
    return (
        <tr className="border-b border-gray-200 text-slate-600 text-center items-center text-sm">
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
            <td className="p-2 max-w-xs">{article.title}</td>
            <td className="p-2">{article.category?.name}</td>
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
            <td className="p-2 space-x-2">
                <button className="text-blue-600">Preview</button>
                <button className="text-green-600">Edit</button>
                <button className="text-red-600">Delete</button>
            </td>
        </tr>
    );
}
