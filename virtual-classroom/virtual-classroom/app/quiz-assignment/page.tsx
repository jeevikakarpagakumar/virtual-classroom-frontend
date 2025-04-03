"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
//import { getQuizzes, getAssignments } from "@/app/_utils/api";

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
        const classroomID = 1; // Change this based on your app logic
        //const response = await getQuizzes(classroomID); // Fixed API call

        /*if (response?.success) {
          setQuizzes(response.data);
        } else {
          throw new Error(response?.message || "Failed to fetch quizzes");
        }*/
      } catch (error) {
        console.error("Error fetching quizzes:", error);
      }
    };

    const fetchAssignments = async () => {
      try {
        /*const response = await getAssignments();
        if (response?.success) {
          setAssignments(response.data);
        } else {
          throw new Error(response?.message || "Failed to fetch assignments");
        }*/
      } catch (error) {
        console.error("Error fetching assignments:", error);
      }
    };

    fetchQuizzes();
    fetchAssignments();
  }, []);

  return (
    <div className="p-6 grid gap-6">
      {/* Back Button */}
      <Button
        variant="outline"
        onClick={() => router.back()}
        className="flex items-center gap-2 mb-6 w-fit ml-auto"
      >
        <ArrowLeft size={16} /> Back
      </Button>

      {/* Quiz Section */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Quizzes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {quizzes.length > 0 ? (
            quizzes.map((quiz) => (
              <Card key={quiz.quizID} className="border shadow-sm">
                <CardHeader>
                  <CardTitle>{quiz.quizName}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{quiz.quizDescription}</p>
                  <p>
                    {new Date(quiz.startTime).toLocaleString()} -{" "}
                    {new Date(quiz.endTime).toLocaleString()}
                  </p>
                  <Button onClick={() => router.push(`/quiz/${quiz.quizID}`)}>
                    Start Quiz
                  </Button>
                </CardContent>
              </Card>
            ))
          ) : (
            <p className="text-gray-500">No quizzes available.</p>
          )}
        </div>
      </div>

      {/* Assignment Section */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Assignments</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {assignments.length > 0 ? (
            assignments.map((assignment) => (
              <Card key={assignment.assignmentID} className="border shadow-sm">
                <CardHeader>
                  <CardTitle>{assignment.assignmentName}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Due Date: {new Date(assignment.dueDate).toLocaleString()}
                  </p>
                  <Button
                    onClick={() =>
                      router.push(`/assignment/${assignment.assignmentID}`)
                    }
                  >
                    View Assignment
                  </Button>
                </CardContent>
              </Card>
            ))
          ) : (
            <p className="text-gray-500">No assignments available.</p>
          )}
        </div>
      </div>
    </div>
  );
}
