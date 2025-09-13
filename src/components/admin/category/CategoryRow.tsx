"use client";

import { useState } from "react";
import type { Category } from "@/types/article";
import { deleteCategory } from "@/lib/api";
import EditCategoryModal from "./EditCategoryModal";
import { createPortal } from "react-dom";

interface Props {
    category: Category;
    onRefresh: () => void;
}

export default function CategoryRow({ category, onRefresh }: Props) {
    const [isEditOpen, setIsEditOpen] = useState(false);

    const formattedDate = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
    }).format(new Date(category.createdAt));

    const handleDelete = async () => {
        if (!confirm("Are you sure want to delete this category?")) return;
        try {
            await deleteCategory(category.id);
            onRefresh();
        } catch (err) {
            console.error(err);
            alert("Failed to delete category");
        }
    };

    return (
        <>
            <tr className="border-b border-gray-200 text-center">
                <td className="py-2 px-3 text-slate-600">{category.name}</td>
                <td className="py-2 px-3 text-slate-600">{formattedDate}</td>
                <td className="py-2 px-3 space-x-3">
                    <button
                        onClick={() => setIsEditOpen(true)}
                        className="text-blue-600 hover:underline"
                    >
                        Edit
                    </button>
                    <button
                        onClick={handleDelete}
                        className="text-red-600 hover:underline"
                    >
                        Delete
                    </button>
                </td>
            </tr>

            {isEditOpen &&
                createPortal(
                    <EditCategoryModal
                        isOpen={isEditOpen}
                        onClose={() => setIsEditOpen(false)}
                        onSuccess={onRefresh}
                        category={category}
                    />,
                    document.body // ⬅️ render keluar dari table
                )}
        </>
    );
}
