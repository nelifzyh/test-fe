"use client";

import { useState, useEffect } from "react";
import type { Category } from "@/types/article";
import { updateCategory } from "@/lib/api";

interface EditCategoryModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    category: Category | null;
}

export default function EditCategoryModal({
    isOpen,
    onClose,
    onSuccess,
    category,
}: EditCategoryModalProps) {
    const [name, setName] = useState("");

    useEffect(() => {
        if (category) {
            setName(category.name || "");
        }
    }, [category]);

    if (!isOpen || !category) return null;

    const handleSubmit = async () => {
        if (!name.trim()) return;

        try {
            // <-- sesuaikan dengan signature updateCategory(id, name: string)
            await updateCategory(category.id, name);
            onSuccess();
            onClose();
        } catch (err) {
            console.error(err);
            alert("Failed to update category");
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="bg-white p-6 rounded shadow-md w-96">
                <h2 className="text-lg font-bold mb-4">Edit Category</h2>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border px-3 py-2 rounded mb-4"
                />
                <div className="flex justify-end space-x-2">
                    <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={!name.trim()}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );

}
