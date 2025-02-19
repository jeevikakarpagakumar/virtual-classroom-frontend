"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // ✅ Import useRouter
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Toast } from "@/components/ui/toast";
import { Select, SelectItem, SelectTrigger, SelectValue, SelectContent } from "@/components/ui/select";
import { SelectPortal } from "@radix-ui/react-select";
import Sidebar from "@/components/Sidebar";

export default function CreateCoursePage() {
  const router = useRouter(); // ✅ Initialize useRouter

  const [courseCode, setCourseCode] = useState("");
  const [courseName, setCourseName] = useState("");
  const [courseDeptID, setCourseDeptID] = useState("");
  const [courseType, setCourseType] = useState("");
  const [updatedBy, setUpdatedBy] = useState("");
  const [description, setDescription] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const response = await fetch("/api/courses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ courseCode, courseName, courseDeptID, courseType, updatedBy, description }),
    });

    setIsSubmitting(false);

    if (response.ok) {
      setToastMessage("Course Created Successfully!");
      setCourseCode("");
      setCourseName("");
      setCourseDeptID("");
      setCourseType("");
      setUpdatedBy("");
      setDescription("");
    } else {
      setToastMessage("Failed to create course. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">

      {/* Main Content */}
      <div className="flex-1 flex justify-center items-center p-6 relative">
        <Button type="button" onClick={() => router.back()} className="absolute top-4 right-4">
            Back
        </Button>
        <Card className="w-full max-w-lg p-6 shadow-lg border rounded-lg bg-white dark:bg-gray-800">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6 text-center">
            Create a New Course
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Course Code */}
            <div>
              <Label htmlFor="courseCode">Course Code</Label>
              <Input
                id="courseCode"
                value={courseCode}
                onChange={(e) => setCourseCode(e.target.value)}
                placeholder="Enter course code"
                required
              />
            </div>

            {/* Course Name */}
            <div>
              <Label htmlFor="courseName">Course Name</Label>
              <Input
                id="courseName"
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
                placeholder="Enter course name"
                required
              />
            </div>

            {/* Department Selection (Dropdown) */}
            <div className="relative">
              <Label htmlFor="courseDeptID">Select Department</Label>
              <Select value={courseDeptID} onValueChange={setCourseDeptID}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choose a department" />
                </SelectTrigger>
                <SelectPortal>
                  <SelectContent className="z-50 bg-white shadow-lg rounded-md p-2">
                    <SelectItem value="CSE">CSE (Computer Science & Engineering)</SelectItem>
                    <SelectItem value="CYS">CYS (Cyber Security)</SelectItem>
                    <SelectItem value="AI">AI (Artificial Intelligence)</SelectItem>
                    <SelectItem value="ECE">ECE (Electronics & Communication)</SelectItem>
                    <SelectItem value="EEE">EEE (Electrical & Electronics)</SelectItem>
                    <SelectItem value="MECH">MECH (Mechanical Engineering)</SelectItem>
                    <SelectItem value="CIVIL">CIVIL (Civil Engineering)</SelectItem>
                    <SelectItem value="CHEM">CHEM (Chemical Engineering)</SelectItem>
                    <SelectItem value="IT">IT (Information Technology)</SelectItem>
                    <SelectItem value="BIO">BIO (Biomedical Engineering)</SelectItem>
                    <SelectItem value="AERO">AERO (Aeronautical Engineering)</SelectItem>
                  </SelectContent>
                </SelectPortal>
              </Select>
            </div>

            {/* Course Type */}
            <div className="relative">
              <Label htmlFor="courseType">Course Type</Label>
              <Select value={courseType} onValueChange={setCourseType}>
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
                value={updatedBy}
                onChange={(e) => setUpdatedBy(e.target.value)}
                placeholder="Enter admin ID"
                type="number"
                required
              />
            </div>

            {/* Course Description */}
            <div>
              <Label htmlFor="description">Course Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter a detailed description"
                required
              />
            </div>

            {/* Submit & Cancel Buttons */}
            <div className="flex justify-between">
              <Button type="submit" disabled={isSubmitting} className="w-[48%]">
                {isSubmitting ? "Creating..." : "Create Course"}
              </Button>
              <Button type="button" onClick={() => router.back()} className="w-[48%]" variant="outline">
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      </div>

      {/* Toast Message */}
      {toastMessage && <Toast message={toastMessage} onClose={() => setToastMessage("")} />}
    </div>
  );
}
