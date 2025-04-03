"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";

export default function CreateQuizPage() {
  const router = useRouter();
  const [questions, setQuestions] = useState([
    { questionText: "", options: ["", "", "", ""] },
  ]);
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));

    if (name === "startTime" || name === "endTime") {
      const start = new Date(name === "startTime" ? value : formData.startTime);
      const end = new Date(name === "endTime" ? value : formData.endTime);
      if (!isNaN(start.getTime()) && !isNaN(end.getTime())) {
        const duration = Math.round(
          (end.getTime() - start.getTime()) / (1000 * 60)
        ); // in minutes
        setFormData((prev) => ({
          ...prev,
          quizDuration: duration > 0 ? duration.toString() : "",
        }));
      }
    }
  };

  const handleQuestionChange = (index: number, value: string) => {
    const updated = [...questions];
    updated[index].questionText = value;
    setQuestions(updated);
  };

  const handleOptionChange = (
    qIndex: number,
    oIndex: number,
    value: string
  ) => {
    const updated = [...questions];
    updated[qIndex].options[oIndex] = value;
    setQuestions(updated);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { questionText: "", options: ["", "", "", ""] },
    ]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      ...formData,
      quizDuration: parseInt(formData.quizDuration),
      questions,
    };

    try {
      const res = await fetch("/api/create-google-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      setIsSubmitting(false);
      if (res.ok) {
        alert("Google Form created successfully!");
        window.open(data.formUrl, "_blank");
        router.push("/teacher-dashboard");
      } else {
        alert(data.error || "Failed to create quiz");
      }
    } catch (error) {
      setIsSubmitting(false);
      alert("Error submitting form. Please try again.");
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
        <Card className="w-full max-w-3xl p-6 shadow-lg border rounded-lg bg-white dark:bg-gray-800">
          <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-white mb-6">
            Create a Google Quiz
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>Classroom ID</Label>
              <Input
                name="classroomID"
                value={formData.classroomID}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label>Quiz Name</Label>
              <Input
                name="quizName"
                value={formData.quizName}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea
                name="quizDescription"
                value={formData.quizDescription}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Start Time</Label>
                <Input
                  type="datetime-local"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label>End Time</Label>
                <Input
                  type="datetime-local"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div>
              <Label>Quiz Duration (minutes)</Label>
              <Input
                name="quizDuration"
                value={formData.quizDuration}
                readOnly
              />
            </div>
            <div>
              <Label>Created By (Faculty ID)</Label>
              <Input
                name="createdBy"
                value={formData.createdBy}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="isOpenForAll"
                checked={formData.isOpenForAll}
                onChange={handleChange}
              />
              <Label>Open for All Students</Label>
            </div>

            <div>
              <h3 className="font-semibold mt-6 mb-2 text-lg">Questions</h3>
              {questions.map((q, qIndex) => (
                <div
                  key={qIndex}
                  className="mb-4 space-y-2 border p-4 rounded-md bg-gray-50"
                >
                  <Input
                    placeholder={`Question ${qIndex + 1}`}
                    value={q.questionText}
                    onChange={(e) =>
                      handleQuestionChange(qIndex, e.target.value)
                    }
                    required
                  />
                  {q.options.map((option, oIndex) => (
                    <Input
                      key={oIndex}
                      placeholder={`Option ${oIndex + 1}`}
                      value={option}
                      onChange={(e) =>
                        handleOptionChange(qIndex, oIndex, e.target.value)
                      }
                      required
                    />
                  ))}
                </div>
              ))}
              <Button type="button" onClick={addQuestion} className="mt-2">
                Add Another Question
              </Button>
            </div>

            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? "Creating Google Form..." : "Create Quiz"}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}
