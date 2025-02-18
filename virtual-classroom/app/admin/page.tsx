"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Home, PlusCircle, Pencil, User, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className={`h-screen bg-white dark:bg-gray-800 shadow-md transition-all duration-300 ${isSidebarOpen ? "w-64" : "w-16"} relative`}>
        {/* Sidebar Toggle Button */}
        <Button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
          variant="ghost" 
          className="absolute -right-5 top-6 bg-gray-300 dark:bg-gray-700 rounded-full p-1"
        >
          {isSidebarOpen ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
        </Button>

        <nav className="p-4 space-y-4 mt-10">
          <Link href="/" className="flex items-center p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700">
            <Home className="w-5 h-5 mr-3" /> {isSidebarOpen && "Home"}
          </Link>
          <Link href="/create-course" className="flex items-center p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700">
            <PlusCircle className="w-5 h-5 mr-3" /> {isSidebarOpen && "Create New Course"}
          </Link>
          <Link href="/edit-course" className="flex items-center p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700">
            <Pencil className="w-5 h-5 mr-3" /> {isSidebarOpen && "Edit Course"}
          </Link>
        </nav>

        {/* Account Details at Bottom */}
        <div className="absolute bottom-4 w-full p-4">
          <Link href="/admin/account" className="flex items-center p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700">
            <User className="w-5 h-5 mr-3" /> {isSidebarOpen && "Account Details"}
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}
