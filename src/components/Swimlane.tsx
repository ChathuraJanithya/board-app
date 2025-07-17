"use client";

import { Task } from "@/types";
import { Plus } from "lucide-react";
import { TaskCard } from "./TaskCard";
import { useDroppable } from "@dnd-kit/core";

import { Ellipsis } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import clsx from "clsx";

interface SwimlaneProps {
  title: string;
  status: Task["status"];
  tasks: Task[];
  color: string;
}

export function Swimlane({ title, status, tasks, color }: SwimlaneProps) {
  const { isOver, setNodeRef } = useDroppable({
    id: status,
  });

  const getHeaderStyle = () => {
    switch (status) {
      case "To Do":
        return "bg-[#E6E8EC]  text-black";
      case "In Progress":
        return "bg-[#FFA800]  text-black";
      case "Approved":
        return "bg-[#AEE753]  text-black";
      case "Reject":
        return "bg-[#F90430] text-white";
      default:
        return "bg-gray-300  text-black";
    }
  };

  return (
    <div className="flex flex-col w-80 flex-shrink-0 h-full bg-white border border-r border-gray-100 relative">
      {/* Header */}
      <div
        className={`flex items-center justify-between px-4 py-3 flex-shrink-0`}
      >
        <Badge className={clsx("font-medium text-sm ", getHeaderStyle())}>
          {title}
        </Badge>
        <div className="flex items-center gap-1">
          <Button variant={"ghost"}>
            <Plus className="w-4 h-4" />
          </Button>
          <Button variant={"ghost"}>
            <Ellipsis className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Content Area */}
      <div
        ref={setNodeRef}
        className={`flex-1 p-4 pb-32 bg-gray-50 rounded-b-lg space-y-4 overflow-y-auto no-scrollbar relative ${
          isOver
            ? "bg-blue-50 border-2 border-blue-300 border-dashed rounded-b-lg"
            : ""
        }`}
      >
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
        {tasks.length === 0 && (
          <div className="text-center text-gray-400 py-8">
            <p className="text-sm">No tasks</p>
          </div>
        )}
      </div>
    </div>
  );
}
