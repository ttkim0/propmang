"use client";

import clsx from "clsx";
import {
  Plus,
  Sparkles,
  Clock,
  Star,
  CheckCircle2,
  Wrench,
  TrendingUp,
  TrendingDown,
  DollarSign,
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
    { id: "MR-1034", title: "Kitchen sink leak", priority: "High", property: "Sunset", unit: "15A", tenant: "Tenant", submitted: "1d ago", progress: 75 },
    { id: "MR-1035", title: "Elevator maintenance", priority: "Medium", property: "Downtown Commerce", tenant: "Building", submitted: "2d ago", progress: 25 },
    { id: "MR-1036", title: "Roof inspection", priority: "Medium", property: "Harbor View", tenant: "Building", submitted: "3d ago", progress: 60 },
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
  headerClasses: string;
}[] = [
  {
    key: "new",
    label: "New",
    headerClasses: "bg-cream-dark text-text-secondary",
  },
  {
    key: "triaged",
    label: "AI Triaged",
    headerClasses: "bg-sage-light text-sage-dark",
  },
  {
    key: "in_progress",
    label: "In Progress",
    headerClasses: "bg-info-light text-info",
  },
  {
    key: "completed",
    label: "Completed",
    headerClasses: "bg-success-light text-success",
  },
];

/* ------------------------------------------------------------------ */
/*  Priority helpers                                                   */
/* ------------------------------------------------------------------ */

const priorityStyles: Record<Priority, { bg: string; text: string }> = {
  Emergency: { bg: "bg-danger-light", text: "text-danger" },
  High: { bg: "bg-warning-light", text: "text-warning" },
  Medium: { bg: "bg-info-light", text: "text-info" },
  Low: { bg: "bg-cream-dark", text: "text-text-tertiary" },
};

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function PriorityPill({ priority }: { priority: Priority }) {
  const s = priorityStyles[priority];
  return (
    <span
      className={clsx(
        "rounded-full px-2.5 py-0.5 text-[11px] font-medium",
        s.bg,
        s.text,
      )}
    >
      {priority}
    </span>
  );
}

function StatCard({
  label,
  value,
  index,
}: {
  label: string;
  value: string;
  index: number;
}) {
  return (
    <div
      className={clsx(
        "animate-fade-in bg-white border border-border rounded-[20px] p-5",
        `stagger-${index + 1}`,
      )}
    >
      <p className="text-[11px] font-medium tracking-widest text-text-tertiary uppercase">
        {label}
      </p>
      <p className="mt-2 font-serif text-[28px] text-text-primary leading-none">
        {value}
      </p>
    </div>
  );
}

