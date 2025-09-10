"use client";
import ArticleCard from "./ArticleCard";
import { Article } from "@/types/article";

interface ArticleListProps {
  articles: Article[];
}

export default function ArticleList({ articles }: ArticleListProps) {
    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
                <ArticleCard
                    key={article.id}
                    id={article.id}
                    title={article.title}
                    date={article.createdAt}
                    content={article.content}
                    category={article.category?.name || "General"}
                    author={article.user?.username || "Unknown"}
                    image={article.imageUrl || null}
                />
            ))}
        </div>
    );
}
