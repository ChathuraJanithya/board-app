"use client";

import { useState } from "react";
import {
  LayoutDashboard,
  Folder,
  MessageCircle,
  Calendar,
  Users,
  HelpCircle,
  LogOut,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  Play,
} from "lucide-react";
import { BoardItems } from "@/constants";
import clsx from "clsx";

export function Sidebar() {
  const [boardsExpanded, setBoardsExpanded] = useState(true);

  return (
    <div className="w-60 lg:w-72 overflow-y-auto bg-white border-r border-gray-200 flex flex-col flex-shrink-0 h-full">
      {/* Header Section */}
      <div className="p-6 flex-shrink-0">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center">
              <Play className="w-5 h-5 text-white fill-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-gray-400 font-normal">
                workspace
              </span>
              <span className="text-lg font-semibold text-gray-900">
                Root folder
              </span>
            </div>
          </div>
          <ChevronDown className="w-5 h-5 text-gray-400" />
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-6 overflow-y-auto">
        <div className="space-y-1">
          {/* Dashboard */}
          <div className="flex items-center gap-4 p-3 text-gray-600 hover:text-gray-900 cursor-pointer">
            <LayoutDashboard className="w-5 h-5" />
            <span className="text-base font-normal">Dashboard</span>
          </div>

          {/* Boards */}
          <div className="">
            <div
              className={clsx(
                "flex items-center gap-4 p-3  text-blue-600 cursor-pointer",
                boardsExpanded && " border rounded-[10px] border-gray-200"
              )}
              onClick={() => setBoardsExpanded(!boardsExpanded)}
            >
              <Folder className="w-5 h-5" />
              <span className="flex-1 text-base font-normal">Boards</span>
              {boardsExpanded ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </div>

            {boardsExpanded && (
              <div className=" p-3 mt-2 border border-gray-100 rounded-[10px] ">
                {BoardItems.map((item, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-4 px-0 py-2 cursor-pointer ${
                      item.active
                        ? "text-blue-600"
                        : "text-gray-400 hover:text-gray-600"
                    }`}
                  >
                    <ChevronRight className="w-4 h-4" />
                    <span className="text-base font-normal">{item.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Messages */}
          <div className="flex items-center gap-4 p-3 text-gray-600 hover:text-gray-900 cursor-pointer">
            <MessageCircle className="w-5 h-5" />
            <span className="flex-1 text-base font-normal">Messages</span>
            <span className="bg-orange-500 text-white text-sm rounded-full px-2 py-0.5 min-w-[24px] text-center font-medium">
              3
            </span>
          </div>

          {/* Calendar */}
          <div className="flex items-center gap-4 p-3 text-gray-600 hover:text-gray-900 cursor-pointer">
            <Calendar className="w-5 h-5" />
            <span className="text-base font-normal">Calendar</span>
          </div>

          {/* Team members */}
          <div className="flex items-center gap-4 p-3 text-gray-600 hover:text-gray-900 cursor-pointer">
            <Users className="w-5 h-5" />
            <span className="text-base font-normal">Team members</span>
          </div>
        </div>
      </nav>

      {/* Bottom Section */}
      <div className="p-3 mt-auto space-y-4">
        {/* Support */}
        <div className="flex items-center gap-4 px-0 py-2 text-gray-600 hover:text-gray-900 cursor-pointer">
          <HelpCircle className="w-5 h-5" />
          <span className="text-base font-normal">Support</span>
        </div>

        {/* Logout Button */}
        <button className="w-full bg-gray-800 text-white rounded-lg px-4 py-3 flex items-center gap-3 hover:bg-gray-700 transition-colors">
          <LogOut className="w-5 h-5" />
          <span className="text-base font-normal">Logout</span>
        </button>
      </div>
    </div>
  );
}
