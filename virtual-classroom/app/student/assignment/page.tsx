"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AssignmentListPage() {
  const [assignments, setAssignments] = useState<
    { id: string; title: string; dueDate: string }[]
  >([]);

  useEffect(() => {
    // Simulated API Call (Replace this with an actual fetch)
    setTimeout(() => {
      setAssignments([
        { id: "101", title: "Math Assignment", dueDate: "2025-04-05" },
        { id: "102", title: "Physics Lab Report", dueDate: "2025-04-07" },
        { id: "103", title: "Computer Science Project", dueDate: "2025-04-10" },
      ]);
    }, 1000);
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg">
      <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
        Available Assignments
      </h1>

      {/* Assignment List */}
      <div className="space-y-4">
        {assignments.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">
            Loading assignments...
          </p>
        ) : (
          assignments.map((assignment) => (
            <Card
              key={assignment.id}
              className="p-4 flex justify-between items-center"
            >
              <div>
                <h2 className="text-lg font-medium text-gray-800 dark:text-white">
                  {assignment.title}
                </h2>
                <p className="text-sm text-gray-500">
                  Due: {assignment.dueDate}
                </p>
              </div>
              <Link href={`/student/assignment/${assignment.id}`}>
                <Button>View & Submit</Button>
              </Link>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
