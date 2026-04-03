"use client";

import clsx from "clsx";

// ---------------------------------------------------------------------------
// Static data
// ---------------------------------------------------------------------------

const metrics = [
  {
    label: "Revenue",
    value: "$284,750",
    change: "+12.3% from last month",
    dotColor: "bg-success",
    changeColor: "text-success",
  },
  {
    label: "Occupancy",
    value: "94.7%",
    change: "+2.1% from last month",
    dotColor: "bg-success",
    changeColor: "text-success",
  },
  {
    label: "Open Requests",
    value: "23",
    change: "-8 from last week",
    dotColor: "bg-success",
    changeColor: "text-success",
  },
  {
    label: "Renewals Due",
    value: "12",
    change: "Next 30 days",
    dotColor: "bg-text-tertiary",
    changeColor: "text-text-tertiary",
  },
];

const insights: {
  priority: "High" | "Medium" | "Low";
  text: string;
}[] = [
  {
    priority: "High",
    text: "3 units at 142 Oak St are priced 8% below market rate. Adjusting could generate $2,400 in additional monthly revenue.",
  },
  {
    priority: "Medium",
    text: "Maintenance costs at Riverside Complex increased 34% this quarter. HVAC system inspection recommended.",
  },
  {
    priority: "Low",
    text: "Lease renewal rate trending down. Consider offering early renewal incentives for Q2 tenants.",
  },
  {
    priority: "Medium",
    text: "Tenant satisfaction at Pine Valley dropped to 3.8/5. Five unresolved maintenance requests may be contributing.",
  },
];

const PRIORITY_STYLES: Record<string, string> = {
  High: "bg-danger-light text-danger",
  Medium: "bg-warning-light text-warning",
  Low: "bg-info-light text-info",
};

const activities = [
  {
    initials: "SC",
    bg: "bg-cream-dark text-text-secondary",
    text: "Sarah Chen paid rent for Unit 4B \u2014 $1,850",
    time: "2h ago",
  },
  {
    initials: "MJ",
    bg: "bg-cream-dark text-text-secondary",
    text: "New maintenance request \u2014 Pine Valley 12A",
    time: "3h ago",
  },
  {
    initials: "ER",
    bg: "bg-cream-dark text-text-secondary",
    text: "Lease signed \u2014 Sunset Heights 22C",
    time: "5h ago",
  },
  {
    initials: "AI",
    bg: "bg-sage-light text-sage-dark",
    text: "Vendor auto-assigned for HVAC repair",
    time: "6h ago",
  },
  {
    initials: "DK",
    bg: "bg-cream-dark text-text-secondary",
    text: "Move-in inspection submitted \u2014 Downtown 3",
    time: "8h ago",
  },
  {
    initials: "AI",
    bg: "bg-sage-light text-sage-dark",
    text: "Rent reminders sent to 12 tenants",
    time: "12h ago",
  },
];

const upcoming = [
  { task: "Inspect Unit 4B", when: "Tomorrow", dot: "bg-success" },
  {
    task: "Review lease renewal \u2014 Sarah Chen",
    when: "Apr 5",
    dot: "bg-warning",
  },
  {
    task: "HVAC walkthrough \u2014 Riverside",
    when: "Apr 6",
    dot: "bg-danger",
  },
  { task: "Quarterly financial review", when: "Apr 8", dot: "bg-success" },
  { task: "Tenant meet and greet", when: "Apr 10", dot: "bg-success" },
  { task: "Insurance renewal deadline", when: "Apr 15", dot: "bg-warning" },
];

const revenueData = [
  { month: "Jan", value: 245000, label: "$245K" },
  { month: "Feb", value: 252000, label: "$252K" },
  { month: "Mar", value: 261000, label: "$261K" },
  { month: "Apr", value: 268000, label: "$268K" },
  { month: "May", value: 277000, label: "$277K" },
  { month: "Jun", value: 284000, label: "$284K" },
];

// ---------------------------------------------------------------------------
// Dashboard
// ---------------------------------------------------------------------------

