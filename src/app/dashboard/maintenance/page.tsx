"use client";

import clsx from "clsx";
import {
  Wrench,
  Plus,
  Sparkles,
  Clock,
  Star,
  CheckCircle2,
  ArrowUpRight,
  TrendingUp,
  TrendingDown,
  DollarSign,
  AlertTriangle,
  ThermometerSun,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type Priority = "Emergency" | "High" | "Medium" | "Low";
type Column = "new" | "triaged" | "in_progress" | "completed";

interface MaintenanceRequest {
  id: string;
  title: string;
  priority: Priority;
  property: string;
  unit?: string;
  tenant: string;
  submitted: string;
  vendor?: string;
  urgency?: number;
  status?: string;
  progress?: number;
  completedAt?: string;
}

/* ------------------------------------------------------------------ */
/*  Mock data                                                          */
/* ------------------------------------------------------------------ */

const requests: Record<Column, MaintenanceRequest[]> = {
  new: [
    { id: "MR-1041", title: "Water heater failure", priority: "Emergency", property: "Riverside", unit: "4B", tenant: "Sarah Chen", submitted: "1h ago", urgency: 9 },
    { id: "MR-1042", title: "Garbage disposal jammed", priority: "Low", property: "Pine Valley", unit: "12A", tenant: "Marcus Johnson", submitted: "3h ago", urgency: 2 },
    { id: "MR-1043", title: "Ceiling stain growing", priority: "Medium", property: "Sunset", unit: "22C", tenant: "Emily Rodriguez", submitted: "5h ago", urgency: 5 },
    { id: "MR-1044", title: "Parking gate stuck", priority: "Medium", property: "Downtown Commerce", tenant: "David Kim", submitted: "6h ago", urgency: 4 },
    { id: "MR-1045", title: "Doorbell not working", priority: "Low", property: "Harbor View", unit: "8B", tenant: "Jessica Williams", submitted: "8h ago", urgency: 1 },
  ],
  triaged: [
    { id: "MR-1038", title: "HVAC making loud noise", priority: "High", property: "Maple Grove", unit: "2", tenant: "Robert Taylor", submitted: "6h ago", vendor: "CoolAir HVAC Co", urgency: 7 },
    { id: "MR-1039", title: "Bathroom faucet dripping", priority: "Low", property: "Riverside", unit: "11A", tenant: "Aisha Patel", submitted: "8h ago", vendor: "QuickFix Plumbing", urgency: 3 },
    { id: "MR-1040", title: "Smoke detector beeping", priority: "High", property: "Pine Valley", unit: "5C", tenant: "James O'Brien", submitted: "10h ago", vendor: "SafeHome Electric", urgency: 8 },
  ],
  in_progress: [
    { id: "MR-1034", title: "Kitchen sink leak", priority: "High", property: "Sunset", unit: "15A", tenant: "Tenant", submitted: "1d ago", vendor: "Vendor en route", progress: 75 },
    { id: "MR-1035", title: "Elevator maintenance", priority: "Medium", property: "Downtown Commerce", tenant: "Building", submitted: "2d ago", vendor: "Scheduled tomorrow", progress: 25 },
    { id: "MR-1036", title: "Roof inspection", priority: "Medium", property: "Harbor View", tenant: "Building", submitted: "3d ago", vendor: "Inspector on site", progress: 60 },
    { id: "MR-1037", title: "Paint touch-up hallway", priority: "Low", property: "Riverside", tenant: "Building", submitted: "4d ago", progress: 90 },
  ],
  completed: [
    { id: "MR-1031", title: "Replaced light fixtures", priority: "Medium", property: "Maple Grove", tenant: "Tenant", submitted: "5d ago", completedAt: "Completed today" },
    { id: "MR-1032", title: "Fixed AC unit", priority: "High", property: "Sunset", tenant: "Tenant", submitted: "6d ago", completedAt: "Completed yesterday" },
    { id: "MR-1033", title: "Unclogged drain", priority: "Medium", property: "Pine Valley", tenant: "Tenant", submitted: "7d ago", completedAt: "Completed 2 days ago" },
  ],
};

/* ------------------------------------------------------------------ */
/*  Column config                                                      */
/* ------------------------------------------------------------------ */

const columnConfig: {
  key: Column;
  label: string;
  icon: typeof Wrench;
  headerBg: string;
  iconColor: string;
  badgeBg: string;
  badgeText: string;
}[] = [
  {
    key: "new",
    label: "New",
    icon: AlertTriangle,
    headerBg: "bg-warm-gray-100",
    iconColor: "text-warm-gray-500",
    badgeBg: "bg-warm-gray-200",
    badgeText: "text-warm-gray-500",
  },
  {
    key: "triaged",
    label: "AI Triaged",
    icon: Sparkles,
    headerBg: "bg-brand-50",
    iconColor: "text-brand-600",
    badgeBg: "bg-brand-200",
    badgeText: "text-brand-700",
  },
  {
    key: "in_progress",
    label: "In Progress",
    icon: Clock,
    headerBg: "bg-info/10",
    iconColor: "text-info",
    badgeBg: "bg-info/20",
    badgeText: "text-info",
  },
  {
    key: "completed",
    label: "Completed",
    icon: CheckCircle2,
    headerBg: "bg-success/10",
    iconColor: "text-success",
    badgeBg: "bg-success/20",
    badgeText: "text-success",
  },
];

/* ------------------------------------------------------------------ */
/*  Priority helpers                                                   */
/* ------------------------------------------------------------------ */

const priorityStyles: Record<Priority, { bg: string; text: string }> = {
  Emergency: { bg: "bg-danger/10", text: "text-danger" },
  High: { bg: "bg-warning/10", text: "text-warning" },
  Medium: { bg: "bg-info/10", text: "text-info" },
  Low: { bg: "bg-warm-gray-100", text: "text-warm-gray-500" },
};

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function PriorityPill({ priority }: { priority: Priority }) {
  const s = priorityStyles[priority];
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold leading-none",
        s.bg,
        s.text,
      )}
    >
      {priority}
    </span>
  );
}

