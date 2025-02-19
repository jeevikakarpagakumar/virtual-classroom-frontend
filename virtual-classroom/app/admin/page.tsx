"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, BookOpen, BarChart3 } from "lucide-react";

export default function AdminPage() {
  return (
    <div className="p-6">
      {/* Move the Title inside the page */}
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Admin Dashboard</h2>
        <p className="text-lg text-gray-600 mt-1">
          Manage courses, users, and system settings efficiently.
        </p>
      </div>

      {/* Admin Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Course Management */}
        <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
          <CardHeader className="flex items-center space-x-4">
            <BookOpen className="w-8 h-8 text-blue-600" />
            <CardTitle className="text-lg font-semibold">Course Management</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Create, edit, and organize all courses seamlessly.</p>
          </CardContent>
        </Card>

        {/* User Management */}
        <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
          <CardHeader className="flex items-center space-x-4">
            <Users className="w-8 h-8 text-green-600" />
            <CardTitle className="text-lg font-semibold">User Management</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Monitor and manage students and instructors.</p>
          </CardContent>
        </Card>

        {/* Reports & Analytics */}
        <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
          <CardHeader className="flex items-center space-x-4">
            <BarChart3 className="w-8 h-8 text-purple-600" />
            <CardTitle className="text-lg font-semibold">Reports & Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Gain insights into platform performance and usage.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
