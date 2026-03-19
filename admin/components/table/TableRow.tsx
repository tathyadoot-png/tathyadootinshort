"use client";

export default function TableRow({
  item,
  columns,
  renderActions,
}: any) {
  return (
    <tr className="border-t hover:bg-gray-50 dark:hover:bg-muted/50">
      {columns.map((col: any) => (
        <td key={col.key} className="p-3">
          {col.render ? col.render(item) : item[col.key]}
        </td>
      ))}

      <td className="p-3">
        {renderActions && renderActions(item)}
      </td>
    </tr>
  );
}