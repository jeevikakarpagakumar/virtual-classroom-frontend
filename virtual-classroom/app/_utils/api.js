// import secureLocalStorage from "react-secure-storage";

const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}`;

const handleUnauthorized = () => {
  // secureLocalStorage.clear();
  // window.location.reload();
};

export const makeRequest = async (url, method, body = null, token = null) => {
  try {
    const headers = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const fullURL = `${BASE_URL}${url}`;

    const options = {
      method,
      headers,
    };

    if (body && method !== "GET" && method !== "HEAD") {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(fullURL, options);

    if (response.status === 401) {
      handleUnauthorized();
    }

    if (response.status === 504) {
      return {
        success: false,
        message: "Server is currently unavailable. Please try again later.",
        data: null,
      };
    }

    if (!response.ok) {
      const data = await response.json();
      return {
        success: false,
        message: data.error || "Operation failed",
        data: null,
      };
    }

    const data = await response.json();

    return {
      success: true,
      message: "Operation successful",
      data,
    };
  } catch (err) {
    return {
      success: false,
      message: err.message || "Something went wrong",
      data: null,
    };
  }
};

export const registerCourse = async (courseData, token) => {
  return makeRequest("/admin/register-course", "POST", courseData, token);
};

export const getStudentProfile = async (token) => {
  return makeRequest("/student/profile", "GET", null, token);
};

export const getStudentCourses = async (token) => {
  return makeRequest("/student/getCourses", "GET", null, token);
};

export const createMeeting = async (meetingData, token) => {
  return makeRequest("/faculty/createMeeting", "POST", meetingData, token);
};

export const getMeetingLink = async (classroomID, token) => {
  return makeRequest(
    `/student/meeting?classroomID=${classroomID}`,
    "GET",
    null,
    token
  );
};

export const createQuiz = async (quizData, token) => {
  return makeRequest("/faculty/createQuiz", "POST", quizData, token);
};

// ✅ NEWLY ADDED for "Attempt Quiz" button
export const getQuizLink = async (classroomID, token) => {
  return makeRequest(
    `/student/quiz?classroomID=${classroomID}`,
    "GET",
    null,
    token
  );
};
