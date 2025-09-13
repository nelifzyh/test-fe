"use client";

import { Category } from "@/types/article";
import Image from "next/image";
import { useRouter } from "next/navigation";

type Props = {
    categories: Category[];
    onCategoryChange: (val: string) => void;
    onSearchChange: (val: string) => void;
};

export default function ArticleFilter({
    categories,
    onCategoryChange,
    onSearchChange,
}: Props) {
    const router = useRouter();

    return (
        <div className="flex gap-2 mb-4">
            {/* Dropdown Category */}
            <select
                className="border border-gray-400 rounded-lg px-3 py-2"
                onChange={(e) => onCategoryChange(e.target.value)}
            >
                <option value="">Category</option>
                {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                        {cat.name}
                    </option>
                ))}
            </select>

            {/* Search */}
            <div className="relative flex-1">
                <Image
                    src="/search.svg"
                    alt="Search"
                    width={16}
                    height={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2"
                />
                <input
                    type="text"
                    placeholder="Search by title"
                    className="border border-gray-400 rounded-lg pl-9 pr-3 py-2 w-full"
                    onChange={(e) => onSearchChange(e.target.value)}
                />
            </div>

            {/* Add Article */}
            <button
                onClick={() => router.push("/articles/create-articles")}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
                + Add Articles
            </button>
        </div>
    );
}
