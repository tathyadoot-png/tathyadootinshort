import { apiRequest } from "./api";

/* 🔥 TYPE */
type GetCategoriesParams = {
  page?: number;
  search?: string;
  status?: string;
  sort?: string;
  order?: string;
};

/* 🔥 GET WITH FILTER */
export const getCategories = ({
  page = 1,
  search = "",
  status = "",
  sort = "",
  order = "",
}: GetCategoriesParams) => {
  const params = new URLSearchParams();

  if (page) params.append("page", String(page));
  if (search) params.append("search", search);
  if (status) params.append("status", status);
  if (sort) params.append("sort", sort);
  if (order) params.append("order", order);

  return apiRequest(`/categories?${params.toString()}`);
};

/* बाकी functions */
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

  export const toggleCategoryStatus = (
  id: string,
  isActive: boolean
) =>
  apiRequest(`/categories/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ isActive }),
  });