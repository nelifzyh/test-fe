"use client";

import { useEffect, useState } from "react";
import { fetchCategories } from "@/lib/api";
import { Category } from "@/types/article";
import CategoryTable from "@/components/admin/category/CategoryTable";
import SearchBar from "@/components/admin/category/SearchBar";
import Pagination from "@/components/Pagination";
import LoadingOverlay from "@/components/LoadingOverlay";

export default function CategoryPage() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [totalData, setTotalData] = useState(0);
    const [limit] = useState(6);

    // fungsi load data kategori
    const loadCategories = async () => {
        try {
            setLoading(true);
            const res = await fetchCategories(page, search);
            setCategories(res.data);
            setTotalData(res.totalData);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadCategories();
    }, [page, search]);

    return (
        <div className="p-6 bg-white rounded-lg shadow">
            {loading && <LoadingOverlay />}

            <div className="border-b border-gray-200 mb-4">
                <h2 className="font-semibold mb-2">
                    Total Category : {totalData}
                </h2>
            </div>

            <SearchBar onSearch={setSearch} onRefresh={loadCategories} />

            {/* PASANG onRefresh supaya table / row dapat memanggil ulang data */}
            <CategoryTable categories={categories} onRefresh={loadCategories} />

            <Pagination
                page={page}
                total={totalData}
                limit={limit}
                onChange={setPage}
            />
        </div>
    );
}
