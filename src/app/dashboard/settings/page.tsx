"use client";

import { useState } from "react";
import clsx from "clsx";
import {
  Settings,
  User,
  Bot,
  Bell,
  CreditCard,
  Puzzle,
  Camera,
  Save,
  Check,
  X,
  ChevronDown,
  Sparkles,
  ShieldCheck,
  Link2,
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
    label: "AI Auto-triage maintenance requests",
    description: "Automatically categorize and prioritize incoming maintenance requests",
    defaultOn: true,
  },
  {
    id: "draft",
    label: "AI Draft tenant communications",
    description: "Generate suggested replies for tenant messages",
    defaultOn: true,
  },
  {
    id: "pricing",
    label: "AI Rent pricing suggestions",
    description: "Get market-based rent pricing recommendations",
    defaultOn: true,
  },
  {
    id: "forecast",
    label: "AI Financial forecasting",
    description: "Predictive analytics for revenue and expenses",
    defaultOn: true,
  },
  {
    id: "renewal",
    label: "AI Lease renewal predictions",
    description: "Predict likelihood of tenant lease renewals",
    defaultOn: true,
  },
  {
    id: "risk",
    label: "AI Tenant risk scoring",
    description: "Assess tenant reliability based on historical data",
    defaultOn: true,
  },
];

