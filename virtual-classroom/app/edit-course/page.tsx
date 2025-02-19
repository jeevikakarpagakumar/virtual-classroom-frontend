"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Toast } from "@/components/ui/toast";
import { Select, SelectItem, SelectTrigger, SelectValue, SelectContent } from "@/components/ui/select";
import { SelectPortal } from "@radix-ui/react-select";
import Sidebar from "@/components/Sidebar";

export default function EditCoursePage() {
  const router = useRouter();
  const [courses, setCourses] = useState<{ id: string; name: string }[]>([]);
  const [selectedCourseID, setSelectedCourseID] = useState("");
  const [courseDetails, setCourseDetails] = useState<any>(null);
  const [toastMessage, setToastMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch all courses for selection dropdown
  useEffect(() => {
    const fetchCourses = async () => {
      const res = await fetch("/api/courses");
      if (res.ok) {
        const data = await res.json();
        setCourses(data);
      }
    };
    fetchCourses();
  }, []);

  // Fetch course details when a course is selected
  useEffect(() => {
    if (selectedCourseID) {
      const fetchCourseDetails = async () => {
        const res = await fetch(`/api/courses/${selectedCourseID}`);
        if (res.ok) {
          const data = await res.json();
          setCourseDetails(data);
        }
      };
      fetchCourseDetails();
    }
  }, [selectedCourseID]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const response = await fetch(`/api/courses/${selectedCourseID}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(courseDetails),
    });

    setIsSubmitting(false);

    if (response.ok) {
      setToastMessage("Course Updated Successfully!");
    } else {
      setToastMessage("Failed to update course. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex justify-center items-center p-6">
        <Card className="w-full max-w-lg p-6 shadow-lg border rounded-lg bg-white dark:bg-gray-800">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6 text-center">
            Edit Course
          </h2>

          {/* Select Course to Edit */}
          <div className="mb-6">
            <Label htmlFor="selectCourse">Select Course</Label>
            <Select value={selectedCourseID} onValueChange={setSelectedCourseID}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose a course" />
              </SelectTrigger>
              <SelectPortal>
                <SelectContent className="z-50 bg-white shadow-lg rounded-md p-2">
                  {courses.map((course) => (
                    <SelectItem key={course.id} value={course.id}>
                      {course.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </SelectPortal>
            </Select>
          </div>

          {/* Edit Course Form (Only visible after selecting a course) */}
          {courseDetails && (
            <form onSubmit={handleUpdate} className="space-y-4">
              {/* Course Code */}
              <div>
                <Label htmlFor="courseCode">Course Code</Label>
                <Input
                  id="courseCode"
                  value={courseDetails.courseCode}
                  onChange={(e) => setCourseDetails({ ...courseDetails, courseCode: e.target.value })}
                  required
                />
              </div>

              {/* Course Name */}
              <div>
                <Label htmlFor="courseName">Course Name</Label>
                <Input
                  id="courseName"
                  value={courseDetails.courseName}
                  onChange={(e) => setCourseDetails({ ...courseDetails, courseName: e.target.value })}
                  required
                />
              </div>

              {/* Course Description */}
              <div>
                <Label htmlFor="description">Course Description</Label>
                <Textarea
                  id="description"
                  value={courseDetails.description}
                  onChange={(e) => setCourseDetails({ ...courseDetails, description: e.target.value })}
                  required
                />
              </div>

              {/* Course Type */}
              <div className="relative">
                <Label htmlFor="courseType">Course Type</Label>
                <Select
                  value={courseDetails.courseType}
                  onValueChange={(value) => setCourseDetails({ ...courseDetails, courseType: value })}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select course type" />
                  </SelectTrigger>
                  <SelectPortal>
                    <SelectContent className="z-50 bg-white shadow-lg rounded-md p-2">
                      <SelectItem value="L">Regular</SelectItem>
                      <SelectItem value="P">Professional Elective</SelectItem>
                    </SelectContent>
                  </SelectPortal>
                </Select>
              </div>

              {/* Updated By (Admin ID) */}
              <div>
                <Label htmlFor="updatedBy">Updated By (Admin ID)</Label>
                <Input
                  id="updatedBy"
                  type="number"
                  value={courseDetails.updatedBy}
                  onChange={(e) => setCourseDetails({ ...courseDetails, updatedBy: e.target.value })}
                  required
                />
              </div>

              {/* Save & Cancel Buttons */}
              <div className="flex justify-between">
                <Button type="submit" disabled={isSubmitting} className="w-[48%]">
                  {isSubmitting ? "Updating..." : "Update Course"}
                </Button>
                <Button type="button" onClick={() => router.back()} className="w-[48%]" variant="outline">
                  Cancel
                </Button>
              </div>
            </form>
          )}
        </Card>
      </div>

      {/* Toast Message */}
      {toastMessage && <Toast message={toastMessage} onClose={() => setToastMessage("")} />}
    </div>
  );
}
