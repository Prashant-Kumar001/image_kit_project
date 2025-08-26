import Sidebar from "@/components/adminSidebar";
import Header from "@/components/navbar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex font-poppins bg-gray-50 max-h-screen overflow-hidden ">
      <aside className=" bg-white ">
        <Sidebar />
      </aside>
      <div className="flex-1 overflow-scroll   ">
        <Header />
        {children}
      </div>
    </main>
  );
}
