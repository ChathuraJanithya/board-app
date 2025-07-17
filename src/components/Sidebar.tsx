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
} from "lucide-react";

export function Sidebar() {
  const [boardsExpanded, setBoardsExpanded] = useState(true);

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", active: true },
    {
      icon: Folder,
      label: "Boards",
      expandable: true,
      expanded: boardsExpanded,
      subItems: [
        "Create routes",
        "Deployment React App",
        "Sport Xi Project",
        "Wordpress theme",
      ],
    },
    { icon: MessageCircle, label: "Messages", badge: 3 },
    { icon: Calendar, label: "Calendar" },
    { icon: Users, label: "Team members" },
    { icon: HelpCircle, label: "Support" },
  ];

  return (
    <div className=" w-60 lg:w-72 bg-white border-r border-gray-200 flex flex-col flex-shrink-0 h-full">
      <div className="p-6 flex-shrink-0">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-bold">B</span>
          </div>
          <span className="text-sm text-gray-600">workspace</span>
          <ChevronDown className="w-4 h-4 text-gray-400 ml-auto" />
        </div>
        <div className="text-sm font-medium text-gray-900">Root folder</div>
      </div>

      <nav className="flex-1 px-4 overflow-y-auto">
        {menuItems.map((item, index) => (
          <div key={index} className="mb-1">
            <div
              className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer ${
                item.active
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
              onClick={() => {
                if (item.expandable) {
                  setBoardsExpanded(!boardsExpanded);
                }
              }}
            >
              <item.icon className="w-5 h-5" />
              <span className="flex-1">{item.label}</span>
              {item.badge && (
                <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                  {item.badge}
                </span>
              )}
              {item.expandable &&
                (item.expanded ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                ))}
            </div>
            {item.expandable && item.expanded && item.subItems && (
              <div className="ml-8 mt-1 space-y-1">
                {item.subItems.map((subItem, subIndex) => (
                  <div
                    key={subIndex}
                    className={`px-3 py-1 text-sm rounded cursor-pointer ${
                      subItem === "Sport Xi Project"
                        ? "text-blue-600 font-medium"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {subItem}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-200 flex-shrink-0">
        <div className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg cursor-pointer">
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </div>
      </div>
    </div>
  );
}
