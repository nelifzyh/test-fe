"use client";

import { useEffect, useState } from "react";
import { getArticles } from "@/lib/api";
import ArticleList from "@/components/ArticleList";
import CategoryFilter from "@/components/CategoryFilter";
import SearchBar from "@/components/SearchBar";
import Pagination from "@/components/Pagination";
import { Article } from "@/types/article";

export default function ArticlePage() {
    const [articles, setArticles] = useState<Article[]>([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [category, setCategory] = useState<string>("");
    const [search, setSearch] = useState<string>("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                const res = await getArticles(page, 6, category, search);
                setArticles(res.data);
                setTotal(res.total);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [page, category, search]);

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="relative text-white text-center overflow-hidden 
                pt-12 pb-8 md:pt-32 md:pb-16">
                {/* Background biru */}
                <div className="absolute inset-0 bg-blue-600"></div>

                {/* Background gambar dengan opacity */}
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-85"
                    style={{ backgroundImage: "url('/background.jpg')" }}
                ></div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-blue-600/40"></div>

                {/* Konten */}
                <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
                    <p className="text-xs font-bold">Blog genzet</p>
                    <h1 className="text-2xl md:text-4xl font-bold">
                        The Journal: Design Resources, Interviews, and Industry News
                    </h1>
                    <p className="mt-2 text-sm md:text-base">
                        Your daily dose of design insights!
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center mt-6">
                        <div className="bg-blue-500 flex flex-col sm:flex-row p-2 gap-2 rounded-md">
                            {/* Pass handler ke filter & search */}
                            <CategoryFilter onChange={(val) => {
                                setCategory(val);
                                setPage(1); // reset page
                            }} />
                            <SearchBar onSearch={(val) => {
                                setSearch(val);
                                setPage(1); // reset page
                            }} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto p-6">
                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="w-6 h-6 bg-blue-500 rounded-full animate-bounce"></div>
                        <div className="w-6 h-6 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.3s] mx-2"></div>
                        <div className="w-6 h-6 bg-blue-300 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    </div>
                ) : articles.length > 0 ? (
                    <>
                        <ArticleList articles={articles} />
                        <Pagination page={page} total={total} onChange={(p) => setPage(p)} />
                    </>
                ) : (
                    <p className="text-center text-gray-500 py-20">No articles found.</p>
                )}
            </div>
        </div>
    );
}
