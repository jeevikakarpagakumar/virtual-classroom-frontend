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
import { createMeeting, getStudentCourses } from "@/app/_utils/api"; // Import API function
import secureLocalStorage from "react-secure-storage";

export default function CreateMeetingPage() {
  const router = useRouter();
  const [courses, setCourses] = useState<any[]>([]);
  const [course, setCourse] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [classroomId, setClassroomId] = useState("");
  const [description, setDescription] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [meetingLink, setMeetingLink] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      const token = secureLocalStorage.getItem("jwtToken");
      if (!token) {
        alert("No token found. Please log in.");
        router.push("/login");
        return;
      }

      const response = await getStudentCourses(token);
      if (response.success && response.data.length > 0) {
        setCourses(response.data);
        setCourse(response.data[0].courseCode); // Set default course
      } else {
        console.error("Error fetching courses:", response.message);
        alert("Failed to load courses. Please try again.");
      }
    };

    fetchCourses();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const token = secureLocalStorage.getItem("jwtToken");
    const accessToken = secureLocalStorage.getItem("accessToken");

    if (!accessToken) {
      setIsSubmitting(false);
      setToastMessage("Google Meet Access Token is missing. Please authenticate with Google.");
      return;
    }

    const meetingData = {
      classroomID: parseInt(classroomId),
      emailID: "faculty@example.com", 
      startTime: new Date(startTime).toISOString(),
      endTime: new Date(endTime).toISOString(),
      meetingDescription: description,
      accessToken: accessToken,
    };

    try {
      const response = await createMeeting(meetingData, token);
      setIsSubmitting(false);

      if (response.success) {
        setMeetingLink(response.data.meetingLink);
        setToastMessage(`Meeting Created Successfully!`);
        setCourse(courses.length > 0 ? courses[0].courseCode : "");
        setStartTime("");
        setEndTime("");
        setClassroomId("");
        setDescription("");

        navigator.clipboard.writeText(response.data.meetingLink);
      } else {
        setToastMessage(response.message || "Failed to create meeting. Please try again.");
      }
    } catch (error) {
      setIsSubmitting(false);
      setToastMessage("Error creating meeting. Please check your connection.");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="flex-1 flex justify-center items-center p-6 relative">
        <Button type="button" onClick={() => router.back()} className="absolute top-4 right-4">
          Back
        </Button>
        <Card className="w-full max-w-lg p-6 shadow-lg border rounded-lg bg-white dark:bg-gray-800">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6 text-center">
            Create a New Meeting
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Label htmlFor="course">Select Course</Label>
              <Select value={course} onValueChange={setCourse}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choose a course" />
                </SelectTrigger>
                <SelectPortal>
                  <SelectContent className="z-50 bg-white shadow-lg rounded-md p-2">
                    {courses.length > 0 ? (
                      courses.map((course: any) => (
                        <SelectItem key={course.courseCode} value={course.courseCode}>
                          {course.courseCode} - {course.courseName}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem value="default" disabled>No courses available</SelectItem>
                    )}
                  </SelectContent>
                </SelectPortal>
              </Select>
            </div>

            <div>
              <Label htmlFor="startTime">Start Time</Label>
              <Input
                id="startTime"
                type="datetime-local"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="endTime">End Time</Label>
              <Input
                id="endTime"
                type="datetime-local"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="classroomId">Classroom ID</Label>
              <Input
                id="classroomId"
                value={classroomId}
                onChange={(e) => setClassroomId(e.target.value)}
                placeholder="Enter classroom ID"
                required
              />
            </div>

            <div>
              <Label htmlFor="description">Description (Optional)</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter a brief description (optional)"
              />
            </div>

            <div className="flex justify-between">
              <Button type="submit" disabled={isSubmitting} className="w-[48%]">
                {isSubmitting ? "Creating..." : "Create Meeting"}
              </Button>
              <Button type="button" onClick={() => router.back()} className="w-[48%]" variant="outline">
                Cancel
              </Button>
            </div>
          </form>

          {meetingLink && (
            <div className="mt-4 p-3 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-md text-center">
              <p>Meeting Link:</p>
              <a href={meetingLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                {meetingLink}
              </a>
            </div>
          )}
        </Card>
      </div>
      {toastMessage && <Toast message={toastMessage} onClose={() => setToastMessage("")} />}
    </div>
  );
}
