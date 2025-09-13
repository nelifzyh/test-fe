"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Article } from "@/types/article";
import PreviewModal from "./PreviewModal";
import { deleteArticle } from "@/lib/api";

type Props = {
    article: Article;
};

export default function ArticleActions({ article }: Props) {
    const [open, setOpen] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const router = useRouter();

    const handleDelete = async () => {
        try {
            await deleteArticle(article.id);
            setConfirmDelete(false);
            window.location.reload();
        } catch (err) {
            console.error(err);
            alert("Failed to delete article");
        }
    };

    return (
        <td className="p-2 space-x-2">
            {/* Preview */}
            <button className="text-blue-600" onClick={() => setOpen(true)}>
                Preview
            </button>

            {/* Edit */}
            <button
                className="text-green-600"
                onClick={() => router.push(`/articles/${article.id}/edit-articles`)}
            >
                Edit
            </button>

            {/* Delete */}
            <button className="text-red-600" onClick={() => setConfirmDelete(true)}>
                Delete
            </button>

            {/* Preview Modal */}
            {open && (
                <PreviewModal
                    show={open}
                    onClose={() => setOpen(false)}
                    article={article}
                    username={article.user?.username || "Unknown"}
                />
            )}

            {/* Delete Confirmation Modal */}
            {confirmDelete && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="bg-white rounded-lg p-6 max-w-sm w-full shadow-lg">
                        <h2 className="text-lg font-semibold mb-1 text-left">
                            Delete Article
                        </h2>
                        <p className="text-sm text-gray-600 mb-6 text-left">
                            Deleting this article is permanent and cannot be undone. All
                            related content will be removed.
                        </p>
                        <div className="flex justify-end space-x-2">
                            <button
                                className="px-4 py-2 text-sm rounded border"
                                onClick={() => setConfirmDelete(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 text-sm rounded bg-red-600 text-white"
                                onClick={handleDelete}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </td>
    );
}
