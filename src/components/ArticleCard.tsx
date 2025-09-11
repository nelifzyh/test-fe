"use client";
import Link from "next/link";
import Image from "next/image";

interface ArticleCardProps {
    id: string;
    title: string;
    date: string;
    content: string;
    category: string;
    author: string;
    image?: string | null;
}

export default function ArticleCard({
    id,
    title,
    date,
    content,
    category,
    author,
    image,
}: ArticleCardProps) {
    const imageUrl = image ? image : "/background.jpg";
    const slug = title.toLowerCase().replace(/\s+/g, "-"); 

    return (
        <Link href={`/article/${slug}?id=${id}`}>
            <div className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden">
                <Image
                    src={imageUrl}
                    alt={title}
                    width={400}
                    height={250}
                    className="w-full h-40 sm:h-48 object-cover"
                />
                <div className="p-3 sm:p-4">
                    <p className="text-xs sm:text-sm text-gray-500">
                        {new Date(date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}
                    </p>
                    <h3 className="text-base sm:text-lg font-bold text-black mb-1 sm:mb-2">{title}</h3>
                    <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 sm:line-clamp-3 mb-2">
                        {content}
                    </p>
                    <p className="inline-block px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs bg-blue-100 text-blue-600 rounded-full">
                        {category}
                    </p>
                </div>
            </div>
        </Link>
    );
}
