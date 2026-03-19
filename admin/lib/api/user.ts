import { apiRequest } from "./api";

// READ
type GetUsersParams = {
  page?: number;
  search?: string;
  status?: string;
  sort?: string;
  order?: string;
};

export const getUsers = ({
  page = 1,
  search = "",
  status = "",
  sort = "",
  order = "",
}: GetUsersParams) => {
  const params = new URLSearchParams();

  if (page) params.append("page", String(page));
  if (search) params.append("search", search);
  if (status) params.append("status", status);
  if (sort) params.append("sort", sort);
  if (order) params.append("order", order);

  return apiRequest(`/users?${params.toString()}`);
};

export const getUserById = (id: string) =>
  apiRequest(`/users/${id}`);

// CREATE
export const createEditor = (data: FormData) =>
  apiRequest("/users/create-editor", {
    method: "POST",
    body: data,
    headers: {},
  });

// UPDATE
export const updateUser = (id: string, data: FormData) =>
  apiRequest(`/users/${id}`, {
    method: "PATCH",
    body: data,
    headers: {},
  });

// DELETE
export const deleteUser = (id: string) =>
  apiRequest(`/users/${id}`, {
    method: "DELETE",
  });

  export const toggleUserStatus = (id: string, isActive: boolean) =>
  apiRequest(`/users/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ isActive }),
  });