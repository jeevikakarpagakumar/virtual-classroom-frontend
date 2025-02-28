"use client"; // Ensure it runs only on the client side

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import "./globals.css"; // Import global styles
import secureLocalStorage from "react-secure-storage";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const jwtToken = secureLocalStorage.getItem("jwtToken");
    const userRole = secureLocalStorage.getItem("userRole"); // Get user role
    console.log("userRole", userRole);
    console.log("jwtToken", jwtToken);
    console.log("pathname", pathname);

    // If no JWT, redirect to login
    if (!jwtToken) {
      router.push("/login");
      return;
    }

    // Role-based access control
    if (pathname.startsWith("/teacher") && userRole !== "Teacher") {
      router.push("/unauthorized"); // Redirect if not a teacher
    } else if (pathname.startsWith("/admin") && userRole !== "Admin") {
      router.push("/unauthorized"); // Redirect if not an admin
    } else if (pathname.startsWith("/student") && userRole !== "Student") {
      router.push("/unauthorized"); // Redirect if not a student
    }
  }, [pathname, router]); // Runs when pathname changes

  return (
    <html lang="en">
      <body className="body-container">
        <header className="header">
          <h1 className="header-title">Virtual Classroom</h1>
        </header>
        <main>{children}</main>
        <footer className="footer">
          <p>© 2025 Virtual Classroom, All rights reserved</p>
          <p>Under development</p>
        </footer>
      </body>
    </html>
  );
}
