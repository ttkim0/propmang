"use client";

import {
  DollarSign,
  Building2,
  Wrench,
  FileText,
  Sparkles,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
  Clock,
  CreditCard,
  UserCheck,
  Bell,
  CalendarDays,
  CircleDot,
  ChevronRight,
  BarChart3,
} from "lucide-react";
import clsx from "clsx";

// ---------------------------------------------------------------------------
// Mock data
// ---------------------------------------------------------------------------

const stats = [
  {
    label: "Total Revenue",
    value: "$284,750",
    change: "+12.3%",
    changeLabel: "from last month",
    trend: "up" as const,
    icon: DollarSign,
    color: "text-success",
    bgColor: "bg-success/10",
    sparkline: [40, 55, 45, 60, 52, 70, 65, 78, 72, 85, 80, 92],
  },
  {
    label: "Occupancy Rate",
    value: "94.7%",
    change: "+2.1%",
    changeLabel: "from last month",
    trend: "up" as const,
    icon: Building2,
    color: "text-info",
    bgColor: "bg-info/10",
    sparkline: [82, 84, 85, 88, 86, 90, 89, 91, 92, 93, 94, 95],
  },
  {
    label: "Open Maintenance",
    value: "23",
    change: "-8",
    changeLabel: "from last week",
    trend: "down" as const,
    icon: Wrench,
    color: "text-warning",
    bgColor: "bg-warning/10",
    sparkline: [45, 42, 38, 40, 35, 33, 30, 31, 28, 27, 25, 23],
  },
  {
    label: "Lease Renewals Due",
    value: "12",
    change: "next 30 days",
    changeLabel: "",
    trend: "neutral" as const,
    icon: FileText,
    color: "text-brand-500",
    bgColor: "bg-brand-100",
    sparkline: [8, 6, 10, 12, 9, 14, 11, 7, 13, 10, 15, 12],
  },
];

const insights = [
  {
    id: 1,
    message:
      "3 units at 142 Oak St are priced 8% below market rate. Adjusting could add $2,400/mo revenue.",
    priority: "high" as const,
    icon: TrendingUp,
  },
  {
    id: 2,
    message:
      "Maintenance costs at Riverside Complex increased 34% this quarter. HVAC system may need replacement.",
    priority: "high" as const,
    icon: AlertTriangle,
  },
  {
    id: 3,
    message:
      "Lease renewal rate is trending down. Consider offering early renewal incentives for Q2.",
    priority: "medium" as const,
    icon: FileText,
  },
  {
    id: 4,
    message:
      "Tenant satisfaction score dropped at Pine Valley. 5 unresolved maintenance requests pending.",
    priority: "low" as const,
    icon: Bell,
  },
];

const recentActivity = [
  {
    id: 1,
    text: "Rent payment received — Unit 12A, Riverside Complex",
    time: "12 min ago",
    icon: CreditCard,
    avatar: "MK",
    avatarColor: "bg-success/15 text-success",
  },
  {
    id: 2,
    text: "Maintenance request opened — Leaking faucet, Unit 7C",
    time: "43 min ago",
    icon: Wrench,
    avatar: "TJ",
    avatarColor: "bg-warning/15 text-warning",
  },
  {
    id: 3,
    text: "Lease signed — Sarah Chen, 142 Oak St Unit 3B",
    time: "1 hr ago",
    icon: UserCheck,
    avatar: "SC",
    avatarColor: "bg-info/15 text-info",
  },
  {
    id: 4,
    text: "Inspection completed — Unit 4B, Pine Valley",
    time: "2 hr ago",
    icon: CheckCircle2,
    avatar: "RL",
    avatarColor: "bg-success/15 text-success",
  },
  {
    id: 5,
    text: "Rent payment received — Unit 9A, Pine Valley",
    time: "3 hr ago",
    icon: CreditCard,
    avatar: "AP",
    avatarColor: "bg-success/15 text-success",
  },
  {
    id: 6,
    text: "Maintenance resolved — HVAC repair, Unit 2D",
    time: "5 hr ago",
    icon: CheckCircle2,
    avatar: "DW",
    avatarColor: "bg-brand-500/15 text-brand-500",
  },
];

const upcomingTasks = [
  {
    id: 1,
    text: "Inspect Unit 4B — Pine Valley",
    due: "Today",
    priority: "high" as const,
  },
  {
    id: 2,
    text: "Review lease renewal — Sarah Chen",
    due: "Tomorrow",
    priority: "high" as const,
  },
  {
    id: 3,
    text: "Schedule HVAC maintenance — Riverside",
    due: "Apr 4",
    priority: "medium" as const,
  },
  {
    id: 4,
    text: "Follow up on late payment — Unit 6A",
    due: "Apr 5",
    priority: "medium" as const,
  },
  {
    id: 5,
    text: "Quarterly financial review meeting",
    due: "Apr 7",
    priority: "low" as const,
  },
  {
    id: 6,
    text: "Update property listings — 142 Oak St",
    due: "Apr 8",
    priority: "low" as const,
  },
];

