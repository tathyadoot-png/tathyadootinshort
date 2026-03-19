"use client";

import SearchInput from "@/components/ui/SearchInput";
import SelectFilter from "@/components/ui/SelectFilter";
import Link from "next/link";

export default function ListHeader({
  search,
  setSearch,
  filters = [],
  createLink,
  createLabel = "Create",
}: any) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
      
      {/* 🔍 Search + Filters */}
      <div className="flex flex-col md:flex-row gap-3 w-full">
        <SearchInput value={search} onChange={setSearch} />

        {filters.map((filter: any, index: number) => (
          <SelectFilter
            key={index}
            value={filter.value}
            onChange={filter.onChange}
            options={filter.options}
          />
        ))}
      </div>

      {/* ➕ Create Button */}
      {createLink && (
        <Link
          href={createLink}
          className="bg-red-500 text-white px-5 py-2 rounded-lg whitespace-nowrap"
        >
          + {createLabel}
        </Link>
      )}
    </div>
  );
}