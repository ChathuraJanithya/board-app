import { create } from "zustand";
import { persist } from "zustand/middleware";

import { Task } from "@/types";

interface TaskStore {
  tasks: Task[];
  searchQuery: string;
  filteredTasks: Task[];
  setTasks: (tasks: Task[]) => void;
  moveTask: (
    taskId: string,
    newStatus: Task["status"],
    newOrder?: number
  ) => void;
  reorderTask: (taskId: string, newOrder: number) => void;
  setSearchQuery: (query: string) => void;
  filterTasks: () => void;
}

export const useTaskStore = create<TaskStore>()(
  persist(
    (set, get) => ({
      tasks: [],
      searchQuery: "",
      filteredTasks: [],
      setTasks: (tasks) => {
        // Ensure tasks have order property
        const tasksWithOrder = tasks.map((task, index) => ({
          ...task,
          order: task.order ?? index,
        }));
        set({ tasks: tasksWithOrder, filteredTasks: tasksWithOrder });
      },
      moveTask: (taskId, newStatus, newOrder) => {
        const { tasks } = get();
        const taskToMove = tasks.find((task) => task.id === taskId);
        if (!taskToMove) return;

        // Get tasks in the target status (excluding the task being moved)
        const tasksInNewStatus = tasks
          .filter((task) => task.status === newStatus && task.id !== taskId)
          .sort((a, b) => a.order - b.order);

        // Determine the final order
        const finalOrder =
          newOrder !== undefined ? newOrder : tasksInNewStatus.length;

        // Update all tasks
        const updatedTasks = tasks.map((task) => {
          if (task.id === taskId) {
            // Update the moved task
            return { ...task, status: newStatus, order: finalOrder };
          }

          if (task.status === newStatus && task.id !== taskId) {
            // Adjust order of existing tasks in the target status
            if (task.order >= finalOrder) {
              return { ...task, order: task.order + 1 };
            }
          }

          if (task.status === taskToMove.status && task.id !== taskId) {
            // Adjust order of remaining tasks in the original status
            if (task.order > taskToMove.order) {
              return { ...task, order: task.order - 1 };
            }
          }

          return task;
        });

        set({ tasks: updatedTasks });
        get().filterTasks();
      },
      reorderTask: (taskId, newOrder) => {
        const { tasks } = get();
        const taskToReorder = tasks.find((task) => task.id === taskId);
        if (!taskToReorder) return;

        const tasksInSameStatus = tasks
          .filter((task) => task.status === taskToReorder.status)
          .sort((a, b) => a.order - b.order);

        const oldIndex = tasksInSameStatus.findIndex(
          (task) => task.id === taskId
        );
        const newIndex = Math.max(
          0,
          Math.min(newOrder, tasksInSameStatus.length - 1)
        );

        if (oldIndex === newIndex) return;

        const updatedTasks = tasks.map((task) => {
          if (task.status !== taskToReorder.status) return task;

          if (task.id === taskId) {
            return { ...task, order: newIndex };
          }

          const currentIndex = tasksInSameStatus.findIndex(
            (t) => t.id === task.id
          );

          if (oldIndex < newIndex) {
            // Moving down
            if (currentIndex > oldIndex && currentIndex <= newIndex) {
              return { ...task, order: currentIndex - 1 };
            }
          } else {
            // Moving up
            if (currentIndex >= newIndex && currentIndex < oldIndex) {
              return { ...task, order: currentIndex + 1 };
            }
          }

          return task;
        });

        set({ tasks: updatedTasks });
        get().filterTasks();
      },
      setSearchQuery: (query) => {
        set({ searchQuery: query });
        get().filterTasks();
      },
      filterTasks: () => {
        const { tasks, searchQuery } = get();
        if (!searchQuery.trim()) {
          set({ filteredTasks: tasks });
        } else {
          const filtered = tasks.filter(
            (task) =>
              task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              task.category.toLowerCase().includes(searchQuery.toLowerCase())
          );
          set({ filteredTasks: filtered });
        }
      },
    }),
    {
      name: "task-storage",
    }
  )
);
