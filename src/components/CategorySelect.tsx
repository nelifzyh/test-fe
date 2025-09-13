"use client";

import { Category } from "@/types/article";

interface Props {
    categories: Category[];
    value: string;
    onChange: (val: string) => void;
}

export default function CategorySelect({ categories, value, onChange }: Props) {
    return (
        <div>
            <label className="block text-sm font-medium mb-2">Category</label>
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="border rounded-lg px-3 py-2 w-full"
            >
                <option value="">Select category</option>
                {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                        {cat.name}
                    </option>
                ))}
            </select>
        </div>
    );
}
