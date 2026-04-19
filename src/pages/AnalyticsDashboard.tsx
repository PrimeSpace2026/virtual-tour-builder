import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft, Eye, Clock, MousePointerClick, ShoppingCart, Tag, BarChart3,
  Users, TrendingUp, Globe, Hash, Monitor, MapPin, Filter, ArrowUpDown, Flame,
  Briefcase, UserCheck
} from "lucide-react";
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from "react-simple-maps";

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

interface TourBreakdown {
  tourId: number;
  tourName: string;
  visits: number;
  avgDuration: number | null;
  tagClicks: number;
  productClicks: number;
  addToCart: number;
  serviceTags?: number;
  productTags?: number;
  totalTags?: number;
}

interface HeatmapEntry {
  name: string;
  clicks: number;
}

interface ClientInfo {
  visitorId: string;
  totalVisits: number;
  tours: string[];
  lastSeen: string | null;
  browser: string;
  location: string;
}

interface GlobalStats {
  totalVisits: number;
  uniqueVisitors: number;
  avgDuration: number | null;
  tagClicks: number;
  productClicks: number;
  addToCart: number;
  totalServiceTags: number;
  totalProductTags: number;
  mostClickedProduct: { name: string; clicks: number } | null;
  mostClickedTag: { name: string; clicks: number } | null;
  productHeatmap: HeatmapEntry[];
  tagHeatmap: HeatmapEntry[];
  tourBreakdown: TourBreakdown[];
  clients: ClientInfo[];
  browsers: { name: string; count: number }[];
  locations: { name: string; count: number }[];
  mapPoints: { lat: number; lng: number; count: number; name: string }[];
  recentVisits: {
    id: number; tourId: number; tourName: string; visitorId: string;
    startedAt: string; durationSeconds: number | null; browser?: string;
    country?: string; city?: string;
  }[];
}

const formatDuration = (seconds: number | null) => {
  if (!seconds) return "—";
  if (seconds < 60) return `${Math.round(seconds)}s`;
  const mins = Math.floor(seconds / 60);
  const secs = Math.round(seconds % 60);
  return `${mins}m ${secs}s`;
};

const heatColor = (ratio: number) => {
  // Blue (cold) → Cyan → Yellow → Red (hot)
  if (ratio <= 0.25) return `rgba(59,130,246,${0.4 + ratio * 2})`;
  if (ratio <= 0.5) return `rgba(6,182,212,${0.5 + ratio})`;
  if (ratio <= 0.75) return `rgba(234,179,8,${0.5 + ratio * 0.5})`;
  return `rgba(239,68,68,${0.6 + ratio * 0.4})`;
};

const AnalyticsDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState<GlobalStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [filterTourId, setFilterTourId] = useState<number | null>(null);
  const [sortField, setSortField] = useState<"visits" | "productClicks" | "tagClicks" | "addToCart">("visits");
  const [sortAsc, setSortAsc] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem("admin_token");
    if (!token) { navigate("/login"); return; }
    fetch("/api/auth/verify", { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => { if (!r.ok) throw new Error(); })
      .catch(() => { sessionStorage.removeItem("admin_token"); navigate("/login"); });
  }, [navigate]);

  useEffect(() => {
    fetch("/api/analytics/global/stats")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data) setStats(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filteredBreakdown = stats?.tourBreakdown
    ?.filter((t) => !filterTourId || t.tourId === filterTourId)
    .sort((a, b) => {
      const diff = (a[sortField] ?? 0) - (b[sortField] ?? 0);
      return sortAsc ? diff : -diff;
    }) ?? [];

  const filteredVisits = stats?.recentVisits?.filter(
    (v) => !filterTourId || v.tourId === filterTourId
  ) ?? [];

  const filteredProductHeatmap = filterTourId ? [] : (stats?.productHeatmap ?? []);
  const filteredTagHeatmap = filterTourId ? [] : (stats?.tagHeatmap ?? []);

  const maxProductClicks = filteredProductHeatmap.length ? Math.max(...filteredProductHeatmap.map((t) => t.clicks)) : 1;
  const maxTagClicks = filteredTagHeatmap.length ? Math.max(...filteredTagHeatmap.map((t) => t.clicks)) : 1;

  const toggleSort = (field: typeof sortField) => {
    if (sortField === field) setSortAsc(!sortAsc);
    else { setSortField(field); setSortAsc(false); }
  };

  return (
    <div className="min-h-screen bg-[#0a0a14] text-white">
      {/* Header */}
      <div className="border-b border-white/10 bg-black/40 backdrop-blur-xl sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link to="/admin" className="flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm">
            <ArrowLeft className="w-4 h-4" />
            Admin
          </Link>
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-purple-400" />
            <h1 className="text-lg font-bold">Analytics Dashboard</h1>
          </div>

          {/* Tour Filter */}
          {stats && stats.tourBreakdown.length > 0 && (
            <div className="ml-auto flex items-center gap-2">
              <Filter className="w-4 h-4 text-white/40" />
              <select
                className="bg-white/[0.06] border border-white/10 text-white/80 text-sm rounded-lg px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-purple-500"
                value={filterTourId ?? ""}
                onChange={(e) => setFilterTourId(e.target.value ? Number(e.target.value) : null)}
              >
                <option value="">All Tours</option>
                {stats.tourBreakdown.map((t) => (
                  <option key={t.tourId} value={t.tourId}>{t.tourName}</option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-purple-400 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : !stats ? (
          <p className="text-center text-white/40 py-20">No analytics data available</p>
        ) : (
          <>
            {/* KPI Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2 md:gap-3 mb-6 md:mb-8">
              {[
                { label: "Total Visits", value: stats.totalVisits, icon: Eye, color: "text-blue-400", bg: "bg-blue-500/10" },
                { label: "Unique Visitors", value: stats.uniqueVisitors, icon: Users, color: "text-indigo-400", bg: "bg-indigo-500/10" },
                { label: "Avg Duration", value: formatDuration(stats.avgDuration), icon: Clock, color: "text-green-400", bg: "bg-green-500/10" },
                { label: "Service Tags", value: stats.totalServiceTags ?? 0, icon: Briefcase, color: "text-teal-400", bg: "bg-teal-500/10" },
                { label: "Product Tags", value: stats.totalProductTags ?? 0, icon: Tag, color: "text-cyan-400", bg: "bg-cyan-500/10" },
                { label: "Tag Clicks", value: stats.tagClicks, icon: Hash, color: "text-purple-400", bg: "bg-purple-500/10" },
                { label: "Product Clicks", value: stats.productClicks, icon: MousePointerClick, color: "text-orange-400", bg: "bg-orange-500/10" },
                { label: "Add to Cart", value: stats.addToCart, icon: ShoppingCart, color: "text-pink-400", bg: "bg-pink-500/10" },
              ].map((kpi) => (
                <div key={kpi.label} className={`${kpi.bg} border border-white/[0.06] rounded-xl p-3 md:p-4`}>
                  <div className="flex items-center gap-1.5 md:gap-2 mb-1.5 md:mb-2">
                    <kpi.icon className={`w-3.5 h-3.5 md:w-4 md:h-4 ${kpi.color}`} />
                    <span className="text-white/40 text-[10px] md:text-[11px] font-medium uppercase tracking-wider truncate">{kpi.label}</span>
                  </div>
                  <p className={`text-xl md:text-2xl font-bold ${kpi.color}`}>{kpi.value}</p>
                </div>
              ))}
            </div>

            {/* Top Highlights */}
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-xl p-5 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center shrink-0">
                  <Flame className="w-6 h-6 text-orange-400" />
                </div>
                <div>
                  <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Most Clicked Product</p>
                  {stats.mostClickedProduct ? (
                    <>
                      <p className="text-white font-bold text-lg">{stats.mostClickedProduct.name}</p>
                      <p className="text-orange-400 text-sm font-semibold">{stats.mostClickedProduct.clicks} clicks</p>
                    </>
                  ) : (
                    <p className="text-white/30 text-sm">No product clicks yet</p>
                  )}
                </div>
              </div>
              <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-xl p-5 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center shrink-0">
                  <Tag className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Most Clicked Tag</p>
                  {stats.mostClickedTag ? (
                    <>
                      <p className="text-white font-bold text-lg">{stats.mostClickedTag.name}</p>
                      <p className="text-purple-400 text-sm font-semibold">{stats.mostClickedTag.clicks} clicks</p>
                    </>
                  ) : (
                    <p className="text-white/30 text-sm">No tag clicks yet</p>
                  )}
                </div>
              </div>
            </div>

            {/* Tour Breakdown Table */}
            <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5 mb-8">
              <div className="flex items-center gap-2 mb-4">
                <BarChart3 className="w-4 h-4 text-cyan-400" />
                <h2 className="text-sm font-semibold text-white/70">Tour Breakdown</h2>
                <span className="text-white/30 text-xs ml-auto">{filteredBreakdown.length} tours</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="text-white/30 border-b border-white/[0.06]">
                      <th className="text-left py-2 pr-4 font-medium">Tour</th>
                      {(["visits", "productClicks", "tagClicks", "addToCart"] as const).map((field) => (
                        <th
                          key={field}
                          className="text-right py-2 px-2 font-medium cursor-pointer hover:text-white/60 select-none"
                          onClick={() => toggleSort(field)}
                        >
                          <span className="inline-flex items-center gap-1">
                            {field === "visits" ? "Visits" : field === "productClicks" ? "Products" : field === "tagClicks" ? "Tags" : "Cart"}
                            <ArrowUpDown className={`w-3 h-3 ${sortField === field ? "text-purple-400" : ""}`} />
                          </span>
                        </th>
                      ))}
                      <th className="text-right py-2 px-2 font-medium">Svc Tags</th>
                      <th className="text-right py-2 px-2 font-medium">Prod Tags</th>
                      <th className="text-right py-2 pl-2 font-medium">Avg Duration</th>
                      <th className="text-right py-2 pl-2 font-medium">Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredBreakdown.map((t) => {
                      const maxVisits = Math.max(...filteredBreakdown.map((x) => x.visits), 1);
                      const ratio = t.visits / maxVisits;
                      return (
                        <tr key={t.tourId} className="border-b border-white/[0.03] hover:bg-white/[0.02]">
                          <td className="py-3 pr-4">
                            <div className="flex items-center gap-3">
                              <div
                                className="w-2 h-8 rounded-full shrink-0"
                                style={{ background: heatColor(ratio) }}
                              />
                              <span className="text-white/80 font-medium">{t.tourName}</span>
                            </div>
                          </td>
                          <td className="text-right py-3 px-2 text-white/60 font-mono">{t.visits}</td>
                          <td className="text-right py-3 px-2 text-white/60 font-mono">{t.productClicks}</td>
                          <td className="text-right py-3 px-2 text-white/60 font-mono">{t.tagClicks}</td>
                          <td className="text-right py-3 px-2 text-white/60 font-mono">{t.addToCart}</td>
                          <td className="text-right py-3 px-2 text-teal-400/70 font-mono">{t.serviceTags ?? 0}</td>
                          <td className="text-right py-3 px-2 text-cyan-400/70 font-mono">{t.productTags ?? 0}</td>
                          <td className="text-right py-3 pl-2 text-white/40">{formatDuration(t.avgDuration)}</td>
                          <td className="text-right py-3 pl-2">
                            <Link
                              to={`/admin/stats/${t.tourId}`}
                              className="text-purple-400 hover:text-purple-300 transition-colors text-[10px] font-semibold uppercase tracking-wider"
                            >
                              View →
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Interaction Heatmaps */}
            {!filterTourId && (
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {/* Product Heatmap */}
                <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <TrendingUp className="w-4 h-4 text-orange-400" />
                    <h2 className="text-sm font-semibold text-white/70">Product Interaction Heatmap</h2>
                  </div>
                  {filteredProductHeatmap.length === 0 ? (
                    <p className="text-white/30 text-xs">No product clicks recorded</p>
                  ) : (
                    <div className="space-y-2">
                      {filteredProductHeatmap.map((t) => {
                        const ratio = t.clicks / maxProductClicks;
                        return (
                          <div key={t.name} className="flex items-center gap-3">
                            <span className="text-white/60 text-xs w-28 truncate shrink-0">{t.name}</span>
                            <div className="flex-1 h-7 bg-white/[0.04] rounded-lg overflow-hidden relative">
                              <div
                                className="h-full rounded-lg transition-all"
                                style={{
                                  width: `${Math.max(8, ratio * 100)}%`,
                                  background: `linear-gradient(90deg, ${heatColor(ratio * 0.3)}, ${heatColor(ratio)})`,
                                }}
                              />
                              <span className="absolute inset-0 flex items-center justify-end pr-2 text-white/70 text-[10px] font-bold">
                                {t.clicks}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Tag Heatmap */}
                <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <Tag className="w-4 h-4 text-purple-400" />
                    <h2 className="text-sm font-semibold text-white/70">Tag Interaction Heatmap</h2>
                  </div>
                  {filteredTagHeatmap.length === 0 ? (
                    <p className="text-white/30 text-xs">No tag clicks recorded</p>
                  ) : (
                    <div className="space-y-2">
                      {filteredTagHeatmap.map((t) => {
                        const ratio = t.clicks / maxTagClicks;
                        return (
                          <div key={t.name} className="flex items-center gap-3">
                            <span className="text-white/60 text-xs w-28 truncate shrink-0">{t.name}</span>
                            <div className="flex-1 h-7 bg-white/[0.04] rounded-lg overflow-hidden relative">
                              <div
                                className="h-full rounded-lg transition-all"
                                style={{
                                  width: `${Math.max(8, ratio * 100)}%`,
                                  background: `linear-gradient(90deg, ${heatColor(ratio * 0.3)}, ${heatColor(ratio)})`,
                                }}
                              />
                              <span className="absolute inset-0 flex items-center justify-end pr-2 text-white/70 text-[10px] font-bold">
                                {t.clicks}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Browser & Location Breakdown */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Monitor className="w-4 h-4 text-sky-400" />
                  <h2 className="text-sm font-semibold text-white/70">Browsers</h2>
                </div>
                {(stats.browsers?.length ?? 0) === 0 ? (
                  <p className="text-white/30 text-xs">No data</p>
                ) : (
                  <div className="space-y-2">
                    {stats.browsers.map((b) => {
                      const maxB = Math.max(...stats.browsers.map((x) => x.count));
                      return (
                        <div key={b.name} className="flex items-center gap-3">
                          <span className="text-white/60 text-xs w-20 truncate shrink-0">{b.name}</span>
                          <div className="flex-1 h-6 bg-white/[0.04] rounded-lg overflow-hidden relative">
                            <div
                              className="h-full rounded-lg transition-all"
                              style={{
                                width: `${Math.max(8, (b.count / maxB) * 100)}%`,
                                background: `linear-gradient(90deg, rgba(56,189,248,0.3), rgba(56,189,248,${0.3 + (b.count / maxB) * 0.7}))`,
                              }}
                            />
                            <span className="absolute inset-0 flex items-center justify-end pr-2 text-white/70 text-[10px] font-bold">
                              {b.count}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5">
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="w-4 h-4 text-emerald-400" />
                  <h2 className="text-sm font-semibold text-white/70">Locations</h2>
                </div>
                {(stats.locations?.length ?? 0) === 0 ? (
                  <p className="text-white/30 text-xs">No data</p>
                ) : (
                  <div className="space-y-2">
                    {stats.locations.map((l) => {
                      const maxL = Math.max(...stats.locations.map((x) => x.count));
                      return (
                        <div key={l.name} className="flex items-center gap-3">
                          <span className="text-white/60 text-xs w-28 truncate shrink-0">{l.name}</span>
                          <div className="flex-1 h-6 bg-white/[0.04] rounded-lg overflow-hidden relative">
                            <div
                              className="h-full rounded-lg transition-all"
                              style={{
                                width: `${Math.max(8, (l.count / maxL) * 100)}%`,
                                background: `linear-gradient(90deg, rgba(52,211,153,0.3), rgba(52,211,153,${0.3 + (l.count / maxL) * 0.7}))`,
                              }}
                            />
                            <span className="absolute inset-0 flex items-center justify-end pr-2 text-white/70 text-[10px] font-bold">
                              {l.count}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Geographic Visitor Map */}
            <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5 mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Globe className="w-4 h-4 text-purple-400" />
                <h2 className="text-sm font-semibold text-white/70">Visitor Map</h2>
                <span className="text-white/30 text-xs ml-auto">{stats.mapPoints?.length ?? 0} locations</span>
              </div>
              <div className="rounded-xl overflow-hidden bg-white border border-gray-200" style={{ height: 400 }}>
                <ComposableMap
                  projection="geoMercator"
                  projectionConfig={{ scale: 150, center: [10, 30] }}
                  style={{ width: "100%", height: "100%" }}
                >
                  <ZoomableGroup>
                    <Geographies geography={GEO_URL}>
                      {({ geographies }) =>
                        geographies.map((geo) => (
                          <Geography
                            key={geo.rsmKey}
                            geography={geo}
                            fill="#e5e7eb"
                            stroke="#d1d5db"
                            strokeWidth={0.5}
                            style={{
                              default: { outline: "none" },
                              hover: { fill: "#d1d5db", outline: "none" },
                              pressed: { outline: "none" },
                            }}
                          />
                        ))
                      }
                    </Geographies>
                    {(stats.mapPoints ?? []).map((pt, i) => {
                      const maxCount = Math.max(...(stats.mapPoints ?? []).map((p) => p.count), 1);
                      const ratio = pt.count / maxCount;
                      const size = 6 + ratio * 14;
                      // Blue (cold) → Red (hot)
                      const r = Math.round(59 + ratio * 180);
                      const g = Math.round(130 - ratio * 100);
                      const b = Math.round(246 - ratio * 200);
                      const color = `rgb(${r},${g},${b})`;
                      return (
                        <Marker key={i} coordinates={[pt.lng, pt.lat]}>
                          <circle r={size} fill={color} fillOpacity={0.7} stroke={color} strokeOpacity={0.3} strokeWidth={size * 0.6} />
                          <text
                            textAnchor="middle"
                            y={-size - 6}
                            style={{ fontFamily: "system-ui", fill: "#374151", fontSize: 10, fontWeight: 600 }}
                          >
                            {pt.name} ({pt.count})
                          </text>
                        </Marker>
                      );
                    })}
                  </ZoomableGroup>
                </ComposableMap>
              </div>
            </div>

            {/* Clients / Unique Visitors */}
            <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5 mb-8">
              <div className="flex items-center gap-2 mb-4">
                <UserCheck className="w-4 h-4 text-indigo-400" />
                <h2 className="text-sm font-semibold text-white/70">Clients</h2>
                <span className="text-white/30 text-xs ml-auto">{(stats.clients ?? []).length} unique visitors</span>
              </div>
              {(stats.clients ?? []).length === 0 ? (
                <p className="text-white/30 text-xs">No visitors recorded</p>
              ) : (
                <div className="overflow-x-auto max-h-80 overflow-y-auto">
                  <table className="w-full text-xs">
                    <thead className="sticky top-0 bg-[#0a0a14]">
                      <tr className="text-white/30 border-b border-white/[0.06]">
                        <th className="text-left py-2 pr-4 font-medium">Visitor</th>
                        <th className="text-right py-2 px-3 font-medium">Visits</th>
                        <th className="text-left py-2 px-3 font-medium">Tours</th>
                        <th className="text-left py-2 px-3 font-medium">Browser</th>
                        <th className="text-left py-2 px-3 font-medium">Location</th>
                        <th className="text-right py-2 font-medium">Last Seen</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(stats.clients ?? [])
                        .filter((c) => !filterTourId || c.tours.some((t) => filteredBreakdown.some((fb) => fb.tourName === t)))
                        .map((c) => (
                        <tr key={c.visitorId} className="border-b border-white/[0.03] hover:bg-white/[0.02]">
                          <td className="py-2 pr-4 text-white/50 font-mono">{c.visitorId?.slice(0, 10) || "—"}...</td>
                          <td className="py-2 px-3 text-right">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              c.totalVisits >= 5 ? "bg-green-500/15 text-green-400" :
                              c.totalVisits >= 2 ? "bg-yellow-500/15 text-yellow-400" :
                              "bg-white/5 text-white/40"
                            }`}>
                              {c.totalVisits}
                            </span>
                          </td>
                          <td className="py-2 px-3 text-white/40">
                            <div className="flex flex-wrap gap-1">
                              {c.tours.map((t) => (
                                <span key={t} className="bg-purple-500/10 text-purple-300 px-1.5 py-0.5 rounded text-[9px]">{t}</span>
                              ))}
                            </div>
                          </td>
                          <td className="py-2 px-3 text-white/40">{c.browser || "—"}</td>
                          <td className="py-2 px-3 text-white/40">{c.location || "—"}</td>
                          <td className="py-2 text-right text-white/40">
                            {c.lastSeen ? new Date(c.lastSeen).toLocaleString("en-US", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" }) : "—"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Recent Visits */}
            <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <Users className="w-4 h-4 text-blue-400" />
                <h2 className="text-sm font-semibold text-white/70">Recent Visits</h2>
                <span className="text-white/30 text-xs ml-auto">{filteredVisits.length} entries</span>
              </div>
              {filteredVisits.length === 0 ? (
                <p className="text-white/30 text-xs">No visits recorded</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="text-white/30 border-b border-white/[0.06]">
                        <th className="text-left py-2 pr-4 font-medium">Tour</th>
                        <th className="text-left py-2 pr-4 font-medium">Visitor</th>
                        <th className="text-left py-2 pr-4 font-medium">Browser</th>
                        <th className="text-left py-2 pr-4 font-medium">Location</th>
                        <th className="text-left py-2 pr-4 font-medium">Date</th>
                        <th className="text-right py-2 font-medium">Duration</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredVisits.map((v) => (
                        <tr key={v.id} className="border-b border-white/[0.03] hover:bg-white/[0.02]">
                          <td className="py-2 pr-4">
                            <Link to={`/admin/stats/${v.tourId}`} className="text-purple-400 hover:text-purple-300 font-medium">
                              {v.tourName}
                            </Link>
                          </td>
                          <td className="py-2 pr-4 text-white/50 font-mono">{v.visitorId?.slice(0, 8) || "—"}...</td>
                          <td className="py-2 pr-4 text-white/40">{v.browser || "—"}</td>
                          <td className="py-2 pr-4 text-white/40">{v.city && v.country ? `${v.city}, ${v.country}` : v.country || "—"}</td>
                          <td className="py-2 pr-4 text-white/40">{new Date(v.startedAt).toLocaleString("en-US", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" })}</td>
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

export default AnalyticsDashboard;
