"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Home,
  PlusCircle,
  Pencil,
  User,
  ChevronLeft,
  ChevronRight,
  Book,
  UserPlus,
  UserPenIcon,
  Bell,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import secureLocalStorage from "react-secure-storage";

export default function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const router = useRouter();

  const handleLogout = () => {
    secureLocalStorage.clear(); // ✅ Clear all stored data
    router.push("/login"); // ✅ Redirect to login
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
          href="/admin"
          className="flex items-center p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          <Home className="w-5 h-5 mr-3" /> {isSidebarOpen && "Home"}
        </Link>
        <Link
          href="/create-course"
          className="flex items-center p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          <PlusCircle className="w-5 h-5 mr-3" />{" "}
          {isSidebarOpen && "Create Course"}
        </Link>
        <Link
          href="/edit-course"
          className="flex items-center p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          <Pencil className="w-5 h-5 mr-3" /> {isSidebarOpen && "Edit Course"}
        </Link>
        <Link
          href="/view-course"
          className="flex items-center p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          <Book className="w-5 h-5 mr-3" /> {isSidebarOpen && "View Course"}
        </Link>
        <Link
          href="/assign-faculty"
          className="flex items-center p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          <UserPlus className="w-5 h-5 mr-3" />{" "}
          {isSidebarOpen && "Assign Faculty"}
        </Link>
        <Link
          href="/enroll-students"
          className="flex items-center p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          <UserPenIcon className="w-5 h-5 mr-3" />{" "}
          {isSidebarOpen && "Enroll Students"}
        </Link>
        <Link
          href="/"
          className="flex items-center p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          <Bell className="w-5 h-5 mr-3" /> {isSidebarOpen && "Announcements"}
        </Link>
      </nav>

      {/* Account Details & Logout at Bottom */}
      <div className="p-4 border-t border-gray-300 dark:border-gray-700">
        {/* ✅ Account Details */}
        <Link
          href="/admin/account"
          className="flex items-center p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          <User className="w-5 h-5 mr-3" /> {isSidebarOpen && "Account Details"}
        </Link>

        {/* ✅ Logout */}
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
