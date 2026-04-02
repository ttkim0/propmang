"use client";

import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Download,
  Sparkles,
  ArrowUpRight,
  ArrowDownRight,
  CreditCard,
  PieChart,
  BarChart3,
} from "lucide-react";
import clsx from "clsx";

const stats = [
  {
    label: "Total Revenue",
    value: "$284,750",
    change: "+4.8%",
    up: true,
    icon: DollarSign,
    accent: "text-brand-500",
    bg: "bg-brand-50",
  },
  {
    label: "Net Operating Income",
    value: "$198,200",
    change: "+5.1%",
    up: true,
    icon: TrendingUp,
    accent: "text-success",
    bg: "bg-success/10",
  },
  {
    label: "Expenses",
    value: "$86,550",
    change: "+2.3%",
    up: true,
    icon: CreditCard,
    accent: "text-danger",
    bg: "bg-danger/10",
  },
  {
    label: "Cash Flow",
    value: "$156,300",
    change: "+6.2%",
    up: true,
    icon: BarChart3,
    accent: "text-info",
    bg: "bg-info/10",
  },
];

const revenueData = [
  { month: "Jan", value: 245, display: "$245K" },
  { month: "Feb", value: 252, display: "$252K" },
  { month: "Mar", value: 261, display: "$261K" },
  { month: "Apr", value: 268, display: "$268K" },
  { month: "May", value: 277, display: "$277K" },
  { month: "Jun", value: 284, display: "$284K" },
];

const maxRevenue = 300;

const expenses = [
  { label: "Maintenance & Repairs", amount: "$32,400", pct: 37.4, color: "bg-brand-500" },
  { label: "Insurance", amount: "$18,200", pct: 21.0, color: "bg-brand-400" },
  { label: "Utilities", amount: "$14,800", pct: 17.1, color: "bg-brand-300" },
  { label: "Property Tax", amount: "$12,500", pct: 14.4, color: "bg-brand-200" },
  { label: "Management Fees", amount: "$8,650", pct: 10.0, color: "bg-brand-100" },
];

const forecasts = [
  "Projected Q3 revenue: $892,000 (\u2191 5.2% from Q2)",
  "Maintenance costs trending 12% above budget \u2014 review vendor contracts",
  "Occupancy-adjusted NOI forecast: $612K for next quarter",
  "Recommended rent adjustments could increase annual revenue by $34,800",
];

type TxnType = "Income" | "Expense";
type TxnStatus = "Completed" | "Pending" | "Processing";

interface Transaction {
  date: string;
  description: string;
  property: string;
  amount: string;
  type: TxnType;
  status: TxnStatus;
}

const transactions: Transaction[] = [
  { date: "Jun 28", description: "Rent Payment - Unit 4B", property: "Riverside Apts", amount: "+$1,850", type: "Income", status: "Completed" },
  { date: "Jun 27", description: "HVAC Repair", property: "Pine Valley", amount: "-$2,340", type: "Expense", status: "Completed" },
  { date: "Jun 27", description: "Rent Payment - Unit 12A", property: "Pine Valley", amount: "+$2,100", type: "Income", status: "Completed" },
  { date: "Jun 26", description: "Landscaping Service", property: "Sunset Complex", amount: "-$890", type: "Expense", status: "Processing" },
  { date: "Jun 25", description: "Rent Payment - Unit 3", property: "Downtown Lofts", amount: "+$4,200", type: "Income", status: "Completed" },
  { date: "Jun 25", description: "Insurance Premium", property: "All Properties", amount: "-$3,200", type: "Expense", status: "Pending" },
];

const statusStyles: Record<TxnStatus, string> = {
  Completed: "bg-success/10 text-success",
  Pending: "bg-warning/10 text-warning",
  Processing: "bg-info/10 text-info",
};

