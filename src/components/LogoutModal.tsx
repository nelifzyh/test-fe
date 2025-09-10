"use client";

interface LogoutModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export default function LogoutModal({ isOpen, onClose, onConfirm }: LogoutModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-96 p-6">
                <h2 className="text-xl font-semibold mb-2">Logout</h2>
                <p className="text-gray-600 mb-6 text-sm">Are you sure want to logout?</p>
                <div className="flex justify-end gap-3 text-sm">
                    <button
                        className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                        onClick={onConfirm}
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
}
