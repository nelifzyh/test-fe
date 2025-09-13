"use client";

import { useState, useEffect, useRef, type ComponentRef } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getCategories, uploadImage, createArticle } from "@/lib/api";
import ThumbnailUploader from "@/components/TumbnailUploader";
import CategorySelect from "@/components/CategorySelect";
import ContentEditor from "@/components/ContentEditor";
import QuillWrapper from "@/components/QuillWrapper";
import PreviewCreateModal from "@/components/PreviewCreateModal";
import LoadingOverlay from "@/components/LoadingOverlay"; 
import { Category } from "@/types/article";

export default function CreateArticlePage() {
    const router = useRouter();

    // state form
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [categories, setCategories] = useState<Category[]>([]);
    const [content, setContent] = useState("");
    const [thumbnail, setThumbnail] = useState<File | null>(null);
    const [showPreview, setShowPreview] = useState(false);
    const [loading, setLoading] = useState(false);

    // editor ref
    const quillRef = useRef<ComponentRef<typeof QuillWrapper>>(null);

    // fetch kategori
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await getCategories();
                setCategories(res.data);
            } catch (error) {
                console.error("Failed to load categories", error);
            }
        };
        fetchCategories();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            let thumbnailUrl = "";

            // 1. Upload thumbnail jika ada
            if (thumbnail) {
                console.log("Uploading thumbnail...");
                const imgRes = await uploadImage(thumbnail);
                thumbnailUrl = imgRes.imageUrl;
                console.log("Thumbnail uploaded:", thumbnailUrl);
            } else {
                console.log("ℹ No thumbnail selected, skip upload");
            }

            const article = await createArticle({
                title,
                content,
                categoryId: category,
                imageUrl: thumbnailUrl || undefined,
            });

            console.log("Artikel berhasil dibuat:", article);
            alert("Artikel berhasil dibuat!");
            router.push("/articles");
        } catch (error) {
            console.error("Error creating article:", error);
            alert("Gagal membuat artikel");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full mx-auto p-6 bg-white rounded-lg shadow relative">
            {/* Header */}
            <div className="flex items-center gap-2 mb-6">
                <button
                    onClick={() => router.back()}
                    className="p-2 hover:bg-gray-100 rounded-full"
                >
                    <ArrowLeft className="w-5 h-5 text-gray-700" />
                </button>
                <h1 className="text-xl font-semibold">Create Articles</h1>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Thumbnail */}
                <ThumbnailUploader value={thumbnail} onChange={setThumbnail} />

                {/* Title */}
                <div>
                    <label className="block text-sm font-medium mb-2">Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="border rounded-lg px-3 py-2 w-full"
                        placeholder="Input title"
                        required
                    />
                </div>

                {/* Category */}
                <CategorySelect
                    categories={categories}
                    value={category}
                    onChange={setCategory}
                />

                {/* Content */}
                <ContentEditor ref={quillRef} value={content} onChange={setContent} />

                {/* Actions */}
                <div className="flex justify-end gap-2 mt-4">
                    <button
                        type="button"
                        className="px-4 py-2 border rounded-lg text-gray-600"
                        onClick={() => router.back()}
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        className="px-4 py-2 border rounded-lg"
                        onClick={() => setShowPreview(true)}
                    >
                        Preview
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50"
                    >
                        {loading ? "Uploading..." : "Upload"}
                    </button>
                </div>
            </form>

            {/* Preview Modal */}
            <PreviewCreateModal
                show={showPreview}
                onClose={() => setShowPreview(false)}
                title={title}
                category={category}
                categories={categories}
                content={content}
                thumbnail={thumbnail}
            />

            {/* Loading Overlay */}
            {loading && <LoadingOverlay />}
        </div>
    );
}
