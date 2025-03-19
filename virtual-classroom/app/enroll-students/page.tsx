"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Toast } from "@/components/ui/toast";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "@/components/ui/select";
import { SelectPortal } from "@radix-ui/react-select";
import { ArrowLeft, UserPlus } from "lucide-react";
import { getCourses, enrollStudent } from "@/app/_utils/api";

export default function EnrollStudentsPage() {
  const router = useRouter();
  const [courses, setCourses] = useState<
    { id: string; name: string; maxEnrollments: number; enrolled: number }[]
  >([]);
  const [selectedCourseID, setSelectedCourseID] = useState("");
  const [studentID, setStudentID] = useState("");
  const [studentName, setStudentName] = useState("");
  const [semester, setSemester] = useState("");
  const [section, setSection] = useState("");
  const [toastMessage, setToastMessage] = useState("");

  // Fetch courses with their enrollment limits
  useEffect(() => {
    const fetchCourses = async () => {
      const response = await getCourses();
      if (response.success) {
        setCourses(response.data);
      }
    };
    fetchCourses();
  }, []);

  const handleEnroll = async () => {
    if (
      !selectedCourseID ||
      !studentID ||
      !studentName ||
      !semester ||
      !section
    ) {
      setToastMessage("Please fill all fields before enrolling.");
      return;
    }

    const selectedCourse = courses.find(
      (course) => course.id === selectedCourseID
    );
    if (
      selectedCourse &&
      selectedCourse.enrolled >= selectedCourse.maxEnrollments
    ) {
      setToastMessage("Enrollment limit reached for this course.");
      return;
    }

    const response = await enrollStudent({
      courseID: selectedCourseID,
      studentID,
      studentName,
      semester,
      section,
    });

    if (response.success) {
      setToastMessage("Student enrolled successfully!");
      setCourses((prev) =>
        prev.map((course) =>
          course.id === selectedCourseID
            ? { ...course, enrolled: course.enrolled + 1 }
            : course
        )
      );
    } else {
      setToastMessage("Failed to enroll student. Please try again.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      {/* Back Button */}
      <Button
        variant="outline"
        onClick={() => router.back()}
        className="flex items-center gap-2 mb-6 w-fit ml-auto"
      >
        <ArrowLeft size={16} /> Back
      </Button>

      {/* Main Content */}
      <div className="flex justify-center items-center">
        <Card className="w-full max-w-xl p-6 shadow-lg border rounded-lg bg-white dark:bg-gray-800">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6 text-center">
            Enroll Students
          </h2>

          {/* Course Selection */}
          <div className="mb-4">
            <Label>Select Course</Label>
            <Select
              value={selectedCourseID}
              onValueChange={setSelectedCourseID}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose a course" />
              </SelectTrigger>
              <SelectPortal>
                <SelectContent className="z-50 bg-white shadow-lg rounded-md p-2">
                  {courses.map((course) => (
                    <SelectItem key={course.id} value={course.id}>
                      {course.name} (Enrolled: {course.enrolled}/
                      {course.maxEnrollments})
                    </SelectItem>
                  ))}
                </SelectContent>
              </SelectPortal>
            </Select>
          </div>

          {/* Student Details */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="studentID">Student ID</Label>
              <Input
                id="studentID"
                value={studentID}
                onChange={(e) => setStudentID(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="studentName">Student Name</Label>
              <Input
                id="studentName"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Semester Selection */}
          <div className="mt-4">
            <Label>Select Semester</Label>
            <Select value={semester} onValueChange={setSemester}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose a semester" />
              </SelectTrigger>
              <SelectPortal>
                <SelectContent className="z-50 bg-white shadow-lg rounded-md p-2">
                  {["I", "II", "III", "IV", "V", "VI", "VII", "VIII"].map(
                    (sem) => (
                      <SelectItem key={sem} value={sem}>
                        Semester {sem}
                      </SelectItem>
                    )
                  )}
                </SelectContent>
              </SelectPortal>
            </Select>
          </div>

          {/* Section Selection */}
          <div className="mt-4">
            <Label>Select Section</Label>
            <Select value={section} onValueChange={setSection}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose a section" />
              </SelectTrigger>
              <SelectPortal>
                <SelectContent className="z-50 bg-white shadow-lg rounded-md p-2">
                  {["A", "B", "C", "D", "E", "F", "G", "H"].map((sec) => (
                    <SelectItem key={sec} value={sec}>
                      Section {sec}
                    </SelectItem>
                  ))}
                </SelectContent>
              </SelectPortal>
            </Select>
          </div>

          {/* Enroll Button */}
          <div className="flex justify-center mt-6">
            <Button onClick={handleEnroll} className="flex items-center gap-2">
              <UserPlus size={16} /> Enroll Student
            </Button>
          </div>
        </Card>
      </div>

      {/* Toast Message */}
      {toastMessage && (
        <Toast message={toastMessage} onClose={() => setToastMessage("")} />
      )}
    </div>
  );
}
