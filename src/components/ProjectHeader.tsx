import { Link } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export function ProjectHeader() {
  return (
    <div className="flex-shrink-0 p-6 bg-white border-b border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-gray-900">Sport Xi Project</h1>
          <Badge className="bg-[#FFA800]">in progress</Badge>
        </div>
      </div>

      <p className="text-gray-600 mb-4">event production</p>

      <div className="flex items-center gap-6 text-sm text-gray-500">
        <div className="flex items-center gap-3">
          <span>assigned</span>
          <div className="flex -space-x-1">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-6 h-6 bg-gray-300 rounded-full border-2 border-white"
              ></div>
            ))}
            <div className="w-6 h-6 bg-gray-200 rounded-full border-2 border-white flex items-center justify-center text-xs font-medium">
              +2
            </div>
          </div>
        </div>
        <Badge variant={"outline"} className="text-gray-600">
          <span>Manage</span>
          <Link className="w-4 h-4" />
        </Badge>
      </div>
      <Separator className="my-4" />
      <span className="text-gray-500 text-[14px]">
        Last updated on 04 April, 2022
      </span>
    </div>
  );
}
