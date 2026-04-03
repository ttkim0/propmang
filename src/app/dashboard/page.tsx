"use client";

import { Sparkles, ArrowRight } from "lucide-react";
import clsx from "clsx";

// ---------------------------------------------------------------------------
// Static data
// ---------------------------------------------------------------------------

const metrics = [
  {
    label: "Total Revenue",
    value: "$284,750",
    change: "+12.3% from last month",
    sentiment: "success" as const,
  },
  {
    label: "Occupancy",
    value: "94.7%",
    change: "+2.1% from last month",
    sentiment: "success" as const,
  },
  {
    label: "Open Requests",
    value: "23",
    change: "-8 from last week",
    sentiment: "success" as const,
  },
  {
    label: "Renewals Due",
    value: "12",
    change: "Next 30 days",
    sentiment: "info" as const,
  },
];

const insights: {
  priority: "High" | "Medium" | "Low";
  text: string;
}[] = [
  {
    priority: "High",
    text: "3 units at 142 Oak St are priced 8% below market rate. Adjusting could generate an additional $2,400 in monthly revenue.",
  },
  {
    priority: "Medium",
    text: "Maintenance costs at Riverside Complex increased 34% this quarter. HVAC system inspection recommended.",
  },
  {
    priority: "Low",
    text: "Lease renewal rate trending down 5%. Consider offering early renewal incentives for Q2 tenants.",
  },
  {
    priority: "Medium",
    text: "Tenant satisfaction at Pine Valley dropped to 3.8/5. Five unresolved maintenance requests may be contributing.",
  },
];

const activities = [
  {
    initials: "SC",
    color: "bg-brand-100 text-brand-700",
    description: (
      <>
        <span className="font-medium text-foreground">Sarah Chen</span> paid
        rent for Unit 4B &mdash; $1,850
      </>
    ),
    time: "2 hours ago",
  },
  {
    initials: "MJ",
    color: "bg-warning/10 text-warning",
    description: (
      <>
        New maintenance request from{" "}
        <span className="font-medium text-foreground">Marcus Johnson</span>{" "}
        &mdash; Pine Valley 12A
      </>
    ),
    time: "3 hours ago",
  },
  {
    initials: "ER",
    color: "bg-info/10 text-info",
    description: (
      <>
        Lease signed by{" "}
        <span className="font-medium text-foreground">Emily Rodriguez</span>{" "}
        &mdash; Sunset Heights 22C
      </>
    ),
    time: "5 hours ago",
  },
  {
    initials: "AI",
    color: "bg-brand-50 text-brand-500",
    description: <>AI auto-assigned vendor for HVAC repair at Maple Grove</>,
    time: "6 hours ago",
  },
  {
    initials: "DK",
    color: "bg-success/10 text-success",
    description: (
      <>
        <span className="font-medium text-foreground">David Kim</span> submitted
        move-in inspection &mdash; Downtown 3
      </>
    ),
    time: "8 hours ago",
  },
  {
    initials: "AI",
    color: "bg-brand-50 text-brand-500",
    description: <>Rent reminder sent to 12 tenants via AI</>,
    time: "12 hours ago",
  },
];

const upcoming = [
  {
    task: "Inspect Unit 4B after maintenance",
    when: "Tomorrow, 10:00 AM",
    dot: "bg-success",
  },
  {
    task: "Review lease renewal \u2014 Sarah Chen",
    when: "Apr 5",
    dot: "bg-warning",
  },
  {
    task: "HVAC vendor walkthrough \u2014 Riverside",
    when: "Apr 6, 2:00 PM",
    dot: "bg-danger",
  },
  {
    task: "Quarterly financial review",
    when: "Apr 8",
    dot: "bg-success",
  },
  {
    task: "Tenant meet and greet \u2014 Pine Valley",
    when: "Apr 10",
    dot: "bg-success",
  },
  {
    task: "Insurance renewal deadline",
    when: "Apr 15",
    dot: "bg-warning",
  },
];

