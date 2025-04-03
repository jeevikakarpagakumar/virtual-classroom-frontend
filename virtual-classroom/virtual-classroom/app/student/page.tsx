"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, CalendarDays, Flame } from "lucide-react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useRouter } from "next/navigation";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import secureLocalStorage from "react-secure-storage";
import { getStudentCourses } from "@/app/_utils/api";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Helper function to generate dates for the last N days
const getLastNDays = (n: number) => {
  const result = [];
  for (let i = n - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    result.push(date.toISOString().split("T")[0]);
  }
  return result;
};

// Streak maintainer component
const StreakMaintainer = () => {
  // Mock data - in a real app, this would come from an API
  const [streakData, setStreakData] = useState({
    currentStreak: 5,
    longestStreak: 12,
    totalDays: 28,
    activityDays: getLastNDays(35).reduce((acc, date) => {
      // Randomly determine if there was activity on this day
      // In a real app, this would be actual user data
      acc[date] = Math.random() > 0.4 ? Math.floor(Math.random() * 5) + 1 : 0;
      return acc;
    }, {} as Record<string, number>),
  });

  // Get dates for the last 35 days for the contribution grid
  const last35Days = getLastNDays(35);

  // Determine the intensity of the color based on activity count
  const getActivityColor = (count: number) => {
    if (count === 0) return "bg-gray-100";
    if (count === 1) return "bg-green-100";
    if (count === 2) return "bg-green-300";
    if (count === 3) return "bg-green-500";
    return "bg-green-700";
  };

  return (
    <Card className="border shadow-sm p-4">
      <CardHeader className="flex items-center space-x-4">
        <Flame className="w-8 h-8 text-orange-500" />
        <CardTitle className="text-lg font-semibold">Learning Streak</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between mb-4">
          <div className="text-center">
            <p className="text-sm text-gray-500">Current Streak</p>
            <p className="text-2xl font-bold text-orange-500">
              {streakData.currentStreak} days
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500">Longest Streak</p>
            <p className="text-2xl font-bold text-green-600">
              {streakData.longestStreak} days
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500">Total Active Days</p>
            <p className="text-2xl font-bold text-blue-600">
              {streakData.totalDays} days
            </p>
          </div>
        </div>

        <div className="mt-4">
          <p className="text-sm text-gray-500 mb-2">Your Learning Activity</p>
          <div className="grid grid-cols-7 gap-1">
            {last35Days.map((date, index) => {
              const activityCount = streakData.activityDays[date] || 0;
              return (
                <div
                  key={index}
                  className={`w-6 h-6 rounded border ${getActivityColor(
                    activityCount
                  )}`}
                  title={`${date}: ${activityCount} activities`}
                />
              );
            })}
          </div>
          <div className="flex justify-end mt-2 items-center text-xs text-gray-500">
            <span className="mr-1">Less</span>
            <div className="flex space-x-1">
              <div className="w-3 h-3 bg-gray-100"></div>
              <div className="w-3 h-3 bg-green-100"></div>
              <div className="w-3 h-3 bg-green-300"></div>
              <div className="w-3 h-3 bg-green-500"></div>
              <div className="w-3 h-3 bg-green-700"></div>
            </div>
            <span className="ml-1">More</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default function StudentDashboard() {
  const router = useRouter();
  const [enrolledCourses, setEnrolledCourses] = useState<any[]>([]);
  const [attendanceData, setAttendanceData] = useState<any>(null);

  const sampleCourses = [
    { courseCode: "CS101", courseName: "Data Structures" },
    { courseCode: "CS102", courseName: "Operating Systems" },
    { courseCode: "CS103", courseName: "Web Technologies" },
  ];

  const sampleAttendance = [85, 72, 60];

  useEffect(() => {
    const fetchCourses = async () => {
      const token = secureLocalStorage.getItem("jwtToken");
      if (!token) {
        alert("No token found. Please log in.");
        router.push("/login");
        return;
      }

      const response = await getStudentCourses(token);
      if (response.success) {
        if (response.data.length === 0) {
          setEnrolledCourses(sampleCourses);
          setAttendanceData({
            labels: sampleCourses.map((course) => course.courseCode),
            datasets: [
              {
                label: "Attendance (%)",
                data: sampleAttendance,
                backgroundColor: ["#4F46E5", "#10B981", "#F59E0B"],
              },
            ],
          });
        } else {
          setEnrolledCourses(response.data);
          const attendance = response.data.map(() =>
            Math.floor(Math.random() * 100)
          );
          setAttendanceData({
            labels: response.data.map(
              (course: any) => course.courseCode || "No Code"
            ),
            datasets: [
              {
                label: "Attendance (%) is less than 75%",
                data: attendance,
                backgroundColor: [
                  "#4F46E5",
                  "#10B981",
                  "#F59E0B",
                  "#EF4444",
                  "#6366F1",
                ],
              },
            ],
          });
        }
      } else {
        console.error("Error fetching courses:", response.message);
        alert("Failed to load enrolled courses. Please try again.");
      }
    };

    fetchCourses();
  }, [router]);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Student Dashboard</h2>
        <p className="text-lg text-gray-600 mt-1">
          Track your course progress and achievements.
        </p>
      </div>

      {/* Streak Maintainer */}
      <div className="mb-6">
        <StreakMaintainer />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card className="border shadow-sm p-4">
          <CardHeader className="flex items-center space-x-4">
            <BookOpen className="w-8 h-8 text-green-600" />
            <CardTitle className="text-lg font-semibold">
              Enrolled Courses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              {enrolledCourses.length > 0 ? (
                enrolledCourses.map((course: any, index: number) => (
                  <li key={index}>{`${course.courseCode || "No Code"} - ${
                    course.courseName || "No Name"
                  }`}</li>
                ))
              ) : (
                <li>No courses enrolled</li>
              )}
            </ul>
          </CardContent>
        </Card>
        <Card className="border shadow-sm p-4">
          <CardHeader className="flex items-center space-x-4">
            <CalendarDays className="w-8 h-8 text-blue-600" />
            <CardTitle className="text-lg font-semibold">Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            <FullCalendar
              plugins={[dayGridPlugin]}
              initialView="dayGridMonth"
            />
          </CardContent>
        </Card>
      </div>

      {attendanceData && (
        <Card className="border shadow-sm p-4">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Course Attendance Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Bar
              data={{
                labels: attendanceData.labels,
                datasets: attendanceData.datasets.map(
                  (dataset: { data: any[] }) => ({
                    ...dataset,
                    backgroundColor: dataset.data.map((value) =>
                      value < 75 ? "red" : "green"
                    ),
                  })
                ),
              }}
              options={{
                plugins: {},
                scales: {
                  x: {
                    title: {
                      display: true,
                      text: "Course Code",
                      font: { size: 16, weight: "bold" },
                    },
                  },
                  y: {
                    title: {
                      display: true,
                      text: "Attendance Percentage",
                      font: { size: 16, weight: "bold" },
                    },
                    min: 0,
                    max: 100,
                  },
                },
              }}
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
