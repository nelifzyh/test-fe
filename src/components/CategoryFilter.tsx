"use client";
import { useState } from "react";

interface CategoryFilterProps {
    onChange?: (value: string) => void;
}

export default function CategoryFilter({ onChange }: CategoryFilterProps) {
    const [selected, setSelected] = useState("");

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
            <option value="">Select category</option>
            <option value="design">Design</option>
            <option value="technology">Technology</option>
            <option value="business">Business</option>
        </select>
    );
}
