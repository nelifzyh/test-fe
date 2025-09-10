"use client";

import { useEffect, useState } from "react";
import { getCategories } from "@/lib/api";

interface Category {
    id: string;
    name: string;
}

interface CategoryFilterProps {
    onChange?: (value: string) => void;
}

export default function CategoryFilter({ onChange }: CategoryFilterProps) {
    const [categories, setCategories] = useState<Category[]>([]);
    const [selected, setSelected] = useState("");

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await getCategories();
                setCategories(res.data || []);
            } catch (err) {
                console.error("Failed to fetch categories:", err);
            }
        }
        fetchData();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setSelected(value);
        onChange?.(value);
    };

    return (
        <select
            value={selected}
            onChange={handleChange}
            className="rounded-md px-3 py-2 text-sm bg-white text-black"
        >
            <option value="">All categories</option>
            {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                    {cat.name}
                </option>
            ))}
        </select>
    );
}
