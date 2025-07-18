"use client";

import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

import { Task } from "@/types/index";
import { useTaskStore } from "@/store/use-task-store";

import {
  DndContext,
  DragOverlay,
  type DragEndEvent,
  type DragStartEvent,
  type DragOverEvent,
  PointerSensor,
  useSensor,
  useSensors,
  rectIntersection,
} from "@dnd-kit/core";

import { Swimlanes } from "@/constants";
import { Swimlane } from "@/components/Swimlane";
import { TaskCard } from "@/components/TaskCard";
import { ProjectHeader } from "@/components/ProjectHeader";

export function Dashboard() {
  const { filteredTasks, moveTask, setTasks } = useTaskStore();
  const [activeId, setActiveId] = useState<string | null>(null);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [mounted, setMounted] = useState<boolean>(false);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3,
      },
    })
  );

  useEffect(() => {
    setMounted(true);
    // Load initial data
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

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;

    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    // Find the active task
    const activeTask = filteredTasks.find((task) => task.id === activeId);
    if (!activeTask) return;

    // Check if we're hovering over a swimlane
    const swimlaneStatuses = ["To Do", "In Progress", "Approved", "Reject"];
    const isOverSwimlane = swimlaneStatuses.includes(overId);

    if (isOverSwimlane) {
      // Moving to a different swimlane
      if (activeTask.status !== overId) {
        moveTask(activeId, overId as Task["status"]);
      }
    } else {
      // Check if we're hovering over another task
      const overTask = filteredTasks.find((task) => task.id === overId);
      if (overTask && activeTask.status !== overTask.status) {
        // Move to the same status as the task we're hovering over
        moveTask(activeId, overTask.status);
      }
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    setActiveId(null);
    setActiveTask(null);

    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    if (activeId === overId) return;

    const activeTask = filteredTasks.find((task) => task.id === activeId);
    if (!activeTask) return;

    // Check if dropping on a swimlane
    const swimlaneStatuses = ["To Do", "In Progress", "Approved", "Reject"];
    if (swimlaneStatuses.includes(overId)) {
      const tasksInTargetColumn = filteredTasks
        .filter((task) => task.status === overId && task.id !== activeId)
        .sort((a, b) => a.order - b.order);

      moveTask(activeId, overId as Task["status"], tasksInTargetColumn.length);
      return;
    }

    // Dropping on another task
    const overTask = filteredTasks.find((task) => task.id === overId);
    if (!overTask) return;

    const tasksInTargetColumn = filteredTasks
      .filter((task) => task.status === overTask.status && task.id !== activeId)
      .sort((a, b) => a.order - b.order);

    const overIndex = tasksInTargetColumn.findIndex(
      (task) => task.id === overId
    );
    const insertIndex = overIndex >= 0 ? overIndex : tasksInTargetColumn.length;

    moveTask(activeId, overTask.status, insertIndex);
  };
  return (
    <div className="h-full flex w-full overflow-hidden flex-col bg-gray-50">
      <ProjectHeader />
      <div className="flex-1 overflow-hidden ">
        <DndContext
          sensors={sensors}
          collisionDetection={rectIntersection}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          <div className="h-full overflow-x-auto overflow-y-hidden">
            <div className="flex h-full min-w-max">
              {Swimlanes.map((swimlane) => (
                <Swimlane
                  key={swimlane.status}
                  title={swimlane.title}
                  status={swimlane.status}
                  tasks={filteredTasks
                    .filter((task) => task.status === swimlane.status)
                    .sort((a, b) => a.order - b.order)}
                  color={swimlane.color}
                  activeId={activeId}
                />
              ))}
            </div>
          </div>
          {mounted &&
            createPortal(
              <DragOverlay dropAnimation={null}>
                {activeTask ? (
                  <div className="rotate-2 scale-105 shadow-2xl opacity-95">
                    <TaskCard task={activeTask} isDragOverlay />
                  </div>
                ) : null}
              </DragOverlay>,
              document.body
            )}
        </DndContext>
      </div>
    </div>
  );
}
