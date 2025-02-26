"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

interface Quiz {
  quizID: number;
  quizName: string;
  quizDescription: string;
  startTime: string;
  endTime: string;
  quizDuration: number;
}

interface Assignment {
  assignmentID: number;
  assignmentName: string;
  dueDate: string;
}

export default function QuizAssignmentPage() {
  const router = useRouter();
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const sectionID = 1;
        const semesterID = 1;
        const deptID = 1;
        const res = await fetch(
          `/api/get-quizzes?sectionID=${sectionID}&semesterID=${semesterID}&deptID=${deptID}`
        );
        if (!res.ok) throw new Error("Failed to fetch quizzes");
        const data = await res.json();
        setQuizzes(data);
      } catch (error) {
        console.error("Error fetching quizzes:", error);
      }
    };

    const fetchAssignments = async () => {
      // Mock data for now, replace with your actual API endpoint
      setAssignments([
        { assignmentID: 1, assignmentName: "Math Assignment 1", dueDate: "2025-03-10" },
        { assignmentID: 2, assignmentName: "Science Report", dueDate: "2025-03-15" },
      ]);
    };

    fetchQuizzes();
    fetchAssignments();
  }, []);

  return (
    <div className="p-6 grid gap-6">
      {/* Back Button */}
      <Button variant="outline" onClick={() => router.back()} className="flex items-center gap-2 mb-6 w-fit ml-auto">
        <ArrowLeft size={16} /> Back
      </Button>
      {/* Quiz Section */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Quizzes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {quizzes.map((quiz) => (
            <Card key={quiz.quizID} className="border shadow-sm">
              <CardHeader>
                <CardTitle>{quiz.quizName}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{quiz.quizDescription}</p>
                <p>
                  {new Date(quiz.startTime).toLocaleString()} - {new Date(quiz.endTime).toLocaleString()}
                </p>
                <Button onClick={() => router.push(`/quiz/${quiz.quizID}`)}>Start Quiz</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Assignment Section */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Assignments</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {assignments.map((assignment) => (
            <Card key={assignment.assignmentID} className="border shadow-sm">
              <CardHeader>
                <CardTitle>{assignment.assignmentName}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Due Date: {assignment.dueDate}</p>
                <Button onClick={() => router.push(`/assignment/${assignment.assignmentID}`)}>View Assignment</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
