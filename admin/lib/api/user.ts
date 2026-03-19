import { apiRequest } from "./api";

// READ
export const getUsers = () =>
  apiRequest("/users");

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