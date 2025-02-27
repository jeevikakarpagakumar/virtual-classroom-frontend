"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, ClipboardList, CalendarDays } from "lucide-react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { useRouter } from "next/navigation";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function StudentDashboard() {
  const router = useRouter();
  const [enrolledCourses, setEnrolledCourses] = useState<string[]>([]);
  const [progressData, setProgressData] = useState<any>(null);

  useEffect(() => {
    setEnrolledCourses(["AI", "Web Dev", "Data Science", "Cybersecurity", "Cloud Computing"]);
    setProgressData({
      labels: ["AI", "Web Dev", "Data Science", "Cybersecurity", "Cloud Computing"],
      datasets: [
        {
          label: "Progress (%)",
          data: [80, 50, 30, 60, 20],
          backgroundColor: ["#4F46E5", "#10B981", "#F59E0B", "#EF4444", "#6366F1"],
        },
      ],
    });
  }, []);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Student Dashboard</h2>
        <p className="text-lg text-gray-600 mt-1">Track your course progress and achievements.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card className="border shadow-sm p-4">
          <CardHeader className="flex items-center space-x-4">
            <BookOpen className="w-8 h-8 text-green-600" />
            <CardTitle className="text-lg font-semibold">Enrolled Courses</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              {enrolledCourses.map((course, index) => (
                <li key={index}>{course}</li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="border shadow-sm p-4">
          <CardHeader className="flex items-center space-x-4">
            <CalendarDays className="w-8 h-8 text-blue-600" />
            <CardTitle className="text-lg font-semibold">Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            <FullCalendar plugins={[dayGridPlugin]} initialView="dayGridMonth" />
          </CardContent>
        </Card>
      </div>

      {progressData && (
        <Card className="border shadow-sm p-4">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Course Progress Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <Bar data={progressData} />
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
              <li>Completed "Intro to AI" with 90% score.</li>
              <li>Joined "Web Dev Bootcamp" course.</li>
              <li>Upcoming quiz in "Cybersecurity Basics".</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
