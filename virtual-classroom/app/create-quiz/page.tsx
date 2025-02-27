"use client";

import { useState } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import axios from "axios";
import { ArrowLeft } from "lucide-react";

export default function CreateQuizPage() {
  const router = useRouter();
  const [quizData, setQuizData] = useState({
    classroomID: "",
    quizName: "",
    quizDescription: "",
    quizData: "",
    isOpenForAll: false,
    startTime: "",
    endTime: "",
    quizDuration: "",
    createdBy: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setQuizData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/create-quiz", quizData);
      alert("Quiz created successfully!");
      router.push("/teacher-dashboard");
    } catch (error) {
      console.error("Failed to create quiz:", error);
      alert("Error creating quiz. Please try again.");
    }
  };

  return (
    <div className="p-6">
        {/* Back Button */}
      <Button
        variant="outline"
        onClick={() => router.back()}
        className="flex items-center gap-2 mb-6 w-fit ml-auto">
        <ArrowLeft size={16} /> Back
      </Button>
      <h2 className="text-3xl font-bold mb-6">Create a New Quiz</h2>
      <Card className="border shadow-sm p-6">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Quiz Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input name="classroomID" placeholder="Classroom ID" value={quizData.classroomID} onChange={handleChange} />
          <Input name="quizName" placeholder="Quiz Name" value={quizData.quizName} onChange={handleChange} />
          <Textarea name="quizDescription" placeholder="Quiz Description" value={quizData.quizDescription} onChange={handleChange} />
          <Textarea name="quizData" placeholder="Quiz Questions " value={quizData.quizData} onChange={handleChange} />
          <Input type="datetime-local" name="startTime" value={quizData.startTime} onChange={handleChange} />
          <Input type="datetime-local" name="endTime" value={quizData.endTime} onChange={handleChange} />
          <Input name="quizDuration" placeholder="Duration (in minutes)" value={quizData.quizDuration} onChange={handleChange} />
          <Input name="createdBy" placeholder="Faculty ID" value={quizData.createdBy} onChange={handleChange} />
          <div className="flex items-center gap-2">
            <input type="checkbox" name="isOpenForAll" checked={quizData.isOpenForAll} onChange={handleChange} />
            <label>Open for All Students</label>
          </div>
          <Button onClick={handleSubmit} className="w-full">Create Quiz</Button>
        </CardContent>
      </Card>
    </div>
  );
}