const integrations: Integration[] = [
  { name: "QuickBooks", description: "Accounting and financial management", icon: "QB", connected: true },
  { name: "Stripe", description: "Online payment processing", icon: "ST", connected: true },
  { name: "Gmail", description: "Email communication sync", icon: "GM", connected: false },
  { name: "Zillow", description: "Property listing and market data", icon: "ZL", connected: true },
  { name: "DocuSign", description: "Digital document signing", icon: "DS", connected: false },
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
        "relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:ring-offset-2 focus:ring-offset-background",
        enabled ? "bg-brand-500" : "bg-foreground/15"
      )}
    >
      <span
        className={clsx(
          "pointer-events-none inline-block h-4.5 w-4.5 rounded-full bg-white shadow-sm ring-0 transition-transform duration-200",
          enabled ? "translate-x-[22px]" : "translate-x-[3px]"
        )}
        style={{ height: 18, width: 18 }}
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
    () =>
      Object.fromEntries(aiToggles.map((t) => [t.id, t.defaultOn]))
  );
  const [aiTone, setAiTone] = useState("Professional");
  const [confidenceThreshold, setConfidenceThreshold] = useState(85);

  const handleToggle = (id: string) =>
    setToggleStates((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <div className="animate-fade-in space-y-6">
      {/* ---------------------------------------------------------------- */}
      {/* Header                                                           */}
      {/* ---------------------------------------------------------------- */}
      <div>
        <h1 className="text-[22px] font-semibold tracking-[-0.015em] text-foreground">
          Settings
        </h1>
        <p className="mt-1 text-[13px] text-muted">
          Configure your Arid workspace
        </p>
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* Tab navigation                                                   */}
      {/* ---------------------------------------------------------------- */}
      <div className="flex gap-1 overflow-x-auto rounded-xl border border-card-border bg-card-bg p-1.5 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={clsx(
                "flex items-center gap-2 whitespace-nowrap rounded-lg px-4 py-2 text-[13px] font-medium transition-all",
                activeTab === tab.key
                  ? "bg-brand-500 text-white shadow-sm"
                  : "text-muted hover:bg-foreground/5 hover:text-foreground"
              )}
            >
              <Icon size={15} strokeWidth={2} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* Profile Section                                                  */}
      {/* ---------------------------------------------------------------- */}
      {activeTab === "profile" && (
        <div className="rounded-xl border border-card-border bg-card-bg p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
          <div className="mb-6 flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-50">
              <User size={14} className="text-brand-600" />
            </div>
            <h2 className="text-[15px] font-semibold text-foreground">
              Profile Information
            </h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-[200px_1fr]">
            {/* Avatar */}
            <div className="flex flex-col items-center gap-3">
              <div className="relative flex h-28 w-28 items-center justify-center rounded-full bg-brand-100 text-brand-600">
                <span className="text-[32px] font-semibold tracking-tight">JD</span>
                <button className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full border-2 border-card-bg bg-brand-500 text-white shadow-sm transition-colors hover:bg-brand-600">
                  <Camera size={14} />
                </button>
              </div>
              <span className="text-[11px] text-muted">Upload photo</span>
            </div>

            {/* Form fields */}
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-[12px] font-medium uppercase tracking-wide text-muted">
                  Company Name
                </label>
                <input
                  type="text"
                  defaultValue="Jordan's Property Management"
                  className="h-10 w-full rounded-lg border border-card-border bg-background px-3.5 text-[13px] text-foreground focus:border-brand-500/40 focus:outline-none focus:ring-2 focus:ring-brand-500/15"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-[12px] font-medium uppercase tracking-wide text-muted">
                  Email Address
                </label>
                <input
                  type="email"
                  defaultValue="jordan@example.com"
                  className="h-10 w-full rounded-lg border border-card-border bg-background px-3.5 text-[13px] text-foreground focus:border-brand-500/40 focus:outline-none focus:ring-2 focus:ring-brand-500/15"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-[12px] font-medium uppercase tracking-wide text-muted">
                  Phone Number
                </label>
                <input
                  type="tel"
                  defaultValue="(555) 123-4567"
                  className="h-10 w-full rounded-lg border border-card-border bg-background px-3.5 text-[13px] text-foreground focus:border-brand-500/40 focus:outline-none focus:ring-2 focus:ring-brand-500/15"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-[12px] font-medium uppercase tracking-wide text-muted">
                  Business Address
                </label>
                <input
                  type="text"
                  defaultValue="100 Main Street, Suite 200"
                  className="h-10 w-full rounded-lg border border-card-border bg-background px-3.5 text-[13px] text-foreground focus:border-brand-500/40 focus:outline-none focus:ring-2 focus:ring-brand-500/15"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------------------- */}
      {/* AI Configuration Section                                         */}
      {/* ---------------------------------------------------------------- */}
      {activeTab === "ai" && (
        <div className="space-y-6">
          {/* AI Feature Toggles */}
          <div className="rounded-xl border border-card-border bg-card-bg p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
            <div className="mb-6 flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-50">
                <Sparkles size={14} className="text-brand-600" />
              </div>
              <h2 className="text-[15px] font-semibold text-foreground">
                AI Features
              </h2>
            </div>

            <div className="divide-y divide-card-border/60">
              {aiToggles.map((toggle) => (
                <div
                  key={toggle.id}
                  className="flex items-center justify-between py-4 first:pt-0 last:pb-0"
                >
                  <div className="mr-4">
                    <p className="text-[13px] font-medium text-foreground">
                      {toggle.label}
                    </p>
                    <p className="mt-0.5 text-[12px] text-muted">
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
          </div>

          {/* AI Response Tone & Confidence */}
          <div className="rounded-xl border border-card-border bg-card-bg p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
            <div className="mb-6 flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-50">
                <ShieldCheck size={14} className="text-brand-600" />
              </div>
              <h2 className="text-[15px] font-semibold text-foreground">
                AI Behavior
              </h2>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              {/* Tone dropdown */}
              <div>
                <label className="mb-1.5 block text-[12px] font-medium uppercase tracking-wide text-muted">
                  AI Response Tone
                </label>
                <div className="relative">
                  <select
                    value={aiTone}
                    onChange={(e) => setAiTone(e.target.value)}
                    className="h-10 w-full appearance-none rounded-lg border border-card-border bg-background px-3.5 pr-10 text-[13px] text-foreground focus:border-brand-500/40 focus:outline-none focus:ring-2 focus:ring-brand-500/15"
                  >
                    <option>Professional</option>
                    <option>Friendly</option>
                    <option>Formal</option>
                  </select>
                  <ChevronDown
                    size={14}
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted"
                  />
                </div>
                <p className="mt-1.5 text-[11px] text-muted">
                  Controls the tone of AI-generated communications
                </p>
              </div>

              {/* Confidence threshold slider */}
              <div>
                <label className="mb-1.5 block text-[12px] font-medium uppercase tracking-wide text-muted">
                  Confidence Threshold for Auto-actions
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="50"
                    max="100"
                    value={confidenceThreshold}
                    onChange={(e) =>
                      setConfidenceThreshold(Number(e.target.value))
                    }
                    className="h-2 flex-1 cursor-pointer appearance-none rounded-full bg-foreground/10 accent-brand-500 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-brand-500 [&::-webkit-slider-thumb]:shadow-sm"
                  />
                  <span className="flex h-8 min-w-[48px] items-center justify-center rounded-lg bg-brand-50 text-[13px] font-semibold text-brand-700">
                    {confidenceThreshold}%
                  </span>
                </div>
                <p className="mt-1.5 text-[11px] text-muted">
                  AI will only take automatic actions when confidence exceeds
                  this threshold
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------------------- */}
      {/* Notifications Section                                            */}
      {/* ---------------------------------------------------------------- */}
      {activeTab === "notifications" && (
        <div className="rounded-xl border border-card-border bg-card-bg p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
          <div className="mb-6 flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-50">
              <Bell size={14} className="text-brand-600" />
            </div>
            <h2 className="text-[15px] font-semibold text-foreground">
              Notification Preferences
            </h2>
          </div>
          <div className="divide-y divide-card-border/60">
            {[
              { id: "notif-maintenance", label: "Maintenance requests", desc: "Get notified about new and updated maintenance requests" },
              { id: "notif-rent", label: "Rent payments", desc: "Alerts for received payments and overdue notices" },
              { id: "notif-lease", label: "Lease expirations", desc: "Reminders for upcoming lease renewals" },
              { id: "notif-ai", label: "AI actions taken", desc: "Summary of automated actions performed by AI" },
              { id: "notif-tenant", label: "Tenant messages", desc: "New messages from tenants" },
            ].map((n) => (
              <div
                key={n.id}
                className="flex items-center justify-between py-4 first:pt-0 last:pb-0"
              >
                <div className="mr-4">
                  <p className="text-[13px] font-medium text-foreground">
                    {n.label}
                  </p>
                  <p className="mt-0.5 text-[12px] text-muted">{n.desc}</p>
                </div>
                <Toggle
                  enabled={toggleStates[n.id] ?? n.id !== "notif-ai"}
                  onToggle={() => handleToggle(n.id)}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ---------------------------------------------------------------- */}
      {/* Billing Section                                                  */}
      {/* ---------------------------------------------------------------- */}
      {activeTab === "billing" && (
        <div className="rounded-xl border border-card-border bg-card-bg p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
          <div className="mb-6 flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-50">
              <CreditCard size={14} className="text-brand-600" />
            </div>
            <h2 className="text-[15px] font-semibold text-foreground">
              Billing & Subscription
            </h2>
          </div>
          <div className="rounded-lg border border-brand-200 bg-brand-50/40 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[14px] font-semibold text-foreground">
                  Arid Pro Plan
                </p>
                <p className="mt-0.5 text-[12px] text-muted">
                  $49/month &middot; Billed monthly &middot; Renews Apr 28, 2026
                </p>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-success/10 px-2.5 py-0.5 text-[11px] font-semibold text-success ring-1 ring-success/20">
                <Check size={10} />
                Active
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------------------- */}
      {/* Integrations Section                                             */}
      {/* ---------------------------------------------------------------- */}
      {activeTab === "integrations" && (
        <div className="rounded-xl border border-card-border bg-card-bg p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
          <div className="mb-6 flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-50">
              <Link2 size={14} className="text-brand-600" />
            </div>
            <h2 className="text-[15px] font-semibold text-foreground">
              Integrations
            </h2>
            <span className="text-[12px] text-muted">
              &middot; {integrations.filter((i) => i.connected).length} of{" "}
              {integrations.length} connected
            </span>
          </div>

          <div className="divide-y divide-card-border/60">
            {integrations.map((integration) => (
              <div
                key={integration.name}
                className="flex items-center justify-between py-4 first:pt-0 last:pb-0"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={clsx(
                      "flex h-10 w-10 items-center justify-center rounded-lg text-[12px] font-bold",
                      integration.connected
                        ? "bg-brand-50 text-brand-600"
                        : "bg-foreground/5 text-muted"
                    )}
                  >
                    {integration.icon}
                  </div>
                  <div>
                    <p className="text-[13px] font-medium text-foreground">
                      {integration.name}
                    </p>
                    <p className="mt-0.5 text-[12px] text-muted">
                      {integration.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {integration.connected ? (
                    <>
                      <span className="inline-flex items-center gap-1 rounded-full bg-success/10 px-2.5 py-0.5 text-[11px] font-semibold text-success ring-1 ring-success/20">
                        <Check size={10} />
                        Connected
                      </span>
                      <button className="inline-flex items-center gap-1.5 rounded-lg border border-card-border bg-card-bg px-3 py-1.5 text-[12px] font-medium text-muted transition-all hover:bg-foreground/5 hover:text-foreground active:scale-[0.98]">
                        Disconnect
                      </button>
                    </>
                  ) : (
                    <button className="inline-flex items-center gap-1.5 rounded-lg bg-brand-500 px-3 py-1.5 text-[12px] font-medium text-white shadow-sm transition-all hover:bg-brand-600 hover:shadow active:scale-[0.98]">
                      <ExternalLink size={12} />
                      Connect
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ---------------------------------------------------------------- */}
      {/* Save Button                                                      */}
      {/* ---------------------------------------------------------------- */}
      <div className="flex justify-end">
        <button className="inline-flex h-10 items-center gap-2 rounded-lg bg-brand-500 px-6 text-[13px] font-semibold text-white shadow-sm transition-all hover:bg-brand-600 hover:shadow active:scale-[0.98]">
          <Save size={15} strokeWidth={2} />
          Save Changes
        </button>
      </div>
    </div>
  );
}