const revenueData = [
  { month: "Jan", value: 245000, label: "$245K" },
  { month: "Feb", value: 252000, label: "$252K" },
  { month: "Mar", value: 261000, label: "$261K" },
  { month: "Apr", value: 268000, label: "$268K" },
  { month: "May", value: 277000, label: "$277K" },
  { month: "Jun", value: 284000, label: "$284K" },
];

const PRIORITY_STYLES: Record<string, string> = {
  High: "bg-danger/10 text-danger",
  Medium: "bg-warning/10 text-warning",
  Low: "bg-info/10 text-info",
};

const SENTIMENT_DOT: Record<string, string> = {
  success: "bg-success",
  info: "bg-info",
};

const SENTIMENT_TEXT: Record<string, string> = {
  success: "text-success",
  info: "text-info",
};

// ---------------------------------------------------------------------------
// Dashboard
// ---------------------------------------------------------------------------

export default function DashboardPage() {
  const maxRevenue = Math.max(...revenueData.map((r) => r.value));

  return (
    <div className="min-h-screen bg-background px-6 py-10 lg:px-12 xl:px-16">
      {/* ------------------------------------------------------------------ */}
      {/*  Greeting                                                          */}
      {/* ------------------------------------------------------------------ */}
      <header className="mb-10 animate-fade-in">
        <h1 className="text-[28px] font-semibold tracking-tight text-foreground">
          Good morning, Jordan
        </h1>
        <p className="mt-1 text-[15px] text-warm-gray-400">
          Here&apos;s what&apos;s happening across your portfolio today.
        </p>
      </header>

      {/* ------------------------------------------------------------------ */}
      {/*  Metrics                                                           */}
      {/* ------------------------------------------------------------------ */}
      <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((m, i) => (
          <article
            key={m.label}
            className={clsx(
              "rounded-2xl border border-card-border bg-card-bg p-6",
              "shadow-[0_1px_3px_rgba(0,0,0,0.04)]",
              "transition-shadow duration-200 hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)]",
              "animate-fade-in",
              `stagger-${i + 1}`,
            )}
          >
            <p className="text-[12px] font-medium uppercase tracking-wide text-warm-gray-400">
              {m.label}
            </p>
            <p className="mt-1 text-[32px] font-semibold tracking-tight text-foreground">
              {m.value}
            </p>
            <div className="mt-2 flex items-center gap-2">
              <span
                className={clsx(
                  "inline-block h-1.5 w-1.5 rounded-full",
                  SENTIMENT_DOT[m.sentiment],
                )}
              />
              <span
                className={clsx("text-[13px]", SENTIMENT_TEXT[m.sentiment])}
              >
                {m.change}
              </span>
            </div>
          </article>
        ))}
      </section>

      {/* ------------------------------------------------------------------ */}
      {/*  AI Insights                                                       */}
      {/* ------------------------------------------------------------------ */}
      <section className="mt-8 animate-fade-in stagger-5">
        <div
          className={clsx(
            "rounded-2xl border border-brand-200 bg-card-bg p-8",
            "shadow-[0_1px_3px_rgba(0,0,0,0.04)]",
          )}
        >
          {/* Header */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50">
              <Sparkles className="h-5 w-5 text-brand-500" />
            </div>
            <div>
              <h2 className="text-[18px] font-semibold text-foreground">
                AI Insights
              </h2>
            </div>
            <span className="ml-auto text-[12px] text-warm-gray-400">
              Updated 5 min ago
            </span>
          </div>

          {/* Grid */}
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            {insights.map((insight, i) => (
              <div
                key={i}
                className={clsx(
                  "rounded-xl bg-warm-gray-50 p-5",
                  "transition-colors duration-150 hover:bg-warm-gray-100",
                )}
              >
                <span
                  className={clsx(
                    "inline-block rounded-full px-2.5 py-0.5 text-[11px] font-medium",
                    PRIORITY_STYLES[insight.priority],
                  )}
                >
                  {insight.priority}
                </span>
                <p className="mt-2 text-[14px] leading-relaxed text-foreground">
                  {insight.text}
                </p>
                <button
                  type="button"
                  className="mt-3 inline-flex items-center gap-1 text-[13px] font-medium text-brand-500 transition-colors hover:text-brand-700"
                >
                  Take Action
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/*  Activity + Upcoming                                               */}
      {/* ------------------------------------------------------------------ */}
      <section className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Activity */}
        <div
          className={clsx(
            "rounded-2xl border border-card-border bg-card-bg p-6",
            "shadow-[0_1px_3px_rgba(0,0,0,0.04)]",
            "animate-fade-in stagger-6",
          )}
        >
          <h2 className="text-[16px] font-semibold text-foreground">
            Recent Activity
          </h2>

          <ul className="mt-5 divide-y divide-warm-gray-100">
            {activities.map((a, i) => (
              <li
                key={i}
                className="flex items-center gap-3.5 py-3.5 first:pt-0 last:pb-0"
              >
                <div
                  className={clsx(
                    "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-[11px] font-semibold select-none",
                    a.color,
                  )}
                >
                  {a.initials}
                </div>
                <p className="min-w-0 flex-1 text-[13px] text-warm-gray-500">
                  {a.description}
                </p>
                <time className="shrink-0 text-[12px] text-warm-gray-400">
                  {a.time}
                </time>
              </li>
            ))}
          </ul>
        </div>

        {/* Upcoming */}
        <div
          className={clsx(
            "rounded-2xl border border-card-border bg-card-bg p-6",
            "shadow-[0_1px_3px_rgba(0,0,0,0.04)]",
            "animate-fade-in stagger-7",
          )}
        >
          <h2 className="text-[16px] font-semibold text-foreground">
            Upcoming
          </h2>

          <ul className="mt-5 divide-y divide-warm-gray-100">
            {upcoming.map((u, i) => (
              <li
                key={i}
                className="flex items-center gap-3.5 py-3.5 first:pt-0 last:pb-0"
              >
                <span
                  className={clsx(
                    "inline-block h-2 w-2 shrink-0 rounded-full",
                    u.dot,
                  )}
                />
                <p className="min-w-0 flex-1 text-[13px] text-foreground">
                  {u.task}
                </p>
                <time className="shrink-0 text-[12px] text-warm-gray-400">
                  {u.when}
                </time>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/*  Revenue Overview                                                  */}
      {/* ------------------------------------------------------------------ */}
      <section className="mt-8 animate-fade-in stagger-8">
        <div
          className={clsx(
            "rounded-2xl border border-card-border bg-card-bg p-8",
            "shadow-[0_1px_3px_rgba(0,0,0,0.04)]",
          )}
        >
          <div className="flex items-baseline justify-between">
            <h2 className="text-[16px] font-semibold text-foreground">
              Monthly Revenue
            </h2>
            <span className="text-[13px] text-warm-gray-400">
              Last 6 months
            </span>
          </div>

          <div className="mt-8 flex h-48 items-end gap-3">
            {revenueData.map((r, i) => {
              const heightPct = (r.value / maxRevenue) * 100;
              const isLatest = i === revenueData.length - 1;

              return (
                <div
                  key={r.month}
                  className="group flex flex-1 flex-col items-center gap-1.5"
                >
                  <span
                    className={clsx(
                      "text-[11px] font-medium transition-colors duration-150",
                      isLatest
                        ? "text-brand-600"
                        : "text-warm-gray-500 group-hover:text-warm-gray-400",
                    )}
                  >
                    {r.label}
                  </span>
                  <div
                    className={clsx(
                      "w-full rounded-t-lg transition-all duration-200",
                      isLatest
                        ? "bg-brand-500 shadow-[0_2px_8px_rgba(74,124,111,0.25)]"
                        : "bg-brand-200 group-hover:bg-brand-300",
                    )}
                    style={{ height: `${heightPct}%` }}
                  />
                  <span
                    className={clsx(
                      "text-[11px]",
                      isLatest
                        ? "font-medium text-foreground"
                        : "text-warm-gray-400",
                    )}
                  >
                    {r.month}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
