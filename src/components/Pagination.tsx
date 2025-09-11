"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
    page: number;
    total: number;
    limit?: number;
    onChange: (page: number) => void;
}

export default function Pagination({
    page,
    total,
    limit = 6,
    onChange,
}: PaginationProps) {
    const totalPages = Math.ceil(total / limit);

    if (totalPages <= 1) return null;

    // fungsi untuk generate nomor halaman (dengan "..." jika banyak)
    const getPageNumbers = () => {
        const pages: (number | string)[] = [];
        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            if (page <= 3) {
                pages.push(1, 2, 3, "...", totalPages);
            } else if (page >= totalPages - 2) {
                pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
            } else {
                pages.push(1, "...", page - 1, page, page + 1, "...", totalPages);
            }
        }
        return pages;
    };

    return (
        <div className="flex justify-center items-center gap-2 mt-8">
            {/* Previous */}
            <button
                onClick={() => onChange(page - 1)}
                disabled={page === 1}
                className="flex items-center gap-1 px-3 py-1 text-sm text-gray-900 disabled:opacity-50"
            >
                <ChevronLeft size={16} />
                Previous
            </button>

            {/* Page Numbers */}
            {getPageNumbers().map((p, i) =>
                p === "..." ? (
                    <span key={i} className="px-2 text-gray-500">
                        ...
                    </span>
                ) : (
                    <button
                        key={i}
                        onClick={() => onChange(p as number)}
                        className={`px-3 py-1 rounded-md text-sm text-gray-700 ${page === p
                                ? "border border-gray-500 font-bold"
                                : "font-semibold"
                            }`}
                    >
                        {p}
                    </button>
                )
            )}

            {/* Next */}
            <button
                onClick={() => onChange(page + 1)}
                disabled={page === totalPages}
                className="flex items-center gap-1 px-3 py-1 text-sm text-gray-900 disabled:opacity-50"
            >
                Next
                <ChevronRight size={16} />
            </button>
        </div>
    );
}
