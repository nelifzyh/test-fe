"use client";

import { useState, useEffect, useRef, type ComponentRef } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getCategories, uploadImage, updateArticle, fetchArticleById } from "@/lib/api";
import ThumbnailUploader from "@/components/TumbnailUploader";
import CategorySelect from "@/components/CategorySelect";
import ContentEditor from "@/components/ContentEditor";
import QuillWrapper from "@/components/QuillWrapper";
import PreviewCreateModal from "@/components/PreviewCreateModal";
import LoadingOverlay from "@/components/LoadingOverlay";
import { Category, Article } from "@/types/article";

export default function EditArticlePage() {
    const router = useRouter();
    const params = useParams(); // ambil id dari /articles/[id]/edit
    const articleId = params?.id as string;

    // state form
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [categories, setCategories] = useState<Category[]>([]);
    const [content, setContent] = useState("");
    const [thumbnail, setThumbnail] = useState<File | null>(null);
    const [thumbnailUrl, setThumbnailUrl] = useState<string>(""); // simpan url lama
    const [showPreview, setShowPreview] = useState(false);
    const [loading, setLoading] = useState(false);

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

    // fetch artikel lama
    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const data: Article = await fetchArticleById(articleId);

                setTitle(data.title);
                setContent(data.content);
                setCategory(data.category?.id || "");
                setThumbnailUrl(data.imageUrl || "");
            } catch (error) {
                console.error("Failed to fetch article", error);
            }
        };
        if (articleId) fetchArticle();
    }, [articleId]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            let finalThumbnailUrl = thumbnailUrl;

            // upload baru jika user pilih file baru
            if (thumbnail) {
                console.log("Uploading new thumbnail...");
                const imgRes = await uploadImage(thumbnail);
                finalThumbnailUrl = imgRes.imageUrl;
                console.log("Thumbnail uploaded:", finalThumbnailUrl);
            }

            const updated = await updateArticle(articleId, {
                title,
                content,
                categoryId: category,
                imageUrl: finalThumbnailUrl || undefined,
            });

            console.log("Artikel berhasil diupdate:", updated);
            alert("Artikel berhasil diupdate!");
            router.push("/articles");
        } catch (error) {
            console.error("Error updating article:", error);
            alert("Gagal update artikel");
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
                <h1 className="text-xl font-semibold">Edit Articles</h1>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Thumbnail */}
                <ThumbnailUploader value={thumbnail} onChange={setThumbnail} initialUrl={thumbnailUrl} />

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
                        className="px-4 py-2 bg-green-600 text-white rounded-lg disabled:opacity-50"
                    >
                        {loading ? "Updating..." : "Update"}
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
