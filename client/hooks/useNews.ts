import { useEffect, useState } from "react";
import { getNews } from "@/lib/api/news";

export const useNews = (page: number) => {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);

      try {
        const res = await getNews(page);
        setNews((prev) => [...prev, ...res.data]);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [page]);

  return { news, loading };
};