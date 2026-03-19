import { apiRequest } from "./api";
import { News } from "@/types/news";

export const getNews = async (): Promise<News[]> => {
  const res = await apiRequest("/news");

  // 🔥 safe return
  return res.data || res.news || res;
};

export const getNewsById = (id: string): Promise<News> =>
  apiRequest(`/news/id/${id}`);

export const createNews = (data: FormData) =>
  apiRequest("/news", {
    method: "POST",
    body: data,
    headers: {},
  });

export const updateNews = (id: string, data: FormData) =>
  apiRequest(`/news/${id}`, {
    method: "PUT",
    body: data,
    headers: {},
  });

export const deleteNews = (id: string) =>
  apiRequest(`/news/${id}`, {
    method: "DELETE",
  });