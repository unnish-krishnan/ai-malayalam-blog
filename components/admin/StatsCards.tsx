import { FileText, CheckCircle, Clock, TrendingUp } from "lucide-react";

interface StatsCardsProps {
  total: number;
  published: number;
  drafts: number;
  thisWeek: number;
}

const stats = (data: StatsCardsProps) => [
  { label: "Total Articles", value: data.total, icon: FileText, color: "bg-blue-50 text-primary" },
  { label: "Published", value: data.published, icon: CheckCircle, color: "bg-green-50 text-green-600" },
  { label: "Drafts", value: data.drafts, icon: Clock, color: "bg-yellow-50 text-yellow-600" },
  { label: "This Week", value: data.thisWeek, icon: TrendingUp, color: "bg-purple-50 text-purple-600" },
];

export default function StatsCards(props: StatsCardsProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
      {stats(props).map((stat) => (
        <div key={stat.label} className="bg-white rounded-2xl border border-gray-border p-5 flex items-center gap-4">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${stat.color}`}>
            <stat.icon size={22} />
          </div>
          <div>
            <p className="text-2xl font-bold text-text-primary font-ui">{stat.value}</p>
            <p className="text-sm text-text-secondary font-ui">{stat.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
