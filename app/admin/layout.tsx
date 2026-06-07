import Sidebar from "@/components/admin/Sidebar";

export const metadata = { title: "Admin | AI Malayalam" };

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="hidden md:block">
        <Sidebar />
      </div>
      <div className="flex-1 overflow-auto">
        <div className="max-w-6xl mx-auto p-5 lg:p-8">
          {children}
        </div>
      </div>
    </div>
  );
}
