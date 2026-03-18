interface Props {
  title: string;
  value: number;
  color?: string;
}

export default function StatCard({
  title,
  value,
  color = "text-gray-800",
}: Props) {
  return (
    <div className="bg-white p-6 rounded-xl shadow border border-gray-200 transition hover:shadow-lg">
      <p className="text-gray-500 text-sm mb-2">
        {title}
      </p>
      <h2 className={`text-3xl font-bold ${color}`}>
        {value}
      </h2>
    </div>
  );
}
