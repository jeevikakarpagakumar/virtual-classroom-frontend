"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Select, SelectItem, SelectTrigger, SelectValue, SelectContent } from "@/components/ui/select";
import { SelectPortal } from "@radix-ui/react-select";
import { ArrowLeft } from "lucide-react";

export default function AssignFacultyPage() {
  const router = useRouter();
  const [courses, setCourses] = useState<{ id: string; name: string }[]>([]);
  const [selectedCourseID, setSelectedCourseID] = useState("");
  const [facultyID, setFacultyID] = useState("");
  const [facultyName, setFacultyName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // Fetch available courses
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

  // Handle faculty assignment
  const handleAssign = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const response = await fetch(`/api/assign-faculty`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ courseID: selectedCourseID, facultyID, facultyName }),
    });

    setIsSubmitting(false);

    if (response.ok) {
      setToastMessage("Faculty assigned successfully!");
      setSelectedCourseID("");
      setFacultyID("");
      setFacultyName("");
    } else {
      setToastMessage("Failed to assign faculty. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 p-6 relative">
      {/* Back Button at the Top-Right */}
      <Button
        type="button"
        onClick={() => router.back()}
        className="absolute top-4 right-4 flex items-center"
        variant="outline"
      >
        <ArrowLeft className="w-5 h-5 mr-2" /> Back
      </Button>

      {/* Main Content - Centered Form */}
      <div className="flex-1 flex justify-center items-center">
        <Card className="w-full max-w-lg p-6 shadow-lg border rounded-lg bg-white dark:bg-gray-800">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6 text-center">
            Assign Faculty
          </h2>

          {/* Form */}
          <form onSubmit={handleAssign} className="space-y-4">
            {/* Select Course */}
            <div>
              <Label htmlFor="course">Select Course</Label>
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

            {/* Faculty ID */}
            <div>
              <Label htmlFor="facultyID">Faculty ID</Label>
              <Input
                id="facultyID"
                value={facultyID}
                onChange={(e) => setFacultyID(e.target.value)}
                placeholder="Enter faculty ID"
                required
              />
            </div>

            {/* Faculty Name */}
            <div>
              <Label htmlFor="facultyName">Faculty Name</Label>
              <Input
                id="facultyName"
                value={facultyName}
                onChange={(e) => setFacultyName(e.target.value)}
                placeholder="Enter faculty name"
                required
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-end space-x-3">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Assigning..." : "Assign Faculty"}
              </Button>
            </div>
          </form>
        </Card>
      </div>

      {/* Toast Message */}
      {toastMessage && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg">
          {toastMessage}
        </div>
      )}
    </div>
  );
}
