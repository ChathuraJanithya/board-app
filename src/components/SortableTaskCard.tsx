"use client";

import { Task } from "@/types";

import { TaskCard } from "./TaskCard";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";

interface SortableTaskCardProps {
  task: Task;
}

export function SortableTaskCard({ task }: SortableTaskCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`${isDragging ? "z-50" : ""}`}
    >
      <TaskCard task={task} />
    </div>
  );
}
