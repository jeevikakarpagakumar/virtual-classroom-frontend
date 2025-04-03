"use client";

import TeacherSidebar from "@/components/TeacherSidebar";

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <TeacherSidebar />
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
