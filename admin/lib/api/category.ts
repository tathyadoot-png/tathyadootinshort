import { apiRequest } from "./api";

export const getCategories = () =>
  apiRequest("/categories");

export const getActiveCategories = () =>
  apiRequest("/categories/active");

export const createCategory = (data: FormData) =>
  apiRequest("/categories", {
    method: "POST",
    body: data,
    headers: {},
  });

    export const getCategoryById = (id: string) =>
  apiRequest(`/categories/${id}`);

export const updateCategory = (id: string, data: FormData) =>
  apiRequest(`/categories/${id}`, {
    method: "PUT",
    body: data,
    headers: {},
  });

export const deleteCategory = (id: string) =>
  apiRequest(`/categories/${id}`, {
    method: "DELETE",
  });

