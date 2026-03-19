"use client";

export default function TableHeader({
  columns,
  onSort,
  sortKey,
  sortOrder,
}: any) {
  return (
    <thead className="bg-gray-100 dark:bg-muted">
      <tr>
        {columns.map((col: any) => (
          <th
            key={col.key}
            onClick={() =>
              col.sortable && onSort && onSort(col.key)
            }
            className={`p-3 text-left ${
              col.sortable ? "cursor-pointer select-none" : ""
            }`}
          >
            <div className="flex items-center gap-1">
              {col.label}

              {col.sortable && sortKey === col.key && (
                <span>
                  {sortOrder === "asc" ? "↑" : "↓"}
                </span>
              )}
            </div>
          </th>
        ))}

        <th className="p-3">Actions</th>
      </tr>
    </thead>
  );
}