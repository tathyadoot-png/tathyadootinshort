"use client";

export default function TableActions({ actions }: any) {
  return (
    <div className="flex gap-3">
      {actions.map((action: any, index: number) => (
        <button
          key={index}
          onClick={action.onClick}
          className={action.className}
        >
          {action.label}
        </button>
      ))}
    </div>
  );
}