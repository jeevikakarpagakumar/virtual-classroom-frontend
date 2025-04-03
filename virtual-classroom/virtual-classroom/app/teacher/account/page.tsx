"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Mail, Calendar, Phone, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

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
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: "Bharath",
    email: "bharathshan@outlook.com",
    age: 20,
    deptName: "CSE",
    sectionName: "C",
    semesterNumber: "6",
    dob: "2004-09-16",
    phone: "+919884330054",
  });

  return (
    <div className="p-6">
      {/* Back Button */}
      <Button
        variant="outline"
        onClick={() => router.back()}
        className="flex items-center gap-2 mb-6 w-fit ml-auto">
        <ArrowLeft size={16} /> Back
      </Button>

      {/* Account Info Section */}
      <h2 className="text-3xl font-bold mb-6">Account Information</h2>
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
    </div>
  );
}
