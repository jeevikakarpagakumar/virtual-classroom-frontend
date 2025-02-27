"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import secureLocalStorage from "react-secure-storage";

export default function AuthCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const handleOAuthCallback = async () => {
      const state = searchParams.get("state");
      const code = searchParams.get("code");

      if (!state || !code) {
        setErrorMessage(
          "Invalid authentication response. Missing state or code."
        );
        return;
      }

      try {
        const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
        const userRole = secureLocalStorage.getItem("userRole");
        let URL = "";

        if (userRole === "Student") {
          URL = BASE_URL + "/studentAuth";
        } else if (userRole === "Admin") {
          URL = BASE_URL + "/adminAuth";
        } else {
          URL = BASE_URL + "/studentAuth"; // need to change to faculty
        }

        console.log("URL", URL);
        const response = await fetch(
          `${URL}/google/callback?state=${state}&code=${code}`
        );
        const data = await response.json();

        if (response.status === 200) {
          secureLocalStorage.setItem("jwtToken", data.jwtToken);
          secureLocalStorage.setItem("userRole", data.userRole);
          if (data.userRole === "Admin") {
            router.push("/admin");
          } else if (data.userRole === "Student") {
            router.push("/student");
          } else {
            router.push("/teacher");
          }
        } else {
          setErrorMessage(
            data.error || "Authentication failed. Please try again."
          );
        }
      } catch (error) {
        setErrorMessage("An error occurred while processing authentication.");
        console.error(error);
      }
    };

    handleOAuthCallback();
  }, [searchParams, router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      {errorMessage ? (
        <p className="text-red-500 text-center">{errorMessage}</p>
      ) : (
        <p className="text-gray-700">Processing authentication...</p>
      )}
    </div>
  );
}
