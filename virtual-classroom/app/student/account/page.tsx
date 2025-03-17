"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Mail, Calendar, Phone, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import secureLocalStorage from "react-secure-storage";

interface UserInfo {
  name: string;
  email: string;
  age: number;
  deptName: string;
  sectionName: string;
  semesterNumber: string;
  dob: string;
  phone: string;
}

export default function AccountPage() {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = async () => {
    try {
      const token = secureLocalStorage.getItem("jwtToken"); // Assuming token is stored here
      if (!token) throw new Error("No token found");

      const response = await axios.get("http://localhost:8080/api/student/getStudentProfile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token as string,
        },
        params: {
          emailID: "bharathshan@outlook.com", // Replace with dynamic email if needed
        },
      });

      const profile = response.data;
      setUserInfo({
        name: profile.StudentName,
        email: profile.EmailID,
        age: new Date().getFullYear() - parseInt(profile.StartYear), // Calculate age
        deptName: profile.DeptName,
        sectionName: profile.SectionName,
        semesterNumber: profile.SemesterNumber,
        dob: profile.DOB || "N/A", // Add DOB field if available
        phone: profile.Phone || "N/A",
      });
    } catch (err) {
      setError("Failed to fetch profile");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="p-6">
      <Button
        variant="outline"
        onClick={() => router.back()}
        className="flex items-center gap-2 mb-6 w-fit ml-auto">
        <ArrowLeft size={16} /> Back
      </Button>

      <h2 className="text-3xl font-bold mb-6">Account Information</h2>
      {error && <p className="text-red-500">{error}</p>}
      {userInfo ? (
        <Card className="border shadow-sm p-4">
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <User className="w-6 h-6 text-blue-600" /> Personal Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <User className="w-5 h-5 text-gray-500" />
              <p className="text-gray-800">{userInfo.name}</p>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-gray-500" />
              <p className="text-gray-800">{userInfo.email}</p>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-gray-500" />
              <p className="text-gray-800">{userInfo.dob}</p>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-gray-500" />
              <p className="text-gray-800">{userInfo.phone}</p>
            </div>
            <div className="flex items-center gap-3">
              <p className="font-semibold">Age:</p>
              <p className="text-gray-800">{userInfo.age}</p>
            </div>
            <div className="flex items-center gap-3">
              <p className="font-semibold">Department:</p>
              <p className="text-gray-800">{userInfo.deptName}</p>
            </div>
            <div className="flex items-center gap-3">
              <p className="font-semibold">Section:</p>
              <p className="text-gray-800">{userInfo.sectionName}</p>
            </div>
            <div className="flex items-center gap-3">
              <p className="font-semibold">Semester:</p>
              <p className="text-gray-800">{userInfo.semesterNumber}</p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
}
