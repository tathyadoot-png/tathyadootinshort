"use client";

export default function NewsCard({ data }: any) {
  return (
    <div className="h-screen snap-start flex flex-col bg-black text-white">
      
      {/* Image */}
      <div className="h-1/2">
        <img
          src={data.imageUrl?.url}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-bold mb-2">
            {data.title}
          </h2>

          <p className="text-sm text-gray-300">
            {data.shortContent || data.excerpt}
          </p>
        </div>

        {/* Actions */}
        <div className="flex justify-around mt-4">
          <button>❤️</button>
          <button>🔖</button>
          <button>🔗</button>
        </div>
      </div>
    </div>
  );
}