"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CloudUpload, XCircle } from "lucide-react";
import { useDropzone } from "react-dropzone";

export default function AssignmentSubmissionPage() {
  const { assignID } = useParams(); // Get assignment ID from URL
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [submissionText, setSubmissionText] = useState("");

  // Handle File Upload via Drag & Drop
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "application/pdf": [".pdf"],
      "application/msword": [".doc", ".docx"],
      "image/*": [".jpg", ".png", ".jpeg"],
    },
    onDrop: (acceptedFiles) => {
      setUploadedFile(acceptedFiles[0]); // Take first uploaded file
    },
  });

  // Handle Submission
  const handleSubmit = async () => {
    setIsSubmitting(true);

    // Simulated API request
    setTimeout(() => {
      setIsSubmitting(false);
      alert("Assignment submitted successfully! ✅");
    }, 2000);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg">
      <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
        Submit Assignment (ID: {assignID})
      </h1>

      {/* Assignment Document Download */}
      <div>
        <Label>Assignment Document</Label>
        <a
          href={`/api/assignments/${assignID}/download`} // Dynamic API route for downloading assignment doc
          className="text-blue-600 dark:text-blue-400 underline"
          download
        >
          Download Assignment
        </a>
      </div>

      {/* Text Submission */}
      <div>
        <Label>Your Answer</Label>
        <Textarea
          value={submissionText}
          onChange={(e) => setSubmissionText(e.target.value)}
          placeholder="Write your answer here..."
          className="h-32"
        />
      </div>

      {/* File Upload Section (Drag & Drop) */}
      <div>
        <Label>Upload Submission (Optional)</Label>
        <div
          {...getRootProps()}
          className={`border-2 border-dashed p-6 rounded-lg text-center cursor-pointer ${
            isDragActive ? "border-blue-500 bg-blue-100" : "border-gray-300"
          }`}
        >
          <input {...getInputProps()} />
          <CloudUpload className="w-10 h-10 mx-auto text-gray-500 dark:text-gray-300" />
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            {isDragActive
              ? "Drop your file here..."
              : "Drag & drop a file or click to upload"}
          </p>
          <p className="text-sm text-gray-500">
            Supported formats: PDF, DOCX, JPG, PNG
          </p>
        </div>

        {/* Show Uploaded File */}
        {uploadedFile && (
          <div className="mt-4 flex items-center justify-between p-2 bg-gray-200 dark:bg-gray-700 rounded-md">
            <span className="truncate">{uploadedFile.name}</span>
            <XCircle
              className="w-5 h-5 text-red-500 cursor-pointer"
              onClick={() => setUploadedFile(null)}
            />
          </div>
        )}
      </div>

      {/* Submit & Cancel Buttons */}
      <div className="flex justify-between pt-4">
        <Button onClick={handleSubmit} disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit Assignment"}
        </Button>
        <Button onClick={() => history.back()} variant="outline">
          Cancel
        </Button>
      </div>
    </div>
  );
}
