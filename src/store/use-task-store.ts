import { create } from "zustand";
import { persist } from "zustand/middleware";

import { Task } from "@/types/index";

interface TaskStore {
  tasks: Task[];
  searchQuery: string;
  filteredTasks: Task[];
  setTasks: (tasks: Task[]) => void;
  moveTask: (taskId: string, newStatus: Task["status"]) => void;
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
        set({ tasks, filteredTasks: tasks });
      },
      moveTask: (taskId, newStatus) => {
        const { tasks } = get();
        const updatedTasks = tasks.map((task) =>
          task.id === taskId ? { ...task, status: newStatus } : task
        );
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
