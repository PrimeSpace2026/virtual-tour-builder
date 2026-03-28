import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Eye, Clock, MousePointerClick, ShoppingCart, Tag, BarChart3, Users, TrendingUp } from "lucide-react";

interface StatsData {
  totalVisits: number;
  avgDuration: number | null;
  tagClicks: number;
  productClicks: number;
  addToCart: number;
  tagHeatmap: { name: string; clicks: number }[];
  productHeatmap: { name: string; clicks: number }[];
  recentVisits: { id: number; visitorId: string; startedAt: string; durationSeconds: number | null }[];
}

const formatDuration = (seconds: number | null) => {
  if (!seconds) return "—";
  if (seconds < 60) return `${Math.round(seconds)}s`;
  const mins = Math.floor(seconds / 60);
  const secs = Math.round(seconds % 60);
  return `${mins}m ${secs}s`;
};

const TourStats = () => {
  const { id } = useParams<{ id: string }>();
  const [stats, setStats] = useState<StatsData | null>(null);
  const [tourName, setTourName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    Promise.all([
      fetch(`/api/analytics/tours/${id}/stats`).then(r => r.json()),
      fetch(`/api/tours/${id}`).then(r => r.json()).catch(() => null),
    ]).then(([statsData, tourData]) => {
      setStats(statsData);
      if (tourData?.name) setTourName(tourData.name);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [id]);

  const maxTagClicks = stats?.tagHeatmap?.length ? Math.max(...stats.tagHeatmap.map(t => t.clicks)) : 1;
  const maxProductClicks = stats?.productHeatmap?.length ? Math.max(...stats.productHeatmap.map(t => t.clicks)) : 1;

  return (
    <div className="min-h-screen bg-[#0a0a14] text-white">
      {/* Header */}
      <div className="border-b border-white/10 bg-black/40 backdrop-blur-xl sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link to="/admin" className="flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm">
            <ArrowLeft className="w-4 h-4" />
            Admin
          </Link>
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-purple-400" />
            <h1 className="text-lg font-bold">Statistiques</h1>
          </div>
          {tourName && <span className="text-white/40 text-sm ml-auto">{tourName}</span>}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-purple-400 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : !stats ? (
          <p className="text-center text-white/40 py-20">Aucune donnée disponible</p>
        ) : (
          <>
            {/* KPI Cards */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8">
              {[
                { label: "Visites", value: stats.totalVisits, icon: Eye, color: "text-blue-400", bg: "bg-blue-500/10" },
                { label: "Durée moy.", value: formatDuration(stats.avgDuration), icon: Clock, color: "text-green-400", bg: "bg-green-500/10" },
                { label: "Clics Tags", value: stats.tagClicks, icon: Tag, color: "text-purple-400", bg: "bg-purple-500/10" },
                { label: "Clics Produits", value: stats.productClicks, icon: MousePointerClick, color: "text-orange-400", bg: "bg-orange-500/10" },
                { label: "Ajouts Panier", value: stats.addToCart, icon: ShoppingCart, color: "text-pink-400", bg: "bg-pink-500/10" },
              ].map((kpi) => (
                <div key={kpi.label} className={`${kpi.bg} border border-white/[0.06] rounded-xl p-4`}>
                  <div className="flex items-center gap-2 mb-2">
                    <kpi.icon className={`w-4 h-4 ${kpi.color}`} />
                    <span className="text-white/40 text-[11px] font-medium uppercase tracking-wider">{kpi.label}</span>
                  </div>
                  <p className={`text-2xl font-bold ${kpi.color}`}>{kpi.value}</p>
                </div>
              ))}
            </div>

            {/* Heatmaps */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* Tag Heatmap */}
              <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Tag className="w-4 h-4 text-purple-400" />
                  <h2 className="text-sm font-semibold text-white/70">Heatmap Tags</h2>
                </div>
                {stats.tagHeatmap.length === 0 ? (
                  <p className="text-white/30 text-xs">Aucun clic de tag enregistré</p>
                ) : (
                  <div className="space-y-2">
                    {stats.tagHeatmap.map((t) => (
                      <div key={t.name} className="flex items-center gap-3">
                        <span className="text-white/60 text-xs w-24 truncate shrink-0">{t.name}</span>
                        <div className="flex-1 h-6 bg-white/[0.04] rounded-lg overflow-hidden relative">
                          <div
                            className="h-full rounded-lg transition-all"
                            style={{
                              width: `${Math.max(8, (t.clicks / maxTagClicks) * 100)}%`,
                              background: `linear-gradient(90deg, rgba(139,92,246,0.3), rgba(139,92,246,${0.3 + (t.clicks / maxTagClicks) * 0.7}))`,
                            }}
                          />
                          <span className="absolute inset-0 flex items-center justify-end pr-2 text-white/70 text-[10px] font-bold">
                            {t.clicks}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Product Heatmap */}
              <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="w-4 h-4 text-orange-400" />
                  <h2 className="text-sm font-semibold text-white/70">Heatmap Produits</h2>
                </div>
                {stats.productHeatmap.length === 0 ? (
                  <p className="text-white/30 text-xs">Aucun clic de produit enregistré</p>
                ) : (
                  <div className="space-y-2">
                    {stats.productHeatmap.map((t) => (
                      <div key={t.name} className="flex items-center gap-3">
                        <span className="text-white/60 text-xs w-24 truncate shrink-0">{t.name}</span>
                        <div className="flex-1 h-6 bg-white/[0.04] rounded-lg overflow-hidden relative">
                          <div
                            className="h-full rounded-lg transition-all"
                            style={{
                              width: `${Math.max(8, (t.clicks / maxProductClicks) * 100)}%`,
                              background: `linear-gradient(90deg, rgba(249,115,22,0.3), rgba(249,115,22,${0.3 + (t.clicks / maxProductClicks) * 0.7}))`,
                            }}
                          />
                          <span className="absolute inset-0 flex items-center justify-end pr-2 text-white/70 text-[10px] font-bold">
                            {t.clicks}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Recent Visits */}
            <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <Users className="w-4 h-4 text-blue-400" />
                <h2 className="text-sm font-semibold text-white/70">Visites récentes</h2>
                <span className="text-white/30 text-xs ml-auto">{stats.recentVisits.length} dernières</span>
              </div>
              {stats.recentVisits.length === 0 ? (
                <p className="text-white/30 text-xs">Aucune visite enregistrée</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="text-white/30 border-b border-white/[0.06]">
                        <th className="text-left py-2 pr-4 font-medium">Visiteur</th>
                        <th className="text-left py-2 pr-4 font-medium">Date</th>
                        <th className="text-right py-2 font-medium">Durée</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stats.recentVisits.map((v) => (
                        <tr key={v.id} className="border-b border-white/[0.03] hover:bg-white/[0.02]">
                          <td className="py-2 pr-4 text-white/50 font-mono">{v.visitorId?.slice(0, 8) || "—"}...</td>
                          <td className="py-2 pr-4 text-white/40">{new Date(v.startedAt).toLocaleString("fr-FR", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" })}</td>
                          <td className="py-2 text-right">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                              !v.durationSeconds ? "bg-white/5 text-white/20" :
                              v.durationSeconds > 120 ? "bg-green-500/15 text-green-400" :
                              v.durationSeconds > 30 ? "bg-yellow-500/15 text-yellow-400" :
                              "bg-red-500/15 text-red-400"
                            }`}>
                              {formatDuration(v.durationSeconds)}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TourStats;
