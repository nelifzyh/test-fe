"use client";

import Image from "next/image";
import { useState } from "react";
import AddCategoryModal from "./AddCategoryModal";

interface Props {
    onSearch: (value: string) => void;
    onRefresh: () => void; // untuk refresh data setelah tambah
}

export default function SearchBar({ onSearch, onRefresh }: Props) {
    const [value, setValue] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <div className="mb-4 flex justify-between items-center">
                {/* Search Input */}
                <div className="relative w-1/3">
                    <Image
                        src="/search.svg"
                        alt="Search"
                        width={16}
                        height={16}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                    <input
                        type="text"
                        placeholder="Search Category"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && onSearch(value)}
                        className="w-full pl-8 pr-3 py-2 border border-slate-300 rounded-lg"
                    />
                </div>

                {/* Add Category Button */}
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
                >
                    + Add Category
                </button>
            </div>

            {/* Modal */}
            <AddCategoryModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSuccess={onRefresh}
            />
        </>
    );
}
