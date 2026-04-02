"use client";

import {
  FileText,
  Plus,
  Calendar,
  TrendingUp,
  DollarSign,
  Clock,
  Sparkles,
  ArrowUpRight,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  RefreshCw,
} from "lucide-react";
import clsx from "clsx";

const stats = [
  {
    label: "Active Leases",
    value: "119",
    icon: FileText,
    accent: "text-brand-500",
    bg: "bg-brand-50",
  },
  {
    label: "Expiring Soon",
    value: "12",
    sub: "in 30 days",
    icon: Clock,
    accent: "text-warning",
    bg: "bg-warning/10",
  },
  {
    label: "Renewal Rate",
    value: "87%",
    icon: RefreshCw,
    accent: "text-success",
    bg: "bg-success/10",
  },
  {
    label: "Avg Lease Value",
    value: "$2,150",
    sub: "/mo",
    icon: DollarSign,
    accent: "text-info",
    bg: "bg-info/10",
  },
];

const timeline = [
  { month: "May", count: 5, pct: 42 },
  { month: "Jun", count: 8, pct: 67 },
  { month: "Jul", count: 3, pct: 25 },
  { month: "Aug", count: 12, pct: 100 },
  { month: "Sep", count: 6, pct: 50 },
  { month: "Oct", count: 4, pct: 33 },
];

type LeaseStatus = "Active" | "Expiring" | "Expired" | "Renewed";
type Prediction = "Likely" | "Unlikely" | "At Risk";

interface Lease {
  tenant: string;
  property: string;
  start: string;
  end: string;
  rent: string;
  status: LeaseStatus;
  prediction: Prediction;
  pct: number;
}

const leases: Lease[] = [
  { tenant: "Sarah Chen", property: "Riverside 4B", start: "Jan 2024", end: "Jan 2025", rent: "$1,850", status: "Expiring", prediction: "Likely", pct: 89 },
  { tenant: "Marcus Johnson", property: "Pine Valley 12A", start: "Mar 2024", end: "Mar 2025", rent: "$2,100", status: "Active", prediction: "At Risk", pct: 34 },
  { tenant: "Emily Rodriguez", property: "Sunset 22C", start: "Jun 2024", end: "Jun 2025", rent: "$1,650", status: "Active", prediction: "Likely", pct: 92 },
  { tenant: "David Kim", property: "Downtown 3", start: "Jan 2024", end: "Jan 2026", rent: "$4,200", status: "Active", prediction: "Likely", pct: 95 },
  { tenant: "Jessica Williams", property: "Harbor 8B", start: "Sep 2024", end: "Sep 2025", rent: "$1,950", status: "Active", prediction: "Unlikely", pct: 22 },
  { tenant: "Robert Taylor", property: "Maple 2", start: "Nov 2024", end: "Nov 2025", rent: "$2,400", status: "Active", prediction: "Likely", pct: 78 },
  { tenant: "Aisha Patel", property: "Riverside 11A", start: "Apr 2024", end: "Apr 2025", rent: "$1,750", status: "Expiring", prediction: "Likely", pct: 85 },
  { tenant: "James O'Brien", property: "Pine Valley 5C", start: "Aug 2024", end: "Aug 2025", rent: "$2,100", status: "Active", prediction: "At Risk", pct: 41 },
];

const insights = [
  "12 leases expiring within 30 days \u2014 bulk renewal campaign ready",
  "Market analysis suggests 3\u20135% rent increase is competitive for renewals",
  "2 tenants flagged as flight risks \u2014 personalized retention offers recommended",
];

const statusStyles: Record<LeaseStatus, string> = {
  Active: "bg-success/10 text-success",
  Expiring: "bg-warning/10 text-warning",
  Expired: "bg-danger/10 text-danger",
  Renewed: "bg-info/10 text-info",
};

const predictionStyles: Record<Prediction, string> = {
  Likely: "text-success",
  Unlikely: "text-danger",
  "At Risk": "text-warning",
};

const predictionBg: Record<Prediction, string> = {
  Likely: "bg-success/8",
  Unlikely: "bg-danger/8",
  "At Risk": "bg-warning/8",
};

