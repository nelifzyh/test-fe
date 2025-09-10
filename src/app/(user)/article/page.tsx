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

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await getArticles(page, 6);
                setArticles(res.data);
                setTotal(res.total);
            } catch (err) {
                console.error(err);
            }
        }
        fetchData();
    }, [page]);

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
                        <div className="bg-blue-500 flex p-2 gap-2 rounded-md">
                            <CategoryFilter />
                            <SearchBar />
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto p-6">
                <ArticleList articles={articles} />
                <Pagination page={page} total={total} onChange={(p) => setPage(p)} />
            </div>
        </div>
    );
}
