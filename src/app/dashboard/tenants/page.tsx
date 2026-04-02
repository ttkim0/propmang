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
  Brain,
  AlertTriangle,
  CalendarClock,
  ShieldAlert,
  ArrowUpDown,
  Sparkles,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

type PaymentStatus = "Paid" | "Late" | "Pending";
type RiskLevel = "Low" | "Medium" | "High";

interface Tenant {
  id: number;
  name: string;
  email: string;
  initials: string;
  avatarColor: string;
  property: string;
  unit: string;
  leaseStart: string;
  leaseEnd: string;
  rent: number;
  paymentStatus: PaymentStatus;
  lateDays?: number;
  riskScore: RiskLevel;
}

const tenants: Tenant[] = [
  {
    id: 1,
    name: "Sarah Chen",
    email: "s.chen@email.com",
    initials: "SC",
    avatarColor: "bg-brand-500",
    property: "Riverside Apt",
    unit: "4B",
    leaseStart: "Mar 2025",
    leaseEnd: "Feb 2026",
    rent: 1850,
    paymentStatus: "Paid",
    riskScore: "Low",
  },
  {
    id: 2,
    name: "Marcus Johnson",
    email: "m.johnson@email.com",
    initials: "MJ",
    avatarColor: "bg-amber-600",
    property: "Pine Valley",
    unit: "12A",
    leaseStart: "Jan 2025",
    leaseEnd: "Dec 2025",
    rent: 2100,
    paymentStatus: "Late",
    lateDays: 5,
    riskScore: "Medium",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    email: "e.rodriguez@email.com",
    initials: "ER",
    avatarColor: "bg-emerald-600",
    property: "Sunset Heights",
    unit: "22C",
    leaseStart: "Jun 2025",
    leaseEnd: "May 2026",
    rent: 1650,
    paymentStatus: "Paid",
    riskScore: "Low",
  },
  {
    id: 4,
    name: "David Kim",
    email: "d.kim@email.com",
    initials: "DK",
    avatarColor: "bg-violet-600",
    property: "Downtown Commerce",
    unit: "3",
    leaseStart: "Feb 2025",
    leaseEnd: "Jan 2026",
    rent: 4200,
    paymentStatus: "Paid",
    riskScore: "Low",
  },
  {
    id: 5,
    name: "Jessica Williams",
    email: "j.williams@email.com",
    initials: "JW",
    avatarColor: "bg-rose-600",
    property: "Harbor View",
    unit: "8B",
    leaseStart: "Apr 2025",
    leaseEnd: "Mar 2026",
    rent: 1950,
    paymentStatus: "Pending",
    riskScore: "High",
  },
  {
    id: 6,
    name: "Robert Taylor",
    email: "r.taylor@email.com",
    initials: "RT",
    avatarColor: "bg-sky-600",
    property: "Maple Grove",
    unit: "2",
    leaseStart: "May 2025",
    leaseEnd: "Apr 2026",
    rent: 2400,
    paymentStatus: "Paid",
    riskScore: "Low",
  },
  {
    id: 7,
    name: "Aisha Patel",
    email: "a.patel@email.com",
    initials: "AP",
    avatarColor: "bg-teal-600",
    property: "Riverside Apt",
    unit: "11A",
    leaseStart: "Jul 2025",
    leaseEnd: "Jun 2026",
    rent: 1750,
    paymentStatus: "Paid",
    riskScore: "Low",
  },
  {
    id: 8,
    name: "James O'Brien",
    email: "j.obrien@email.com",
    initials: "JO",
    avatarColor: "bg-orange-600",
    property: "Pine Valley",
    unit: "5C",
    leaseStart: "Nov 2024",
    leaseEnd: "Oct 2025",
    rent: 2100,
    paymentStatus: "Late",
    lateDays: 12,
    riskScore: "High",
  },
];

const statusOptions = ["All", "Active", "Late", "Notice Given"] as const;
const propertyOptions = [
  "All Properties",
  "Riverside Apt",
  "Pine Valley",
  "Sunset Heights",
  "Downtown Commerce",
  "Harbor View",
  "Maple Grove",
] as const;
const sortOptions = [
  "Name A-Z",
  "Name Z-A",
  "Rent: High to Low",
  "Rent: Low to High",
  "Risk Score",
] as const;

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function paymentBadge(status: PaymentStatus, lateDays?: number) {
  const base =
    "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold leading-5";
  if (status === "Paid")
    return (
      <span className={clsx(base, "bg-success/10 text-success")}>Paid</span>
    );
  if (status === "Late")
    return (
      <span className={clsx(base, "bg-danger/10 text-danger")}>
        Late{lateDays ? ` (${lateDays}d)` : ""}
      </span>
    );
  return (
    <span className={clsx(base, "bg-warning/10 text-warning")}>Pending</span>
  );
}

