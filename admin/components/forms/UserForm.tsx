"use client";

import { useEffect, useState } from "react";
import { User, Permissions } from "@/types/user";

interface Props {
  onSubmit: (data: FormData) => Promise<void>;
  initialData?: User | null;
}

type PermissionSection = keyof Permissions;

export default function UserForm({
  onSubmit,
  initialData,
}: Props) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    isActive: true,
  });

  const [permissions, setPermissions] =
    useState<Permissions>({
      news: {
        create: false,
        edit: false,
        delete: false,
        publish: false,
      },
      category: {
        create: false,
        edit: false,
        delete: false,
      },
      user: {
        changeRole: false,
        managePermissions: false,
      },
    });

  const [avatar, setAvatar] = useState<File | null>(
    null
  );
  const [preview, setPreview] = useState<string | null>(
    null
  );

  // ✅ EDIT MODE
  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name,
        email: initialData.email,
        password: "",
        isActive: initialData.isActive,
      });

      setPermissions(initialData.permissions);
      setPreview(initialData.avatarUrl?.url || null);
    }
  }, [initialData]);

  // ✅ TOGGLE FUNCTION (NO ERROR)
  const togglePermission = <
    S extends PermissionSection,
    K extends keyof Permissions[S]
  >(
    section: S,
    key: K
  ) => {
    setPermissions((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: !prev[section][key],
      },
    }));
  };

  // ✅ SUBMIT
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("isActive", String(form.isActive));

    if (form.password) {
      formData.append("password", form.password);
    }

    formData.append(
      "permissions",
      JSON.stringify(permissions)
    );

    if (avatar) {
      formData.append("image", avatar);
    }

    await onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-2xl p-6 space-y-5"
    >
      <h2 className="text-xl font-bold">
        {initialData ? "Edit User" : "Create User"}
      </h2>

      {/* NAME */}
      <input
        placeholder="Name"
        value={form.name}
        onChange={(e) =>
          setForm({ ...form, name: e.target.value })
        }
        className="w-full border p-3 rounded"
      />

      {/* EMAIL */}
      <input
        placeholder="Email"
        value={form.email}
        onChange={(e) =>
          setForm({ ...form, email: e.target.value })
        }
        className="w-full border p-3 rounded"
      />

      {/* PASSWORD */}
      <input
        type="password"
        placeholder="Password"
        onChange={(e) =>
          setForm({ ...form, password: e.target.value })
        }
        className="w-full border p-3 rounded"
      />

      {/* ACTIVE */}
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={form.isActive}
          onChange={(e) =>
            setForm({
              ...form,
              isActive: e.target.checked,
            })
          }
        />
        Active User
      </label>

      {/* AVATAR */}
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0] || null;
          setAvatar(file);

          if (file) {
            setPreview(URL.createObjectURL(file));
          }
        }}
      />

      {preview && (
        <img
          src={preview}
          className="w-20 h-20 object-cover rounded"
        />
      )}

      {/* 🔥 PERMISSIONS */}
      <div>
        <h3 className="font-semibold mb-2">
          Permissions
        </h3>

        {(Object.keys(permissions) as PermissionSection[]).map(
          (section) => (
            <div key={section} className="mb-3">
              <p className="font-semibold capitalize">
                {section}
              </p>

              <div className="flex flex-wrap gap-3 mt-1">
                {(
                  Object.keys(
                    permissions[section]
                  ) as (keyof Permissions[typeof section])[]
                ).map((key) => (
                  <label
                    key={String(key)}
                    className="flex items-center gap-1 text-sm"
                  >
                    <input
                      type="checkbox"
                      checked={permissions[section][key]}
                      onChange={() =>
                        togglePermission(section, key)
                      }
                    />
                    {String(key)}
                  </label>
                ))}
              </div>
            </div>
          )
        )}
      </div>

      {/* SUBMIT */}
      <button className="bg-[var(--color-accent)] text-white px-5 py-2 rounded-lg">
        {initialData ? "Update User" : "Create User"}
      </button>
    </form>
  );
}