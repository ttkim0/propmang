"use client";

import { useState } from "react";
import clsx from "clsx";
import {
  User,
  Bot,
  Bell,
  CreditCard,
  Puzzle,
  Camera,
  Save,
  Check,
  ChevronDown,
  Sparkles,
  ExternalLink,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type Tab = "profile" | "ai" | "notifications" | "billing" | "integrations";

interface Integration {
  name: string;
  description: string;
  icon: string;
  connected: boolean;
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const tabs: { key: Tab; label: string; icon: React.ElementType }[] = [
  { key: "profile", label: "Profile", icon: User },
  { key: "ai", label: "AI Configuration", icon: Bot },
  { key: "notifications", label: "Notifications", icon: Bell },
  { key: "billing", label: "Billing", icon: CreditCard },
  { key: "integrations", label: "Integrations", icon: Puzzle },
];

const aiToggles = [
  {
    id: "triage",
    label: "AI Maintenance Triage",
    description: "Automatically categorize and assign requests",
  },
  {
    id: "comms",
    label: "AI Communications",
    description: "Draft tenant responses automatically",
  },
  {
    id: "pricing",
    label: "Smart Rent Pricing",
    description: "Get market-based pricing recommendations",
  },
  {
    id: "forecast",
    label: "Financial Forecasting",
    description: "AI-powered cash flow projections",
  },
  {
    id: "renewal",
    label: "Lease Renewal Predictions",
    description: "Predict renewal likelihood",
  },
  {
    id: "risk",
    label: "Tenant Risk Scoring",
    description: "Proactive risk assessment",
  },
];

const notificationRows = [
  {
    id: "notif-maintenance",
    label: "Maintenance requests",
    desc: "Get notified about new and updated maintenance requests",
  },
  {
    id: "notif-rent",
    label: "Rent payments",
    desc: "Alerts for received payments and overdue notices",
  },
  {
    id: "notif-lease",
    label: "Lease expirations",
    desc: "Reminders for upcoming lease renewals",
  },
  {
    id: "notif-ai",
    label: "AI actions taken",
    desc: "Summary of automated actions performed by AI",
  },
  {
    id: "notif-tenant",
    label: "Tenant messages",
    desc: "New messages from tenants",
  },
];

const integrations: Integration[] = [
  {
    name: "QuickBooks",
    description: "Accounting and financial management",
    icon: "QB",
    connected: true,
  },
  {
    name: "Stripe",
    description: "Online payment processing",
    icon: "ST",
    connected: true,
  },
  {
    name: "Gmail",
    description: "Email communication sync",
    icon: "GM",
    connected: false,
  },
  {
    name: "Zillow",
    description: "Property listing and market data",
    icon: "ZL",
    connected: true,
  },
  {
    name: "DocuSign",
    description: "Digital document signing",
    icon: "DS",
    connected: false,
  },
];

// ---------------------------------------------------------------------------
// Toggle Component
// ---------------------------------------------------------------------------

function Toggle({
  enabled,
  onToggle,
}: {
  enabled: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={clsx(
        "relative inline-flex shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200",
        enabled ? "bg-[#4A7C6F]" : "bg-[#D4D2CD]"
      )}
      style={{ width: 44, height: 24 }}
    >
      <span
        className="pointer-events-none inline-block rounded-full bg-white shadow-sm transition-transform duration-200"
        style={{
          width: 20,
          height: 20,
          transform: enabled ? "translateX(22px)" : "translateX(2px)",
        }}
      />
    </button>
  );
}

// ---------------------------------------------------------------------------
// Shared input classes
// ---------------------------------------------------------------------------

const inputClass =
  "h-10 w-full rounded-xl border border-[#E5E3DE] bg-[#FAFAF7] px-3.5 text-[13px] text-[#2D3436] focus:border-[#4A7C6F]/40 focus:outline-none focus:ring-1 focus:ring-[#4A7C6F]/20";
const labelClass =
  "mb-1.5 block text-[13px] font-medium text-[#9B9790]";

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("profile");
  const [toggleStates, setToggleStates] = useState<Record<string, boolean>>(
    () => ({
      ...Object.fromEntries(aiToggles.map((t) => [t.id, true])),
      "notif-maintenance": true,
      "notif-rent": true,
      "notif-lease": true,
      "notif-ai": false,
      "notif-tenant": true,
    })
  );
  const [aiTone, setAiTone] = useState("Professional");
  const [confidenceThreshold, setConfidenceThreshold] = useState(85);

  const handleToggle = (id: string) =>
    setToggleStates((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <div className="min-h-screen bg-[#FAFAF7]">
      {/* Header */}
      <div>
        <h1 className="text-[28px] font-semibold tracking-tight text-[#2D3436]">
          Settings
        </h1>
        <p className="mt-1 text-[14px] text-[#9B9790]">
          Configure your Arid workspace
        </p>
      </div>

      {/* Tab navigation */}
      <div className="mt-6 flex gap-1 rounded-xl bg-[#F2F1ED] p-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={clsx(
                "flex items-center gap-2 whitespace-nowrap rounded-lg px-4 py-2 text-[13px] font-medium transition-all",
                activeTab === tab.key
                  ? "bg-white text-[#2D3436] shadow-sm"
                  : "text-[#9B9790] hover:text-[#2D3436]"
              )}
            >
              <Icon size={15} strokeWidth={2} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* ================================================================== */}
      {/* Profile Tab                                                        */}
      {/* ================================================================== */}
      {activeTab === "profile" && (
        <div className="mt-6 rounded-2xl border border-[#E5E3DE] bg-white p-8">
          {/* Avatar */}
          <div className="mb-8 flex items-center gap-5">
            <div className="relative">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#1A2332] text-[20px] font-semibold text-white">
                JD
              </div>
              <button className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-[#4A7C6F] text-white shadow-sm transition-colors hover:bg-[#3D6A5E]">
                <Camera size={12} />
              </button>
            </div>
            <div>
              <p className="text-[14px] font-medium text-[#2D3436]">
                Profile Photo
              </p>
              <p className="mt-0.5 text-[12px] text-[#9B9790]">
                JPG, PNG or GIF. 1MB max.
              </p>
            </div>
          </div>

          {/* Fields */}
          <div className="max-w-lg space-y-5">
            <div>
              <label className={labelClass}>Company Name</label>
              <input
                type="text"
                defaultValue="Jordan's Property Management"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Email</label>
              <input
                type="email"
                defaultValue="jordan@example.com"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Phone</label>
              <input
                type="tel"
                defaultValue="(555) 123-4567"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Address</label>
              <input
                type="text"
                defaultValue="100 Main Street, Suite 200"
                className={inputClass}
              />
            </div>
          </div>
        </div>
      )}

      {/* ================================================================== */}
      {/* AI Configuration Tab                                               */}
      {/* ================================================================== */}
      {activeTab === "ai" && (
        <div className="mt-6 rounded-2xl border border-[#E5E3DE] bg-white p-8">
          {/* Toggles */}
          <div className="space-y-5">
            {aiToggles.map((toggle) => (
              <div
                key={toggle.id}
                className="flex items-center justify-between"
              >
                <div className="mr-6">
                  <p className="text-[13px] font-medium text-[#2D3436]">
                    {toggle.label}
                  </p>
                  <p className="mt-0.5 text-[12px] text-[#9B9790]">
                    {toggle.description}
                  </p>
                </div>
                <Toggle
                  enabled={!!toggleStates[toggle.id]}
                  onToggle={() => handleToggle(toggle.id)}
                />
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="my-8 border-t border-[#E5E3DE]" />

          {/* AI Response Tone */}
          <div className="max-w-sm">
            <label className={labelClass}>AI Response Tone</label>
            <div className="relative">
              <select
                value={aiTone}
                onChange={(e) => setAiTone(e.target.value)}
                className={clsx(inputClass, "appearance-none pr-10")}
              >
                <option>Professional</option>
                <option>Friendly</option>
                <option>Formal</option>
              </select>
              <ChevronDown
                size={14}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#9B9790]"
              />
            </div>
          </div>

          {/* Auto-action Confidence */}
          <div className="mt-6 max-w-sm">
            <label className={labelClass}>Auto-action Confidence</label>
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <div className="h-2 w-full rounded-full bg-[#E5E3DE]">
                  <div
                    className="h-2 rounded-full bg-[#4A7C6F] transition-all"
                    style={{ width: `${((confidenceThreshold - 50) / 50) * 100}%` }}
                  />
                </div>
                <input
                  type="range"
                  min="50"
                  max="100"
                  value={confidenceThreshold}
                  onChange={(e) =>
                    setConfidenceThreshold(Number(e.target.value))
                  }
                  className="absolute inset-0 h-2 w-full cursor-pointer opacity-0"
                />
              </div>
              <span className="inline-flex items-center justify-center rounded-full bg-[#EDF3F0] px-3 py-1 text-[13px] font-semibold text-[#4A7C6F]">
                {confidenceThreshold}%
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ================================================================== */}
      {/* Notifications Tab                                                  */}
      {/* ================================================================== */}
      {activeTab === "notifications" && (
        <div className="mt-6 rounded-2xl border border-[#E5E3DE] bg-white p-8">
          <div className="space-y-5">
            {notificationRows.map((n) => (
              <div
                key={n.id}
                className="flex items-center justify-between"
              >
                <div className="mr-6">
                  <p className="text-[13px] font-medium text-[#2D3436]">
                    {n.label}
                  </p>
                  <p className="mt-0.5 text-[12px] text-[#9B9790]">
                    {n.desc}
                  </p>
                </div>
                <Toggle
                  enabled={!!toggleStates[n.id]}
                  onToggle={() => handleToggle(n.id)}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================================================================== */}
      {/* Billing Tab                                                        */}
      {/* ================================================================== */}
      {activeTab === "billing" && (
        <div className="mt-6 rounded-2xl border border-[#E5E3DE] bg-white p-8">
          {/* Plan card */}
          <div className="rounded-2xl border border-[#B8D4C9] bg-[#EDF3F0] p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[11px] font-medium uppercase tracking-wider text-[#4A7C6F]">
                  Current Plan
                </p>
                <p className="mt-1 text-[20px] font-semibold tracking-tight text-[#2D3436]">
                  Professional
                </p>
                <p className="mt-1 text-[14px] text-[#6B6963]">
                  $3.50 / unit / month
                </p>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-[#5B9A7D]/10 px-2.5 py-1 text-[11px] font-semibold text-[#5B9A7D]">
                <Check size={10} />
                Active
              </span>
            </div>

            {/* Usage stats */}
            <div className="mt-5 grid grid-cols-3 gap-4">
              <div>
                <p className="text-[11px] text-[#9B9790]">Units managed</p>
                <p className="mt-0.5 text-[15px] font-semibold text-[#2D3436]">
                  127
                </p>
              </div>
              <div>
                <p className="text-[11px] text-[#9B9790]">Monthly cost</p>
                <p className="mt-0.5 text-[15px] font-semibold text-[#2D3436]">
                  $444.50
                </p>
              </div>
              <div>
                <p className="text-[11px] text-[#9B9790]">Next billing</p>
                <p className="mt-0.5 text-[15px] font-semibold text-[#2D3436]">
                  Apr 28
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <button className="inline-flex items-center gap-2 rounded-xl bg-[#4A7C6F] px-5 py-2.5 text-[13px] font-medium text-white transition-all hover:bg-[#3D6A5E] active:scale-[0.98]">
              Manage Subscription
            </button>
          </div>
        </div>
      )}

      {/* ================================================================== */}
      {/* Integrations Tab                                                   */}
      {/* ================================================================== */}
      {activeTab === "integrations" && (
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {integrations.map((integration) => (
            <div
              key={integration.name}
              className="rounded-2xl bg-[#F7F6F3] p-5"
            >
              {/* Icon */}
              <div
                className={clsx(
                  "mb-4 flex h-10 w-10 items-center justify-center rounded-xl text-[12px] font-bold",
                  integration.connected
                    ? "bg-[#EDF3F0] text-[#4A7C6F]"
                    : "bg-[#E5E3DE] text-[#9B9790]"
                )}
              >
                {integration.icon}
              </div>

              {/* Name + description */}
              <p className="text-[14px] font-medium text-[#2D3436]">
                {integration.name}
              </p>
              <p className="mt-0.5 text-[12px] text-[#9B9790]">
                {integration.description}
              </p>

              {/* Status + button */}
              <div className="mt-4 flex items-center justify-between">
                {integration.connected ? (
                  <>
                    <span className="inline-flex items-center gap-1 rounded-full bg-[#5B9A7D]/10 px-2.5 py-0.5 text-[11px] font-semibold text-[#5B9A7D]">
                      <Check size={10} />
                      Connected
                    </span>
                    <button className="rounded-lg border border-[#E5E3DE] bg-white px-3 py-1.5 text-[12px] font-medium text-[#9B9790] transition-colors hover:text-[#2D3436]">
                      Disconnect
                    </button>
                  </>
                ) : (
                  <>
                    <span className="text-[11px] font-medium text-[#C5C2BC]">
                      Not connected
                    </span>
                    <button className="inline-flex items-center gap-1.5 rounded-lg bg-[#4A7C6F] px-3 py-1.5 text-[12px] font-medium text-white transition-colors hover:bg-[#3D6A5E]">
                      <ExternalLink size={12} />
                      Connect
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Save Changes */}
      <div className="mt-8 flex justify-end">
        <button className="inline-flex items-center gap-2 rounded-xl bg-[#4A7C6F] px-6 py-2.5 text-[13px] font-medium text-white transition-all hover:bg-[#3D6A5E] active:scale-[0.98]">
          <Save size={15} />
          Save Changes
        </button>
      </div>
    </div>
  );
}
