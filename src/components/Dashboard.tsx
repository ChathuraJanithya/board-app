"use client";

import { useEffect, useState } from "react";

import { Task } from "@/types/index";
import { useTaskStore } from "@/store/use-task-store";
import {
  DndContext,
  DragOverlay,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";

import { Swimlanes } from "@/constants";
import { Swimlane } from "@/components/Swimlane";
import { TaskCard } from "@/components/TaskCard";
import { ProjectHeader } from "@/components/ProjectHeader";

export function Dashboard() {
  const { filteredTasks, moveTask, setTasks } = useTaskStore();
  const [activeId, setActiveId] = useState<string | null>(null);
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  // Load initial mock data
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const response = await fetch("/api/tasks");
        const data = await response.json();
        setTasks(data.tasks);
      } catch (error) {
        console.error("Failed to load tasks:", error);
      }
    };

    loadTasks();
  }, [setTasks]);

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveId(active.id as string);
    const task = filteredTasks.find((task) => task.id === active.id);
    setActiveTask(task || null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    setActiveId(null);
    setActiveTask(null);

    if (over && active.id !== over.id) {
      moveTask(active.id as string, over.id as Task["status"]);
    }
  };
  return (
    <div className="h-full flex w-full overflow-hidden flex-col bg-gray-50">
      <ProjectHeader />
      <div className="flex-1 overflow-hidden ">
        <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
          <div className="h-full overflow-x-auto overflow-y-hidden">
            <div className="flex h-full min-w-max">
              {Swimlanes.map((swimlane) => (
                <Swimlane
                  key={swimlane.status}
                  title={swimlane.title}
                  status={swimlane.status}
                  tasks={filteredTasks.filter(
                    (task) => task.status === swimlane.status
                  )}
                  color={swimlane.color}
                />
              ))}
            </div>
          </div>
          <DragOverlay>
            {activeTask ? (
              <div className="rotate-3 scale-105">
                <TaskCard task={activeTask} isDragOverlay />
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  );
}
