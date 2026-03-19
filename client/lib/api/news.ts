import { apiRequest } from "./api";

export const getNews = (page = 1) =>
  apiRequest(`/news?page=${page}`);

export const getNewsByCategory = (slug: string, page = 1) =>
  apiRequest(`/news?category=${slug}&page=${page}`);