"use client";

import { useState } from "react";
import clsx from "clsx";
import {
  User,
  Bot,
  Bell,
  CreditCard,
  Puzzle,
  Check,
  ChevronDown,
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
  { key: "ai", label: "AI", icon: Bot },
  { key: "notifications", label: "Notifications", icon: Bell },
  { key: "billing", label: "Billing", icon: CreditCard },
  { key: "integrations", label: "Integrations", icon: Puzzle },
];

const aiToggles = [
  {
    id: "triage",
    label: "Maintenance Triage",
    description: "Automatically categorize and prioritize maintenance requests",
  },
  {
    id: "comms",
    label: "Communications",
    description: "Draft tenant responses and manage correspondence",
  },
  {
    id: "pricing",
    label: "Rent Pricing",
    description: "Market-based pricing recommendations for your units",
  },
  {
    id: "forecast",
    label: "Forecasting",
    description: "AI-powered cash flow and revenue projections",
  },
  {
    id: "renewal",
    label: "Lease Predictions",
    description: "Predict tenant renewal likelihood and timing",
  },
  {
    id: "risk",
    label: "Risk Scoring",
    description: "Proactive tenant risk assessment and alerts",
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
    name: "DocuSign",
    description: "Digital document signing",
    icon: "DS",
    connected: false,
  },
  {
    name: "Zillow",
    description: "Property listing and market data",
    icon: "ZL",
    connected: true,
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
        "relative inline-flex h-[22px] w-[40px] shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200",
        enabled ? "bg-accent" : "bg-border",
      )}
    >
      <span
        className="pointer-events-none inline-block h-[18px] w-[18px] rounded-full bg-white transition-transform duration-200"
        style={{
          transform: enabled ? "translateX(20px)" : "translateX(2px)",
        }}
      />
    </button>
  );
}

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
    }),
  );
  const [aiTone, setAiTone] = useState("Professional");

  const handleToggle = (id: string) =>
    setToggleStates((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <div>
        <h1 className="font-serif text-[32px] leading-tight text-text-primary">
          Settings
        </h1>
        <p className="mt-1.5 text-[14px] text-text-secondary">
          Configure your workspace
        </p>
      </div>

      {/* Tab navigation */}
      <div className="mt-8 flex gap-1 rounded-full bg-cream-dark p-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={clsx(
                "flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-2 text-[13px] font-medium transition-all",
                activeTab === tab.key
                  ? "bg-white text-text-primary shadow-sm"
                  : "text-text-tertiary hover:text-text-secondary",
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
        <div className="mt-8 rounded-[20px] border border-border bg-white p-8">
          {/* Avatar */}
          <div className="mb-8 flex items-center gap-5">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent font-serif text-[20px] text-text-inverse">
              JD
            </div>
            <div>
              <p className="text-[14px] font-medium text-text-primary">
                Profile Photo
              </p>
              <p className="mt-0.5 text-[12px] text-text-tertiary">
                JPG, PNG or GIF. 1MB max.
              </p>
            </div>
          </div>

          {/* Fields */}
          <div className="max-w-md space-y-5">
            <div>
              <label className="mb-1.5 block text-[12px] uppercase tracking-wide text-text-tertiary">
                Company Name
              </label>
              <input
                type="text"
                defaultValue="Jordan's Property Management"
                className="h-10 w-full rounded-full border border-border bg-cream px-4 text-[13px] text-text-primary focus:border-accent/40 focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-[12px] uppercase tracking-wide text-text-tertiary">
                Email
              </label>
              <input
                type="email"
                defaultValue="jordan@example.com"
                className="h-10 w-full rounded-full border border-border bg-cream px-4 text-[13px] text-text-primary focus:border-accent/40 focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-[12px] uppercase tracking-wide text-text-tertiary">
                Phone
              </label>
              <input
                type="tel"
                defaultValue="(555) 123-4567"
                className="h-10 w-full rounded-full border border-border bg-cream px-4 text-[13px] text-text-primary focus:border-accent/40 focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-[12px] uppercase tracking-wide text-text-tertiary">
                Address
              </label>
              <input
                type="text"
                defaultValue="100 Main Street, Suite 200"
                className="h-10 w-full rounded-full border border-border bg-cream px-4 text-[13px] text-text-primary focus:border-accent/40 focus:outline-none"
              />
            </div>
          </div>
        </div>
      )}

      {/* ================================================================== */}
      {/* AI Configuration Tab                                               */}
      {/* ================================================================== */}
      {activeTab === "ai" && (
        <div className="mt-8 rounded-[20px] border border-border bg-white p-8">
          {/* Toggles */}
          <div className="space-y-5">
            {aiToggles.map((toggle) => (
              <div
                key={toggle.id}
                className="flex items-center justify-between"
              >
                <div className="mr-6">
                  <p className="text-[14px] font-medium text-text-primary">
                    {toggle.label}
                  </p>
                  <p className="mt-0.5 text-[12px] text-text-tertiary">
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
          <div className="my-8 border-t border-border" />

          {/* AI Response Tone */}
          <div className="max-w-sm">
            <label className="mb-1.5 block text-[12px] uppercase tracking-wide text-text-tertiary">
              AI Response Tone
            </label>
            <div className="relative">
              <select
                value={aiTone}
                onChange={(e) => setAiTone(e.target.value)}
                className="h-10 w-full appearance-none rounded-full border border-border bg-cream px-4 pr-10 text-[13px] text-text-primary focus:border-accent/40 focus:outline-none"
              >
                <option>Professional</option>
                <option>Friendly</option>
                <option>Formal</option>
              </select>
              <ChevronDown
                size={14}
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-text-tertiary"
              />
            </div>
          </div>

          {/* Confidence threshold */}
          <div className="mt-6 flex items-center gap-3">
            <label className="text-[12px] uppercase tracking-wide text-text-tertiary">
              Auto-action Confidence
            </label>
            <span className="rounded-full bg-accent px-3 py-1 text-[12px] font-medium text-text-inverse">
              85%
            </span>
          </div>
        </div>
      )}

      {/* ================================================================== */}
      {/* Notifications Tab                                                  */}
      {/* ================================================================== */}
      {activeTab === "notifications" && (
        <div className="mt-8 rounded-[20px] border border-border bg-white p-8">
          <div className="space-y-5">
            {notificationRows.map((n) => (
              <div
                key={n.id}
                className="flex items-center justify-between"
              >
                <div className="mr-6">
                  <p className="text-[14px] font-medium text-text-primary">
                    {n.label}
                  </p>
                  <p className="mt-0.5 text-[12px] text-text-tertiary">
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
        <div className="mt-8 rounded-[20px] border border-border bg-white p-8">
          {/* Plan card */}
          <div className="rounded-2xl border border-sage bg-sage-light p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[11px] font-medium uppercase tracking-wider text-sage-dark">
                  Current Plan
                </p>
                <p className="mt-1 font-serif text-[22px] text-text-primary">
                  Professional
                </p>
                <p className="mt-1 text-[14px] text-text-secondary">
                  $3.50 / unit / month
                </p>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-success-light px-2.5 py-1 text-[11px] font-semibold text-success">
                <Check size={10} />
                Active
              </span>
            </div>

            {/* Usage stats */}
            <div className="mt-5 grid grid-cols-3 gap-4">
              <div>
                <p className="text-[11px] text-text-tertiary">Units managed</p>
                <p className="mt-0.5 text-[15px] font-semibold text-text-primary">
                  127
                </p>
              </div>
              <div>
                <p className="text-[11px] text-text-tertiary">Monthly cost</p>
                <p className="mt-0.5 text-[15px] font-semibold text-text-primary">
                  $444.50
                </p>
              </div>
              <div>
                <p className="text-[11px] text-text-tertiary">Next billing</p>
                <p className="mt-0.5 text-[15px] font-semibold text-text-primary">
                  Apr 28
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <button className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-[13px] font-medium text-text-inverse transition-opacity hover:opacity-90">
              Manage Subscription
            </button>
          </div>
        </div>
      )}

      {/* ================================================================== */}
      {/* Integrations Tab                                                   */}
      {/* ================================================================== */}
      {activeTab === "integrations" && (
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {integrations.map((integration) => (
            <div
              key={integration.name}
              className="rounded-2xl bg-cream-dark p-5"
            >
              {/* Icon */}
              <div
                className={clsx(
                  "mb-4 flex h-10 w-10 items-center justify-center rounded-full text-[12px] font-bold",
                  integration.connected
                    ? "bg-sage-light text-sage-dark"
                    : "bg-cream-deeper text-text-tertiary",
                )}
              >
                {integration.icon}
              </div>

              {/* Name + description */}
              <p className="text-[14px] font-medium text-text-primary">
                {integration.name}
              </p>
              <p className="mt-0.5 text-[12px] text-text-tertiary">
                {integration.description}
              </p>

              {/* Status + button */}
              <div className="mt-4 flex items-center justify-between">
                {integration.connected ? (
                  <>
                    <span className="inline-flex items-center gap-1 rounded-full bg-success-light px-2.5 py-0.5 text-[11px] font-semibold text-success">
                      <Check size={10} />
                      Connected
                    </span>
                    <button className="rounded-full border border-border bg-white px-3 py-1.5 text-[12px] font-medium text-text-tertiary transition-colors hover:text-text-primary">
                      Disconnect
                    </button>
                  </>
                ) : (
                  <>
                    <span className="text-[11px] font-medium text-text-tertiary">
                      Not connected
                    </span>
                    <button className="inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1.5 text-[12px] font-medium text-text-inverse transition-opacity hover:opacity-90">
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
      <div className="mt-6 flex justify-end">
        <button className="rounded-full bg-accent px-6 py-2.5 text-[13px] font-medium text-text-inverse transition-opacity hover:opacity-90">
          Save Changes
        </button>
      </div>
    </div>
  );
}
