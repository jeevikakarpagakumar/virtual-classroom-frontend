"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Home, ChevronLeft, ChevronRight, User, LogOut, Video } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import secureLocalStorage from "react-secure-storage";

export default function TeacherSidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const router = useRouter();

  const handleLogout = () => {
    secureLocalStorage.clear(); // Clear all stored data
    router.push("/login"); // Redirect to login page
  };

  return (
    <aside
      className={`bg-white dark:bg-gray-800 shadow-md transition-all duration-300 ${
        isSidebarOpen ? "w-64" : "w-16"
      } relative flex flex-col min-h-screen`}
    >
      {/* Sidebar Toggle Button */}
      <Button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        variant="ghost"
        className="absolute -right-5 top-6 bg-gray-300 dark:bg-gray-700 rounded-full p-1"
      >
        {isSidebarOpen ? (
          <ChevronLeft className="w-5 h-5" />
        ) : (
          <ChevronRight className="w-5 h-5" />
        )}
      </Button>

      {/* Sidebar Navigation */}
      <nav className="p-4 space-y-4 mt-10 flex-grow">
        <Link
          href="/"
          className="flex items-center p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          <Home className="w-5 h-5 mr-3" /> {isSidebarOpen && "Home"}
        </Link>
        <Link
          href="/create-quiz"
          className="flex items-center p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          <Home className="w-5 h-5 mr-3" /> {isSidebarOpen && "Create Quiz"}
        </Link>
        <Link
          href="/teacher/create-meet"
          className="flex items-center p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          <Video className="w-5 h-5 mr-3" /> {isSidebarOpen && "Create Meeting"}
        </Link>
      </nav>

      {/* Account Details & Logout at Bottom */}
      <div className="p-4 border-t border-gray-300 dark:border-gray-700">
        {/* Account Details */}
        <Link
          href="/teacher/account"
          className="flex items-center p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          <User className="w-5 h-5 mr-3" /> {isSidebarOpen && "Account Details"}
        </Link>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center p-2 w-full text-red-600 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg mt-2"
        >
          <LogOut className="w-5 h-5 mr-3" /> {isSidebarOpen && "Logout"}
        </button>
      </div>
    </aside>
  );
}
