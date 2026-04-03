"use client";

import { useState } from "react";
import {
  Plus,
  Search,
  LayoutGrid,
  List,
  MapPin,
  Sparkles,
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
}

const properties: Property[] = [
  {
    id: "1",
    name: "Riverside Apartments",
    address: "142 Oak Street, Portland OR",
    units: 24,
    occupancy: 95.8,
    revenue: 48200,
    type: "Residential",
    status: "Active",
    aiInsight: "2 units below market rate",
  },
  {
    id: "2",
    name: "Pine Valley Condos",
    address: "890 Pine Valley Dr, Lake Oswego OR",
    units: 36,
    occupancy: 91.7,
    revenue: 62400,
    type: "Residential",
    status: "Active",
    aiInsight: "3 maintenance requests pending",
  },
  {
    id: "3",
    name: "Downtown Commerce Center",
    address: "55 Main St, Portland OR",
    units: 12,
    occupancy: 100,
    revenue: 89500,
    type: "Commercial",
    status: "Active",
    aiInsight: "All leases renewed through 2026",
  },
  {
    id: "4",
    name: "Sunset Heights",
    address: "2100 Sunset Blvd, Beaverton OR",
    units: 48,
    occupancy: 93.8,
    revenue: 71800,
    type: "Residential",
    status: "Active",
    aiInsight: "5 leases expiring in 30 days",
  },
  {
    id: "5",
    name: "Harbor View Lofts",
    address: "300 Harbor Way, Portland OR",
    units: 18,
    occupancy: 88.9,
    revenue: 34600,
    type: "Residential",
    status: "Active",
    aiInsight: "Consider 4% rent increase",
  },
  {
    id: "6",
    name: "Maple Grove Townhomes",
    address: "45 Maple Grove Ln, Tigard OR",
    units: 8,
    occupancy: 100,
    revenue: 19200,
    type: "Residential",
    status: "Active",
    aiInsight: "Highest satisfaction score: 4.9/5",
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
  if (occupancy > 93) return "text-success";
  if (occupancy > 85) return "text-warning";
  return "text-danger";
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

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-6 py-8">
        {/* Header */}
        <div className="mb-8 flex items-start justify-between">
          <div>
            <h1 className="text-[28px] font-semibold tracking-tight text-foreground">
              Properties
            </h1>
            <p className="mt-1 text-[15px] text-warm-gray-400">
              Manage your property portfolio
            </p>
          </div>
          <button
            className={clsx(
              "inline-flex items-center gap-2 rounded-xl bg-brand-500 px-5 py-2.5",
              "text-[13px] font-medium text-white",
              "transition-all duration-200 hover:bg-brand-600",
              "active:scale-[0.97]"
            )}
          >
            <Plus className="h-4 w-4" strokeWidth={2} />
            Add Property
          </button>
        </div>

        {/* Portfolio Summary */}
        <div
          className={clsx(
            "mt-6 flex items-center justify-between rounded-2xl",
            "border border-card-border bg-card-bg p-5",
            "animate-fade-in"
          )}
        >
          <div className="flex items-center gap-0">
            <div className="px-6 first:pl-0">
              <p className="text-[14px] font-semibold text-foreground">6 Properties</p>
              <p className="text-[14px] text-warm-gray-400">Portfolio</p>
            </div>
            <div className="h-8 w-px bg-warm-gray-200" />
            <div className="px-6">
              <p className="text-[14px] font-semibold text-foreground">146 Units</p>
              <p className="text-[14px] text-warm-gray-400">Total units</p>
            </div>
            <div className="h-8 w-px bg-warm-gray-200" />
            <div className="px-6">
              <p className="text-[14px] font-semibold text-foreground">94.7% Avg Occupancy</p>
              <p className="text-[14px] text-warm-gray-400">Across portfolio</p>
            </div>
            <div className="h-8 w-px bg-warm-gray-200" />
            <div className="px-6">
              <p className="text-[14px] font-semibold text-foreground">$325,700/mo Revenue</p>
              <p className="text-[14px] text-warm-gray-400">Monthly income</p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="mt-6 flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-warm-gray-400" />
            <input
              type="text"
              placeholder="Search properties..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={clsx(
                "w-64 rounded-xl border border-card-border bg-card-bg py-2.5 pl-10 pr-4",
                "text-[13px] text-foreground placeholder:text-warm-gray-400",
                "outline-none transition-all duration-200",
                "focus:border-brand-300 focus:ring-2 focus:ring-brand-100"
              )}
            />
          </div>

          <div className="relative">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as TypeFilter)}
              className={clsx(
                "appearance-none rounded-xl border border-card-border bg-card-bg",
                "py-2.5 pl-4 pr-9 text-[13px] text-foreground",
                "outline-none transition-all duration-200",
                "focus:border-brand-300 focus:ring-2 focus:ring-brand-100"
              )}
            >
              <option value="All">All Types</option>
              <option value="Residential">Residential</option>
              <option value="Commercial">Commercial</option>
              <option value="Mixed">Mixed</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-warm-gray-400" />
          </div>

          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
              className={clsx(
                "appearance-none rounded-xl border border-card-border bg-card-bg",
                "py-2.5 pl-4 pr-9 text-[13px] text-foreground",
                "outline-none transition-all duration-200",
                "focus:border-brand-300 focus:ring-2 focus:ring-brand-100"
              )}
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Vacant">Vacant</option>
              <option value="Maintenance">Maintenance</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-warm-gray-400" />
          </div>

          <div className="flex items-center rounded-xl border border-card-border bg-card-bg p-0.5">
            <button
              onClick={() => setViewMode("grid")}
              className={clsx(
                "rounded-lg p-2 transition-all duration-200",
                viewMode === "grid"
                  ? "bg-brand-50 text-brand-600"
                  : "text-warm-gray-400 hover:text-foreground"
              )}
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={clsx(
                "rounded-lg p-2 transition-all duration-200",
                viewMode === "list"
                  ? "bg-brand-50 text-brand-600"
                  : "text-warm-gray-400 hover:text-foreground"
              )}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Property Cards Grid */}
        {viewMode === "grid" ? (
          <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filtered.map((property, i) => (
              <div
                key={property.id}
                className={clsx(
                  "overflow-hidden rounded-2xl border border-card-border bg-card-bg",
                  "transition-shadow duration-200 hover:shadow-md",
                  "animate-fade-in opacity-0",
                  i < 8 && `stagger-${i + 1}`
                )}
              >
                {/* Top section */}
                <div className="p-6">
                  <div className="flex items-center gap-2.5">
                    <span
                      className={clsx(
                        "text-[11px] font-medium rounded-full px-2.5 py-1",
                        property.type === "Commercial"
                          ? "bg-info/10 text-info"
                          : property.type === "Mixed"
                            ? "bg-warning/10 text-warning"
                            : "bg-brand-50 text-brand-600"
                      )}
                    >
                      {property.type}
                    </span>
                    <span
                      className={clsx(
                        "inline-block h-2 w-2 rounded-full",
                        property.status === "Active"
                          ? "bg-success"
                          : property.status === "Vacant"
                            ? "bg-warning"
                            : "bg-danger"
                      )}
                    />
                  </div>
                  <h3 className="mt-3 text-[17px] font-semibold text-foreground">
                    {property.name}
                  </h3>
                  <div className="mt-1 flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-warm-gray-400" />
                    <span className="text-[13px] text-warm-gray-400">
                      {property.address}
                    </span>
                  </div>

                  {/* Metrics row */}
                  <div className="mt-4 grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-[13px] text-warm-gray-400">Units</p>
                      <p className="text-[18px] font-semibold text-foreground">
                        {property.units}
                      </p>
                    </div>
                    <div>
                      <p className="text-[13px] text-warm-gray-400">Occupancy</p>
                      <p
                        className={clsx(
                          "text-[18px] font-semibold",
                          occupancyColor(property.occupancy)
                        )}
                      >
                        {property.occupancy}%
                      </p>
                    </div>
                    <div>
                      <p className="text-[13px] text-warm-gray-400">Revenue</p>
                      <p className="text-[18px] font-semibold text-foreground">
                        {formatCurrency(property.revenue)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* AI insight footer */}
                <div className="border-t border-card-border bg-warm-gray-50 px-6 py-3.5">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-3.5 w-3.5 shrink-0 text-brand-500" />
                    <p className="text-[12px] text-warm-gray-500">
                      {property.aiInsight}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* List View */
          <div className="mt-6 overflow-hidden rounded-2xl border border-card-border bg-card-bg">
            <table className="w-full">
              <thead>
                <tr className="border-b border-card-border">
                  <th className="px-6 py-3.5 text-left text-[12px] font-medium text-warm-gray-400">
                    Property
                  </th>
                  <th className="px-6 py-3.5 text-left text-[12px] font-medium text-warm-gray-400">
                    Type
                  </th>
                  <th className="px-6 py-3.5 text-center text-[12px] font-medium text-warm-gray-400">
                    Units
                  </th>
                  <th className="px-6 py-3.5 text-center text-[12px] font-medium text-warm-gray-400">
                    Occupancy
                  </th>
                  <th className="px-6 py-3.5 text-right text-[12px] font-medium text-warm-gray-400">
                    Revenue
                  </th>
                  <th className="px-6 py-3.5 text-left text-[12px] font-medium text-warm-gray-400">
                    Insight
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((property, i) => (
                  <tr
                    key={property.id}
                    className={clsx(
                      "border-b border-card-border/60 transition-colors duration-150",
                      "hover:bg-warm-gray-50",
                      "animate-fade-in opacity-0",
                      i < 8 && `stagger-${i + 1}`
                    )}
                  >
                    <td className="px-6 py-4">
                      <p className="text-[14px] font-semibold text-foreground">
                        {property.name}
                      </p>
                      <p className="mt-0.5 flex items-center gap-1 text-[12px] text-warm-gray-400">
                        <MapPin className="h-3 w-3" />
                        {property.address}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={clsx(
                          "text-[11px] font-medium rounded-full px-2.5 py-1",
                          property.type === "Commercial"
                            ? "bg-info/10 text-info"
                            : "bg-brand-50 text-brand-600"
                        )}
                      >
                        {property.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center text-[14px] font-semibold text-foreground">
                      {property.units}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span
                        className={clsx(
                          "text-[14px] font-semibold",
                          occupancyColor(property.occupancy)
                        )}
                      >
                        {property.occupancy}%
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right text-[14px] font-semibold text-foreground">
                      {formatCurrency(property.revenue)}/mo
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5">
                        <Sparkles className="h-3 w-3 shrink-0 text-brand-500" />
                        <span className="text-[12px] text-warm-gray-500">
                          {property.aiInsight}
                        </span>
                      </div>
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
            <Search className="h-10 w-10 text-warm-gray-300" />
            <h3 className="mt-4 text-[17px] font-semibold text-foreground">
              No properties found
            </h3>
            <p className="mt-1 text-[14px] text-warm-gray-400">
              Try adjusting your search or filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
