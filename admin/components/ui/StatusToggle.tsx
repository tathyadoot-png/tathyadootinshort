"use client";

export default function StatusToggle({
  value,
  onChange,
  activeLabel = "Published",
  inactiveLabel = "Draft",
}: any) {
  return (
    <div
      onClick={() => onChange(!value)}
      className={`w-14 h-7 flex items-center rounded-full p-1 cursor-pointer transition ${
        value ? "bg-green-500" : "bg-gray-400"
      }`}
    >
      <div
        className={`bg-white w-5 h-5 rounded-full shadow-md transform transition ${
          value ? "translate-x-7" : ""
        }`}
      />
    </div>
  );
}