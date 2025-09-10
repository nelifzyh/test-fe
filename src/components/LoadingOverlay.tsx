"use client";

import { Loader2 } from "lucide-react";

export default function LoadingOverlay() {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/70 backdrop-blur-sm">
            <div className="flex flex-col items-center">
                <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
                <p className="mt-3 text-sm font-medium text-gray-700">Loading...</p>
            </div>
        </div>
    );
}
