"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

interface Course {
  id: number;
  name: string;
  description: string;
}

export default function ViewCourses() {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    // Fetch courses (replace with your API)
    fetch("/api/courses")
      .then((res) => res.json())
      .then((data) => setCourses(data));
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Available Courses</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Card key={course.id} className="shadow-lg rounded-lg">
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold">{course.name}</h2>
              <p className="text-gray-600">{course.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
