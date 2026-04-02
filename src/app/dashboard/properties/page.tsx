"use client";

import { useState } from "react";
import {
  Plus,
  Search,
  LayoutGrid,
  List,
  Building2,
  MapPin,
  Users,
  DollarSign,
  TrendingUp,
  MoreVertical,
  Sparkles,
  SlidersHorizontal,
  ChevronDown,
} from "lucide-react";
import clsx from "clsx";

type PropertyType = "Residential" | "Commercial" | "Mixed";
type PropertyStatus = "Active" | "Vacant" | "Maintenance";
type ViewMode = "grid" | "list";
type TypeFilter = "All" | PropertyType;
type StatusFilter = "All" | PropertyStatus;

interface Property {
  id: string;
  name: string;
  address: string;
  units: number;
  occupancy: number;
  revenue: number;
  type: PropertyType;
  status: PropertyStatus;
  aiInsight: string;
  gradient: string;
}

const properties: Property[] = [
  {
    id: "1",
    name: "Riverside Apartments",
    address: "142 Oak Street",
    units: 24,
    occupancy: 95.8,
    revenue: 48200,
    type: "Residential",
    status: "Active",
    aiInsight: "2 units below market rate",
    gradient: "from-brand-500/80 to-brand-600/90",
  },
  {
    id: "2",
    name: "Pine Valley Condos",
    address: "890 Pine Valley Dr",
    units: 36,
    occupancy: 91.7,
    revenue: 62400,
    type: "Residential",
    status: "Active",
    aiInsight: "3 leases expiring within 30 days",
    gradient: "from-info/70 to-info/90",
  },
  {
    id: "3",
    name: "Downtown Commerce Center",
    address: "55 Main St",
    units: 12,
    occupancy: 100,
    revenue: 89500,
    type: "Commercial",
    status: "Active",
    aiInsight: "Revenue up 12% vs last quarter",
    gradient: "from-success/70 to-success/90",
  },
  {
    id: "4",
    name: "Sunset Heights",
    address: "2100 Sunset Blvd",
    units: 48,
    occupancy: 93.8,
    revenue: 71800,
    type: "Residential",
    status: "Active",
    aiInsight: "Maintenance costs trending down 8%",
    gradient: "from-brand-400/70 to-brand-500/90",
  },
  {
    id: "5",
    name: "Harbor View Lofts",
    address: "300 Harbor Way",
    units: 18,
    occupancy: 88.9,
    revenue: 34600,
    type: "Residential",
    status: "Active",
    aiInsight: "2 vacancies — demand is high in area",
    gradient: "from-purple-500/70 to-purple-600/90",
  },
  {
    id: "6",
    name: "Maple Grove Townhomes",
    address: "45 Maple Grove Ln",
    units: 8,
    occupancy: 100,
    revenue: 19200,
    type: "Residential",
    status: "Active",
    aiInsight: "Fully leased — consider rate increase",
    gradient: "from-teal-500/70 to-teal-600/90",
  },
];

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

function occupancyColor(occupancy: number): string {
  if (occupancy >= 97) return "text-success";
  if (occupancy >= 92) return "text-brand-500";
  if (occupancy >= 85) return "text-warning";
  return "text-danger";
}

function occupancyBg(occupancy: number): string {
  if (occupancy >= 97) return "bg-success";
  if (occupancy >= 92) return "bg-brand-500";
  if (occupancy >= 85) return "bg-warning";
  return "bg-danger";
}

