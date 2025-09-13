"use client";

import { useState } from "react";
import { createCategory } from "@/lib/api";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void; // untuk refresh list setelah tambah
}

export default function AddCategoryModal({ isOpen, onClose, onSuccess }: Props) {
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async () => {
        try {
            setLoading(true);
            await createCategory(name);
            setName("");
            onSuccess();
            onClose();
        } catch (err) {
            console.error(err);
            alert("Failed to add category");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
                <h2 className="text-lg font-semibold mb-4">Add Category</h2>

                <div className="mb-4">
                    <label className="block mb-1 text-sm font-medium">Category</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Input category"
                        className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                </div>

                <div className="flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={loading || !name.trim()}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                    >
                        {loading ? "Adding..." : "Add"}
                    </button>
                </div>
            </div>
        </div>
    );
}
