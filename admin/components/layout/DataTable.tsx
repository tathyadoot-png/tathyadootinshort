interface Column<T> {
  header: string;
  accessor: keyof T;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
}

export default function DataTable<T>({
  columns,
  data,
}: DataTableProps<T>) {
  return (
    <div className="bg-white rounded-xl shadow border overflow-hidden">
      <table className="w-full text-left">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((col) => (
              <th
                key={String(col.accessor)}
                className="px-4 py-3 text-sm font-semibold"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((row, i) => (
            <tr
              key={i}
              className="border-t hover:bg-gray-50"
            >
              {columns.map((col) => (
                <td
                  key={String(col.accessor)}
                  className="px-4 py-3 text-sm"
                >
                  {String(row[col.accessor])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