export default function PropertiesPage() {
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("All");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("All");

  const filtered = properties.filter((p) => {
    const matchesSearch =
      searchQuery === "" ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === "All" || p.type === typeFilter;
    const matchesStatus = statusFilter === "All" || p.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  const totalUnits = properties.reduce((sum, p) => sum + p.units, 0);
  const avgOccupancy =
    properties.reduce((sum, p) => sum + p.occupancy, 0) / properties.length;
  const totalRevenue = properties.reduce((sum, p) => sum + p.revenue, 0);

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-6 py-8">
        {/* Page Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Properties
            </h1>
            <p className="mt-1.5 text-[15px] text-muted">
              Manage your property portfolio
            </p>
          </div>
          <button
            className={clsx(
              "inline-flex items-center gap-2 rounded-xl bg-brand-500 px-5 py-2.5",
              "text-sm font-semibold text-white shadow-lg shadow-brand-500/20",
              "transition-all duration-200 hover:bg-brand-600 hover:shadow-xl hover:shadow-brand-500/30",
              "active:scale-[0.97]"
            )}
          >
            <Plus className="h-4 w-4" strokeWidth={2.5} />
            Add Property
          </button>
        </div>

        {/* Filter / Search Bar */}
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[260px]">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              type="text"
              placeholder="Search properties..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={clsx(
                "w-full rounded-xl border border-card-border bg-card-bg py-2.5 pl-10 pr-4",
                "text-sm text-foreground placeholder:text-muted/60",
                "outline-none transition-all duration-200",
                "focus:border-brand-300 focus:ring-2 focus:ring-brand-100"
              )}
            />
          </div>

          <div className="relative">
            <SlidersHorizontal className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted" />
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as TypeFilter)}
              className={clsx(
                "appearance-none rounded-xl border border-card-border bg-card-bg",
                "py-2.5 pl-9 pr-9 text-sm text-foreground",
                "outline-none transition-all duration-200",
                "focus:border-brand-300 focus:ring-2 focus:ring-brand-100"
              )}
            >
              <option value="All">All Types</option>
              <option value="Residential">Residential</option>
              <option value="Commercial">Commercial</option>
              <option value="Mixed">Mixed</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted" />
          </div>

          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
              className={clsx(
                "appearance-none rounded-xl border border-card-border bg-card-bg",
                "py-2.5 pl-4 pr-9 text-sm text-foreground",
                "outline-none transition-all duration-200",
                "focus:border-brand-300 focus:ring-2 focus:ring-brand-100"
              )}
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Vacant">Vacant</option>
              <option value="Maintenance">Maintenance</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted" />
          </div>

          <div className="flex items-center rounded-xl border border-card-border bg-card-bg p-0.5">
            <button
              onClick={() => setViewMode("grid")}
              className={clsx(
                "rounded-lg p-2 transition-all duration-200",
                viewMode === "grid"
                  ? "bg-brand-50 text-brand-600 shadow-sm"
                  : "text-muted hover:text-foreground"
              )}
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={clsx(
                "rounded-lg p-2 transition-all duration-200",
                viewMode === "list"
                  ? "bg-brand-50 text-brand-600 shadow-sm"
                  : "text-muted hover:text-foreground"
              )}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Portfolio Summary */}
        <div
          className={clsx(
            "mt-6 flex flex-wrap items-center gap-x-8 gap-y-3 rounded-xl",
            "border border-card-border bg-card-bg px-6 py-4 shadow-sm"
          )}
        >
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50">
              <Building2 className="h-4 w-4 text-brand-600" />
            </div>
            <div>
              <p className="text-xs font-medium text-muted">Total Units</p>
              <p className="text-lg font-bold text-foreground">{totalUnits}</p>
            </div>
          </div>
          <div className="h-10 w-px bg-card-border" />
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50">
              <Users className="h-4 w-4 text-brand-600" />
            </div>
            <div>
              <p className="text-xs font-medium text-muted">Properties</p>
              <p className="text-lg font-bold text-foreground">
                {properties.length}
              </p>
            </div>
          </div>
          <div className="h-10 w-px bg-card-border" />
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-success/10">
              <TrendingUp className="h-4 w-4 text-success" />
            </div>
            <div>
              <p className="text-xs font-medium text-muted">Avg Occupancy</p>
              <p className="text-lg font-bold text-foreground">
                {avgOccupancy.toFixed(1)}%
              </p>
            </div>
          </div>
          <div className="h-10 w-px bg-card-border" />
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50">
              <DollarSign className="h-4 w-4 text-brand-600" />
            </div>
            <div>
              <p className="text-xs font-medium text-muted">Total Revenue</p>
              <p className="text-lg font-bold text-foreground">
                {formatCurrency(totalRevenue)}
                <span className="text-xs font-normal text-muted">/mo</span>
              </p>
            </div>
          </div>
        </div>

        {/* Properties Grid */}
        {viewMode === "grid" ? (
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((property, i) => (
              <div
                key={property.id}
                className={clsx(
                  "group relative overflow-hidden rounded-xl border border-card-border bg-card-bg",
                  "shadow-sm transition-all duration-300",
                  "hover:-translate-y-1 hover:shadow-xl hover:shadow-black/[0.06] hover:border-brand-200",
                  "animate-fade-in opacity-0",
                  `stagger-${i + 1}`
                )}
              >
                {/* Gradient header strip */}
                <div
                  className={clsx(
                    "h-2 bg-gradient-to-r",
                    property.gradient
                  )}
                />

                <div className="p-5">
                  {/* Top row: name + dots */}
                  <div className="flex items-start justify-between">
                    <div className="min-w-0 flex-1">
                      <h3 className="truncate text-[15px] font-semibold text-foreground">
                        {property.name}
                      </h3>
                      <div className="mt-1 flex items-center gap-1.5 text-xs text-muted">
                        <MapPin className="h-3 w-3 shrink-0" />
                        <span className="truncate">{property.address}</span>
                      </div>
                    </div>
                    <button
                      className={clsx(
                        "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg",
                        "text-muted opacity-0 transition-all duration-200",
                        "hover:bg-brand-50 hover:text-brand-600",
                        "group-hover:opacity-100"
                      )}
                    >
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Badges */}
                  <div className="mt-3.5 flex items-center gap-2">
                    <span
                      className={clsx(
                        "inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-semibold",
                        property.type === "Commercial"
                          ? "bg-info/10 text-info"
                          : property.type === "Mixed"
                            ? "bg-purple-100 text-purple-700"
                            : "bg-brand-50 text-brand-600"
                      )}
                    >
                      {property.type}
                    </span>
                    <span
                      className={clsx(
                        "inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-semibold",
                        property.status === "Active"
                          ? "bg-success/10 text-success"
                          : property.status === "Vacant"
                            ? "bg-warning/10 text-warning"
                            : "bg-danger/10 text-danger"
                      )}
                    >
                      <span
                        className={clsx(
                          "mr-1 inline-block h-1.5 w-1.5 rounded-full",
                          property.status === "Active"
                            ? "bg-success"
                            : property.status === "Vacant"
                              ? "bg-warning"
                              : "bg-danger"
                        )}
                      />
                      {property.status}
                    </span>
                  </div>

                  {/* Metrics */}
                  <div className="mt-4 grid grid-cols-3 gap-3">
                    <div>
                      <p className="text-[11px] font-medium uppercase tracking-wider text-muted">
                        Units
                      </p>
                      <p className="mt-0.5 text-lg font-bold text-foreground">
                        {property.units}
                      </p>
                    </div>
                    <div>
                      <p className="text-[11px] font-medium uppercase tracking-wider text-muted">
                        Occupancy
                      </p>
                      <div className="mt-0.5 flex items-baseline gap-1">
                        <p
                          className={clsx(
                            "text-lg font-bold",
                            occupancyColor(property.occupancy)
                          )}
                        >
                          {property.occupancy}%
                        </p>
                      </div>
                      <div className="mt-1 h-1 w-full overflow-hidden rounded-full bg-card-border">
                        <div
                          className={clsx(
                            "h-full rounded-full transition-all duration-500",
                            occupancyBg(property.occupancy)
                          )}
                          style={{ width: `${property.occupancy}%` }}
                        />
                      </div>
                    </div>
                    <div>
                      <p className="text-[11px] font-medium uppercase tracking-wider text-muted">
                        Revenue
                      </p>
                      <p className="mt-0.5 text-lg font-bold text-foreground">
                        {formatCurrency(property.revenue)}
                      </p>
                      <p className="text-[10px] text-muted">/mo</p>
                    </div>
                  </div>

                  {/* AI Insight */}
                  <div
                    className={clsx(
                      "mt-4 flex items-start gap-2 rounded-lg bg-brand-50/60 px-3 py-2.5",
                      "border border-brand-100/80"
                    )}
                  >
                    <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-500" />
                    <p className="text-xs leading-relaxed text-brand-700">
                      <span className="font-semibold">AI:</span>{" "}
                      {property.aiInsight}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* List View */
          <div className="mt-8 overflow-hidden rounded-xl border border-card-border bg-card-bg shadow-sm">
            <table className="w-full">
              <thead>
                <tr className="border-b border-card-border bg-background/50">
                  <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-muted">
                    Property
                  </th>
                  <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-muted">
                    Type
                  </th>
                  <th className="px-5 py-3 text-center text-[11px] font-semibold uppercase tracking-wider text-muted">
                    Units
                  </th>
                  <th className="px-5 py-3 text-center text-[11px] font-semibold uppercase tracking-wider text-muted">
                    Occupancy
                  </th>
                  <th className="px-5 py-3 text-right text-[11px] font-semibold uppercase tracking-wider text-muted">
                    Revenue
                  </th>
                  <th className="px-5 py-3 text-center text-[11px] font-semibold uppercase tracking-wider text-muted">
                    Status
                  </th>
                  <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-muted">
                    AI Insight
                  </th>
                  <th className="w-10 px-3 py-3" />
                </tr>
              </thead>
              <tbody>
                {filtered.map((property, i) => (
                  <tr
                    key={property.id}
                    className={clsx(
                      "border-b border-card-border/60 transition-colors duration-150",
                      "hover:bg-brand-50/30",
                      "animate-fade-in opacity-0",
                      `stagger-${i + 1}`
                    )}
                  >
                    <td className="px-5 py-3.5">
                      <p className="text-sm font-semibold text-foreground">
                        {property.name}
                      </p>
                      <p className="mt-0.5 flex items-center gap-1 text-xs text-muted">
                        <MapPin className="h-3 w-3" />
                        {property.address}
                      </p>
                    </td>
                    <td className="px-5 py-3.5">
                      <span
                        className={clsx(
                          "inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-semibold",
                          property.type === "Commercial"
                            ? "bg-info/10 text-info"
                            : "bg-brand-50 text-brand-600"
                        )}
                      >
                        {property.type}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-center text-sm font-semibold text-foreground">
                      {property.units}
                    </td>
                    <td className="px-5 py-3.5 text-center">
                      <span
                        className={clsx(
                          "text-sm font-bold",
                          occupancyColor(property.occupancy)
                        )}
                      >
                        {property.occupancy}%
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-right text-sm font-semibold text-foreground">
                      {formatCurrency(property.revenue)}
                      <span className="text-xs font-normal text-muted">
                        /mo
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-center">
                      <span
                        className={clsx(
                          "inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-semibold",
                          "bg-success/10 text-success"
                        )}
                      >
                        <span className="mr-1 inline-block h-1.5 w-1.5 rounded-full bg-success" />
                        {property.status}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-1.5 text-xs text-brand-700">
                        <Sparkles className="h-3 w-3 text-brand-500" />
                        {property.aiInsight}
                      </div>
                    </td>
                    <td className="px-3 py-3.5">
                      <button className="flex h-7 w-7 items-center justify-center rounded-lg text-muted hover:bg-brand-50 hover:text-brand-600">
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="mt-12 flex flex-col items-center justify-center py-16 text-center">
            <Building2 className="h-12 w-12 text-muted/40" />
            <h3 className="mt-4 text-lg font-semibold text-foreground">
              No properties found
            </h3>
            <p className="mt-1 text-sm text-muted">
              Try adjusting your search or filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
