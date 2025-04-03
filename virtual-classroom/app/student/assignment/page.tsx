"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, Clock, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "sonner";

// Notification component
const DeadlineNotification = ({
  title,
  message,
  isExtended = false,
}: {
  title: string;
  message: string;
  isExtended?: boolean;
}) => (
  <div className="flex items-start gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg shadow-md border-l-4 border-blue-500">
    {isExtended ? (
      <AlertCircle className="h-5 w-5 text-blue-500" />
    ) : (
      <Clock className="h-5 w-5 text-amber-500" />
    )}
    <div>
      <p className="font-medium text-gray-800 dark:text-gray-200">{title}</p>
      <p className="text-sm text-gray-600 dark:text-gray-400">{message}</p>
    </div>
  </div>
);

export default function AssignmentListPage() {
  const [assignments, setAssignments] = useState<
    { id: string; title: string; dueDate: string; isExtended?: boolean }[]
  >([]);
  const [notifications, setNotifications] = useState<
    { id: string; title: string; message: string; isExtended: boolean }[]
  >([]);
  const [loading, setLoading] = useState(true);

  // Calculate time remaining for closest deadline
  const calculateTimeRemaining = (dueDate: string) => {
    const now = new Date();
    const deadline = new Date(dueDate);
    const diffTime = deadline.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return "Overdue";
    if (diffDays === 0) return "Due today";
    if (diffDays === 1) return "Due tomorrow";
    return `Due in ${diffDays} days`;
  };

  // Find the closest deadline assignment
  const getClosestDeadline = (assignments: any[]) => {
    if (assignments.length === 0) return null;

    return assignments.reduce((closest, current) => {
      const closestDate = new Date(closest.dueDate);
      const currentDate = new Date(current.dueDate);
      return currentDate < closestDate ? current : closest;
    });
  };

  useEffect(() => {
    // Simulated API Call (Replace this with an actual fetch)
    setTimeout(() => {
      const assignmentData = [
        { id: "101", title: "Math Assignment", dueDate: "2025-04-05" },
        { id: "102", title: "Physics Lab Report", dueDate: "2025-04-07" },
        { id: "103", title: "Computer Science Project", dueDate: "2025-04-10" },
      ];
      setAssignments(assignmentData);
      setLoading(false);

      // Add initial notification for closest deadline
      const closest = getClosestDeadline(assignmentData);
      if (closest) {
        const timeRemaining = calculateTimeRemaining(closest.dueDate);
        setNotifications([
          {
            id: `note-${Date.now()}`,
            title: "Upcoming Deadline",
            message: `${closest.title}: ${timeRemaining}`,
            isExtended: false,
          },
        ]);
      }
    }, 1000);

    // Random fake extension notification (fires between 8-15 seconds after page load)
    const extensionTimer = setTimeout(() => {
      const randomAssignmentIndex = Math.floor(Math.random() * 3);
      const assignmentToExtend = [
        "Math Assignment",
        "Physics Lab Report",
        "Computer Science Project",
      ][randomAssignmentIndex];

      // Show toast notification
      toast.info(`Deadline Extended: ${assignmentToExtend}`, {
        description: "Your instructor has extended the deadline by 2 days.",
        duration: 5000,
      });

      // Add to notifications panel
      setNotifications((prev) => [
        ...prev,
        {
          id: `note-ext-${Date.now()}`,
          title: "Deadline Extended",
          message: `${assignmentToExtend} deadline extended by 2 days.`,
          isExtended: true,
        },
      ]);

      // Update the assignments array to reflect the extension
      setAssignments((prev) =>
        prev.map((assignment) =>
          assignment.title === assignmentToExtend
            ? {
                ...assignment,
                isExtended: true,
                dueDate: (() => {
                  const date = new Date(assignment.dueDate);
                  date.setDate(date.getDate() + 2);
                  return date.toISOString().split("T")[0];
                })(),
              }
            : assignment
        )
      );
    }, 8000 + Math.random() * 7000); // Random time between 8-15 seconds

    return () => clearTimeout(extensionTimer);
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6 dark:bg-gray-900">
      <Toaster position="top-right" />
      <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
        Available Assignments
      </h1>

      {/* Smart Deadline Tracker */}
      <Card className="bg-gray-50 dark:bg-gray-800 p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Bell className="h-5 w-5 text-blue-500 mr-2" />
            <h2 className="text-lg font-medium">Smart Deadline Tracker</h2>
          </div>
          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
            LIVE
          </span>
        </div>

        <div className="space-y-3">
          {notifications.length > 0 ? (
            notifications.map((note) => (
              <DeadlineNotification
                key={note.id}
                title={note.title}
                message={note.message}
                isExtended={note.isExtended}
              />
            ))
          ) : (
            <p className="text-gray-500 dark:text-gray-400">
              No upcoming deadlines.
            </p>
          )}
        </div>
      </Card>

      {/* Assignment List */}
      <div className="space-y-4">
        {loading ? (
          <p className="text-gray-500 dark:text-gray-400">
            Loading assignments...
          </p>
        ) : (
          assignments.map((assignment) => (
            <Card
              key={assignment.id}
              className={`p-4 flex justify-between items-center ${
                assignment.isExtended ? "border-l-4 border-blue-500" : ""
              }`}
            >
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-medium text-gray-800 dark:text-white">
                    {assignment.title}
                  </h2>
                  {assignment.isExtended && (
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                      Extended
                    </span>
                  )}
                </div>
                <div className="flex items-center space-x-3">
                  <p className="text-sm text-gray-500">
                    Due: {assignment.dueDate}
                  </p>
                  <p className="text-sm font-medium text-amber-600 dark:text-amber-400">
                    {calculateTimeRemaining(assignment.dueDate)}
                  </p>
                </div>
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
