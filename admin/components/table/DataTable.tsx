"use client";

import TableHeader from "./TableHeader";
import TableRow from "./TableRow";

export default function DataTable({
  columns,
  data,
  renderActions,
  loading = false,

  // 🔥 sorting props
  onSort,
  sortKey,
  sortOrder,
}: any) {
  return (
    <div className="border rounded-xl overflow-hidden bg-white dark:bg-card">
      <table className="w-full text-sm">
        
        {/* 🔥 Header */}
        <TableHeader
          columns={columns}
          onSort={onSort}
          sortKey={sortKey}
          sortOrder={sortOrder}
        />

        {/* 🔥 Body */}
        <tbody>
          {/* Loading */}
          {loading && (
            <tr>
              <td
                colSpan={columns.length + 1}
                className="p-6 text-center text-gray-500"
              >
                Loading...
              </td>
            </tr>
          )}

          {/* Empty state */}
          {!loading && data.length === 0 && (
            <tr>
              <td
                colSpan={columns.length + 1}
                className="p-6 text-center text-gray-500"
              >
                No data found
              </td>
            </tr>
          )}

          {/* Data */}
          {!loading &&
            data.map((item: any) => (
              <TableRow
                key={item._id}
                item={item}
                columns={columns}
                renderActions={renderActions}
              />
            ))}
        </tbody>
      </table>
    </div>
  );
}