"use client";

import { useEffect, useState } from "react";
import { User } from "@/types/user";
import { getUsers, deleteUser } from "@/lib/api/user";
import { useRouter } from "next/navigation";
import StatusToggle from "@/components/ui/StatusToggle";
import { toggleUserStatus } from "@/lib/api/user";
import DataTable from "@/components/table/DataTable";
import Pagination from "@/components/ui/Pagination";
import ListHeader from "@/components/common/ListHeader";
import { useDebounce } from "@/hooks/useDebounce";

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  // 🔍 Filters
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  // 📄 Pagination
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // 🔄 Sorting
  const [sortKey, setSortKey] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");

  const debouncedSearch = useDebounce(search);

  // 🔥 Fetch Users
  const fetchData = async () => {
    try {
      setLoading(true);

      const res = await getUsers({
        page,
        search: debouncedSearch,
        status,
        sort: sortKey,
        order: sortOrder,
      });

      setUsers(res.data || []);
      setTotalPages(res.totalPages || 1);
    } catch (err) {
      console.error(err);
      alert("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, debouncedSearch, status, sortKey, sortOrder]);

  // 🗑️ Delete
  const handleDelete = async (id: string) => {
    if (!confirm("Delete user?")) return;

    await deleteUser(id);
    fetchData();
  };

  // 🔄 Sorting
  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  // 📊 Columns
  const columns = [
    {
      key: "name",
      label: "Name",
      sortable: true,
      render: (item: any) => (
        <div className="flex items-center gap-3">
          {item.avatarUrl?.url && (
            <img
              src={item.avatarUrl.url}
              className="w-10 h-10 rounded-full object-cover"
            />
          )}
          <span>{item.name}</span>
        </div>
      ),
    },
    {
      key: "email",
      label: "Email",
    },
    {
      key: "role",
      label: "Role",
      sortable: true,
    },
    {
      key: "status",
      label: "Status",
      render: (item: any) =>
        item.isActive ? "Active" : "Inactive",
    },
    {
      key: "statusToggle",
      label: "Status Toggle",
      render: (item: any) => (
        <StatusToggle
          value={item.isActive}
          activeLabel="Active"
          inactiveLabel="Inactive"
          onChange={async (val: boolean) => {
            // 🔥 API call
            await toggleUserStatus(item._id, val);

            // 🔥 UI update (no reload)
            setUsers((prev) =>
              prev.map((u) =>
                u._id === item._id
                  ? { ...u, isActive: val }
                  : u
              )
            );
          }}
        />
      ),
    }
  ];

  // ⚡ Actions
  const renderActions = (item: any) => (
    <div className="flex gap-3">
      <button
        onClick={() =>
          router.push(`/dashboard/users/create?id=${item._id}`)
        }
        className="text-blue-600"
      >
        Edit
      </button>

      <button
        onClick={() => handleDelete(item._id)}
        className="text-red-600"
      >
        Delete
      </button>
    </div>
  );

  return (
    <div className="bg-white dark:bg-card rounded-xl shadow p-6">

      {/* 🔥 Header + Filters */}
      <ListHeader
        search={search}
        setSearch={setSearch}
        createLink="/dashboard/users/create"
        createLabel="Create User"
        filters={[
          {
            value: status,
            onChange: setStatus,
            options: [
              { label: "Active", value: "true" },
              { label: "Inactive", value: "false" },
            ],
          },
        ]}
      />

      {/* 📊 Table */}
      <DataTable
        columns={columns}
        data={users}
        loading={loading}
        renderActions={renderActions}
        onSort={handleSort}
        sortKey={sortKey}
        sortOrder={sortOrder}
      />

      {/* 📄 Pagination */}
      <Pagination
        page={page}
        totalPages={totalPages}
        onChange={setPage}
      />
    </div>
  );
}