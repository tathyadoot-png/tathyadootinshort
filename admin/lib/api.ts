const BASE_URL = "http://localhost:5000/api";

export const apiRequest = async (
  endpoint: string,
  options?: RequestInit
) => {
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("accessToken")
      : null;

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...(options?.headers || {}),
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
};
