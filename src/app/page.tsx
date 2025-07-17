import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";

import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <div className="h-dvh flex flex-col w-full bg-gray-50">
      <Header />
      <div className=" w-full h-full flex">
        <Sidebar />
      </div>
    </div>
  );
}
