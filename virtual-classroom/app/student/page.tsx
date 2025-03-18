"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, CalendarDays } from "lucide-react";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function StudentDashboard() {
  const router = useRouter();
  const [enrolledCourses, setEnrolledCourses] = useState<any[]>([]);
  const [attendanceData, setAttendanceData] = useState<any>(null);

  // Sample data for testing
  const sampleCourses = [
    { courseCode: "CS101", courseName: "Data Structures" },
    { courseCode: "CS102", courseName: "Operating Systems" },
    { courseCode: "CS103", courseName: "Web Technologies" },
  ];

  const sampleAttendance = [85, 72, 60];

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = secureLocalStorage.getItem("jwtToken");
        if (!token) {
          alert("No token found. Please log in.");
          router.push("/login");
          return;
        }

        const response = await fetch(
          "http://localhost:8080/api/student/getCourses",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch courses");
        }

        const data = await response.json();
        console.log("Fetched courses:", data);
        if (data.length === 0) {
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
          setEnrolledCourses(data);
          const attendance = data.map(() => Math.floor(Math.random() * 100));
          setAttendanceData({
            labels: data.map((course: any) => course.courseCode || "No Code"),
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
      } catch (error) {
        console.error("Error fetching courses:", error);
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
