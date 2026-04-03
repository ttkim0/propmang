"use client";

import {
  FileText,
  Plus,
  Clock,
  RefreshCw,
  DollarSign,
  Sparkles,
} from "lucide-react";
import clsx from "clsx";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const stats = [
  {
    label: "Active Leases",
    value: "119",
    icon: FileText,
    iconColor: "text-[#4A7C6F]",
    iconBg: "bg-[#4A7C6F]/8",
  },
  {
    label: "Expiring Soon",
    value: "12",
    sub: "in 30 days",
    icon: Clock,
    iconColor: "text-[#C4975A]",
    iconBg: "bg-[#C4975A]/10",
  },
  {
    label: "Renewal Rate",
    value: "87%",
    icon: RefreshCw,
    iconColor: "text-[#5B9A7D]",
    iconBg: "bg-[#5B9A7D]/10",
  },
  {
    label: "Avg Lease Value",
    value: "$2,150",
    sub: "/mo",
    icon: DollarSign,
    iconColor: "text-[#5B82A0]",
    iconBg: "bg-[#5B82A0]/10",
  },
];

const timeline: { month: string; count: number }[] = [
  { month: "Apr", count: 12 },
  { month: "May", count: 8 },
  { month: "Jun", count: 15 },
  { month: "Jul", count: 6 },
  { month: "Aug", count: 10 },
  { month: "Sep", count: 4 },
];

const maxCount = Math.max(...timeline.map((t) => t.count));

type LeaseStatus = "Active" | "Expiring" | "Renewed";
type Prediction = "Likely" | "At Risk" | "Unlikely";

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
  "Market analysis suggests 3-5% rent increase is competitive for renewals",
  "2 tenants flagged as flight risks \u2014 personalized retention offers recommended",
];

/* ------------------------------------------------------------------ */
/*  Style maps                                                         */
/* ------------------------------------------------------------------ */

const statusClasses: Record<LeaseStatus, string> = {
  Active: "bg-[#5B9A7D]/10 text-[#5B9A7D]",
  Expiring: "bg-[#C4975A]/10 text-[#C4975A]",
  Renewed: "bg-[#EEF4F1] text-[#3D7A64]",
};

