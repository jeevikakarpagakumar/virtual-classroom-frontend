"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, ClipboardList, CalendarDays, Users, BarChart3 } from "lucide-react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function TeacherDashboard() {
  const router = useRouter();
  const [courses, setCourses] = useState<string[]>([]);
  const [studentProgress, setStudentProgress] = useState<any>(null);

  useEffect(() => {
    setCourses(["AI Fundamentals", "Web Development", "Data Science", "Cybersecurity", "Cloud Computing"]);
    setStudentProgress({
      labels: ["AI Fundamentals", "Web Development", "Data Science", "Cybersecurity", "Cloud Computing"],
      datasets: [
        {
          label: "Average Student Progress (%)",
          data: [75, 60, 45, 70, 55],
          backgroundColor: ["#4F46E5", "#10B981", "#F59E0B", "#EF4444", "#6366F1"],
        },
      ],
    });
  }, []);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Teacher Dashboard</h2>
        <p className="text-lg text-gray-600 mt-1">Manage your courses, track student progress, and organize your schedule.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card className="border shadow-sm p-4">
          <CardHeader className="flex items-center space-x-4">
            <BookOpen className="w-8 h-8 text-green-600" />
            <CardTitle className="text-lg font-semibold">Courses You Teach</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              {courses.map((course, index) => (
                <li key={index}>{course}</li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="border shadow-sm p-4">
          <CardHeader className="flex items-center space-x-4">
            <CalendarDays className="w-8 h-8 text-blue-600" />
            <CardTitle className="text-lg font-semibold">Class Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <FullCalendar plugins={[dayGridPlugin]} initialView="dayGridMonth" />
          </CardContent>
        </Card>
      </div>

      {studentProgress && (
        <Card className="border shadow-sm p-4">
          <CardHeader className="flex items-center space-x-4">
            <BarChart3 className="w-8 h-8 text-purple-600" />
            <CardTitle className="text-lg font-semibold">Student Progress Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <Bar data={studentProgress} />
          </CardContent>
        </Card>
      )}

      <div className="mt-8">
        <Card className="border shadow-sm p-4">
          <CardHeader className="flex items-center space-x-4">
            <ClipboardList className="w-8 h-8 text-indigo-600" />
            <CardTitle className="text-lg font-semibold">Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Graded final projects for "Web Development".</li>
              <li>Updated syllabus for "AI Fundamentals".</li>
              <li>Scheduled guest lecture on "Cloud Security".</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