export default function FinancialsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-[22px] font-semibold tracking-[-0.015em] text-foreground">
            Financials
          </h1>
          <p className="mt-1 text-[13px] text-muted">
            AI-powered financial insights and forecasting
          </p>
        </div>
        <button className="inline-flex h-9 items-center gap-2 rounded-lg bg-brand-500 px-4 text-[13px] font-medium text-white transition-colors hover:bg-brand-600">
          <Download size={15} strokeWidth={2} />
          Export Report
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
              </p>
              <div className="mt-1 flex items-center gap-1">
                {s.label === "Expenses" ? (
                  <ArrowUpRight size={13} strokeWidth={2} className="text-danger" />
                ) : (
                  <ArrowUpRight size={13} strokeWidth={2} className="text-success" />
                )}
                <span
                  className={clsx(
                    "text-[12px] font-medium",
                    s.label === "Expenses" ? "text-danger" : "text-success"
                  )}
                >
                  {s.change}
                </span>
                <span className="text-[12px] text-muted">vs last month</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Revenue Chart */}
      <div className="rounded-xl border border-card-border bg-card-bg p-5">
        <div className="mb-5 flex items-center gap-2">
          <BarChart3 size={15} strokeWidth={1.75} className="text-muted" />
          <h2 className="text-[14px] font-semibold text-foreground">
            Monthly Revenue &mdash; 2025
          </h2>
        </div>
        <div className="flex items-end gap-4">
          {revenueData.map((d) => (
            <div key={d.month} className="flex flex-1 flex-col items-center gap-2">
              <span className="text-[11px] font-medium text-foreground">
                {d.display}
              </span>
              <div className="relative flex h-48 w-full items-end justify-center">
                <div
                  className="w-full rounded-t-md bg-brand-500/80 transition-all"
                  style={{ height: `${(d.value / maxRevenue) * 100}%` }}
                />
              </div>
              <span className="text-[12px] font-medium text-muted">
                {d.month}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Two-column: Expense Breakdown + AI Forecast */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Expense Breakdown */}
        <div className="rounded-xl border border-card-border bg-card-bg p-5">
          <div className="mb-4 flex items-center gap-2">
            <PieChart size={15} strokeWidth={1.75} className="text-muted" />
            <h2 className="text-[14px] font-semibold text-foreground">
              Expense Breakdown
            </h2>
          </div>
          <div className="space-y-4">
            {expenses.map((e) => (
              <div key={e.label}>
                <div className="mb-1.5 flex items-center justify-between">
                  <span className="text-[13px] text-foreground">{e.label}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[13px] font-medium text-foreground">
                      {e.amount}
                    </span>
                    <span className="text-[11px] text-muted">
                      {e.pct}%
                    </span>
                  </div>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-brand-50/60">
                  <div
                    className={clsx("h-full rounded-full", e.color)}
                    style={{ width: `${e.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Financial Forecast */}
        <div className="rounded-xl border border-brand-200 bg-brand-50/40 p-5">
          <div className="mb-3 flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-500">
              <Sparkles size={14} strokeWidth={2} className="text-white" />
            </div>
            <h2 className="text-[14px] font-semibold text-foreground">
              AI Financial Forecast
            </h2>
          </div>
          <ul className="space-y-2.5">
            {forecasts.map((f, i) => (
              <li
                key={i}
                className="flex items-start gap-2.5 text-[13px] leading-relaxed text-foreground/80"
              >
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                {f}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="rounded-xl border border-card-border bg-card-bg">
        <div className="border-b border-card-border px-5 py-4">
          <h2 className="text-[14px] font-semibold text-foreground">
            Recent Transactions
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="border-b border-card-border">
                {["Date", "Description", "Property", "Amount", "Type", "Status"].map(
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
              {transactions.map((t, i) => (
                <tr
                  key={i}
                  className={clsx(
                    "transition-colors hover:bg-brand-50/30",
                    i !== transactions.length - 1 &&
                      "border-b border-card-border/60"
                  )}
                >
                  <td className="px-5 py-3.5 text-[13px] text-muted">
                    {t.date}
                  </td>
                  <td className="px-5 py-3.5 text-[13px] font-medium text-foreground">
                    {t.description}
                  </td>
                  <td className="px-5 py-3.5 text-[13px] text-muted">
                    {t.property}
                  </td>
                  <td
                    className={clsx(
                      "px-5 py-3.5 text-[13px] font-medium",
                      t.type === "Income" ? "text-success" : "text-danger"
                    )}
                  >
                    {t.amount}
                  </td>
                  <td className="px-5 py-3.5">
                    <span
                      className={clsx(
                        "inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold",
                        t.type === "Income"
                          ? "bg-success/10 text-success"
                          : "bg-danger/10 text-danger"
                      )}
                    >
                      {t.type}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span
                      className={clsx(
                        "inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold",
                        statusStyles[t.status]
                      )}
                    >
                      {t.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