const predictionClasses: Record<Prediction, string> = {
  Likely: "bg-[#5B9A7D]/10 text-[#5B9A7D]",
  "At Risk": "bg-[#C4975A]/10 text-[#C4975A]",
  Unlikely: "bg-[#B85C5C]/10 text-[#B85C5C]",
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function LeasesPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FAFAF7" }}>
      <div className="mx-auto max-w-[1120px] px-6 py-10">
        {/* ---- Header ---- */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1
              className="text-[28px] font-semibold tracking-tight"
              style={{ lineHeight: 1.2, color: "#2D3436" }}
            >
              Leases
            </h1>
            <p
              className="mt-1.5 text-[14px]"
              style={{ color: "#9B9890" }}
            >
              AI-assisted lease management and renewal tracking
            </p>
          </div>
          <button
            className="inline-flex h-10 items-center gap-2 rounded-2xl px-5 text-[13px] font-medium text-white transition-colors hover:opacity-90"
            style={{ backgroundColor: "#4A7C6F" }}
          >
            <Plus size={15} strokeWidth={2} />
            Create Lease
          </button>
        </div>

        {/* ---- Stats ---- */}
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.label}
                className="rounded-2xl border p-5"
                style={{
                  backgroundColor: "#FFFFFF",
                  borderColor: "#E5E3DE",
                }}
              >
                <div className="flex items-center justify-between">
                  <span
                    className="text-[12px] font-medium uppercase tracking-widest"
                    style={{ color: "#9B9890" }}
                  >
                    {s.label}
                  </span>
                  <div
                    className={clsx(
                      "flex h-9 w-9 items-center justify-center rounded-xl",
                      s.iconBg
                    )}
                  >
                    <Icon size={16} strokeWidth={1.75} className={s.iconColor} />
                  </div>
                </div>
                <p
                  className="mt-3 text-[28px] font-semibold tracking-tight"
                  style={{ color: "#2D3436" }}
                >
                  {s.value}
                  {s.sub && (
                    <span
                      className="ml-0.5 text-[13px] font-normal"
                      style={{ color: "#9B9890" }}
                    >
                      {s.sub}
                    </span>
                  )}
                </p>
              </div>
            );
          })}
        </div>

        {/* ---- Expiration Timeline ---- */}
        <div
          className="mt-6 rounded-2xl border p-6"
          style={{ backgroundColor: "#FFFFFF", borderColor: "#E5E3DE" }}
        >
          <h2
            className="text-[16px] font-semibold"
            style={{ color: "#2D3436" }}
          >
            Expiration Timeline
          </h2>
          <p className="mt-0.5 text-[13px]" style={{ color: "#9B9890" }}>
            Next 6 months
          </p>

          <div className="mt-6 flex items-end gap-4">
            {timeline.map((t) => {
              const isMax = t.count === maxCount;
              const heightPct = (t.count / maxCount) * 100;
              return (
                <div
                  key={t.month}
                  className="flex flex-1 flex-col items-center gap-2"
                >
                  <span
                    className="text-[12px] font-medium"
                    style={{ color: "#2D3436" }}
                  >
                    {t.count}
                  </span>
                  <div className="flex h-36 w-full items-end justify-center">
                    <div
                      className="w-full max-w-[48px] rounded-lg transition-all"
                      style={{
                        height: `${heightPct}%`,
                        backgroundColor: isMax ? "#4A7C6F" : "#C8DDD5",
                      }}
                    />
                  </div>
                  <span
                    className="text-[12px]"
                    style={{ color: "#9B9890" }}
                  >
                    {t.month}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* ---- Lease Table ---- */}
        <div
          className="mt-6 overflow-hidden rounded-2xl border"
          style={{ backgroundColor: "#FFFFFF", borderColor: "#E5E3DE" }}
        >
          <div className="overflow-x-auto">
            <table className="w-full min-w-[820px]">
              <thead>
                <tr style={{ backgroundColor: "#F5F4F0" }}>
                  {[
                    "Tenant",
                    "Property",
                    "Start",
                    "End",
                    "Rent",
                    "Status",
                    "AI Renewal Prediction",
                  ].map((h) => (
                    <th
                      key={h}
                      className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wide"
                      style={{ color: "#9B9890" }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {leases.map((l, i) => (
                  <tr
                    key={l.tenant}
                    className="transition-colors hover:bg-[#FAFAF7]"
                    style={{
                      borderBottom:
                        i < leases.length - 1
                          ? "1px solid #E5E3DE"
                          : "none",
                    }}
                  >
                    <td
                      className="px-5 py-3.5 text-[13px] font-medium"
                      style={{ color: "#2D3436" }}
                    >
                      {l.tenant}
                    </td>
                    <td
                      className="px-5 py-3.5 text-[13px]"
                      style={{ color: "#7A7870" }}
                    >
                      {l.property}
                    </td>
                    <td
                      className="px-5 py-3.5 text-[13px]"
                      style={{ color: "#7A7870" }}
                    >
                      {l.start}
                    </td>
                    <td
                      className="px-5 py-3.5 text-[13px]"
                      style={{ color: "#7A7870" }}
                    >
                      {l.end}
                    </td>
                    <td
                      className="px-5 py-3.5 text-[13px] font-medium"
                      style={{ color: "#2D3436" }}
                    >
                      {l.rent}
                    </td>
                    <td className="px-5 py-3.5">
                      <span
                        className={clsx(
                          "inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold",
                          statusClasses[l.status]
                        )}
                      >
                        {l.status}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span
                        className={clsx(
                          "inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold",
                          predictionClasses[l.prediction]
                        )}
                      >
                        {l.prediction} {l.pct}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ---- AI Insights ---- */}
        <div
          className="mt-6 rounded-2xl border p-6"
          style={{ backgroundColor: "#FFFFFF", borderColor: "#C8DDD5" }}
        >
          <div className="flex items-center gap-2.5">
            <div
              className="flex h-8 w-8 items-center justify-center rounded-xl"
              style={{ backgroundColor: "#4A7C6F" }}
            >
              <Sparkles size={15} strokeWidth={2} className="text-white" />
            </div>
            <h2
              className="text-[16px] font-semibold"
              style={{ color: "#2D3436" }}
            >
              AI Lease Insights
            </h2>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
            {insights.map((insight, i) => (
              <div
                key={i}
                className="rounded-xl border p-4"
                style={{ borderColor: "#E5E3DE", backgroundColor: "#FAFAF7" }}
              >
                <p
                  className="text-[13px] leading-relaxed"
                  style={{ color: "#2D3436" }}
                >
                  {insight}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
