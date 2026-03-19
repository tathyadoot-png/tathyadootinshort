"use client";

export default function SearchInput({
  value,
  onChange,
  placeholder = "Search...",
}: any) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="border px-4 py-2 rounded-lg w-full"
    />
  );
}