"use client";

import { Plus, Sparkles } from "lucide-react";
import clsx from "clsx";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const stats = [
  { label: "Active Leases", value: "119" },
  { label: "Expiring Soon", value: "12" },
  { label: "Renewal Rate", value: "87%" },
  { label: "Avg Lease Value", value: "$2,150" },
];

const timeline = [
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
  "12 leases expiring within 30 days — bulk renewal campaign ready",
  "Market analysis suggests 3-5% rent increase is competitive for renewals",
  "2 tenants flagged as flight risks — personalized retention offers recommended",
];

/* ------------------------------------------------------------------ */
/*  Style maps                                                         */
/* ------------------------------------------------------------------ */

const statusClasses: Record<LeaseStatus, string> = {
  Active: "bg-success-light text-success",
  Expiring: "bg-warning-light text-warning",
  Renewed: "bg-sage-light text-sage-dark",
};

const predictionClasses: Record<Prediction, string> = {
  Likely: "bg-success-light text-success",
  "At Risk": "bg-warning-light text-warning",
  Unlikely: "bg-danger-light text-danger",
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function LeasesPage() {
  return (
    <div className="min-h-screen bg-cream">
      <div className="mx-auto max-w-[1120px] px-6 py-10">
        {/* ---- Header ---- */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="font-serif text-[32px] leading-tight text-text-primary">
              Leases
            </h1>
            <p className="mt-1.5 font-sans text-[14px] text-text-tertiary">
              AI-assisted lease management and renewal tracking
            </p>
          </div>
          <button className="inline-flex h-10 items-center gap-2 rounded-full bg-accent px-6 font-sans text-[13px] font-medium text-text-inverse transition-colors hover:bg-accent/90">
            <Plus size={15} strokeWidth={2} />
            Create Lease
          </button>
        </div>

        {/* ---- Stats ---- */}
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-[20px] border border-border bg-white p-6"
            >
              <span className="font-sans text-[11px] font-medium uppercase tracking-widest text-text-tertiary">
                {s.label}
              </span>
              <p className="mt-3 font-serif text-[32px] leading-none text-text-primary">
                {s.value}
              </p>
            </div>
          ))}
        </div>

        {/* ---- Expiration Timeline ---- */}
        <div className="mt-6 rounded-[20px] border border-border bg-white p-7">
          <h2 className="font-serif text-[20px] text-text-primary">
            Expiration Timeline
          </h2>
          <p className="mt-0.5 font-sans text-[13px] text-text-tertiary">
            Next 6 months
          </p>

          <div className="mt-7 flex items-end gap-4">
            {timeline.map((t) => {
              const isMax = t.count === maxCount;
              const heightPct = (t.count / maxCount) * 100;
              return (
                <div
                  key={t.month}
                  className="flex flex-1 flex-col items-center gap-2"
                >
                  <span className="font-sans text-[12px] font-medium text-text-primary">
                    {t.count}
                  </span>
                  <div className="flex h-36 w-full items-end justify-center">
                    <div
                      className={clsx(
                        "w-full max-w-[48px] rounded-full transition-all",
                        isMax ? "bg-accent" : "bg-cream-deeper"
                      )}
                      style={{ height: `${heightPct}%` }}
                    />
                  </div>
                  <span className="font-sans text-[12px] text-text-tertiary">
                    {t.month}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* ---- Lease Table ---- */}
        <div className="mt-6 overflow-hidden rounded-[20px] border border-border bg-white">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[820px]">
              <thead>
                <tr className="bg-cream-dark">
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
                      className="px-5 py-3 text-left font-sans text-[11px] font-semibold uppercase tracking-wide text-text-tertiary"
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
                    className={clsx(
                      "transition-colors hover:bg-cream",
                      i < leases.length - 1 && "border-b border-border"
                    )}
                  >
                    <td className="px-5 py-3.5 font-sans text-[13px] font-medium text-text-primary">
                      {l.tenant}
                    </td>
                    <td className="px-5 py-3.5 font-sans text-[13px] text-text-secondary">
                      {l.property}
                    </td>
                    <td className="px-5 py-3.5 font-sans text-[13px] text-text-secondary">
                      {l.start}
                    </td>
                    <td className="px-5 py-3.5 font-sans text-[13px] text-text-secondary">
                      {l.end}
                    </td>
                    <td className="px-5 py-3.5 font-sans text-[13px] font-medium text-text-primary">
                      {l.rent}
                    </td>
                    <td className="px-5 py-3.5">
                      <span
                        className={clsx(
                          "inline-flex items-center rounded-full px-2.5 py-0.5 font-sans text-[11px] font-semibold",
                          statusClasses[l.status]
                        )}
                      >
                        {l.status}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span
                        className={clsx(
                          "inline-flex items-center rounded-full px-2.5 py-0.5 font-sans text-[11px] font-semibold",
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
        <div className="mt-6 rounded-[20px] border border-border bg-white p-7">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent">
              <Sparkles size={15} strokeWidth={2} className="text-text-inverse" />
            </div>
            <h2 className="font-serif text-[20px] text-text-primary">
              AI Lease Insights
            </h2>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            {insights.map((insight, i) => (
              <div
                key={i}
                className="rounded-2xl bg-cream-dark p-5"
              >
                <p className="font-sans text-[13px] leading-relaxed text-text-secondary">
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
