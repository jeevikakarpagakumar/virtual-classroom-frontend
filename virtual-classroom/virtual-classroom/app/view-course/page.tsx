"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, ArrowLeft, ChevronUp, ChevronRight } from "lucide-react";
import secureLocalStorage from "react-secure-storage";
import { getStudentCourses, getMeetingLink } from "@/app/_utils/api";

interface Course {
  classroomID: number;
  courseID: number;
  courseCode: string;
  courseName: string;
  facultyID: number;
  facultyName: string;
  courseDescription: string;
}

export default function ViewCourses() {
  const router = useRouter();
  const [courses, setCourses] = useState<Course[]>([]);
  const [sortOption, setSortOption] = useState<string>("A-Z");
  const [expandedCourse, setExpandedCourse] = useState<number | null>(null);

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
        setCourses(response.data);
      } else {
        console.error("Error fetching courses:", response.message);
        alert("Failed to load courses. Please try again.");
      }
    };

    fetchCourses();
  }, [router]);

  const joinMeeting = async (selectedClassroomID) => {
    const token = secureLocalStorage.getItem("jwtToken");
    if (!token) {
      alert("Authentication error. Please log in again.");
      router.push("/login");
      return;
    }

    const response = await getMeetingLink(selectedClassroomID, token);
    if (response.success && response.data.meetingLink) {
      window.location.href = response.data.meetingLink;
    } else {
      alert("No current meetings available.");
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          Available Courses
        </h1>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => router.back()} className="flex items-center gap-2">
            <ArrowLeft size={16} /> Back
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.length > 0 ? (
          courses.map((course) => (
            <Card key={course.courseID} className="shadow-lg rounded-lg">
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-semibold">
                      {course.courseName} - {course.courseCode}
                    </h2>
                    <p className="text-gray-600">Faculty: {course.facultyName}</p>
                  </div>
                  <Button variant="ghost" onClick={() => setExpandedCourse(expandedCourse === course.courseID ? null : course.courseID)}>
                    {expandedCourse === course.courseID ? <ChevronUp size={20} /> : <ChevronRight size={20} />}
                  </Button>
                </div>
                {expandedCourse === course.courseID && (
                  <div className="mt-4 p-3 border-t border-gray-300">
                    <h3 className="text-lg font-semibold mb-2">Course Description</h3>
                    <p className="text-gray-700">
                      {course.courseDescription || "No description available."}
                    </p>
                    <Button className="mt-3" onClick={() => joinMeeting(course.classroomID)}>
                      Join Meeting
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        ) : (
          <p>No courses available</p>
        )}
      </div>
    </div>
  );
}