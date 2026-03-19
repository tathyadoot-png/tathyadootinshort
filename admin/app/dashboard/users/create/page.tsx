"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import UserForm from "@/components/forms/UserForm";
import {
  createEditor,
  updateUser,
  getUserById,
} from "@/lib/api/user";
import { User } from "@/types/user";

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const id = searchParams.get("id");

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  // 🔥 EDIT MODE FETCH
  useEffect(() => {
    if (id) {
      setLoading(true);

      getUserById(id)
        .then((data) => setUser(data))
        .catch(() => alert("Failed to load user"))
        .finally(() => setLoading(false));
    }
  }, [id]);

  // ⏳ loading state
  if (id && loading) {
    return <p className="p-6">Loading...</p>;
  }

  return (
    <div className="p-6">
      <UserForm
        initialData={user}
        onSubmit={async (formData) => {
          try {
            if (id) {
              // 🔥 UPDATE
              await updateUser(id, formData);
            } else {
              // 🔥 CREATE
              await createEditor(formData);
            }

            router.push("/dashboard/users");
          } catch (err) {
            console.error(err);
            alert("Something went wrong");
          }
        }}
      />
    </div>
  );
}