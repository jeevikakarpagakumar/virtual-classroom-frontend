"use client";

import Link from "next/link";
import { Home as HomeIcon, UserCog } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className="w-64 h-screen bg-white dark:bg-gray-800 shadow-md p-4">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Menu</h2>
        <nav className="mt-4 space-y-4">
          <Link href="/" className="flex items-center p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700">
            <HomeIcon className="w-5 h-5 mr-3" /> Home
          </Link>
          <Link href="/admin" className="flex items-center p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700">
            <UserCog className="w-5 h-5 mr-3" /> Admin
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Welcome to Virtual Classroom</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mt-4">
          Start your learning journey here.
        </p>

        {/* Basic Features */}
        <div className="mt-6 space-y-4">
          <div className="p-4 bg-white dark:bg-gray-800 rounded-md shadow-md">
            📚 <strong>Course Management:</strong> Enroll in and manage your courses.
          </div>
          <div className="p-4 bg-white dark:bg-gray-800 rounded-md shadow-md">
            🎥 <strong>Live Sessions:</strong> Join live classes and discussions.
          </div>
          <div className="p-4 bg-white dark:bg-gray-800 rounded-md shadow-md">
            📖 <strong>Resources:</strong> Access course materials and assignments.
          </div>
          <div className="p-4 bg-white dark:bg-gray-800 rounded-md shadow-md">
            💬 <strong>Community:</strong> Interact with peers and instructors.
          </div>
        </div>
      </main>
    </div>
  );
}
