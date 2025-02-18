"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Home as HomeIcon, Book, UserCog, ChevronLeft, ChevronRight, Video, FileText, Users } from "lucide-react";
import Link from "next/link";

export default function Home() {
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
            <HomeIcon className="w-5 h-5 mr-3" /> {isSidebarOpen && "Home"}
          </Link>
          <Link href="/view-course" className="flex items-center p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700">
            <Book className="w-5 h-5 mr-3" /> {isSidebarOpen && "View Courses"}
          </Link>
          <Link href="/admin" className="flex items-center p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700">
            <UserCog className="w-5 h-5 mr-3" /> {isSidebarOpen && "Admin"}
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white">Welcome to Virtual Classroom</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mt-4">
          Transform your learning experience with interactive courses, live discussions, and resourceful study materials.
        </p>

        {/* Features Section */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-white dark:bg-gray-800 rounded-md shadow-md flex items-center space-x-4">
            <Book className="w-10 h-10 text-blue-500" />
            <div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Course Management</h3>
              <p className="text-gray-600 dark:text-gray-300">Enroll in and manage your courses effortlessly.</p>
            </div>
          </div>

          <div className="p-6 bg-white dark:bg-gray-800 rounded-md shadow-md flex items-center space-x-4">
            <Video className="w-10 h-10 text-green-500" />
            <div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Live Sessions</h3>
              <p className="text-gray-600 dark:text-gray-300">Join real-time classes and discussions with instructors.</p>
            </div>
          </div>

          <div className="p-6 bg-white dark:bg-gray-800 rounded-md shadow-md flex items-center space-x-4">
            <FileText className="w-10 h-10 text-purple-500" />
            <div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Study Materials</h3>
              <p className="text-gray-600 dark:text-gray-300">Access books, notes, and assignments at any time.</p>
            </div>
          </div>

          <div className="p-6 bg-white dark:bg-gray-800 rounded-md shadow-md flex items-center space-x-4">
            <Users className="w-10 h-10 text-orange-500" />
            <div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Community Interaction</h3>
              <p className="text-gray-600 dark:text-gray-300">Engage with peers and experts in a collaborative space.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
