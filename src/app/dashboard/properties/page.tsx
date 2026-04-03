"use client";

import { useState } from "react";
import { Plus, Search, MapPin, Sparkles, ChevronDown } from "lucide-react";
import clsx from "clsx";

type PropertyType = "Residential" | "Commercial" | "Mixed";
type PropertyStatus = "Active" | "Vacant" | "Maintenance";
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
  if (occupancy >= 95) return "text-success";
  if (occupancy >= 90) return "text-warning";
  return "text-danger";
}

export default function PropertiesPage() {
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
    <div className="min-h-screen bg-cream">
      <div className="mx-auto max-w-7xl px-6 py-10">
        {/* Header */}
        <div className="flex items-start justify-between animate-fade-in">
          <div>
            <h1 className="font-serif text-[32px] text-text-primary">
              Properties
            </h1>
            <p className="text-[14px] text-text-tertiary mt-1">
              Manage your portfolio
            </p>
          </div>
          <button
            className={clsx(
              "inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2",
              "text-[13px] font-medium text-text-inverse",
              "transition-colors hover:bg-text-primary"
            )}
          >
            <Plus className="h-3.5 w-3.5" strokeWidth={2} />
            Add Property
          </button>
        </div>

        {/* Summary Pill */}
        <div className="mt-6 animate-fade-in stagger-1">
          <div className="bg-white border border-border rounded-full py-3 px-6 inline-flex items-center gap-6">
            <span className="text-[13px] text-text-primary font-medium">
              6 Properties
            </span>
            <span className="text-[13px] text-text-tertiary">&middot;</span>
            <span className="text-[13px] text-text-primary font-medium">
              146 Units
            </span>
            <span className="text-[13px] text-text-tertiary">&middot;</span>
            <span className="text-[13px] text-text-primary font-medium">
              94.7% Occupied
            </span>
            <span className="text-[13px] text-text-tertiary">&middot;</span>
            <span className="text-[13px] text-text-primary font-medium">
              $325,700/mo
            </span>
          </div>
        </div>

        {/* Filters */}
        <div className="mt-6 flex items-center gap-3 animate-fade-in stagger-2">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-text-tertiary" />
            <input
              type="text"
              placeholder="Search properties..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={clsx(
                "w-64 rounded-full border border-border bg-white py-2.5 pl-10 pr-4",
                "text-[13px] text-text-primary placeholder:text-text-tertiary",
                "outline-none transition-colors",
                "focus:border-text-tertiary"
              )}
            />
          </div>

          <div className="relative">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as TypeFilter)}
              className={clsx(
                "appearance-none rounded-full border border-border bg-white",
                "py-2.5 pl-4 pr-9 text-[13px] text-text-primary",
                "outline-none transition-colors cursor-pointer",
                "focus:border-text-tertiary"
              )}
            >
              <option value="All">All Types</option>
              <option value="Residential">Residential</option>
              <option value="Commercial">Commercial</option>
              <option value="Mixed">Mixed</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-3 w-3 -translate-y-1/2 text-text-tertiary" />
          </div>

          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value as StatusFilter)
              }
              className={clsx(
                "appearance-none rounded-full border border-border bg-white",
                "py-2.5 pl-4 pr-9 text-[13px] text-text-primary",
                "outline-none transition-colors cursor-pointer",
                "focus:border-text-tertiary"
              )}
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Vacant">Vacant</option>
              <option value="Maintenance">Maintenance</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-3 w-3 -translate-y-1/2 text-text-tertiary" />
          </div>
        </div>

        {/* Property Cards Grid */}
        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((property, i) => (
            <div
              key={property.id}
              className={clsx(
                "overflow-hidden rounded-[20px] border border-border bg-white",
                "transition-colors hover:border-text-tertiary",
                "animate-fade-in opacity-0",
                i < 8 && `stagger-${i + 1}`
              )}
            >
              {/* Top section */}
              <div className="p-7">
                <div className="flex items-center">
                  <span className="text-[11px] rounded-full px-2.5 py-1 border border-border inline-block text-text-secondary">
                    {property.type}
                  </span>
                  <span
                    className={clsx(
                      "inline-block h-1.5 w-1.5 rounded-full ml-2",
                      property.status === "Active"
                        ? "bg-success"
                        : property.status === "Vacant"
                          ? "bg-warning"
                          : "bg-danger"
                    )}
                  />
                </div>
                <h3 className="font-serif text-[20px] text-text-primary mt-4">
                  {property.name}
                </h3>
                <div className="mt-1 flex items-center gap-1.5">
                  <MapPin className="h-3 w-3 text-text-tertiary" />
                  <span className="text-[13px] text-text-tertiary">
                    {property.address}
                  </span>
                </div>

                {/* Metrics */}
                <div className="mt-4 grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-[11px] text-text-tertiary uppercase tracking-wide">
                      Units
                    </p>
                    <p className="text-[18px] font-serif mt-0.5 text-text-primary">
                      {property.units}
                    </p>
                  </div>
                  <div>
                    <p className="text-[11px] text-text-tertiary uppercase tracking-wide">
                      Occupancy
                    </p>
                    <p
                      className={clsx(
                        "text-[18px] font-serif mt-0.5",
                        occupancyColor(property.occupancy)
                      )}
                    >
                      {property.occupancy}%
                    </p>
                  </div>
                  <div>
                    <p className="text-[11px] text-text-tertiary uppercase tracking-wide">
                      Revenue
                    </p>
                    <p className="text-[18px] font-serif mt-0.5 text-text-primary">
                      {formatCurrency(property.revenue)}
                    </p>
                  </div>
                </div>
              </div>

              {/* AI insight footer */}
              <div className="border-t border-border-light px-7 py-3.5 bg-cream-dark">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-3 w-3 shrink-0 text-sage" />
                  <p className="text-[12px] text-text-secondary italic">
                    {property.aiInsight}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="mt-16 flex flex-col items-center justify-center py-16 text-center">
            <Search className="h-8 w-8 text-text-tertiary" />
            <h3 className="mt-4 font-serif text-[20px] text-text-primary">
              No properties found
            </h3>
            <p className="mt-1 text-[14px] text-text-tertiary">
              Try adjusting your search or filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
