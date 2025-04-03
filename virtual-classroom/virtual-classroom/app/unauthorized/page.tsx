"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Unauthorized() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-4xl font-bold text-red-500">Unauthorized Access</h1>
      <p className="text-gray-500 mt-2">
        You do not have permission to view this page.
      </p>
      <Button className="mt-6" onClick={() => { router.back(); router.back(); }}>
        Go Back
      </Button>
    </div>
  );
}
