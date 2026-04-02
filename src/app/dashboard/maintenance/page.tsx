"use client";

import { useState } from "react";
import clsx from "clsx";
import {
  Wrench,
  Plus,
  Sparkles,
  AlertTriangle,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  ChevronRight,
  TrendingDown,
  TrendingUp,
  DollarSign,
  Star,
  Bot,
  Zap,
  ShieldCheck,
  User,
  Building2,
  Timer,
  Truck,
  BarChart3,
  ThermometerSun,
  CircleDot,
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
  aiScore: number;
  status?: string;
  progress?: number;
  completedAt?: string;
}

/* ------------------------------------------------------------------ */
/*  Mock data                                                          */
/* ------------------------------------------------------------------ */

const columns: {
  key: Column;
  label: string;
  count: number;
  colorClass: string;
  dotClass: string;
}[] = [
  { key: "new", label: "New", count: 5, colorClass: "bg-muted/15 text-muted", dotClass: "bg-muted" },
  { key: "triaged", label: "AI Triaged", count: 3, colorClass: "bg-brand-100 text-brand-700", dotClass: "bg-brand-500" },
  { key: "in_progress", label: "In Progress", count: 4, colorClass: "bg-info/10 text-info", dotClass: "bg-info" },
  { key: "completed", label: "Completed", count: 3, colorClass: "bg-success/10 text-success", dotClass: "bg-success" },
];

const requests: Record<Column, MaintenanceRequest[]> = {
  new: [
    { id: "MR-1041", title: "Water heater failure", priority: "Emergency", property: "Riverside Apts", unit: "4B", tenant: "Maria Santos", submitted: "12 min ago", aiScore: 10 },
    { id: "MR-1042", title: "Garbage disposal jammed", priority: "Low", property: "Pine Valley", unit: "12A", tenant: "James Chen", submitted: "1 hr ago", aiScore: 2 },
    { id: "MR-1043", title: "Ceiling stain growing", priority: "Medium", property: "Sunset Terrace", unit: "22C", tenant: "Priya Patel", submitted: "2 hrs ago", aiScore: 6 },
    { id: "MR-1044", title: "Parking gate stuck open", priority: "Medium", property: "Downtown Lofts", unit: "3", tenant: "Building Manager", submitted: "3 hrs ago", aiScore: 5 },
    { id: "MR-1045", title: "Doorbell not working", priority: "Low", property: "Harbor View", unit: "8B", tenant: "Tom Rivera", submitted: "5 hrs ago", aiScore: 1 },
  ],
  triaged: [
    { id: "MR-1038", title: "HVAC making loud noise", priority: "High", property: "Maple Grove", unit: "2", tenant: "Derek Williams", submitted: "6 hrs ago", vendor: "CoolAir HVAC Co", aiScore: 8 },
    { id: "MR-1039", title: "Bathroom faucet dripping", priority: "Low", property: "Riverside Apts", unit: "11A", tenant: "Angela Brooks", submitted: "8 hrs ago", vendor: "QuickFix Plumbing", aiScore: 3 },
    { id: "MR-1040", title: "Smoke detector beeping", priority: "High", property: "Pine Valley", unit: "5C", tenant: "Kenji Nakamura", submitted: "10 hrs ago", vendor: "SafeHome Electric", aiScore: 9 },
  ],
  in_progress: [
    { id: "MR-1034", title: "Kitchen sink leak", priority: "High", property: "Sunset Terrace", unit: "15A", tenant: "Rachel Kim", submitted: "1 day ago", vendor: "QuickFix Plumbing", aiScore: 8, status: "Vendor en route" },
    { id: "MR-1035", title: "Elevator maintenance", priority: "Medium", property: "Downtown Lofts", tenant: "Building-wide", submitted: "2 days ago", vendor: "LiftPro Services", aiScore: 7, status: "Scheduled tomorrow" },
    { id: "MR-1036", title: "Roof inspection needed", priority: "Medium", property: "Harbor View", tenant: "Building-wide", submitted: "3 days ago", vendor: "TopCover Roofing", aiScore: 5, status: "In progress" },
    { id: "MR-1037", title: "Paint touch-up hallway", priority: "Low", property: "Riverside Apts", tenant: "Building-wide", submitted: "4 days ago", vendor: "Fresh Coat Painters", aiScore: 2, status: "60% complete", progress: 60 },
  ],
  completed: [
    { id: "MR-1031", title: "Replaced light fixtures", priority: "Medium", property: "Maple Grove", unit: "7A", tenant: "Lisa Tran", submitted: "3 days ago", vendor: "SafeHome Electric", aiScore: 4, completedAt: "Today" },
    { id: "MR-1032", title: "Fixed AC unit", priority: "High", property: "Sunset Terrace", unit: "9B", tenant: "Carlos Mendez", submitted: "5 days ago", vendor: "CoolAir HVAC Co", aiScore: 7, completedAt: "Yesterday" },
    { id: "MR-1033", title: "Unclogged drain", priority: "Medium", property: "Pine Valley", unit: "3D", tenant: "Sarah Johnson", submitted: "6 days ago", vendor: "QuickFix Plumbing", aiScore: 5, completedAt: "2 days ago" },
  ],
};

