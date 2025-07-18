"use client";

import { Task } from "@/types";

import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { SortableTaskCard } from "./SortableTaskCard";

import clsx from "clsx";
import { Ellipsis, Plus } from "lucide-react";

interface SwimlaneProps {
  title: string;
  status: Task["status"];
  tasks: Task[];
  color: string;
  activeId: string | null;
}

export function Swimlane({ title, status, tasks, activeId }: SwimlaneProps) {
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

  const taskIds = tasks.map((task) => task.id);

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
          isOver && activeId
            ? "bg-blue-50 border-2 border-blue-300 border-dashed rounded-b-lg"
            : ""
        }`}
        style={{ minHeight: "200px" }}
      >
        <SortableContext items={taskIds} strategy={verticalListSortingStrategy}>
          <div className="space-y-4">
            {tasks.map((task) => (
              <SortableTaskCard key={task.id} task={task} />
            ))}
          </div>
        </SortableContext>

        {tasks.length === 0 && (
          <div className="text-center text-gray-400 py-8">
            <p className="text-sm">No tasks</p>
            {isOver && activeId && (
              <div className="mt-4 p-4 border-2 border-blue-300 border-dashed rounded-lg bg-blue-50">
                <p className="text-blue-600 text-sm">Drop task here</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
