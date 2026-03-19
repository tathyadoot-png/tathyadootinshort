"use client";

import { useEffect, useState } from "react";
import { apiRequest } from "@/lib/api/api";

interface Props {
  newsId: string | null;
  onClose: () => void;
}

export default function CommentsModal({ newsId, onClose }: Props) {
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchComments = async () => {
    if (!newsId) return;

    setLoading(true);
    try {
      const res = await apiRequest(`/comments/news/${newsId}`);
      setComments(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [newsId]);

  const handleAction = async (id: string, action: string) => {
    await apiRequest(`/comments/${id}/${action}`, {
      method: "PATCH",
    });
    fetchComments();
  };

  const handleDelete = async (id: string) => {
    await apiRequest(`/comments/${id}`, {
      method: "DELETE",
    });
    fetchComments();
  };

  if (!newsId) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-card w-full max-w-2xl rounded-xl p-6 max-h-[80vh] overflow-y-auto">
        
        <div className="flex justify-between mb-4">
          <h2 className="text-lg font-bold">Comments</h2>
          <button onClick={onClose}>✕</button>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : comments.length === 0 ? (
          <p className="text-gray-500">No comments</p>
        ) : (
          <div className="space-y-3">
            {comments.map((c) => (
              <div key={c._id} className="border p-3 rounded-lg">
                <p>{c.content}</p>

                <div className="flex gap-3 mt-2 text-sm">
                  <button
                    onClick={() => handleAction(c._id, "approve")}
                    className="text-green-600"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() => handleAction(c._id, "reject")}
                    className="text-yellow-600"
                  >
                    Reject
                  </button>

                  <button
                    onClick={() => handleDelete(c._id)}
                    className="text-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}