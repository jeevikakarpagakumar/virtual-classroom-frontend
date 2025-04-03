"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import secureLocalStorage from "react-secure-storage";

export default function CreateQuizPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    classroomID: "",
    quizName: "",
    quizDescription: "",
    startTime: "",
    endTime: "",
    quizDuration: "",
    createdBy: "",
    isOpenForAll: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [formUrl, setFormUrl] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (name === "startTime" || name === "endTime") {
      const start = new Date(name === "startTime" ? value : formData.startTime);
      const end = new Date(name === "endTime" ? value : formData.endTime);
      if (!isNaN(start.getTime()) && !isNaN(end.getTime())) {
        const duration = Math.round((end - start) / (1000 * 60));
        setFormData((prev) => ({
          ...prev,
          quizDuration: duration > 0 ? duration.toString() : "",
        }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const accessToken = secureLocalStorage.getItem("accessToken");
    const jwtToken = secureLocalStorage.getItem("jwtToken");

    if (!accessToken || !jwtToken) {
      setToastMessage("Authentication token missing.");
      setIsSubmitting(false);
      return;
    }

    try {
      // Step 1: Create Google Form
      const formRes = await fetch("https://forms.googleapis.com/v1/forms", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          info: {
            title: formData.quizName,
            description: formData.quizDescription,
          },
        }),
      });

      const formDataGoogle = await formRes.json();

      if (!formRes.ok) {
        throw new Error(
          formDataGoogle.error?.message || "Failed to create Google Form."
        );
      }

      const formUrl = `https://docs.google.com/forms/d/${formDataGoogle.formId}/edit`;
      setFormUrl(formUrl);

      // Step 2: Send form metadata to backend
      const payload = {
        ...formData,
        quizDuration: parseInt(formData.quizDuration),
        quizData: formUrl,
      };

      const backendRes = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/faculty/createQuiz`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
          body: JSON.stringify(payload),
        }
      );

      const backendData = await backendRes.json();

      if (!backendRes.ok) {
        throw new Error(backendData.error || "Failed to save quiz to backend.");
      }

      setToastMessage("Quiz created successfully!");
      window.open(formUrl, "_blank");
      router.push("/teacher-dashboard");
    } catch (error) {
      console.error("Quiz creation error:", error);
      setToastMessage(error.message || "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="flex-1 flex justify-center items-center p-6 relative">
        <Button
          type="button"
          onClick={() => router.back()}
          className="absolute top-4 right-4"
        >
          Back
        </Button>
        <Card className="w-full max-w-lg p-6 shadow-lg border rounded-lg bg-white dark:bg-gray-800">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6 text-center">
            Create a New Quiz
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {Object.keys(formData).map((key) => (
              <div key={key}>
                <Label htmlFor={key}>
                  {key.replace(/([A-Z])/g, " $1").trim()}
                </Label>
                <Input
                  id={key}
                  name={key}
                  type={key.includes("Time") ? "datetime-local" : "text"}
                  value={formData[key]}
                  onChange={handleChange}
                  required
                />
              </div>
            ))}

            <div className="flex justify-between">
              <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? "Creating Quiz..." : "Create Quiz"}
              </Button>
            </div>
          </form>

          {formUrl && (
            <div className="mt-4 p-3 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-md text-center">
              <p>Google Form Link:</p>
              <a
                href={formUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                {formUrl}
              </a>
            </div>
          )}
        </Card>
      </div>
      {toastMessage && (
        <div className="fixed bottom-4 right-4 bg-gray-800 text-white p-4 rounded-md">
          {toastMessage}
        </div>
      )}
    </div>
  );
}
