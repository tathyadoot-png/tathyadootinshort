const BASE_URL = "http://localhost:5000/api";

export const apiRequest = async (endpoint: string) => {
  const res = await fetch(`${BASE_URL}${endpoint}`);

  if (!res.ok) {
    throw new Error("API Error");
  }

  return res.json();
};