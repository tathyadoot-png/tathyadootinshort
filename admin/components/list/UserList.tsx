"use client";

import { useEffect, useState } from "react";
import { User } from "@/types/user";
import {
  getUsers,
  deleteUser,
} from "@/lib/api/user";
import { useRouter } from "next/navigation";

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await getUsers();
      setUsers(data);
    } catch (err) {
      alert("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete user?")) return;

    await deleteUser(id);
    fetchData();
  };

  return (
    <div className="p-6">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-[var(--color-accent)]">
          Users
        </h1>

        <button
          onClick={() =>
            router.push("/dashboard/users/create")
          }
          className="bg-[var(--color-accent)] text-white px-5 py-2.5 rounded-lg font-semibold"
        >
          + Create Editor
        </button>
      </div>

      {/* LOADING */}
      {loading && <p>Loading...</p>}

      {/* LIST */}
      <div className="grid gap-4">
        {users.map((user) => (
          <div
            key={user._id}
            className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-xl p-4 flex justify-between items-center"
          >
            {/* LEFT */}
            <div className="flex items-center gap-4">
              {user.avatarUrl?.url && (
                <img
                  src={user.avatarUrl.url}
                  className="w-12 h-12 rounded-lg object-cover"
                />
              )}

              <div>
                <h2 className="font-semibold">
                  {user.name}
                </h2>
                <p className="text-sm text-gray-500">
                  {user.email}
                </p>

                <div className="text-xs text-gray-400 mt-1 flex gap-3">
                  <span>Role: {user.role}</span>
                  <span>
                    Status:{" "}
                    {user.isActive ? "Active" : "Inactive"}
                  </span>
                </div>
              </div>
            </div>

            {/* ACTIONS */}
            <div className="flex gap-2">
              <button
                onClick={() =>
                  router.push(
                    `/dashboard/users/create?id=${user._id}`
                  )
                }
                className="px-3 py-1 border rounded"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(user._id)}
                className="px-3 py-1 bg-red-500 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}