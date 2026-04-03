"use client";

import { useState } from "react";
import clsx from "clsx";
import {
  Users,
  FileText,
  ClipboardList,
  Star,
  Search,
  Plus,
  ChevronDown,
  Eye,
  Pencil,
  MessageSquare,
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
  avatarBg: string;
  avatarText: string;
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
    avatarBg: "#E8F0ED",
    avatarText: "#4A7C6F",
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
    avatarBg: "#F0E8DE",
    avatarText: "#C4975A",
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
    avatarBg: "#E3EDE9",
    avatarText: "#5B9A7D",
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
    avatarBg: "#E2E6EB",
    avatarText: "#1A2332",
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
    avatarBg: "#F0E2E2",
    avatarText: "#B85C5C",
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
    avatarBg: "#E2E9F0",
    avatarText: "#5B82A0",
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
    avatarBg: "#E5EDEA",
    avatarText: "#4A7C6F",
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
    avatarBg: "#F0E6DE",
    avatarText: "#B85C5C",
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

function PaymentBadge({ status, lateDays }: { status: PaymentStatus; lateDays?: number }) {
  const base = "inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-medium";
  if (status === "Paid")
    return <span className={clsx(base, "bg-[#5B9A7D]/10 text-[#5B9A7D]")}>Paid</span>;
  if (status === "Late")
    return (
      <span className={clsx(base, "bg-[#B85C5C]/10 text-[#B85C5C]")}>
        Late{lateDays ? ` (${lateDays}d)` : ""}
      </span>
    );
  return <span className={clsx(base, "bg-[#C4975A]/10 text-[#C4975A]")}>Pending</span>;
}

function RiskBadge({ level }: { level: RiskLevel }) {
  const base = "inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-medium";
  if (level === "Low")
    return <span className={clsx(base, "bg-[#5B9A7D]/10 text-[#5B9A7D]")}>Low</span>;
  if (level === "Medium")
    return <span className={clsx(base, "bg-[#C4975A]/10 text-[#C4975A]")}>Medium</span>;
  return <span className={clsx(base, "bg-[#B85C5C]/10 text-[#B85C5C]")}>High</span>;
}

/* ------------------------------------------------------------------ */
/*  Stats card config                                                  */
/* ------------------------------------------------------------------ */

const stats = [
  { label: "Total Tenants", value: "127", icon: Users, accent: "#4A7C6F", accentBg: "#E8F0ED" },
  { label: "Active Leases", value: "119", icon: FileText, accent: "#5B9A7D", accentBg: "#E3EDE9" },
  { label: "Pending Applications", value: "8", icon: ClipboardList, accent: "#C4975A", accentBg: "#F0E8DE" },
  { label: "Avg Satisfaction", value: "4.2", extra: "/5", icon: Star, accent: "#C4975A", accentBg: "#F0E8DE" },
];

/* ------------------------------------------------------------------ */
/*  Insights                                                           */
/* ------------------------------------------------------------------ */

const insights = [
  "2 tenants showing late payment patterns \u2014 proactive outreach recommended",
  "3 leases expiring within 30 days \u2014 renewal offers ready for review",
  "Jessica Williams risk elevated \u2014 3 consecutive late payments detected",
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function TenantsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [propertyFilter, setPropertyFilter] = useState<string>("All Properties");
  const [sortBy, setSortBy] = useState<string>("Name A-Z");

  /* ---- Filtering ---- */
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
      if (propertyFilter !== "All Properties" && t.property !== propertyFilter) return false;
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
    <div className="mx-auto max-w-[1400px] space-y-6">
      {/* ---------------------------------------------------------------- */}
      {/*  Header                                                          */}
      {/* ---------------------------------------------------------------- */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between animate-fade-in">
        <div>
          <h1 className="text-[28px] font-semibold tracking-tight text-[#2D3436]">
            Tenants
          </h1>
          <p className="mt-1 text-[14px] text-[#A09E98]">
            Manage tenant relationships with AI-powered insights
          </p>
        </div>
        <button className="inline-flex h-10 items-center gap-2 rounded-2xl bg-[#4A7C6F] px-5 text-[13px] font-medium text-white shadow-sm transition-colors hover:bg-[#3D6A5F]">
          <Plus size={15} strokeWidth={2} />
          Add Tenant
        </button>
      </div>

      {/* ---------------------------------------------------------------- */}
      {/*  Stats                                                           */}
      {/* ---------------------------------------------------------------- */}
      <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <div
              key={s.label}
              className={clsx(
                "bg-white border border-[#E5E3DE] rounded-2xl p-5 animate-fade-in",
                `stagger-${i + 1}`
              )}
            >
              <div className="flex items-center justify-between">
                <p className="text-[12px] font-medium uppercase tracking-wide text-[#A09E98]">
                  {s.label}
                </p>
                <span
                  className="flex h-8 w-8 items-center justify-center rounded-xl"
                  style={{ backgroundColor: s.accentBg, color: s.accent }}
                >
                  <Icon size={16} strokeWidth={1.75} />
                </span>
              </div>
              <p className="mt-3 text-[28px] font-semibold leading-none tracking-tight text-[#2D3436]">
                {s.value}
                {s.extra && (
                  <span className="text-[14px] font-normal text-[#A09E98]">{s.extra}</span>
                )}
              </p>
            </div>
          );
        })}
      </div>

      {/* ---------------------------------------------------------------- */}
      {/*  Filters                                                         */}
      {/* ---------------------------------------------------------------- */}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between animate-fade-in stagger-5">
        {/* Search */}
        <div className="relative max-w-sm flex-1">
          <Search
            size={15}
            strokeWidth={1.75}
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A09E98]"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tenants..."
            className="h-10 w-full rounded-2xl border border-[#E5E3DE] bg-white pl-10 pr-4 text-[13px] text-[#2D3436] placeholder:text-[#C5C3BD] focus:border-[#4A7C6F]/40 focus:outline-none focus:ring-2 focus:ring-[#4A7C6F]/10 transition-shadow"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {/* Status */}
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-10 appearance-none rounded-2xl border border-[#E5E3DE] bg-white pl-3.5 pr-9 text-[13px] text-[#2D3436] focus:border-[#4A7C6F]/40 focus:outline-none focus:ring-2 focus:ring-[#4A7C6F]/10 transition-shadow cursor-pointer"
            >
              {statusOptions.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
            <ChevronDown
              size={14}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#A09E98]"
            />
          </div>

          {/* Property */}
          <div className="relative">
            <select
              value={propertyFilter}
              onChange={(e) => setPropertyFilter(e.target.value)}
              className="h-10 appearance-none rounded-2xl border border-[#E5E3DE] bg-white pl-3.5 pr-9 text-[13px] text-[#2D3436] focus:border-[#4A7C6F]/40 focus:outline-none focus:ring-2 focus:ring-[#4A7C6F]/10 transition-shadow cursor-pointer"
            >
              {propertyOptions.map((p) => (
                <option key={p}>{p}</option>
              ))}
            </select>
            <ChevronDown
              size={14}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#A09E98]"
            />
          </div>

          {/* Sort */}
          <div className="relative">
            <ArrowUpDown
              size={13}
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A09E98]"
            />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="h-10 appearance-none rounded-2xl border border-[#E5E3DE] bg-white pl-9 pr-9 text-[13px] text-[#2D3436] focus:border-[#4A7C6F]/40 focus:outline-none focus:ring-2 focus:ring-[#4A7C6F]/10 transition-shadow cursor-pointer"
            >
              {sortOptions.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
            <ChevronDown
              size={14}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#A09E98]"
            />
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------------------- */}
      {/*  Tenant List (card-style rows)                                   */}
      {/* ---------------------------------------------------------------- */}
      <div className="bg-white border border-[#E5E3DE] rounded-2xl overflow-hidden animate-fade-in stagger-6">
        {/* Column headers */}
        <div className="flex items-center px-6 py-3 bg-[#F5F4F0] border-b border-[#E5E3DE]">
          <div className="flex-[2] min-w-0 text-[11px] font-semibold uppercase tracking-wide text-[#A09E98]">
            Tenant
          </div>
          <div className="flex-[1.2] min-w-0 text-[11px] font-semibold uppercase tracking-wide text-[#A09E98]">
            Property
          </div>
          <div className="flex-[1.2] min-w-0 text-[11px] font-semibold uppercase tracking-wide text-[#A09E98]">
            Lease Period
          </div>
          <div className="flex-[0.8] min-w-0 text-[11px] font-semibold uppercase tracking-wide text-[#A09E98]">
            Rent
          </div>
          <div className="flex-[0.8] min-w-0 text-[11px] font-semibold uppercase tracking-wide text-[#A09E98]">
            Payment
          </div>
          <div className="flex-[0.7] min-w-0 text-[11px] font-semibold uppercase tracking-wide text-[#A09E98]">
            AI Risk
          </div>
          <div className="flex-[0.6] min-w-0 text-[11px] font-semibold uppercase tracking-wide text-[#A09E98] text-right">
            Actions
          </div>
        </div>

        {/* Rows */}
        {filtered.length === 0 && (
          <div className="px-6 py-12 text-center text-[14px] text-[#A09E98]">
            No tenants match your filters.
          </div>
        )}

        {filtered.map((t, i) => (
          <div
            key={t.id}
            className={clsx(
              "group flex items-center px-6 py-4 border-b border-[#E5E3DE] hover:bg-[#F5F4F0] transition-colors",
              "animate-fade-in",
              `stagger-${Math.min(i + 1, 8)}`,
              i === filtered.length - 1 && "border-b-0"
            )}
          >
            {/* Tenant (avatar + name + email) */}
            <div className="flex-[2] flex items-center gap-3 min-w-0">
              <div
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-[12px] font-semibold"
                style={{ backgroundColor: t.avatarBg, color: t.avatarText }}
              >
                {t.initials}
              </div>
              <div className="min-w-0">
                <p className="truncate text-[14px] font-medium text-[#2D3436]">{t.name}</p>
                <p className="truncate text-[12px] text-[#A09E98]">{t.email}</p>
              </div>
            </div>

            {/* Property + Unit */}
            <div className="flex-[1.2] min-w-0">
              <p className="truncate text-[13px] text-[#2D3436]">{t.property}</p>
              <p className="text-[12px] text-[#A09E98]">Unit {t.unit}</p>
            </div>

            {/* Lease period */}
            <div className="flex-[1.2] min-w-0">
              <p className="text-[13px] text-[#6D6B65]">
                {t.leaseStart} &ndash; {t.leaseEnd}
              </p>
            </div>

            {/* Rent */}
            <div className="flex-[0.8] min-w-0">
              <p className="text-[14px] font-semibold text-[#2D3436]">
                ${t.rent.toLocaleString()}
              </p>
            </div>

            {/* Payment status */}
            <div className="flex-[0.8] min-w-0">
              <PaymentBadge status={t.paymentStatus} lateDays={t.lateDays} />
            </div>

            {/* AI Risk */}
            <div className="flex-[0.7] min-w-0">
              <RiskBadge level={t.riskLevel} />
            </div>

            {/* Actions */}
            <div className="flex-[0.6] flex items-center justify-end gap-1">
              {[Eye, Pencil, MessageSquare].map((Icon, idx) => (
                <button
                  key={idx}
                  className="flex h-7 w-7 items-center justify-center rounded-lg text-[#A09E98] hover:text-[#2D3436] hover:bg-[#F5F4F0] transition-colors"
                >
                  <Icon size={14} strokeWidth={1.75} />
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* ---------------------------------------------------------------- */}
      {/*  AI Insights Panel                                               */}
      {/* ---------------------------------------------------------------- */}
      <div className="mt-6 bg-white border border-[#B8D4C8] rounded-2xl p-6 animate-fade-in stagger-7">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#E8F0ED] text-[#4A7C6F]">
            <Sparkles size={16} strokeWidth={2} />
          </span>
          <h2 className="text-[16px] font-semibold text-[#2D3436]">AI Tenant Insights</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {insights.map((text, i) => (
            <div key={i} className="bg-[#F5F4F0] rounded-xl p-4">
              <p className="text-[13px] leading-relaxed text-[#6D6B65]">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
