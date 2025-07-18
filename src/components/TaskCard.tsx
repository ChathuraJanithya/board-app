"use client";

import { Task } from "@/types";
import { useDraggable } from "@dnd-kit/core";
import {
  Calendar,
  Users,
  Play,
  ImageIcon,
  AlertTriangle,
  Ellipsis,
  Link,
  MessageCircleMore,
} from "lucide-react";
import { Separator } from "./ui/separator";

interface TaskCardProps {
  task: Task;
  isDragOverlay?: boolean;
}

const categoryColors = {
  Research: "bg-green-500",
  Design: "bg-red-500",
  Feedback: "bg-blue-500",
  Other: "bg-gray-500",
  Presentation: "bg-orange-500",
  "UX Research": "bg-yellow-500",
  Interface: "bg-purple-500",
};

export function TaskCard({ task, isDragOverlay = false }: TaskCardProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: task.id,
      disabled: isDragOverlay,
    });

  const style =
    transform && !isDragOverlay
      ? {
          transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        }
      : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...(isDragOverlay ? {} : { ...listeners, ...attributes })}
      className={`bg-white rounded-lg p-4 shadow-sm border border-gray-100 transition-all duration-200 ${
        isDragOverlay
          ? "cursor-grabbing shadow-2xl border-blue-300 z-50"
          : isDragging
          ? "opacity-30 cursor-grabbing"
          : "cursor-grab hover:shadow-md"
      }`}
    >
      {/* Header with category and menu */}
      <div className="flex items-start justify-between mb-1">
        <div className="flex items-center gap-2">
          <div
            className={`w-2 h-2 rounded-[1.5px] ${
              categoryColors[task.category as keyof typeof categoryColors] ||
              "bg-gray-500"
            }`}
          />
          <span className="text-xs text-gray-400 font-medium">
            {task.category}
          </span>
        </div>

        <Ellipsis className="w-4 h-4  text-gray-400" />
      </div>

      {/* Task title */}
      <h3 className="font-semibold text-gray-900 mb-3 text-sm leading-tight">
        {task.title}
      </h3>

      {/* Assignees */}
      <div className="flex items-center gap-2 mb-3">
        <div className="flex -space-x-2">
          {task.assignees.slice(0, 2).map((assignee) => (
            <div key={assignee.id} className="relative">
              <div className="w-6 h-6 bg-gray-300 rounded-full border-2 border-white flex items-center justify-center">
                <span className="text-xs font-medium text-gray-600">
                  {assignee.name.charAt(0)}
                </span>
              </div>
            </div>
          ))}
          {task.assignees.length > 2 && (
            <div className="w-6 h-6 bg-gray-200 rounded-full border-2 border-white flex items-center justify-center">
              <span className="text-xs font-medium text-gray-600">
                +{task.assignees.length - 2}
              </span>
            </div>
          )}
        </div>
        <span className="text-xs text-gray-500 ml-1">
          {task.assignees[0]?.name}
        </span>
      </div>

      {/* Preview image if exists */}
      {task.hasPreview && (
        <div className="mb-3">
          <div className="w-full h-20 bg-gray-700 rounded-md flex items-center justify-center">
            <ImageIcon className="w-5 h-5 text-gray-400" />
          </div>
        </div>
      )}

      {/* Bottom metadata row */}
      <Separator className="my-2" />
      <div className="flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center gap-3">
          {task.attachments && (
            <div className="flex items-center gap-1">
              <Link className="w-3 h-3" />
              <span>{task.attachments}</span>
            </div>
          )}
          {task.comments && (
            <div className="flex items-center gap-1">
              <MessageCircleMore className="w-3 h-3" />
              <span>{task.comments}</span>
            </div>
          )}
          {task.hasStream && (
            <div className="flex items-center gap-1 text-blue-500">
              <Play className="w-3 h-3" />
              <span>Stream</span>
            </div>
          )}
          {task.hasGroupCall && (
            <div className="flex items-center gap-1 text-blue-500">
              <Users className="w-3 h-3" />
              <span>Group Call</span>
            </div>
          )}
          {task.reports && (
            <div className="flex items-center gap-1 text-red-500">
              <AlertTriangle className="w-3 h-3" />
              <span>{task.reports} Reports</span>
            </div>
          )}
        </div>
        {task.dueDate && (
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            <span>Due: {task.dueDate}</span>
          </div>
        )}
      </div>
    </div>
  );
}