const revenueData = [
  { month: "Nov", value: 218000, display: "$218K" },
  { month: "Dec", value: 235000, display: "$235K" },
  { month: "Jan", value: 242000, display: "$242K" },
  { month: "Feb", value: 258000, display: "$258K" },
  { month: "Mar", value: 271000, display: "$271K" },
  { month: "Apr", value: 284750, display: "$285K" },
];

// ---------------------------------------------------------------------------
// Helper components
// ---------------------------------------------------------------------------

function MiniSparkline({
  data,
  color,
}: {
  data: number[];
  color: string;
}) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;

  const colorMap: Record<string, string> = {
    "text-success": "#10B981",
    "text-info": "#3B82F6",
    "text-warning": "#F59E0B",
    "text-brand-500": "#D97706",
  };
  const stroke = colorMap[color] || "#64748B";

  const points = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * 80;
      const y = 24 - ((v - min) / range) * 20;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg
      viewBox="0 0 80 28"
      className="h-7 w-20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <polyline
        points={points}
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <polyline
        points={`0,28 ${points} 80,28`}
        fill={stroke}
        opacity="0.08"
      />
    </svg>
  );
}

function PriorityBadge({ priority }: { priority: "high" | "medium" | "low" }) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold tracking-wide uppercase",
        priority === "high" && "bg-danger/10 text-danger",
        priority === "medium" && "bg-warning/10 text-warning",
        priority === "low" && "bg-info/10 text-info"
      )}
    >
      {priority}
    </span>
  );
}