export default function LeasesPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-[22px] font-semibold tracking-[-0.015em] text-foreground">
            Leases
          </h1>
          <p className="mt-1 text-[13px] text-muted">
            AI-assisted lease management and renewal tracking
          </p>
        </div>
        <button className="inline-flex h-9 items-center gap-2 rounded-lg bg-brand-500 px-4 text-[13px] font-medium text-white transition-colors hover:bg-brand-600">
          <Plus size={15} strokeWidth={2} />
          Create Lease
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div
              key={s.label}
              className="rounded-xl border border-card-border bg-card-bg p-5"
            >
              <div className="flex items-center justify-between">
                <p className="text-[12px] font-medium uppercase tracking-[0.04em] text-muted">
                  {s.label}
                </p>
                <div
                  className={clsx(
                    "flex h-8 w-8 items-center justify-center rounded-lg",
                    s.bg
                  )}
                >
                  <Icon size={16} strokeWidth={1.75} className={s.accent} />
                </div>
              </div>
              <p className="mt-2 text-[26px] font-semibold tracking-[-0.02em] text-foreground">
                {s.value}
                {s.sub && (
                  <span className="ml-1 text-[13px] font-normal text-muted">
                    {s.sub}
                  </span>
                )}
              </p>
            </div>
          );
        })}
      </div>

      {/* Lease Timeline */}
      <div className="rounded-xl border border-card-border bg-card-bg p-5">
        <div className="mb-4 flex items-center gap-2">
          <Calendar size={15} strokeWidth={1.75} className="text-muted" />
          <h2 className="text-[14px] font-semibold text-foreground">
            Lease Expirations &mdash; Next 6 Months
          </h2>
        </div>
        <div className="grid grid-cols-6 gap-3">
          {timeline.map((m) => (
            <div key={m.month} className="flex flex-col items-center gap-2">
              <div className="relative flex h-32 w-full items-end justify-center rounded-lg bg-brand-50/50">
                <div
                  className="w-full rounded-md bg-brand-500/80 transition-all"
                  style={{ height: `${m.pct}%` }}
                />
              </div>
              <span className="text-[12px] font-medium text-foreground">
                {m.count}
              </span>
              <span className="text-[11px] text-muted">{m.month}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Lease Table */}
      <div className="rounded-xl border border-card-border bg-card-bg">
        <div className="border-b border-card-border px-5 py-4">
          <h2 className="text-[14px] font-semibold text-foreground">
            All Leases
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="border-b border-card-border">
                {["Tenant", "Property", "Start", "End", "Rent", "Status", "AI Renewal Prediction"].map(
                  (h) => (
                    <th
                      key={h}
                      className="px-5 py-3 text-left text-[11px] font-medium uppercase tracking-[0.05em] text-muted"
                    >
                      {h}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {leases.map((l, i) => (
                <tr
                  key={l.tenant}
                  className={clsx(
                    "transition-colors hover:bg-brand-50/30",
                    i !== leases.length - 1 && "border-b border-card-border/60"
                  )}
                >
                  <td className="px-5 py-3.5 text-[13px] font-medium text-foreground">
                    {l.tenant}
                  </td>
                  <td className="px-5 py-3.5 text-[13px] text-muted">
                    {l.property}
                  </td>
                  <td className="px-5 py-3.5 text-[13px] text-muted">
                    {l.start}
                  </td>
                  <td className="px-5 py-3.5 text-[13px] text-muted">
                    {l.end}
                  </td>
                  <td className="px-5 py-3.5 text-[13px] font-medium text-foreground">
                    {l.rent}
                  </td>
                  <td className="px-5 py-3.5">
                    <span
                      className={clsx(
                        "inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold",
                        statusStyles[l.status]
                      )}
                    >
                      {l.status}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <span
                        className={clsx(
                          "inline-flex items-center gap-1 rounded-md px-2 py-1 text-[12px] font-medium",
                          predictionBg[l.prediction],
                          predictionStyles[l.prediction]
                        )}
                      >
                        {l.prediction === "Likely" && (
                          <ArrowUpRight size={12} strokeWidth={2} />
                        )}
                        {l.prediction === "At Risk" && (
                          <AlertTriangle size={12} strokeWidth={2} />
                        )}
                        {l.prediction === "Unlikely" && (
                          <XCircle size={12} strokeWidth={2} />
                        )}
                        {l.prediction} ({l.pct}%)
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* AI Lease Insights */}
      <div className="rounded-xl border border-brand-200 bg-brand-50/40 p-5">
        <div className="mb-3 flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-500">
            <Sparkles size={14} strokeWidth={2} className="text-white" />
          </div>
          <h2 className="text-[14px] font-semibold text-foreground">
            AI Lease Insights
          </h2>
        </div>
        <ul className="space-y-2.5">
          {insights.map((insight, i) => (
            <li
              key={i}
              className="flex items-start gap-2.5 text-[13px] leading-relaxed text-foreground/80"
            >
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
              {insight}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
