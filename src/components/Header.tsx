"use client";

import { useTaskStore } from "@/store/use-task-store";

import { Search, Plus, Bell, Settings } from "lucide-react";

export function Header() {
  const { searchQuery, setSearchQuery } = useTaskStore();
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 flex-shrink-0">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
              <span className="text-white text-xs font-bold">B</span>
            </div>
            <span className="font-semibold text-gray-900">Board</span>
            <span className="text-blue-600 font-medium">App</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors">
            <span className="text-sm font-medium">Create new board</span>
            <Plus className="w-4 h-4" />
          </button>

          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64 text-sm"
            />
          </div>

          <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
            <Settings className="w-5 h-5" />
          </button>

          <button className="p-2 text-gray-400 hover:text-gray-600 relative transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </button>

          <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-bold">J</span>
          </div>
        </div>
      </div>
    </header>
  );
}