export default function DashboardPage() {
  const maxRevenue = Math.max(...revenueData.map((r) => r.value));

  return (
    <div className="min-h-screen bg-cream px-6 py-10 lg:px-12 xl:px-16">
      {/* Greeting */}
      <header className="mb-12 animate-fade-in">
        <h1 className="font-serif text-[32px] text-text-primary">
          Good morning, Jordan
        </h1>
        <p className="mt-2 text-[14px] text-text-tertiary">
          Here&apos;s what&apos;s happening across your portfolio today.
        </p>
      </header>

      {/* Metrics */}
      <section className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        {metrics.map((m, i) => (
          <article
            key={m.label}
            className={clsx(
              "bg-white border border-border rounded-[20px] p-6",
              "animate-fade-in",
              `stagger-${i + 1}`,
            )}
          >
            <p className="text-[11px] font-sans uppercase tracking-[0.1em] text-text-tertiary font-medium">
              {m.label}
            </p>
            <p className="font-serif text-[36px] mt-2 text-text-primary">
              {m.value}
            </p>
            <div className="mt-3 flex items-center gap-1.5">
              <span
                className={clsx(
                  "h-1.5 w-1.5 rounded-full",
                  m.dotColor,
                )}
              />
              <span className={clsx("text-[12px]", m.changeColor)}>
                {m.change}
              </span>
            </div>
          </article>
        ))}
      </section>

      {/* AI Insights */}
      <section className="mt-8 animate-fade-in stagger-5">
        <div className="bg-white border border-border rounded-[20px] p-8">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-[22px] text-text-primary">
              AI Insights
            </h2>
            <span className="text-[11px] text-text-tertiary border border-border-light rounded-full px-3 py-1">
              Updated 5 min ago
            </span>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            {insights.map((insight, i) => (
              <div
                key={i}
                className="bg-cream-dark rounded-2xl p-5"
              >
                <span
                  className={clsx(
                    "text-[11px] font-medium rounded-full px-2.5 py-0.5 inline-block",
                    PRIORITY_STYLES[insight.priority],
                  )}
                >
                  {insight.priority}
                </span>
                <p className="text-[14px] text-text-primary mt-3 leading-relaxed">
                  {insight.text}
                </p>
                <a
                  href="#"
                  className="text-[12px] text-text-tertiary hover:text-text-primary mt-3 inline-block transition-colors"
                >
                  Take Action &rarr;
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Activity + Upcoming */}
      <section className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-2">
        {/* Recent Activity */}
        <div className="bg-white border border-border rounded-[20px] p-7 animate-fade-in stagger-6">
          <h2 className="font-serif text-[18px] text-text-primary">
            Recent Activity
          </h2>

          <ul className="mt-5 divide-y divide-border-light">
            {activities.map((a, i) => (
              <li
                key={i}
                className="flex items-center gap-3 py-4 first:pt-0 last:pb-0"
              >
                <div
                  className={clsx(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[11px] font-medium select-none",
                    a.bg,
                  )}
                >
                  {a.initials}
                </div>
                <p className="min-w-0 flex-1 text-[13px] text-text-primary ml-3">
                  {a.text}
                </p>
                <time className="shrink-0 text-[12px] text-text-tertiary">
                  {a.time}
                </time>
              </li>
            ))}
          </ul>
        </div>

        {/* Upcoming */}
        <div className="bg-white border border-border rounded-[20px] p-7 animate-fade-in stagger-7">
          <h2 className="font-serif text-[18px] text-text-primary">
            Upcoming
          </h2>

          <ul className="mt-5 divide-y divide-border-light">
            {upcoming.map((u, i) => (
              <li
                key={i}
                className="flex items-center gap-3 py-4 first:pt-0 last:pb-0"
              >
                <span
                  className={clsx(
                    "h-2 w-2 shrink-0 rounded-full",
                    u.dot,
                  )}
                />
                <p className="min-w-0 flex-1 text-[13px] text-text-primary ml-3">
                  {u.task}
                </p>
                <time className="shrink-0 text-[12px] text-text-tertiary">
                  {u.when}
                </time>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Revenue Chart */}
      <section className="mt-8 animate-fade-in stagger-8">
        <div className="bg-white border border-border rounded-[20px] p-8">
          <div className="flex items-baseline">
            <h2 className="font-serif text-[18px] text-text-primary">
              Monthly Revenue
            </h2>
            <span className="text-[13px] text-text-tertiary ml-3">
              Last 6 months
            </span>
          </div>

          <div className="mt-8 flex h-48 items-end gap-5 justify-between">
            {revenueData.map((r, i) => {
              const heightPct = (r.value / maxRevenue) * 100;
              const isLatest = i === revenueData.length - 1;

              return (
                <div
                  key={r.month}
                  className="flex flex-1 flex-col items-center"
                >
                  <span className="text-[11px] text-text-tertiary mb-2">
                    {r.label}
                  </span>
                  <div
                    className={clsx(
                      "rounded-full w-full",
                      isLatest ? "bg-accent" : "bg-cream-deeper",
                    )}
                    style={{ height: `${heightPct}%` }}
                  />
                  <span className="text-[12px] text-text-tertiary mt-3">
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
