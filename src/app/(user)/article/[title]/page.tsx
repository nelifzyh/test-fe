"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import Image from "next/image";
import { fetchArticleById, getArticles } from "@/lib/api";
import LoadingOverlay from "@/components/LoadingOverlay";
import ArticleList from "@/components/ArticleList";
import { Article } from "@/types/article";

export default function ArticleDetailPage() {
    const { title } = useParams();
    const searchParams = useSearchParams();
    const id = searchParams.get("id");

    const [article, setArticle] = useState<Article | null>(null);
    const [otherArticles, setOtherArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;

        const fetchData = async () => {
            try {
                // Artikel utama
                const detail = await fetchArticleById(id);
                setArticle(detail);

                // Artikel lain
                const res = await getArticles(1, 6); // ambil 6 artikel biar bisa filter
                const list = res.data.filter((a: Article) => a.id !== id);
                setOtherArticles(list);
            } catch (error) {
                console.error("Error fetching article:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    if (loading) return <LoadingOverlay />;
    if (!article) return <p className="text-center py-10">Article not found</p>;

    return (
        <div className="max-w-5xl mx-auto py-4 px-4 md:px-24 bg-white">
            {/* Judul */}
            <p className="text-sm text-gray-700 mb-2 text-center">
                {new Date(article.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                })}{" "}
                • Created by <span className="font-medium">{article.user?.username || "Unknown"}</span>
            </p>
            <h1 className="text-3xl font-bold mb-6 text-center text-black">{article.title}</h1>

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
            <div className="prose max-w-none text-gray-700 whitespace-pre-line mb-6">
                {article.content}
            </div>

            {/* Other Articles */}
            <h2 className="text-2xl font-semibold mt-10 mb-4 text-gray-900">Other Articles</h2>
            {otherArticles.length > 0 ? (
                <ArticleList articles={otherArticles.slice(0, 3)} />
            ) : (
                <p className="text-gray-500">No other articles available.</p>
            )}
        </div>
    );
}
