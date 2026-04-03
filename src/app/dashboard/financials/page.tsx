"use client";

import { Download, Sparkles, ArrowUpRight } from "lucide-react";
import clsx from "clsx";

const stats = [
  {
    label: "Total Revenue",
    value: "$284,750",
    change: "+12.3%",
    changeColor: "text-[#5B9A7D]",
  },
  {
    label: "Net Operating Income",
    value: "$198,200",
    change: "+8.7%",
    changeColor: "text-[#5B9A7D]",
  },
  {
    label: "Total Expenses",
    value: "$86,550",
    change: "+4.2%",
    changeColor: "text-[#C4975A]",
  },
  {
    label: "Cash Flow",
    value: "$156,300",
    change: "+15.1%",
    changeColor: "text-[#5B9A7D]",
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
  { label: "Maintenance", amount: "$32,400", pct: 37.4, color: "bg-[#4A7C6F]" },
  { label: "Insurance", amount: "$18,200", pct: 21.0, color: "bg-[#5B82A0]" },
  { label: "Utilities", amount: "$14,800", pct: 17.1, color: "bg-[#C4975A]" },
  { label: "Property Tax", amount: "$12,500", pct: 14.4, color: "bg-[#2D3F54]" },
  { label: "Management", amount: "$8,650", pct: 10.0, color: "bg-[#A8A49E]" },
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
  Completed: "bg-[#5B9A7D]/10 text-[#5B9A7D]",
  Paid: "bg-[#C4975A]/10 text-[#C4975A]",
  Late: "bg-[#B85C5C]/10 text-[#B85C5C]",
};

export default function FinancialsPage() {
  return (
    <div>
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-[28px] font-semibold tracking-tight text-[#2D3436]">
            Financials
          </h1>
          <p className="mt-1 text-[14px] text-[#A8A49E]">
            AI-powered financial insights and forecasting
          </p>
        </div>
        <button className="inline-flex h-10 items-center gap-2 rounded-xl border border-[#D4D2CD] px-5 text-[14px] font-medium text-[#2D3436] transition-colors hover:bg-[#F5F4F0]">
          <Download size={16} strokeWidth={1.75} />
          Export Report
        </button>
      </div>

      {/* Top Stats */}
      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-2xl border border-[#E5E3DE] bg-white p-6"
          >
            <p className="text-[13px] font-medium text-[#A8A49E]">
              {s.label}
            </p>
            <p className="mt-2 text-[32px] font-semibold tracking-tight text-[#2D3436]">
              {s.value}
            </p>
            <div className="mt-1 flex items-center gap-1">
              <ArrowUpRight size={14} strokeWidth={2} className={s.changeColor} />
              <span className={clsx("text-[13px] font-medium", s.changeColor)}>
                {s.change}
              </span>
              <span className="text-[12px] text-[#A8A49E]">vs last month</span>
            </div>
          </div>
        ))}
      </div>

      {/* Revenue Chart */}
      <div className="mt-6 rounded-2xl border border-[#E5E3DE] bg-white p-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-[16px] font-semibold text-[#2D3436]">
            Monthly Revenue
          </h2>
          <span className="text-[13px] text-[#B8B4AE]">Last 6 months</span>
        </div>
        <div className="flex h-52 items-end gap-4">
          {revenueData.map((d, i) => {
            const isCurrentMonth = i === revenueData.length - 1;
            return (
              <div key={d.month} className="flex flex-1 flex-col items-center gap-2">
                <span className="text-[11px] font-medium text-[#A8A49E]">
                  {d.display}
                </span>
                <div className="flex w-full flex-1 items-end justify-center">
                  <div
                    className={clsx(
                      "w-full rounded-lg transition-all",
                      isCurrentMonth ? "bg-[#4A7C6F]" : "bg-[#C5DDD5]"
                    )}
                    style={{ height: `${(d.value / maxRevenue) * 100}%` }}
                  />
                </div>
                <span className="text-[12px] font-medium text-[#B8B4AE]">
                  {d.month}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Two-column: Expense Breakdown + AI Forecast */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Expense Breakdown */}
        <div className="rounded-2xl border border-[#E5E3DE] bg-white p-6">
          <div className="mb-5">
            <h2 className="text-[16px] font-semibold text-[#2D3436]">
              Expense Breakdown
            </h2>
            <p className="mt-0.5 text-[13px] text-[#B8B4AE]">This month</p>
          </div>
          <div className="space-y-5">
            {expenses.map((e) => (
              <div key={e.label}>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-[14px] text-[#2D3436]">{e.label}</span>
                  <span className="text-[14px] font-semibold text-[#2D3436]">
                    {e.amount}
                  </span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-[#F0EFEB]">
                  <div
                    className={clsx("h-full rounded-full", e.color)}
                    style={{ width: `${e.pct}%` }}
                  />
                </div>
                <p className="mt-1 text-[12px] text-[#B8B4AE]">{e.pct}%</p>
              </div>
            ))}
          </div>
        </div>

        {/* AI Financial Forecast */}
        <div className="rounded-2xl border border-[#C5DDD5] bg-white p-6">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#EFF5F2]">
              <Sparkles size={16} strokeWidth={1.75} className="text-[#4A7C6F]" />
            </div>
            <h2 className="text-[16px] font-semibold text-[#2D3436]">
              AI Financial Forecast
            </h2>
          </div>
          <div className="space-y-3">
            {forecasts.map((f, i) => (
              <div
                key={i}
                className="rounded-xl bg-[#F5F4F0] p-4 text-[13px] leading-relaxed text-[#4A4A4A]"
              >
                {f}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="mt-6 overflow-hidden rounded-2xl border border-[#E5E3DE] bg-white">
        <div className="px-6 pt-6 pb-4">
          <h2 className="text-[16px] font-semibold text-[#2D3436]">
            Recent Transactions
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px]">
            <thead>
              <tr className="bg-[#F5F4F0]">
                {["Date", "Description", "Property", "Amount", "Type", "Status"].map(
                  (h) => (
                    <th
                      key={h}
                      className="px-6 py-3 text-left text-[11px] font-medium uppercase tracking-[0.05em] text-[#A8A49E]"
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
                    "transition-colors hover:bg-[#FAFAF7]",
                    i !== transactions.length - 1 &&
                      "border-b border-[#E5E3DE]/60"
                  )}
                >
                  <td className="px-6 py-3.5 text-[13px] text-[#A8A49E]">
                    {t.date}
                  </td>
                  <td className="px-6 py-3.5 text-[13px] font-medium text-[#2D3436]">
                    {t.description}
                  </td>
                  <td className="px-6 py-3.5 text-[13px] text-[#A8A49E]">
                    {t.property}
                  </td>
                  <td
                    className={clsx(
                      "px-6 py-3.5 text-[13px] font-medium",
                      t.type === "Income" ? "text-[#5B9A7D]" : "text-[#B85C5C]"
                    )}
                  >
                    {t.amount}
                  </td>
                  <td className="px-6 py-3.5">
                    <span
                      className={clsx(
                        "inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold",
                        t.type === "Income"
                          ? "bg-[#5B9A7D]/10 text-[#5B9A7D]"
                          : "bg-[#B85C5C]/10 text-[#B85C5C]"
                      )}
                    >
                      {t.type}
                    </span>
                  </td>
                  <td className="px-6 py-3.5">
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