function PriorityDot({ priority }: { priority: "high" | "medium" | "low" }) {
  return (
    <span
      className={clsx(
        "inline-block h-2 w-2 rounded-full shrink-0",
        priority === "high" && "bg-danger",
        priority === "medium" && "bg-warning",
        priority === "low" && "bg-info"
      )}
    />
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function DashboardPage() {
  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const maxRevenue = Math.max(...revenueData.map((d) => d.value));

  return (
    <div className="min-h-screen bg-background px-6 py-8 lg:px-10">
      {/* ----------------------------------------------------------------- */}
      {/* Header                                                            */}
      {/* ----------------------------------------------------------------- */}
      <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between animate-fade-in">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground lg:text-3xl">
            Good morning, Jordan
          </h1>
          <p className="mt-1 text-sm text-muted">{formattedDate}</p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-brand-600 hover:shadow-md active:scale-[0.98]">
          <Sparkles className="h-4 w-4" />
          AI Insights
        </button>
      </header>

      {/* ----------------------------------------------------------------- */}
      {/* Stats row                                                         */}
      {/* ----------------------------------------------------------------- */}
      <section className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <div
              key={s.label}
              className={clsx(
                "group relative overflow-hidden rounded-xl border border-card-border bg-card-bg p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition-shadow hover:shadow-md opacity-0 animate-fade-in",
                `stagger-${i + 1}`
              )}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-muted">
                    {s.label}
                  </p>
                  <p className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
                    {s.value}
                  </p>
                  <div className="mt-1.5 flex items-center gap-1.5 text-xs">
                    {s.trend === "up" && (
                      <TrendingUp className="h-3.5 w-3.5 text-success" />
                    )}
                    {s.trend === "down" && (
                      <TrendingDown className="h-3.5 w-3.5 text-success" />
                    )}
                    <span
                      className={clsx(
                        "font-medium",
                        s.trend === "up" && "text-success",
                        s.trend === "down" && "text-success",
                        s.trend === "neutral" && "text-muted"
                      )}
                    >
                      {s.change}
                    </span>
                    {s.changeLabel && (
                      <span className="text-muted">{s.changeLabel}</span>
                    )}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-3">
                  <div
                    className={clsx(
                      "flex h-9 w-9 items-center justify-center rounded-lg",
                      s.bgColor
                    )}
                  >
                    <Icon className={clsx("h-4.5 w-4.5", s.color)} />
                  </div>
                  <MiniSparkline data={s.sparkline} color={s.color} />
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* AI Insights Panel                                                 */}
      {/* ----------------------------------------------------------------- */}
      <section
        className="mb-8 opacity-0 animate-fade-in stagger-3"
      >
        <div className="rounded-xl border border-brand-200 bg-gradient-to-br from-brand-50/60 via-card-bg to-card-bg p-[1px] shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
          <div className="rounded-[11px] bg-card-bg">
            <div className="flex items-center gap-2.5 border-b border-card-border px-6 py-4">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-100">
                <Sparkles className="h-4 w-4 text-brand-500" />
              </div>
              <h2 className="text-sm font-semibold text-foreground">
                AI Insights
              </h2>
              <span className="ml-auto text-xs text-muted">
                Updated 5 min ago
              </span>
            </div>

            <div className="divide-y divide-card-border">
              {insights.map((insight) => {
                const Icon = insight.icon;
                return (
                  <div
                    key={insight.id}
                    className="group flex items-start gap-4 px-6 py-4 transition-colors hover:bg-brand-50/40"
                  >
                    <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-100/70">
                      <Icon className="h-4 w-4 text-brand-600" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm leading-relaxed text-foreground">
                        {insight.message}
                      </p>
                    </div>
                    <div className="flex shrink-0 items-center gap-3 pt-0.5">
                      <PriorityBadge priority={insight.priority} />
                      <button className="inline-flex items-center gap-1 rounded-md bg-foreground/[0.04] px-3 py-1.5 text-xs font-medium text-foreground opacity-0 transition-all group-hover:opacity-100 hover:bg-foreground/[0.08]">
                        Take Action
                        <ChevronRight className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* Two-column: Activity + Tasks                                      */}
      {/* ----------------------------------------------------------------- */}
      <section className="mb-8 grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Recent Activity */}
        <div className="rounded-xl border border-card-border bg-card-bg shadow-[0_1px_3px_rgba(0,0,0,0.04)] opacity-0 animate-fade-in stagger-4">
          <div className="flex items-center justify-between border-b border-card-border px-6 py-4">
            <h2 className="text-sm font-semibold text-foreground">
              Recent Activity
            </h2>
            <button className="text-xs font-medium text-brand-500 transition-colors hover:text-brand-600">
              View all
            </button>
          </div>
          <div className="divide-y divide-card-border">
            {recentActivity.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3.5 px-6 py-3.5 transition-colors hover:bg-background/60"
              >
                <div
                  className={clsx(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold",
                    item.avatarColor
                  )}
                >
                  {item.avatar}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm text-foreground">
                    {item.text}
                  </p>
                </div>
                <span className="shrink-0 text-xs text-muted">
                  {item.time}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Tasks */}
        <div className="rounded-xl border border-card-border bg-card-bg shadow-[0_1px_3px_rgba(0,0,0,0.04)] opacity-0 animate-fade-in stagger-5">
          <div className="flex items-center justify-between border-b border-card-border px-6 py-4">
            <h2 className="text-sm font-semibold text-foreground">
              Upcoming Tasks
            </h2>
            <button className="text-xs font-medium text-brand-500 transition-colors hover:text-brand-600">
              View all
            </button>
          </div>
          <div className="divide-y divide-card-border">
            {upcomingTasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center gap-3.5 px-6 py-3.5 transition-colors hover:bg-background/60"
              >
                <PriorityDot priority={task.priority} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm text-foreground">
                    {task.text}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-1.5 text-xs text-muted">
                  <CalendarDays className="h-3.5 w-3.5" />
                  {task.due}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* Revenue Chart                                                     */}
      {/* ----------------------------------------------------------------- */}
      <section className="opacity-0 animate-fade-in stagger-6">
        <div className="rounded-xl border border-card-border bg-card-bg shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
          <div className="flex items-center justify-between border-b border-card-border px-6 py-4">
            <div className="flex items-center gap-2.5">
              <BarChart3 className="h-4 w-4 text-muted" />
              <h2 className="text-sm font-semibold text-foreground">
                Monthly Revenue
              </h2>
            </div>
            <span className="text-xs text-muted">Last 6 months</span>
          </div>
          <div className="px-6 py-6">
            <div className="flex items-end gap-3 h-44">
              {revenueData.map((d, i) => {
                const heightPct = (d.value / maxRevenue) * 100;
                const isLast = i === revenueData.length - 1;
                return (
                  <div
                    key={d.month}
                    className="group flex flex-1 flex-col items-center gap-2"
                  >
                    <span className="text-[11px] font-medium text-muted opacity-0 transition-opacity group-hover:opacity-100">
                      {d.display}
                    </span>
                    <div className="relative w-full flex justify-center">
                      <div
                        className={clsx(
                          "w-full max-w-[48px] rounded-md transition-all group-hover:opacity-90",
                          isLast
                            ? "bg-brand-500"
                            : "bg-brand-200 group-hover:bg-brand-300"
                        )}
                        style={{ height: `${(heightPct / 100) * 140}px` }}
                      />
                    </div>
                    <span className="text-[11px] font-medium text-muted">
                      {d.month}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
