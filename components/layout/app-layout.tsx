import Sidebar from "./sidebar";
import Header from "./header";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex-1">
        <Header />
        <main>{children}</main>
      </div>
    </div>
  );
}