function UrgencyBadge({ score }: { score: number }) {
  const color =
    score >= 8 ? "text-danger bg-danger/10" : score >= 5 ? "text-warning bg-warning/10" : "text-brand-600 bg-brand-50";
  return (
    <span className={clsx("inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[11px] font-semibold", color)}>
      <Sparkles size={10} />
      {score}/10
    </span>
  );
}

function StatCard({
  label,
  value,
  icon: Icon,
  iconBg,
  iconColor,
  index,
}: {
  label: string;
  value: string;
  icon: typeof Wrench;
  iconBg: string;
  iconColor: string;
  index: number;
}) {
  return (
    <div
      className={clsx(
        "animate-fade-in rounded-2xl border border-card-border bg-card-bg p-5",
        `stagger-${index + 1}`,
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[12px] font-medium tracking-wide text-warm-gray-400 uppercase">
            {label}
          </p>
          <p className="mt-2 text-[22px] font-bold tracking-tight text-foreground leading-none">
            {value}
          </p>
        </div>
        <div
          className={clsx(
            "flex h-10 w-10 items-center justify-center rounded-xl",
            iconBg,
          )}
        >
          <Icon size={20} strokeWidth={1.8} className={iconColor} />
        </div>
      </div>
    </div>
  );
}

function KanbanCard({ req, column }: { req: MaintenanceRequest; column: Column }) {
  return (
    <div
      className={clsx(
        "group cursor-pointer rounded-xl border border-card-border bg-card-bg p-4 transition-all duration-200 hover:shadow-sm",
        column === "completed" && "opacity-70 hover:opacity-100",
      )}
    >
      {/* Top row */}
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          {column === "completed" && (
            <div className="mb-2 flex items-center gap-1.5 text-[12px] font-medium text-success">
              <CheckCircle2 size={14} />
              {req.completedAt}
            </div>
          )}
          <h4 className="text-[14px] font-medium leading-snug text-foreground mt-1">
            {req.title}
          </h4>
        </div>
        <PriorityPill priority={req.priority} />
      </div>

      {/* Property + unit */}
      {column !== "completed" && (
        <>
          <p className="mt-1 text-[12px] text-warm-gray-400">
            {req.property}
            {req.unit ? ` ${req.unit}` : ""}
          </p>

          {/* Tenant */}
          <p className="text-[12px] text-warm-gray-500 mt-0.5">{req.tenant}</p>
        </>
      )}

      {/* Assigned vendor (AI Triaged) */}
      {column === "triaged" && req.vendor && (
        <p className="mt-2 text-[12px] font-medium text-brand-600">
          Assigned: {req.vendor}
        </p>
      )}

      {/* Progress bar (In Progress) */}
      {column === "in_progress" && req.progress !== undefined && (
        <div className="mt-3">
          {req.vendor && (
            <p className="text-[12px] text-warm-gray-400 mb-1.5">{req.vendor}</p>
          )}
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-warm-gray-100">
            <div
              className="h-full rounded-full bg-brand-500 transition-all duration-500"
              style={{ width: `${req.progress}%` }}
            />
          </div>
          <p className="mt-1 text-[11px] text-warm-gray-400 text-right">{req.progress}%</p>
        </div>
      )}

      {/* Footer */}
      {column !== "completed" && (
        <div className="mt-3 flex items-center justify-between">
          <span className="text-[11px] text-warm-gray-400">{req.submitted}</span>
          {req.urgency !== undefined && <UrgencyBadge score={req.urgency} />}
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  AI Insights                                                        */
/* ------------------------------------------------------------------ */

const insights = [
  {
    icon: ThermometerSun,
    iconBg: "bg-danger/10",
    iconColor: "text-danger",
    text: "HVAC issues up 45% this month \u2014 consider preventive maintenance schedule",
    tag: "Trending",
    tagIcon: TrendingUp,
    tagColor: "text-danger",
  },
  {
    icon: Clock,
    iconBg: "bg-success/10",
    iconColor: "text-success",
    text: "Average resolution time improved 18% since enabling AI triage",
    tag: "Improving",
    tagIcon: TrendingDown,
    tagColor: "text-success",
  },
  {
    icon: DollarSign,
    iconBg: "bg-info/10",
    iconColor: "text-info",
    text: "Predicted maintenance costs next month: $12,400",
    tag: "Forecast",
    tagIcon: TrendingUp,
    tagColor: "text-info",
  },
  {
    icon: Star,
    iconBg: "bg-warning/10",
    iconColor: "text-warning",
    text: "QuickFix Plumbing: 98% tenant satisfaction, fastest avg response",
    tag: "Top Vendor",
    tagIcon: Star,
    tagColor: "text-warning",
  },
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function MaintenancePage() {
  return (
    <div className="animate-fade-in space-y-0">
      {/* ---- Header ---- */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-[28px] font-semibold tracking-tight text-foreground">
            Maintenance
          </h1>
          <p className="mt-1 text-[14px] text-warm-gray-400">
            AI-powered maintenance triage and tracking
          </p>
        </div>
        <button className="inline-flex h-10 items-center gap-2 rounded-2xl bg-brand-500 px-5 text-[14px] font-semibold text-white shadow-sm transition-all hover:bg-brand-600 hover:shadow-md active:scale-[0.98]">
          <Plus size={16} strokeWidth={2.5} />
          New Request
        </button>
      </div>

      {/* ---- Stats row ---- */}
      <div className="mt-6 grid grid-cols-2 gap-5 lg:grid-cols-4">
        <StatCard label="Total Open" value="12" icon={Wrench} iconBg="bg-warm-gray-100" iconColor="text-foreground" index={0} />
        <StatCard label="Avg Resolution" value="2.3 days" icon={Clock} iconBg="bg-brand-50" iconColor="text-brand-500" index={1} />
        <StatCard label="AI Auto-assigned" value="67%" icon={Sparkles} iconBg="bg-brand-50" iconColor="text-brand-600" index={2} />
        <StatCard label="Satisfaction" value="4.6/5" icon={Star} iconBg="bg-warning/10" iconColor="text-warning" index={3} />
      </div>

      {/* ---- AI Triage Banner ---- */}
      <div className="mt-6 animate-fade-in stagger-5 rounded-2xl border-2 border-brand-200 bg-card-bg p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-50">
              <Sparkles size={22} strokeWidth={1.8} className="text-brand-500" />
            </div>
            <p className="text-[15px] font-medium text-foreground">
              AI has triaged 5 new requests today
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center rounded-full bg-danger/10 px-2.5 py-1 text-[12px] font-semibold text-danger">
              1 Emergency
            </span>
            <span className="inline-flex items-center rounded-full bg-warning/10 px-2.5 py-1 text-[12px] font-semibold text-warning">
              2 High
            </span>
            <span className="inline-flex items-center rounded-full bg-info/10 px-2.5 py-1 text-[12px] font-semibold text-info">
              2 Standard
            </span>
            <button className="inline-flex h-9 items-center gap-1.5 rounded-xl border border-brand-300 bg-white px-4 text-[13px] font-semibold text-brand-600 transition-all hover:bg-brand-50 active:scale-[0.98]">
              Review Assignments
              <ArrowUpRight size={14} strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>

      {/* ---- Kanban board ---- */}
      <div className="mt-6 animate-fade-in stagger-6">
        <div className="flex gap-5 overflow-x-auto pb-2">
          {columnConfig.map((col) => (
            <div key={col.key} className="min-w-[280px] flex-1">
              {/* Column header */}
              <div
                className={clsx(
                  "flex items-center gap-3 rounded-2xl px-4 py-3",
                  col.headerBg,
                )}
              >
                <col.icon size={16} strokeWidth={2} className={col.iconColor} />
                <span className="text-[13px] font-semibold text-foreground">
                  {col.label}
                </span>
                <span
                  className={clsx(
                    "ml-auto flex h-5 min-w-[22px] items-center justify-center rounded-full px-1.5 text-[11px] font-bold",
                    col.badgeBg,
                    col.badgeText,
                  )}
                >
                  {requests[col.key].length}
                </span>
              </div>

              {/* Cards */}
              <div className="mt-3 space-y-3">
                {requests[col.key].map((req) => (
                  <KanbanCard key={req.id} req={req} column={col.key} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ---- AI Insights ---- */}
      <div className="mt-6 animate-fade-in stagger-7 grid grid-cols-1 gap-5 md:grid-cols-2">
        {insights.map((insight, i) => (
          <div
            key={i}
            className="rounded-2xl border border-card-border bg-card-bg p-5"
          >
            <div className="flex items-start gap-4">
              <div
                className={clsx(
                  "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
                  insight.iconBg,
                )}
              >
                <insight.icon size={18} strokeWidth={1.8} className={insight.iconColor} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[14px] font-medium leading-relaxed text-foreground">
                  {insight.text}
                </p>
                <div className={clsx("mt-2 flex items-center gap-1 text-[12px] font-medium", insight.tagColor)}>
                  <insight.tagIcon size={12} />
                  {insight.tag}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
