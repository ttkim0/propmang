"use client";

import { Download, Sparkles } from "lucide-react";
import clsx from "clsx";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const stats = [
  { label: "Total Revenue", value: "$284,750", change: "+12.3%", positive: true },
  { label: "Net Operating Income", value: "$198,200", change: "+8.7%", positive: true },
  { label: "Total Expenses", value: "$86,550", change: "+4.2%", positive: false },
  { label: "Cash Flow", value: "$156,300", change: "+15.1%", positive: true },
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
  { label: "Maintenance", amount: "$32,400", pct: 37.4 },
  { label: "Insurance", amount: "$18,200", pct: 21.0 },
  { label: "Utilities", amount: "$14,800", pct: 17.1 },
  { label: "Property Tax", amount: "$12,500", pct: 14.4 },
  { label: "Management", amount: "$8,650", pct: 10.0 },
];

const forecasts = [
  "Projected Q3 revenue: $892,000 — up 5.2% from Q2",
  "Maintenance costs trending 12% above budget — review vendor contracts",
  "Occupancy-adjusted NOI forecast: $612K for next quarter",
  "Recommended rent adjustments could increase annual revenue by $34,800",
];

type TxnStatus = "Completed" | "Paid" | "Late";

interface Transaction {
  date: string;
  description: string;
  property: string;
  amount: string;
  type: "Income" | "Expense";
  status: TxnStatus;
}

const transactions: Transaction[] = [
  { date: "Apr 1", description: "Rent Payment - Sarah Chen", property: "Riverside", amount: "+$1,850", type: "Income", status: "Completed" },
  { date: "Apr 1", description: "Rent Payment - David Kim", property: "Downtown", amount: "+$4,200", type: "Income", status: "Completed" },
  { date: "Mar 30", description: "HVAC Repair - CoolAir Co", property: "Maple Grove", amount: "-$1,250", type: "Expense", status: "Paid" },
  { date: "Mar 29", description: "Insurance Premium", property: "All Properties", amount: "-$18,200", type: "Expense", status: "Paid" },
  { date: "Mar 28", description: "Rent Payment - Marcus Johnson", property: "Pine Valley", amount: "+$2,100", type: "Income", status: "Late" },
  { date: "Mar 27", description: "Plumbing Repair - QuickFix", property: "Riverside", amount: "-$450", type: "Expense", status: "Paid" },
];

