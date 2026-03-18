import { useRouter } from "next/navigation";
import { apiRequest } from "@/lib/api";

export const useAuth = () => {
  const router = useRouter();

  const login = async (email: string, password: string) => {
    const data = await apiRequest("/users/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);

    router.push("/dashboard");
  };

  return { login };
};
