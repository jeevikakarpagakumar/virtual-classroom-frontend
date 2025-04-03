"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, BookOpen, BarChart3, ClipboardList, CheckCircle, UserPlus, UserCheck } from "lucide-react";
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from "chart.js";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

export default function AdminDashboard() {
  const router = useRouter();
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalCourses, setTotalCourses] = useState(0);
  const [activeCourses, setActiveCourses] = useState(0);
  const [studentsPerCourse, setStudentsPerCourse] = useState<any>(null);
  const [studentLevels, setStudentLevels] = useState<any>(null);

  useEffect(() => {
    setTotalUsers(320);
    setTotalCourses(45);
    setActiveCourses(30);

    setStudentsPerCourse({
      labels: ["AI", "Web Dev", "Data Science", "Cybersecurity", "Cloud Computing"],
      datasets: [
        {
          label: "Students Enrolled",
          data: [120, 95, 75, 60, 50],
          backgroundColor: ["#4F46E5", "#10B981", "#F59E0B", "#EF4444", "#6366F1"],
        },
      ],
    });

    setStudentLevels({
      labels: ["Beginner", "Intermediate", "Advanced"],
      datasets: [
        {
          label: "Student Levels",
          data: [150, 120, 50],
          backgroundColor: ["#34D399", "#FBBF24", "#EF4444"],
        },
      ],
    });
  }, []);

  return (
    <div className="p-6">

      {/* Page Header */}
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Admin Dashboard</h2>
        <p className="text-lg text-gray-600 mt-1">Manage courses, users, and system settings efficiently.</p>
      </div>

      {/* Assign Role Card */}
      <Card className="border shadow-sm p-4 mb-6">
        <CardHeader className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <UserCheck className="w-8 h-8 text-blue-600" />
            <CardTitle className="text-lg font-semibold">Assign Roles</CardTitle>
            <Button onClick={() => router.push("/assign-role")} variant="ghost" className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
            <UserPlus className="w-6 h-6 text-gray-700 dark:text-white" />
          </Button>
          </div>
        </CardHeader>
        <CardContent>
        <p className="text-gray-700 text-center">Assign roles to faculty members, students, and admins.</p>

        </CardContent>
      </Card>

      {/* Admin Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="border shadow-sm p-4">
          <CardHeader className="flex items-center space-x-4">
            <Users className="w-8 h-8 text-blue-600" />
            <CardTitle className="text-lg font-semibold">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{totalUsers}</p>
          </CardContent>
        </Card>

        <Card className="border shadow-sm p-4">
          <CardHeader className="flex items-center space-x-4">
            <BookOpen className="w-8 h-8 text-green-600" />
            <CardTitle className="text-lg font-semibold">Total Courses</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{totalCourses}</p>
          </CardContent>
        </Card>

        <Card className="border shadow-sm p-4">
          <CardHeader className="flex items-center space-x-4">
            <CheckCircle className="w-8 h-8 text-purple-600" />
            <CardTitle className="text-lg font-semibold">Active Courses</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{activeCourses}</p>
          </CardContent>
        </Card>
      </div>

      {/* Graphs & Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {studentsPerCourse && (
          <Card className="border shadow-sm p-4">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Course Enrollment Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <Bar data={studentsPerCourse} />
            </CardContent>
          </Card>
        )}

        {studentLevels && (
          <Card className="border shadow-sm p-4">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Student Level Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <Pie data={studentLevels} />
            </CardContent>
          </Card>
        )}
      </div>

      {/* Recent Activities */}
      <div className="mt-8">
        <Card className="border shadow-sm p-4">
          <CardHeader className="flex items-center space-x-4">
            <ClipboardList className="w-8 h-8 text-indigo-600" />
            <CardTitle className="text-lg font-semibold">System Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Enrollment limits are being enforced.</li>
              <li>Recent increase in AI course enrollments.</li>
              <li>Student engagement levels are rising.</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
