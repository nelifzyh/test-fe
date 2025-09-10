"use client";
import { useState } from "react";
import Image from "next/image";

interface SearchBarProps {
    onSearch?: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
    const [query, setQuery] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);
        onSearch?.(value); // langsung trigger search
    };

    return (
        <div className="relative flex items-center border rounded-md overflow-hidden w-64 bg-white">
            {/* Search Icon */}
            <Image
                src="/search.svg"
                alt="Search"
                width={16}
                height={16}
                className="absolute left-3 text-gray-400"
            />

            {/* Input */}
            <input
                type="text"
                placeholder="Search articles..."
                value={query}
                onChange={handleChange}
                className="pl-9 pr-3 py-2 text-sm w-full 
                   placeholder-gray-400 text-black focus:outline-none"
            />
        </div>
    );
}
