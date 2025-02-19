"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

interface Course {
  id: number;
  name: string;
  description: string;
  createdAt: string;
}

export default function ViewCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [sortOption, setSortOption] = useState<string>("A-Z");

  useEffect(() => {
    fetch("/api/courses")
      .then((res) => res.json())
      .then((data) => setCourses(data));
  }, []);

  // Sorting function
  const sortCourses = (option: string) => {
    let sortedCourses = [...courses];
    if (option === "A-Z") {
      sortedCourses.sort((a, b) => a.name.localeCompare(b.name));
    } else if (option === "Z-A") {
      sortedCourses.sort((a, b) => b.name.localeCompare(a.name));
    } else if (option === "Oldest") {
      sortedCourses.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    } else if (option === "Newest") {
      sortedCourses.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
    setSortOption(option);
    setCourses(sortedCourses);
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Available Courses</h1>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              Filter <ChevronDown size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => sortCourses("A-Z")}>Sort A-Z</DropdownMenuItem>
            <DropdownMenuItem onClick={() => sortCourses("Z-A")}>Sort Z-A</DropdownMenuItem>
            <DropdownMenuItem onClick={() => sortCourses("Oldest")}>Sort by Oldest</DropdownMenuItem>
            <DropdownMenuItem onClick={() => sortCourses("Newest")}>Sort by Newest</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

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
