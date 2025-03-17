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

export const getStudentProfile = async (token) => {
  const response = await makeRequest("/student/profile", "GET", null, token);
  console.log(response);
  return response;
};

export const registerCourse = async (courseData, token) => {
  const response = await makeRequest(
    "/admin/register-course",
    "POST",
    courseData,
    token
  );

  return response;
};
