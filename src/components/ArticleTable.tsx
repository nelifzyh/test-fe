"use client";

import ArticleRow from "@/components/ArticleRow";
import { Article } from "@/types/article";

type Props = {
    articles: Article[];
};

export default function ArticleTable({ articles }: Props) {
    return (
        <table className="w-full border-collapse">
            <thead>
                <tr className="bg-gray-100 text-center">
                    <th className="p-2">Thumbnails</th>
                    <th className="p-2">Title</th>
                    <th className="p-2">Category</th>
                    <th className="p-2">Created at</th>
                    <th className="p-2">Action</th>
                </tr>
            </thead>
            <tbody>
                {articles.map((article) => (
                    <ArticleRow key={article.id} article={article} />
                ))}
            </tbody>
        </table>
    );
}