function riskBadge(level: RiskLevel) {
  const base =
    "inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[11px] font-semibold leading-5";
  if (level === "Low")
    return <span className={clsx(base, "bg-success/10 text-success")}>Low</span>;
  if (level === "Medium")
    return (
      <span className={clsx(base, "bg-warning/10 text-warning")}>Medium</span>
    );
  return (
    <span className={clsx(base, "bg-danger/10 text-danger")}>High</span>
  );
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function TenantsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [propertyFilter, setPropertyFilter] = useState("All Properties");
  const [sortBy, setSortBy] = useState("Name A-Z");

  return (
    <div className="mx-auto max-w-[1400px] space-y-6">
      {/* ---- Page header ---- */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-[22px] font-semibold tracking-[-0.01em] text-foreground">
            Tenants
          </h1>
          <p className="mt-1 text-[13px] text-muted">
            Manage tenant relationships with AI-powered insights
          </p>
        </div>
        <button className="inline-flex h-9 items-center gap-2 rounded-lg bg-brand-500 px-4 text-[13px] font-medium text-white shadow-sm transition-colors hover:bg-brand-600">
          <Plus size={15} strokeWidth={2} />
          Add Tenant
        </button>
      </div>

      {/* ---- Quick stats ---- */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          {
            label: "Total Tenants",
            value: "127",
            icon: Users,
            color: "text-brand-500 bg-brand-50",
          },
          {
            label: "Active Leases",
            value: "119",
            icon: FileText,
            color: "text-success bg-success/10",
          },
          {
            label: "Pending Applications",
            value: "8",
            icon: ClipboardList,
            color: "text-warning bg-warning/10",
          },
          {
            label: "Avg Tenant Score",
            value: "4.2",
            extra: "/5",
            icon: Star,
            color: "text-amber-500 bg-amber-500/10",
          },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="rounded-xl border border-card-border bg-card-bg p-5"
            >
              <div className="flex items-center justify-between">
                <p className="text-[12px] font-medium uppercase tracking-wide text-muted">
                  {stat.label}
                </p>
                <span
                  className={clsx(
                    "flex h-8 w-8 items-center justify-center rounded-lg",
                    stat.color
                  )}
                >
                  <Icon size={16} strokeWidth={1.75} />
                </span>
              </div>
              <p className="mt-3 text-[26px] font-semibold leading-none tracking-tight text-foreground">
                {stat.value}
                {stat.extra && (
                  <span className="text-[14px] font-normal text-muted">
                    {stat.extra}
                  </span>
                )}
              </p>
            </div>
          );
        })}
      </div>

      {/* ---- Search & filters ---- */}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        {/* Search */}
        <div className="relative max-w-sm flex-1">
          <Search
            size={15}
            strokeWidth={1.75}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, unit, or property..."
            className="h-9 w-full rounded-lg border border-card-border bg-card-bg pl-9 pr-4 text-[13px] text-foreground placeholder:text-muted/60 focus:border-brand-500/40 focus:outline-none focus:ring-1 focus:ring-brand-500/20"
          />
        </div>

        {/* Filter pills */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Status */}
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-9 appearance-none rounded-lg border border-card-border bg-card-bg pl-3 pr-8 text-[13px] text-foreground focus:border-brand-500/40 focus:outline-none focus:ring-1 focus:ring-brand-500/20"
            >
              {statusOptions.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
            <ChevronDown
              size={14}
              className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-muted"
            />
          </div>

          {/* Property */}
          <div className="relative">
            <select
              value={propertyFilter}
              onChange={(e) => setPropertyFilter(e.target.value)}
              className="h-9 appearance-none rounded-lg border border-card-border bg-card-bg pl-3 pr-8 text-[13px] text-foreground focus:border-brand-500/40 focus:outline-none focus:ring-1 focus:ring-brand-500/20"
            >
              {propertyOptions.map((p) => (
                <option key={p}>{p}</option>
              ))}
            </select>
            <ChevronDown
              size={14}
              className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-muted"
            />
          </div>

          {/* Sort */}
          <div className="relative">
            <ArrowUpDown
              size={13}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted"
            />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="h-9 appearance-none rounded-lg border border-card-border bg-card-bg pl-8 pr-8 text-[13px] text-foreground focus:border-brand-500/40 focus:outline-none focus:ring-1 focus:ring-brand-500/20"
            >
              {sortOptions.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
            <ChevronDown
              size={14}
              className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-muted"
            />
          </div>
        </div>
      </div>

      {/* ---- Main content grid (table + AI panel) ---- */}
      <div className="grid gap-6 xl:grid-cols-[1fr_320px]">
        {/* ---- Tenant table ---- */}
        <div className="overflow-hidden rounded-xl border border-card-border bg-card-bg">
          {/* Table header */}
          <div className="grid grid-cols-[2fr_1.4fr_1.2fr_0.9fr_0.8fr_0.7fr_0.6fr] items-center gap-4 border-b border-card-border px-5 py-3 text-[11px] font-semibold uppercase tracking-wide text-muted">
            <span>Tenant</span>
            <span>Property / Unit</span>
            <span>Lease Period</span>
            <span>Rent</span>
            <span>Payment</span>
            <span className="flex items-center gap-1">
              <Brain size={12} strokeWidth={2} />
              AI Risk
            </span>
            <span className="text-right">Actions</span>
          </div>

          {/* Rows */}
          {tenants.map((t, i) => (
            <div
              key={t.id}
              className={clsx(
                "group grid grid-cols-[2fr_1.4fr_1.2fr_0.9fr_0.8fr_0.7fr_0.6fr] items-center gap-4 border-b border-card-border/60 px-5 py-3.5 transition-colors last:border-b-0 hover:bg-brand-50/40",
                i % 2 === 1 && "bg-background/40"
              )}
            >
              {/* Tenant info */}
              <div className="flex items-center gap-3 min-w-0">
                <span
                  className={clsx(
                    "flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[12px] font-semibold text-white",
                    t.avatarColor
                  )}
                >
                  {t.initials}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-[13px] font-medium text-foreground">
                    {t.name}
                  </p>
                  <p className="truncate text-[11px] text-muted">{t.email}</p>
                </div>
              </div>

              {/* Property / Unit */}
              <div className="min-w-0">
                <p className="truncate text-[13px] text-foreground">
                  {t.property}
                </p>
                <p className="text-[11px] text-muted">Unit {t.unit}</p>
              </div>

              {/* Lease period */}
              <p className="text-[12px] text-muted">
                {t.leaseStart} &ndash; {t.leaseEnd}
              </p>

              {/* Rent */}
              <p className="text-[13px] font-medium text-foreground">
                ${t.rent.toLocaleString()}
                <span className="text-[11px] font-normal text-muted">/mo</span>
              </p>

              {/* Payment status */}
              {paymentBadge(t.paymentStatus, t.lateDays)}

              {/* AI Risk */}
              {riskBadge(t.riskScore)}

              {/* Actions */}
              <div className="flex items-center justify-end gap-1">
                {[
                  { icon: Eye, label: "View" },
                  { icon: Pencil, label: "Edit" },
                  { icon: MessageSquare, label: "Message" },
                ].map((action) => {
                  const Icon = action.icon;
                  return (
                    <button
                      key={action.label}
                      aria-label={action.label}
                      className="flex h-7 w-7 items-center justify-center rounded-md text-muted opacity-0 transition-all hover:bg-brand-50 hover:text-brand-600 group-hover:opacity-100"
                    >
                      <Icon size={14} strokeWidth={1.75} />
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* ---- AI Tenant Insights panel ---- */}
        <div className="space-y-4">
          <div className="rounded-xl border border-card-border bg-card-bg p-5">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-50 text-brand-500">
                <Sparkles size={14} strokeWidth={2} />
              </span>
              <h2 className="text-[14px] font-semibold text-foreground">
                AI Tenant Insights
              </h2>
            </div>

            <div className="mt-4 space-y-3">
              {/* Insight 1 */}
              <div className="flex gap-3 rounded-lg border border-danger/20 bg-danger/5 p-3">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-danger/10 text-danger">
                  <AlertTriangle size={13} strokeWidth={2} />
                </span>
                <div>
                  <p className="text-[12px] font-medium text-foreground">
                    Late Payment Patterns
                  </p>
                  <p className="mt-0.5 text-[11px] leading-relaxed text-muted">
                    2 tenants showing late payment patterns &mdash; proactive
                    outreach recommended
                  </p>
                </div>
              </div>

              {/* Insight 2 */}
              <div className="flex gap-3 rounded-lg border border-warning/20 bg-warning/5 p-3">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-warning/10 text-warning">
                  <CalendarClock size={13} strokeWidth={2} />
                </span>
                <div>
                  <p className="text-[12px] font-medium text-foreground">
                    Expiring Leases
                  </p>
                  <p className="mt-0.5 text-[11px] leading-relaxed text-muted">
                    3 leases expiring in 30 days &mdash; renewal offers ready
                    for review
                  </p>
                </div>
              </div>

              {/* Insight 3 */}
              <div className="flex gap-3 rounded-lg border border-danger/20 bg-danger/5 p-3">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-danger/10 text-danger">
                  <ShieldAlert size={13} strokeWidth={2} />
                </span>
                <div>
                  <p className="text-[12px] font-medium text-foreground">
                    Elevated Risk
                  </p>
                  <p className="mt-0.5 text-[11px] leading-relaxed text-muted">
                    Jessica Williams risk score elevated due to 3 consecutive
                    late payments
                  </p>
                </div>
              </div>
            </div>

            <button className="mt-4 w-full rounded-lg border border-card-border py-2 text-[12px] font-medium text-muted transition-colors hover:border-brand-500/30 hover:text-brand-500">
              View All Insights
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
