import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Dashboard } from "@/components/Dashboard";

export default function Home() {
  return (
    <div className="h-dvh flex flex-col w-full overflow-hidden bg-gray-50">
      <Header />
      <div className=" w-full h-full flex">
        <Sidebar />
        <Dashboard />
      </div>
    </div>
  );
}