function KanbanCard({ req, column }: { req: MaintenanceRequest; column: Column }) {
  return (
    <div
      className={clsx(
        "bg-white border border-border rounded-2xl p-4 mt-3 hover:border-text-tertiary transition cursor-pointer",
      )}
    >
      {/* Completed card layout */}
      {column === "completed" && (
        <>
          <div className="flex items-center gap-2 text-[12px] text-success font-medium">
            <CheckCircle2 size={14} />
            {req.completedAt}
          </div>
          <h4 className="text-[14px] font-medium text-text-primary mt-2">
            {req.title}
          </h4>
        </>
      )}

      {/* Non-completed card layout */}
      {column !== "completed" && (
        <>
          <PriorityPill priority={req.priority} />

          <h4 className="text-[14px] font-medium text-text-primary mt-2">
            {req.title}
          </h4>

          <p className="text-[12px] text-text-tertiary mt-1">
            {req.property}
            {req.unit ? ` ${req.unit}` : ""}
          </p>

          <p className="text-[12px] text-text-secondary">{req.tenant}</p>

          {/* Vendor for AI Triaged */}
          {column === "triaged" && req.vendor && (
            <p className="mt-2 text-[12px] text-sage-dark font-medium">
              {req.vendor}
            </p>
          )}

          {/* Progress bar for In Progress */}
          {column === "in_progress" && req.progress !== undefined && (
            <div className="mt-3">
              <div className="h-1 w-full rounded-full bg-cream-deeper overflow-hidden">
                <div
                  className="h-full rounded-full bg-accent transition-all duration-500"
                  style={{ width: `${req.progress}%` }}
                />
              </div>
              <p className="mt-1 text-[11px] text-text-tertiary text-right">
                {req.progress}%
              </p>
            </div>
          )}

          {/* Footer */}
          <div className="mt-3 flex items-center justify-between">
            <span className="text-[11px] text-text-tertiary">{req.submitted}</span>
            {req.urgency !== undefined && req.urgency >= 4 && (
              <span className="rounded-full bg-cream-dark px-2 py-0.5 text-[11px] font-medium text-text-secondary">
                Score: {req.urgency}/10
              </span>
            )}
          </div>
        </>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  AI Insights                                                        */
/* ------------------------------------------------------------------ */

const insights = [
  {
    text: "HVAC issues have increased 45% this month \u2014 a preventive maintenance schedule could reduce emergency calls significantly.",
  },
  {
    text: "Average resolution time improved 18% since enabling AI triage. Continuing this trend could save an estimated 40 labor hours per quarter.",
  },
  {
    text: "Predicted maintenance costs for next month: $12,400. This is 8% below the rolling average \u2014 a positive sign.",
  },
  {
    text: "QuickFix Plumbing holds a 98% tenant satisfaction rating with the fastest average response time across all vendors.",
  },
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function MaintenancePage() {
  return (
    <div className="animate-fade-in">
      {/* ---- Header ---- */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-serif text-[32px] text-text-primary leading-tight">
            Maintenance
          </h1>
          <p className="mt-1 text-[14px] text-text-secondary">
            AI-powered triage, assignment, and tracking
          </p>
        </div>
        <button className="inline-flex h-10 items-center gap-2 rounded-full bg-accent px-6 text-[14px] font-medium text-text-inverse transition hover:opacity-90 active:scale-[0.98]">
          <Plus size={16} strokeWidth={2} />
          New Request
        </button>
      </div>

      {/* ---- Stats row ---- */}
      <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Total Open" value="12" index={0} />
        <StatCard label="Avg Resolution" value="2.3 days" index={1} />
        <StatCard label="AI Auto-assigned" value="67%" index={2} />
        <StatCard label="Satisfaction" value="4.6/5" index={3} />
      </div>

      {/* ---- AI Triage Banner ---- */}
      <div className="mt-6 animate-fade-in stagger-5 bg-white border border-border rounded-[20px] p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-sage-light">
              <Sparkles size={20} strokeWidth={1.8} className="text-sage-dark" />
            </div>
            <p className="text-[15px] font-medium text-text-primary">
              AI has triaged 5 new requests today
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-danger-light px-2.5 py-0.5 text-[11px] font-medium text-danger">
              1 Emergency
            </span>
            <span className="rounded-full bg-warning-light px-2.5 py-0.5 text-[11px] font-medium text-warning">
              2 High
            </span>
            <span className="rounded-full bg-info-light px-2.5 py-0.5 text-[11px] font-medium text-info">
              2 Standard
            </span>
            <button className="ml-1 inline-flex h-9 items-center rounded-full border border-border bg-white px-4 text-[13px] font-medium text-text-primary transition hover:bg-cream-dark active:scale-[0.98]">
              Review
            </button>
          </div>
        </div>
      </div>

      {/* ---- Kanban board ---- */}
      <div className="mt-6 animate-fade-in stagger-6">
        <div className="flex gap-4 overflow-x-auto pb-2">
          {columnConfig.map((col) => (
            <div key={col.key} className="min-w-[260px] flex-1">
              {/* Column header */}
              <div
                className={clsx(
                  "flex items-center rounded-full py-2 px-4",
                  col.headerClasses,
                )}
              >
                <span className="text-[12px] font-medium">
                  {col.label}
                </span>
                <span className="text-[11px] rounded-full bg-white border border-border-light px-2 py-0.5 ml-2 text-text-secondary">
                  {requests[col.key].length}
                </span>
              </div>

              {/* Cards */}
              {requests[col.key].map((req) => (
                <KanbanCard key={req.id} req={req} column={col.key} />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ---- AI Insights ---- */}
      <div className="mt-6 animate-fade-in stagger-7 grid grid-cols-1 gap-4 md:grid-cols-2">
        {insights.map((insight, i) => (
          <div
            key={i}
            className="bg-white border border-border rounded-[20px] p-5"
          >
            <p className="text-[14px] italic text-text-secondary leading-relaxed">
              {insight.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
