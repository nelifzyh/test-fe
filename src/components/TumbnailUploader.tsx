"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ImagePlus } from "lucide-react";

interface Props {
    value: File | null;
    onChange: (file: File | null) => void;
    initialUrl?: string; // 🔹 tambahin props opsional
}

export default function ThumbnailUploader({ value, onChange, initialUrl }: Props) {
    const [preview, setPreview] = useState<string | null>(null);

    // atur preview kalau ada file baru atau pakai initialUrl dari API
    useEffect(() => {
        if (value) {
            const url = URL.createObjectURL(value);
            setPreview(url);
            return () => URL.revokeObjectURL(url);
        } else if (initialUrl) {
            setPreview(initialUrl);
        } else {
            setPreview(null);
        }
    }, [value, initialUrl]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            onChange(e.target.files[0]);
            setPreview(URL.createObjectURL(e.target.files[0]));
        }
    };

    return (
        <div>
            <label className="block text-sm font-medium mb-2">Thumbnails</label>
            {preview ? (
                <div className="w-56 border rounded-lg overflow-hidden">
                    <Image
                        src={preview}
                        alt="Thumbnail Preview"
                        className="w-full h-40 object-cover"
                        width={300}
                        height={160}
                    />
                    <div className="flex gap-4 py-2 text-sm justify-center">
                        <label
                            htmlFor="thumbnail"
                            className="text-blue-600 cursor-pointer hover:underline"
                        >
                            Change
                        </label>
                        <button
                            type="button"
                            className="text-red-600 hover:underline"
                            onClick={() => {
                                onChange(null);
                                setPreview(null);
                            }}
                        >
                            Delete
                        </button>
                    </div>
                    <input
                        id="thumbnail"
                        type="file"
                        accept="image/png, image/jpeg"
                        onChange={handleFileChange}
                        className="hidden"
                    />
                </div>
            ) : (
                <label
                    htmlFor="thumbnail"
                    className="w-56 h-40 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:border-blue-500"
                >
                    <ImagePlus className="w-8 h-8 text-gray-400 mb-2" />
                    <span className="text-blue-600 text-sm font-medium">
                        Click to select files
                    </span>
                    <span className="text-xs text-gray-500 mt-1">
                        Support File Type : jpg or png
                    </span>
                    <input
                        id="thumbnail"
                        type="file"
                        accept="image/png, image/jpeg"
                        onChange={handleFileChange}
                        className="hidden"
                    />
                </label>
            )}
        </div>
    );
}
