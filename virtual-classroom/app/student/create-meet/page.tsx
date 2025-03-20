"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Toast } from "@/components/ui/toast";
import { Select, SelectItem, SelectTrigger, SelectValue, SelectContent } from "@/components/ui/select";
import { SelectPortal } from "@radix-ui/react-select";
import { createMeeting } from "@/app/_utils/api"; // Import API function
import secureLocalStorage from "react-secure-storage";

export default function CreateMeetingPage() {
  const router = useRouter();

  const [course, setCourse] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [classroomId, setClassroomId] = useState("");
  const [description, setDescription] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [meetingLink, setMeetingLink] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const token = secureLocalStorage.getItem("jwtToken"); // Get authentication token
    const accessToken = secureLocalStorage.getItem("accessToken"); // Get Google API token

    if (!accessToken) {
      setIsSubmitting(false);
      setToastMessage("Google Meet Access Token is missing. Please authenticate with Google.");
      return;
    }

    const meetingData = {
      classroomID: parseInt(classroomId),
      emailID: "faculty@example.com", // Replace with dynamic faculty email
      startTime: new Date(startTime).toISOString(),
      endTime: new Date(endTime).toISOString(),
      meetingDescription: description,
      accessToken: accessToken,
    };

    try {
      const response = await createMeeting(meetingData, token);
      setIsSubmitting(false);

      if (response.success) {
        setMeetingLink(response.data.meetingLink); // Store generated meeting link
        setToastMessage(`Meeting Created Successfully!`);
        setCourse("");
        setStartTime("");
        setEndTime("");
        setClassroomId("");
        setDescription("");

        // Automatically copy the meeting link to clipboard
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
            {/* Course Selection */}
            <div className="relative">
              <Label htmlFor="course">Select Course</Label>
              <Select value={course} onValueChange={setCourse}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choose a course" />
                </SelectTrigger>
                <SelectPortal>
                  <SelectContent className="z-50 bg-white shadow-lg rounded-md p-2">
                    <SelectItem value="CSE101">CSE101 - Data Structures</SelectItem>
                    <SelectItem value="CYS102">CYS102 - Cyber Security</SelectItem>
                    <SelectItem value="AI103">AI103 - Machine Learning</SelectItem>
                    <SelectItem value="ECE104">ECE104 - Embedded Systems</SelectItem>
                    <SelectItem value="EEE105">EEE105 - Power Electronics</SelectItem>
                  </SelectContent>
                </SelectPortal>
              </Select>
            </div>

            {/* Start Time */}
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

            {/* End Time */}
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

            {/* Classroom ID */}
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

            {/* Description (Optional) */}
            <div>
              <Label htmlFor="description">Description (Optional)</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter a brief description (optional)"
              />
            </div>

            {/* Submit & Cancel Buttons */}
            <div className="flex justify-between">
              <Button type="submit" disabled={isSubmitting} className="w-[48%]">
                {isSubmitting ? "Creating..." : "Create Meeting"}
              </Button>
              <Button type="button" onClick={() => router.back()} className="w-[48%]" variant="outline">
                Cancel
              </Button>
            </div>
          </form>

          {/* Meeting Link Display */}
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

      {/* Toast Message */}
      {toastMessage && <Toast message={toastMessage} onClose={() => setToastMessage("")} />}
    </div>
  );
}