/* ------------------------------------------------------------------ */
/*  Priority helpers                                                   */
/* ------------------------------------------------------------------ */

const priorityConfig: Record<Priority, { bg: string; text: string; ring: string }> = {
  Emergency: { bg: "bg-danger/10", text: "text-danger", ring: "ring-danger/20" },
  High: { bg: "bg-brand-100", text: "text-brand-700", ring: "ring-brand-200" },
  Medium: { bg: "bg-warning/10", text: "text-warning", ring: "ring-warning/20" },
  Low: { bg: "bg-success/10", text: "text-success", ring: "ring-success/20" },
};

function PriorityBadge({ priority }: { priority: Priority }) {
  const c = priorityConfig[priority];
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ring-1",
        c.bg,
        c.text,
        c.ring
      )}
    >
      {priority === "Emergency" && <Zap size={10} />}
      {priority}
    </span>
  );
}

function AiScoreBadge({ score }: { score: number }) {
  const color =
    score >= 8
      ? "text-danger"
      : score >= 5
      ? "text-warning"
      : "text-success";
  return (
    <span className={clsx("flex items-center gap-1 text-[11px] font-semibold", color)}>
      <Bot size={12} className="text-brand-500" />
      {score}/10
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Kanban card                                                        */
/* ------------------------------------------------------------------ */

function KanbanCard({
  req,
  column,
}: {
  req: MaintenanceRequest;
  column: Column;
}) {
  return (
    <div
      className={clsx(
        "group cursor-pointer rounded-lg border border-card-border bg-card-bg p-3.5 shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition-all duration-150 hover:border-brand-300/50 hover:shadow-[0_2px_8px_rgba(0,0,0,0.06)]",
        column === "completed" && "opacity-75 hover:opacity-100"
      )}
    >
      {/* Top row: priority + AI score */}
      <div className="mb-2 flex items-center justify-between">
        <PriorityBadge priority={req.priority} />
        <AiScoreBadge score={req.aiScore} />
      </div>

      {/* Title */}
      <h4 className="text-[13px] font-semibold leading-snug text-foreground group-hover:text-brand-600 transition-colors">
        {req.title}
      </h4>

      {/* Property + unit */}
      <div className="mt-1.5 flex items-center gap-1.5 text-[11px] text-muted">
        <Building2 size={11} strokeWidth={2} />
        <span>
          {req.property}
          {req.unit && <span className="text-foreground/60"> &middot; Unit {req.unit}</span>}
        </span>
      </div>

      {/* Tenant */}
      <div className="mt-1 flex items-center gap-1.5 text-[11px] text-muted">
        <User size={11} strokeWidth={2} />
        <span>{req.tenant}</span>
      </div>

      {/* Time */}
      <div className="mt-1 flex items-center gap-1.5 text-[11px] text-muted">
        <Clock size={11} strokeWidth={2} />
        <span>{column === "completed" ? `Completed ${req.completedAt}` : `Submitted ${req.submitted}`}</span>
      </div>

      {/* Vendor (if assigned) */}
      {req.vendor && (
        <div className="mt-2 flex items-center gap-1.5 rounded-md bg-brand-50 px-2 py-1.5 text-[11px] font-medium text-brand-700">
          <Truck size={11} strokeWidth={2} />
          {req.vendor}
        </div>
      )}

      {/* Status (in progress) */}
      {req.status && (
        <div className="mt-2">
          <span className="text-[11px] font-medium text-info">{req.status}</span>
          {req.progress !== undefined && (
            <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-info/10">
              <div
                className="h-full rounded-full bg-info transition-all"
                style={{ width: `${req.progress}%` }}
              />
            </div>
          )}
        </div>
      )}

      {/* Card ID footer */}
      <div className="mt-2.5 flex items-center justify-between border-t border-card-border/60 pt-2">
        <span className="text-[10px] font-mono text-muted/60">{req.id}</span>
        <ChevronRight size={12} className="text-muted/40 transition-colors group-hover:text-brand-500" />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main page                                                          */
/* ------------------------------------------------------------------ */

export default function MaintenancePage() {
  const [activeColumn, setActiveColumn] = useState<Column | null>(null);

  return (
    <div className="animate-fade-in space-y-6">
      {/* ---- Header ---- */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-foreground">
            Maintenance
          </h1>
          <p className="mt-0.5 text-[13px] text-muted">
            AI-powered maintenance triage and tracking
          </p>
        </div>
        <button className="inline-flex h-9 items-center gap-2 rounded-lg bg-brand-500 px-4 text-[13px] font-semibold text-white shadow-sm transition-all hover:bg-brand-600 hover:shadow active:scale-[0.98]">
          <Plus size={15} strokeWidth={2} />
          New Request
        </button>
      </div>

      {/* ---- Quick stats ---- */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "Total Open", value: "12", icon: CircleDot, color: "text-info", bgColor: "bg-info/10" },
          { label: "Avg Resolution", value: "2.3 days", icon: Timer, color: "text-brand-500", bgColor: "bg-brand-50" },
          { label: "AI Auto-assigned", value: "67%", icon: Bot, color: "text-success", bgColor: "bg-success/10" },
          { label: "Tenant Satisfaction", value: "4.6/5", icon: Star, color: "text-warning", bgColor: "bg-warning/10" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-card-border bg-card-bg p-4 shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-medium uppercase tracking-wide text-muted">
                {stat.label}
              </span>
              <div className={clsx("flex h-7 w-7 items-center justify-center rounded-lg", stat.bgColor)}>
                <stat.icon size={14} strokeWidth={2} className={stat.color} />
              </div>
            </div>
            <p className="mt-1.5 text-lg font-bold tracking-tight text-foreground">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* ---- AI Triage banner ---- */}
      <div className="relative overflow-hidden rounded-xl border border-brand-200 bg-gradient-to-r from-brand-50 via-white to-brand-50 p-[1px] shadow-sm">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-200/50 via-brand-400/20 to-brand-200/50 animate-pulse-glow rounded-xl" />
        <div className="relative rounded-[11px] bg-gradient-to-r from-brand-50/80 via-card-bg to-brand-50/80 p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-500 shadow-md shadow-brand-500/20">
                <Sparkles size={18} className="text-white" />
              </div>
              <div>
                <h3 className="text-[14px] font-semibold text-foreground">
                  AI has triaged 5 new requests today
                </h3>
                <div className="mt-1.5 flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-danger/10 px-2.5 py-0.5 text-[11px] font-semibold text-danger ring-1 ring-danger/20">
                    <Zap size={10} />
                    1 Emergency
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-brand-100 px-2.5 py-0.5 text-[11px] font-semibold text-brand-700 ring-1 ring-brand-200">
                    <AlertTriangle size={10} />
                    2 High Priority
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-muted/10 px-2.5 py-0.5 text-[11px] font-semibold text-muted ring-1 ring-muted/20">
                    <ShieldCheck size={10} />
                    2 Standard
                  </span>
                </div>
              </div>
            </div>
            <button className="inline-flex h-9 items-center gap-2 rounded-lg border border-brand-300 bg-white px-4 text-[13px] font-semibold text-brand-700 shadow-sm transition-all hover:bg-brand-50 hover:shadow active:scale-[0.98]">
              Review AI Assignments
              <ArrowUpRight size={14} strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>

      {/* ---- Kanban + Insights layout ---- */}
      <div className="flex flex-col gap-6 xl:flex-row">
        {/* ---- Kanban board ---- */}
        <div className="min-w-0 flex-1">
          <div className="flex gap-4 overflow-x-auto pb-4 -mx-6 px-6 lg:-mx-8 lg:px-8 xl:mx-0 xl:px-0">
            {columns.map((col) => (
              <div
                key={col.key}
                className="flex w-72 shrink-0 flex-col xl:w-auto xl:flex-1 xl:min-w-[240px]"
              >
                {/* Column header */}
                <div
                  className={clsx(
                    "mb-3 flex items-center justify-between rounded-lg px-3 py-2",
                    col.colorClass
                  )}
                >
                  <div className="flex items-center gap-2">
                    <span className={clsx("h-2 w-2 rounded-full", col.dotClass)} />
                    <span className="text-[12px] font-semibold">{col.label}</span>
                  </div>
                  <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-white/80 px-1.5 text-[11px] font-bold text-foreground/70 shadow-sm">
                    {col.count}
                  </span>
                </div>

                {/* Cards */}
                <div className="space-y-2.5">
                  {requests[col.key].map((req) => (
                    <KanbanCard key={req.id} req={req} column={col.key} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ---- AI Insights sidebar ---- */}
        <div className="w-full shrink-0 xl:w-72">
          <div className="rounded-xl border border-card-border bg-card-bg shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
            <div className="flex items-center gap-2 border-b border-card-border px-4 py-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-brand-50">
                <BarChart3 size={13} className="text-brand-600" />
              </div>
              <h3 className="text-[13px] font-semibold text-foreground">AI Insights</h3>
            </div>

            <div className="divide-y divide-card-border/60">
              {/* Insight 1: HVAC trend */}
              <div className="p-4">
                <div className="flex items-start gap-2.5">
                  <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-danger/10">
                    <ThermometerSun size={14} className="text-danger" />
                  </div>
                  <div>
                    <p className="text-[12px] font-semibold leading-snug text-foreground">
                      HVAC issues up 45% this month
                    </p>
                    <p className="mt-0.5 text-[11px] leading-relaxed text-muted">
                      Consider scheduling preventive maintenance across all properties before summer.
                    </p>
                    <div className="mt-2 flex items-center gap-1 text-[11px] font-medium text-brand-600">
                      <TrendingUp size={11} />
                      Trending
                    </div>
                  </div>
                </div>
              </div>

              {/* Insight 2: Resolution time */}
              <div className="p-4">
                <div className="flex items-start gap-2.5">
                  <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-success/10">
                    <Timer size={14} className="text-success" />
                  </div>
                  <div>
                    <p className="text-[12px] font-semibold leading-snug text-foreground">
                      Avg resolution: 2.3 days
                    </p>
                    <p className="mt-0.5 text-[11px] leading-relaxed text-muted">
                      Down 18% since enabling AI triage. Fastest resolution category: plumbing (1.1 days).
                    </p>
                    <div className="mt-2 flex items-center gap-1 text-[11px] font-medium text-success">
                      <TrendingDown size={11} />
                      18% improvement
                    </div>
                  </div>
                </div>
              </div>

              {/* Insight 3: Cost prediction */}
              <div className="p-4">
                <div className="flex items-start gap-2.5">
                  <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-info/10">
                    <DollarSign size={14} className="text-info" />
                  </div>
                  <div>
                    <p className="text-[12px] font-semibold leading-snug text-foreground">
                      Predicted costs next month
                    </p>
                    <p className="mt-0.5 text-[11px] leading-relaxed text-muted">
                      $12,400 estimated based on seasonal patterns and current open requests.
                    </p>
                    <div className="mt-2 text-[16px] font-bold text-foreground">
                      $12,400
                    </div>
                  </div>
                </div>
              </div>

              {/* Insight 4: Vendor rating */}
              <div className="p-4">
                <div className="flex items-start gap-2.5">
                  <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-warning/10">
                    <Star size={14} className="text-warning" />
                  </div>
                  <div>
                    <p className="text-[12px] font-semibold leading-snug text-foreground">
                      Top vendor performance
                    </p>
                    <p className="mt-0.5 text-[11px] leading-relaxed text-muted">
                      QuickFix Plumbing has a 98% tenant satisfaction rating across 47 completed jobs.
                    </p>
                    <div className="mt-2 flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={11}
                          className={i < 5 ? "fill-warning text-warning" : "text-muted/30"}
                        />
                      ))}
                      <span className="ml-1.5 text-[11px] font-semibold text-foreground">
                        98%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
