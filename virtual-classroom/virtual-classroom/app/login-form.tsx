"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import secureLocalStorage from "react-secure-storage";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [userRole, setUserRole] = useState<"Student" | "Admin" | "Faculty">(
    "Student"
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedRole = secureLocalStorage.getItem("userRole");
    if (storedRole && typeof storedRole === "string") {
      setUserRole(storedRole as "Student" | "Admin" | "Faculty");
    }
  }, []);

  useEffect(() => {
    secureLocalStorage.setItem("userRole", userRole);
  }, [userRole]);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
      if (!BASE_URL)
        throw new Error(
          "Missing NEXT_PUBLIC_BASE_URL in environment variables"
        );

      console.log("BASE_URL", BASE_URL);
      const response = await fetch(`${BASE_URL}/auth/google/url`);

      if (!response.ok) throw new Error("Failed to fetch Google Auth URL");

      const { URL } = await response.json();
      window.location.href = URL;
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      alert("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">
            Welcome to Virtual Classroom
          </CardTitle>
          <CardDescription>
            Select your role and sign in with Google
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center mb-4">
            <ToggleGroup
              type="single"
              value={userRole}
              onValueChange={(value) =>
                value && setUserRole(value as "Student" | "Admin" | "Faculty")
              }
            >
              <ToggleGroupItem
                value="Student"
                data-state={userRole === "Student" ? "on" : "off"}
              >
                Student
              </ToggleGroupItem>
              <ToggleGroupItem
                value="Admin"
                data-state={userRole === "Admin" ? "on" : "off"}
              >
                Admin
              </ToggleGroupItem>
              <ToggleGroupItem
                value="Faculty"
                data-state={userRole === "Faculty" ? "on" : "off"}
              >
                Faculty
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
          <Button
            onClick={handleGoogleSignIn}
            className="w-full"
            disabled={loading}
            variant="outline"
          >
            {loading ? "Signing in..." : "Sign in with Google"}
          </Button>
        </CardContent>
      </Card>
      <div className="text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary">
        By clicking continue, you agree to our{" "}
        <Link href="#">Terms of Service</Link> and{" "}
        <Link href="#">Privacy Policy</Link>.
      </div>
    </div>
  );
}
