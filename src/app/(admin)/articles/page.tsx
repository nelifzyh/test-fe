"use client";

import { useEffect, useState } from "react";
import { getArticles, getCategories } from "@/lib/api";
import ArticleTable from "@/components/ArticleTable";
import ArticleFilter from "@/components/ArticleFilter";
import Pagination from "@/components/Pagination";
import { Article, Category } from "@/types/article";

export default function ListArticlePage() {
    const [articles, setArticles] = useState<Article[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [total, setTotal] = useState(0);
    const [category, setCategory] = useState<string>("");
    const [search, setSearch] = useState<string>("");
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const limit = 10;

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const res = await getArticles(page, limit, category, search);
                setArticles(res.data);
                setTotal(res.total);

                const catRes = await getCategories();
                setCategories(catRes.data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [page, category, search]);

    return (
        <div className="p-6 bg-white rounded-lg">
            <div className="w-full border-b border-gray-200 mb-4">
                <h2 className="text-lg font-semibold mb-2">
                    Total Articles : {total}
                </h2>
            </div>

            <ArticleFilter
                categories={categories}
                onCategoryChange={(val) => {
                    setCategory(val);
                    setPage(1); // reset ke halaman 1 kalau filter berubah
                }}
                onSearchChange={(val) => {
                    setSearch(val);
                    setPage(1); // reset ke halaman 1 kalau search berubah
                }}
            />

            {loading ? (
                <div className="flex justify-center items-center py-20">
                    <div className="w-6 h-6 bg-blue-500 rounded-full animate-bounce"></div>
                    <div className="w-6 h-6 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.3s] mx-2"></div>
                    <div className="w-6 h-6 bg-blue-300 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                </div>
            ) : articles.length > 0 ? (
                <>
                    <ArticleTable articles={articles} />

                    {/* Pagination */}
                    <Pagination
                        page={page}
                        total={total}
                        limit={limit}
                        onChange={(p) => setPage(p)}
                    />
                </>
            ) : (
                <p className="text-center text-gray-500 py-20">
                    No articles found.
                </p>
            )}
        </div>
    );
}
