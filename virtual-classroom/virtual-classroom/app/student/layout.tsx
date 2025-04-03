"use client";

import StudentSidebar from "@/components/StudentSidebar";

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <StudentSidebar />
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
