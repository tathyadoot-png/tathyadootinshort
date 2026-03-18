// import { useRouter } from "next/navigation";
// import { apiRequest } from "@/lib/api";

// export const useAuth = () => {
//   const router = useRouter();

//   const login = async (email: string, password: string) => {
//     const data = await apiRequest("/users/login", {
//       method: "POST",
//       body: JSON.stringify({ email, password }),
//     });

//     localStorage.setItem("accessToken", data.accessToken);
//     localStorage.setItem("refreshToken", data.refreshToken);

//     router.push("/dashboard");
//   };

//   return { login };
// };


import { useRouter } from "next/navigation";
import { apiRequest } from "@/lib/api/api";

export const useAuth = () => {
  const router = useRouter();

const login = async (email: string, password: string) => {
  const data = await apiRequest("/users/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  // ✅ save tokens
  localStorage.setItem("accessToken", data.accessToken);
  localStorage.setItem("refreshToken", data.refreshToken);

  return data; // 🔥 VERY IMPORTANT
};

  const logout = async () => {
    try {
      await apiRequest("/users/logout", { method: "POST" });
    } catch {}

    localStorage.clear();
    router.push("/login");
  };

  const getProfile = async () => {
    return await apiRequest("/users/profile");
  };

  return { login, logout, getProfile };
};