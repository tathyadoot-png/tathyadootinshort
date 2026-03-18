// const BASE_URL = "http://localhost:5000/api";

// export const apiRequest = async (
//   endpoint: string,
//   options?: RequestInit
// ) => {
//   const token =
//     typeof window !== "undefined"
//       ? localStorage.getItem("accessToken")
//       : null;

//   const res = await fetch(`${BASE_URL}${endpoint}`, {
//     ...options,
//     headers: {
//       "Content-Type": "application/json",
//       ...(token && { Authorization: `Bearer ${token}` }),
//       ...(options?.headers || {}),
//     },
//   });

//   const data = await res.json();

//   if (!res.ok) {
//     throw new Error(data.message || "Something went wrong");
//   }

//   return data;
// };


const BASE_URL = "http://localhost:5000/api";

export const apiRequest = async (
  endpoint: string,
  options: RequestInit = {}
) => {
  let token =
    typeof window !== "undefined"
      ? localStorage.getItem("accessToken")
      : null;

  const makeRequest = async () => {
    return fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        ...(options.body instanceof FormData
          ? {}
          : { "Content-Type": "application/json" }),
        ...(token && { Authorization: `Bearer ${token}` }),
        ...(options.headers || {}),
      },
    });
  };

  let res = await makeRequest();


  if (res.status === 401) {
    const refreshToken = localStorage.getItem("refreshToken");

    if (!refreshToken) {
      localStorage.clear();
      window.location.href = "/login";
      return;
    }

    const refreshRes = await fetch(`${BASE_URL}/users/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    });

    const refreshData = await refreshRes.json();

    if (!refreshRes.ok) {
      localStorage.clear();
      window.location.href = "/login";
      return;
    }


    localStorage.setItem("accessToken", refreshData.accessToken);

    token = refreshData.accessToken;


    res = await makeRequest();
  }

  const data = await res.json();
  // console.log("API ERROR:", data);

  if (!res.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
};