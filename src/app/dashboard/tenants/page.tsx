"use client";

import { useState } from "react";
import clsx from "clsx";
import {
  Search,
  Plus,
  ChevronDown,
  ArrowUpDown,
  Sparkles,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Types & Data                                                       */
/* ------------------------------------------------------------------ */

type PaymentStatus = "Paid" | "Late" | "Pending";
type RiskLevel = "Low" | "Medium" | "High";

interface Tenant {
  id: number;
  name: string;
  email: string;
  initials: string;
  property: string;
  unit: string;
  leaseStart: string;
  leaseEnd: string;
  rent: number;
  paymentStatus: PaymentStatus;
  lateDays?: number;
  riskLevel: RiskLevel;
}

const tenants: Tenant[] = [
  {
    id: 1,
    name: "Sarah Chen",
    email: "sarah.chen@email.com",
    initials: "SC",
    property: "Riverside",
    unit: "4B",
    leaseStart: "Jan 2024",
    leaseEnd: "Jan 2025",
    rent: 1850,
    paymentStatus: "Paid",
    riskLevel: "Low",
  },
  {
    id: 2,
    name: "Marcus Johnson",
    email: "m.johnson@email.com",
    initials: "MJ",
    property: "Pine Valley",
    unit: "12A",
    leaseStart: "Mar 2024",
    leaseEnd: "Mar 2025",
    rent: 2100,
    paymentStatus: "Late",
    lateDays: 5,
    riskLevel: "Medium",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    email: "e.rodriguez@email.com",
    initials: "ER",
    property: "Sunset",
    unit: "22C",
    leaseStart: "Jun 2024",
    leaseEnd: "Jun 2025",
    rent: 1650,
    paymentStatus: "Paid",
    riskLevel: "Low",
  },
  {
    id: 4,
    name: "David Kim",
    email: "d.kim@email.com",
    initials: "DK",
    property: "Downtown",
    unit: "3",
    leaseStart: "Jan 2024",
    leaseEnd: "Jan 2026",
    rent: 4200,
    paymentStatus: "Paid",
    riskLevel: "Low",
  },
  {
    id: 5,
    name: "Jessica Williams",
    email: "j.williams@email.com",
    initials: "JW",
    property: "Harbor",
    unit: "8B",
    leaseStart: "Sep 2024",
    leaseEnd: "Sep 2025",
    rent: 1950,
    paymentStatus: "Pending",
    riskLevel: "High",
  },
  {
    id: 6,
    name: "Robert Taylor",
    email: "r.taylor@email.com",
    initials: "RT",
    property: "Maple",
    unit: "2",
    leaseStart: "Nov 2024",
    leaseEnd: "Nov 2025",
    rent: 2400,
    paymentStatus: "Paid",
    riskLevel: "Low",
  },
  {
    id: 7,
    name: "Aisha Patel",
    email: "a.patel@email.com",
    initials: "AP",
    property: "Riverside",
    unit: "11A",
    leaseStart: "Apr 2024",
    leaseEnd: "Apr 2025",
    rent: 1750,
    paymentStatus: "Paid",
    riskLevel: "Low",
  },
  {
    id: 8,
    name: "James O'Brien",
    email: "j.obrien@email.com",
    initials: "JO",
    property: "Pine Valley",
    unit: "5C",
    leaseStart: "Aug 2024",
    leaseEnd: "Aug 2025",
    rent: 2100,
    paymentStatus: "Late",
    lateDays: 12,
    riskLevel: "High",
  },
];

const statusOptions = ["All", "Active", "Late", "Notice"] as const;
const propertyOptions = [
  "All Properties",
  "Riverside",
  "Pine Valley",
  "Sunset",
  "Downtown",
  "Harbor",
  "Maple",
] as const;
const sortOptions = [
  "Name A-Z",
  "Name Z-A",
  "Rent: High to Low",
  "Rent: Low to High",
] as const;

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function PaymentBadge({
  status,
  lateDays,
}: {
  status: PaymentStatus;
  lateDays?: number;
}) {
  const base = "inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium";
  if (status === "Paid")
    return <span className={clsx(base, "bg-success-light text-success")}>Paid</span>;
  if (status === "Late")
    return (
      <span className={clsx(base, "bg-danger-light text-danger")}>
        Late{lateDays ? ` ${lateDays}d` : ""}
      </span>
    );
  return (
    <span className={clsx(base, "bg-warning-light text-warning")}>Pending</span>
  );
}

function RiskBadge({ level }: { level: RiskLevel }) {
  const base = "inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium";
  if (level === "Low")
    return <span className={clsx(base, "bg-success-light text-success")}>Low</span>;
  if (level === "Medium")
    return <span className={clsx(base, "bg-warning-light text-warning")}>Medium</span>;
  return <span className={clsx(base, "bg-danger-light text-danger")}>High</span>;
}

/* ------------------------------------------------------------------ */
/*  Stats                                                              */
/* ------------------------------------------------------------------ */

const stats = [
  { label: "Total Tenants", value: "127" },
  { label: "Active Leases", value: "119" },
  { label: "Pending", value: "8" },
  { label: "Satisfaction", value: "4.2", extra: "/5" },
];

/* ------------------------------------------------------------------ */
/*  Insights                                                           */
/* ------------------------------------------------------------------ */

const insights = [
  "2 tenants showing late payment patterns — proactive outreach recommended",
  "3 leases expiring within 30 days — renewal offers ready for review",
  "Jessica Williams risk elevated — 3 consecutive late payments detected",
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function TenantsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [propertyFilter, setPropertyFilter] = useState<string>("All Properties");
  const [sortBy, setSortBy] = useState<string>("Name A-Z");

  const filtered = tenants
    .filter((t) => {
      if (search) {
        const q = search.toLowerCase();
        const match =
          t.name.toLowerCase().includes(q) ||
          t.email.toLowerCase().includes(q) ||
          t.property.toLowerCase().includes(q) ||
          t.unit.toLowerCase().includes(q);
        if (!match) return false;
      }
      if (statusFilter === "Active" && t.paymentStatus !== "Paid") return false;
      if (statusFilter === "Late" && t.paymentStatus !== "Late") return false;
      if (statusFilter === "Notice" && t.paymentStatus !== "Pending") return false;
      if (propertyFilter !== "All Properties" && t.property !== propertyFilter)
        return false;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "Name A-Z") return a.name.localeCompare(b.name);
      if (sortBy === "Name Z-A") return b.name.localeCompare(a.name);
      if (sortBy === "Rent: High to Low") return b.rent - a.rent;
      if (sortBy === "Rent: Low to High") return a.rent - b.rent;
      return 0;
    });

  return (
    <div className="min-h-screen bg-cream">
      <div className="mx-auto max-w-7xl px-6 py-10">
        {/* Header */}
        <div className="flex items-start justify-between animate-fade-in">
          <div>
            <h1 className="font-serif text-[32px] text-text-primary">
              Tenants
            </h1>
            <p className="text-[14px] text-text-tertiary mt-1">
              Manage tenant relationships and leases
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
            Add Tenant
          </button>
        </div>

        {/* Stats */}
        <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4 animate-fade-in stagger-1">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={clsx(
                "bg-white border border-border rounded-[20px] p-5",
                "animate-fade-in opacity-0",
                `stagger-${i + 1}`
              )}
            >
              <p className="text-[11px] text-text-tertiary uppercase tracking-wide">
                {s.label}
              </p>
              <p className="font-serif text-[28px] text-text-primary mt-1">
                {s.value}
                {s.extra && (
                  <span className="text-[14px] font-sans text-text-tertiary">
                    {s.extra}
                  </span>
                )}
              </p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="mt-6 flex flex-wrap items-center gap-3 animate-fade-in stagger-3">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-text-tertiary" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search tenants..."
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
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className={clsx(
                "appearance-none rounded-full border border-border bg-white",
                "py-2.5 pl-4 pr-9 text-[13px] text-text-primary",
                "outline-none transition-colors cursor-pointer",
                "focus:border-text-tertiary"
              )}
            >
              {statusOptions.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-3 w-3 -translate-y-1/2 text-text-tertiary" />
          </div>

          <div className="relative">
            <select
              value={propertyFilter}
              onChange={(e) => setPropertyFilter(e.target.value)}
              className={clsx(
                "appearance-none rounded-full border border-border bg-white",
                "py-2.5 pl-4 pr-9 text-[13px] text-text-primary",
                "outline-none transition-colors cursor-pointer",
                "focus:border-text-tertiary"
              )}
            >
              {propertyOptions.map((p) => (
                <option key={p}>{p}</option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-3 w-3 -translate-y-1/2 text-text-tertiary" />
          </div>

          <div className="relative">
            <ArrowUpDown className="pointer-events-none absolute left-4 top-1/2 h-3 w-3 -translate-y-1/2 text-text-tertiary" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className={clsx(
                "appearance-none rounded-full border border-border bg-white",
                "py-2.5 pl-9 pr-9 text-[13px] text-text-primary",
                "outline-none transition-colors cursor-pointer",
                "focus:border-text-tertiary"
              )}
            >
              {sortOptions.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-3 w-3 -translate-y-1/2 text-text-tertiary" />
          </div>
        </div>

        {/* Tenant List */}
        <div className="mt-6 bg-white border border-border rounded-[20px] overflow-hidden animate-fade-in stagger-4">
          {/* Column headers */}
          <div className="hidden lg:flex items-center bg-cream-dark px-7 py-3 border-b border-border-light">
            <div className="flex-[2] min-w-0 text-[11px] uppercase tracking-wide text-text-tertiary">
              Tenant
            </div>
            <div className="flex-[1.2] min-w-0 text-[11px] uppercase tracking-wide text-text-tertiary">
              Property
            </div>
            <div className="flex-[1.2] min-w-0 text-[11px] uppercase tracking-wide text-text-tertiary">
              Lease Period
            </div>
            <div className="flex-[0.8] min-w-0 text-[11px] uppercase tracking-wide text-text-tertiary">
              Rent
            </div>
            <div className="flex-[0.8] min-w-0 text-[11px] uppercase tracking-wide text-text-tertiary">
              Payment
            </div>
            <div className="flex-[0.7] min-w-0 text-[11px] uppercase tracking-wide text-text-tertiary">
              AI Risk
            </div>
          </div>

          {/* Empty state */}
          {filtered.length === 0 && (
            <div className="px-7 py-16 text-center">
              <Search className="mx-auto h-6 w-6 text-text-tertiary" />
              <p className="mt-3 text-[14px] text-text-tertiary">
                No tenants match your filters.
              </p>
            </div>
          )}

          {/* Rows */}
          {filtered.map((t, i) => (
            <div
              key={t.id}
              className={clsx(
                "flex flex-col lg:flex-row lg:items-center px-7 py-4",
                "border-b border-border-light",
                "hover:bg-cream-dark/50 transition-colors",
                "animate-fade-in opacity-0",
                i < 8 && `stagger-${i + 1}`,
                i === filtered.length - 1 && "border-b-0"
              )}
            >
              {/* Tenant (avatar + name + email) */}
              <div className="flex-[2] flex items-center gap-3 min-w-0">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cream-deeper text-[11px] font-medium text-text-secondary">
                  {t.initials}
                </div>
                <div className="min-w-0">
                  <p className="truncate text-[14px] font-medium text-text-primary">
                    {t.name}
                  </p>
                  <p className="truncate text-[12px] text-text-tertiary">
                    {t.email}
                  </p>
                </div>
              </div>

              {/* Property + Unit */}
              <div className="flex-[1.2] min-w-0 mt-2 lg:mt-0">
                <p className="text-[13px] text-text-secondary">
                  {t.property} {t.unit}
                </p>
              </div>

              {/* Lease period */}
              <div className="flex-[1.2] min-w-0 mt-1 lg:mt-0">
                <p className="text-[13px] text-text-tertiary">
                  {t.leaseStart} &ndash; {t.leaseEnd}
                </p>
              </div>

              {/* Rent */}
              <div className="flex-[0.8] min-w-0 mt-1 lg:mt-0">
                <p className="text-[14px] text-text-primary">
                  ${t.rent.toLocaleString()}
                </p>
              </div>

              {/* Payment status */}
              <div className="flex-[0.8] min-w-0 mt-2 lg:mt-0">
                <PaymentBadge status={t.paymentStatus} lateDays={t.lateDays} />
              </div>

              {/* AI Risk */}
              <div className="flex-[0.7] min-w-0 mt-1 lg:mt-0">
                <RiskBadge level={t.riskLevel} />
              </div>
            </div>
          ))}
        </div>

        {/* AI Insights */}
        <div className="mt-6 bg-white border border-border rounded-[20px] p-7 animate-fade-in stagger-6">
          <div className="flex items-center gap-2.5">
            <Sparkles className="h-4 w-4 text-sage" />
            <h2 className="font-serif text-[18px] text-text-primary">
              AI Tenant Insights
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 mt-5 md:grid-cols-3">
            {insights.map((text, i) => (
              <div
                key={i}
                className="bg-cream-dark rounded-2xl p-4"
              >
                <p className="text-[13px] leading-relaxed text-text-secondary">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
