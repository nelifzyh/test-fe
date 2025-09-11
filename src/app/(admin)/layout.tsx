import Sidebar from "@/components/Sidebar";
import TopNavbar from "@/components/TopNavbar";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex">
            {/* Sidebar */}
            <Sidebar />

            {/* Main content */}
            <div className="ml-56 flex-1 flex flex-col min-h-screen">
                <TopNavbar />
                <main className="p-6 bg-gray-100 flex-1">{children}</main>
            </div>
        </div>
    );
}
