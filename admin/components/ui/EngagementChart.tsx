"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function EngagementChart({ stats }: any) {
  const data = [
    { name: "Views", value: stats.views },
    { name: "Likes", value: stats.likes },
    { name: "Bookmarks", value: stats.bookmarks },
    { name: "Shares", value: stats.shares },
  ];

  return (
    <div className="bg-white dark:bg-card p-6 rounded-xl shadow border">
      <h2 className="font-bold mb-4 text-text">
        Engagement Overview
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}