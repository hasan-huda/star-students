"use client";

import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader } from "@/components/ui/sidebar";
import { ChevronLeft, ChevronRight } from "lucide-react"; // Icons for the toggle button

export function AppSidebar({ collapsed, setCollapsed }) {
  return (
    <Sidebar
      className={`bg-gray-900 text-gray-200 shadow-lg transition-all duration-300 ${
        collapsed ? "w-16" : "w-64"
      }`}
    >
      {/* Toggle Button */}
      <div
        className="absolute top-4 right-[-12px] bg-gray-700 p-1 rounded-full cursor-pointer hover:bg-gray-600 transition"
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? (
          <ChevronRight className="text-white" size={20} />
        ) : (
          <ChevronLeft className="text-white" size={20} />
        )}
      </div>

      {/* Sidebar Header */}
      <SidebarHeader className={`p-4 text-xl font-bold border-b border-gray-700 bg-gray-800 ${collapsed ? "hidden" : ""}`}>
        Class Navigation
      </SidebarHeader>

      {/* Sidebar Content */}
      <SidebarContent className="bg-gray-900">
        <SidebarGroup>
          {!collapsed && (
            <p className="p-4 text-sm font-semibold border-b border-gray-700">
              Grade Links
            </p>
          )}
          <ul className="space-y-2 p-4">
            {["Grade 5", "Grade 6", "Grade 7", "Grade 8", "Grade 9", "Grade 12"].map((grade) => (
              <li
                key={grade}
                className={`cursor-pointer hover:bg-gray-700 hover:text-white p-2 rounded-md transition ${
                  collapsed ? "text-center" : ""
                }`}
                onClick={() => alert(`Navigate to ${grade}`)} // Replace with actual navigation
              >
                {collapsed ? grade.slice(-1) : grade}
              </li>
            ))}
          </ul>
        </SidebarGroup>
      </SidebarContent>

      {/* Sidebar Footer */}
      {!collapsed && (
        <SidebarFooter className="p-4 border-t border-gray-700 bg-gray-800">
          <p className="text-xs text-gray-400">Lock In</p>
        </SidebarFooter>
      )}
    </Sidebar>
  );
}