const statusStyles: Record<TxnStatus, string> = {
  Completed: "bg-success-light text-success",
  Paid: "bg-sage-light text-sage-dark",
  Late: "bg-danger-light text-danger",
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function FinancialsPage() {
  return (
    <div className="min-h-screen bg-cream">
      <div className="mx-auto max-w-[1120px] px-6 py-10">
        {/* ---- Header ---- */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="font-serif text-[32px] leading-tight text-text-primary">
              Financials
            </h1>
            <p className="mt-1.5 font-sans text-[14px] text-text-tertiary">
              AI-powered financial insights and forecasting
            </p>
          </div>
          <button className="inline-flex h-10 items-center gap-2 rounded-full border border-border px-6 font-sans text-[13px] font-medium text-text-primary transition-colors hover:bg-cream-dark">
            <Download size={15} strokeWidth={1.75} />
            Export
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
              <div className="mt-1.5 flex items-center gap-1.5">
                <span
                  className={clsx(
                    "inline-block h-[6px] w-[6px] rounded-full",
                    s.positive ? "bg-success" : "bg-warning"
                  )}
                />
                <span
                  className={clsx(
                    "font-sans text-[12px] font-medium",
                    s.positive ? "text-success" : "text-warning"
                  )}
                >
                  {s.change}
                </span>
                <span className="font-sans text-[11px] text-text-tertiary">
                  vs last month
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* ---- Revenue Chart ---- */}
        <div className="mt-6 rounded-[20px] border border-border bg-white p-8">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="font-serif text-[20px] text-text-primary">
              Monthly Revenue
            </h2>
            <span className="font-sans text-[12px] text-text-tertiary">
              Last 6 months
            </span>
          </div>
          <div className="flex h-48 items-end gap-4">
            {revenueData.map((d, i) => {
              const isLatest = i === revenueData.length - 1;
              return (
                <div
                  key={d.month}
                  className="flex flex-1 flex-col items-center gap-2"
                >
                  <span className="font-sans text-[11px] font-medium text-text-tertiary">
                    {d.display}
                  </span>
                  <div className="flex w-full flex-1 items-end justify-center">
                    <div
                      className={clsx(
                        "w-full max-w-[48px] rounded-full transition-all",
                        isLatest ? "bg-accent" : "bg-cream-deeper"
                      )}
                      style={{ height: `${(d.value / maxRevenue) * 100}%` }}
                    />
                  </div>
                  <span className="font-sans text-[12px] text-text-tertiary">
                    {d.month}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* ---- Two-Column: Expenses + AI Forecast ---- */}
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Expense Breakdown */}
          <div className="rounded-[20px] border border-border bg-white p-7">
            <h2 className="font-serif text-[20px] text-text-primary">
              Expense Breakdown
            </h2>
            <p className="mt-0.5 font-sans text-[13px] text-text-tertiary">
              This month
            </p>

            <div className="mt-6 space-y-5">
              {expenses.map((e) => (
                <div key={e.label}>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="font-sans text-[13px] text-text-primary">
                      {e.label}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="font-sans text-[13px] font-medium text-text-primary">
                        {e.amount}
                      </span>
                      <span className="font-sans text-[11px] text-text-tertiary">
                        {e.pct}%
                      </span>
                    </div>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-cream-deeper">
                    <div
                      className="h-full rounded-full bg-accent"
                      style={{ width: `${e.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Forecast */}
          <div className="rounded-[20px] border border-border bg-white p-7">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent">
                <Sparkles size={15} strokeWidth={2} className="text-text-inverse" />
              </div>
              <h2 className="font-serif text-[20px] text-text-primary">
                AI Forecast
              </h2>
            </div>

            <div className="mt-6 space-y-3">
              {forecasts.map((f, i) => (
                <div
                  key={i}
                  className="rounded-2xl bg-cream-dark p-4"
                >
                  <p className="font-sans text-[13px] leading-relaxed text-text-secondary">
                    {f}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ---- Recent Transactions ---- */}
        <div className="mt-6 overflow-hidden rounded-[20px] border border-border bg-white">
          <div className="px-7 pt-7 pb-4">
            <h2 className="font-serif text-[20px] text-text-primary">
              Recent Transactions
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px]">
              <thead>
                <tr className="bg-cream-dark">
                  {["Date", "Description", "Property", "Amount", "Type", "Status"].map(
                    (h) => (
                      <th
                        key={h}
                        className="px-7 py-3 text-left font-sans text-[11px] font-semibold uppercase tracking-wide text-text-tertiary"
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
                      "transition-colors hover:bg-cream",
                      i < transactions.length - 1 && "border-b border-border"
                    )}
                  >
                    <td className="px-7 py-3.5 font-sans text-[13px] text-text-tertiary">
                      {t.date}
                    </td>
                    <td className="px-7 py-3.5 font-sans text-[13px] font-medium text-text-primary">
                      {t.description}
                    </td>
                    <td className="px-7 py-3.5 font-sans text-[13px] text-text-tertiary">
                      {t.property}
                    </td>
                    <td
                      className={clsx(
                        "px-7 py-3.5 font-sans text-[13px] font-medium",
                        t.type === "Income" ? "text-success" : "text-danger"
                      )}
                    >
                      {t.amount}
                    </td>
                    <td className="px-7 py-3.5">
                      <span
                        className={clsx(
                          "inline-flex items-center rounded-full px-2.5 py-0.5 font-sans text-[11px] font-semibold",
                          t.type === "Income"
                            ? "bg-success-light text-success"
                            : "bg-danger-light text-danger"
                        )}
                      >
                        {t.type}
                      </span>
                    </td>
                    <td className="px-7 py-3.5">
                      <span
                        className={clsx(
                          "inline-flex items-center rounded-full px-2.5 py-0.5 font-sans text-[11px] font-semibold",
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
    </div>
  );
}
