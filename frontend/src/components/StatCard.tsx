interface Props {
  label: string;
  value: number | string;
  accent?: boolean;
  sub?: string;
}

export default function StatCard({ label, value, accent, sub }: Props) {
  return (
    <div className="card flex flex-col gap-1">
      <span className="text-xs font-mono text-gray-500 uppercase tracking-widest">{label}</span>
      <span className={`text-3xl font-bold ${accent ? "text-lime-400" : "text-white"}`}>
        {value}
      </span>
      {sub && <span className="text-xs text-gray-500">{sub}</span>}
    </div>
  );
}
