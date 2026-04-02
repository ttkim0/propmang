"use client";

import Link from "next/link";
import {
  Wrench,
  DollarSign,
  FileText,
  TrendingUp,
  Shield,
  MessageSquare,
  ArrowRight,
  Play,
  Check,
  Building2,
  Brain,
  Zap,
} from "lucide-react";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "About", href: "#about" },
];

const FEATURES = [
  {
    icon: Wrench,
    title: "AI Maintenance Triage",
    description:
      "Automatically categorize, prioritize, and assign maintenance requests. Reduce resolution time by 40%.",
  },
  {
    icon: DollarSign,
    title: "Smart Rent Pricing",
    description:
      "AI analyzes market data to recommend optimal rent prices. Never leave money on the table.",
  },
  {
    icon: FileText,
    title: "Lease Intelligence",
    description:
      "Predict renewal likelihood, automate offers, and reduce vacancy with AI-powered insights.",
  },
  {
    icon: TrendingUp,
    title: "Financial Forecasting",
    description:
      "AI projects cash flow, flags budget anomalies, and optimizes your NOI.",
  },
  {
    icon: Shield,
    title: "Tenant Risk Scoring",
    description:
      "Proactive risk assessment helps you prevent issues before they escalate.",
  },
  {
    icon: MessageSquare,
    title: "AI Communications",
    description:
      "Draft responses, send reminders, and maintain professional communication automatically.",
  },
];

const STEPS = [
  {
    icon: Building2,
    number: "01",
    title: "Connect your properties",
    description:
      "Import your portfolio in minutes. Arid syncs with your existing tools.",
  },
  {
    icon: Brain,
    number: "02",
    title: "AI learns your business",
    description:
      "Our AI analyzes your data to understand patterns, preferences, and priorities.",
  },
  {
    icon: Zap,
    number: "03",
    title: "Sit back and manage smarter",
    description:
      "Get AI insights, automated workflows, and predictive analytics from day one.",
  },
];

const PRICING_TIERS = [
  {
    name: "Starter",
    price: "$2",
    unit: "/unit/mo",
    minimum: "min $29/mo",
    description: "For small portfolios getting started with AI.",
    features: [
      "Up to 50 units",
      "AI maintenance triage",
      "Online rent collection",
      "Tenant portal",
      "Basic reporting",
    ],
    popular: false,
  },
  {
    name: "Professional",
    price: "$3.50",
    unit: "/unit/mo",
    minimum: "min $99/mo",
    description: "For growing teams that need the full AI suite.",
    features: [
      "Up to 500 units",
      "Everything in Starter",
      "AI communications",
      "Financial forecasting",
      "Lease intelligence",
      "Priority support",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    unit: "",
    minimum: "Let\u2019s talk",
    description: "For large operators with custom requirements.",
    features: [
      "Unlimited units",
      "Everything in Professional",
      "Custom AI models",
      "API access",
      "Dedicated success manager",
      "SLA guarantee",
    ],
    popular: false,
  },
];

const FOOTER_LINKS = {
  Product: [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "Integrations", href: "#" },
    { label: "API", href: "#" },
  ],
  Company: [
    { label: "About", href: "#about" },
    { label: "Blog", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Contact", href: "#" },
  ],
  Legal: [
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
    { label: "Security", href: "#" },
  ],
};

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-card-border bg-white/80 backdrop-blur-lg">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-10">
            <Link href="/" className="text-xl font-bold tracking-tight text-foreground">
              Arid
            </Link>
            <div className="hidden items-center gap-8 md:flex">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm font-medium text-muted transition-colors hover:text-foreground"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="hidden text-sm font-medium text-muted transition-colors hover:text-foreground sm:block"
            >
              Sign In
            </Link>
            <Link
              href="/dashboard"
              className="rounded-lg bg-brand-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-600"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden px-6 pb-16 pt-20 sm:pt-28 lg:pt-32">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <div className="animate-fade-in mb-6 inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-4 py-1.5 text-sm font-medium text-brand-700">
              AI-Native Property Management
            </div>
            <h1 className="animate-fade-in stagger-1 text-5xl font-bold leading-[1.08] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              Property management,
              <br />
              intelligently automated.
            </h1>
            <p className="animate-fade-in stagger-2 mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
              Arid uses AI to automate maintenance triage, optimize rent pricing,
              predict lease renewals, and give you back the hours you spend on
              repetitive tasks.
            </p>
            <div className="animate-fade-in stagger-3 mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 rounded-lg bg-brand-500 px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-brand-600"
              >
                Start Free Trial
                <ArrowRight className="h-4 w-4" />
              </Link>
              <button className="inline-flex items-center gap-2 rounded-lg border border-card-border bg-white px-6 py-3 text-base font-semibold text-foreground transition-colors hover:bg-gray-50">
                <Play className="h-4 w-4" />
                Watch Demo
              </button>
            </div>
          </div>

          {/* Dashboard Preview Mockup */}
          <div className="animate-fade-in stagger-4 mx-auto mt-16 max-w-5xl sm:mt-20">
            <div
              className="rounded-2xl border border-card-border bg-white p-6 shadow-2xl shadow-black/5 sm:p-8"
              style={{ transform: "perspective(2000px) rotateX(3deg)" }}
            >
              {/* Mockup top bar */}
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-3 w-3 rounded-full bg-danger/40" />
                  <div className="h-3 w-3 rounded-full bg-warning/40" />
                  <div className="h-3 w-3 rounded-full bg-success/40" />
                </div>
                <div className="h-4 w-48 rounded bg-gray-100" />
                <div className="h-4 w-16 rounded bg-gray-100" />
              </div>

              {/* Metrics cards row */}
              <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {[
                  { label: "Total Units", value: "1,247" },
                  { label: "Occupancy", value: "96.8%" },
                  { label: "Revenue", value: "$2.4M" },
                  { label: "Work Orders", value: "23" },
                ].map((metric) => (
                  <div
                    key={metric.label}
                    className="rounded-lg border border-card-border bg-gray-50/50 p-4"
                  >
                    <div className="mb-1 text-xs text-muted">{metric.label}</div>
                    <div className="text-lg font-bold text-foreground">
                      {metric.value}
                    </div>
                  </div>
                ))}
              </div>

              {/* Chart outline */}
              <div className="rounded-lg border border-card-border bg-gray-50/30 p-6">
                <div className="mb-4 flex items-center justify-between">
                  <div className="h-3 w-28 rounded bg-gray-200" />
                  <div className="flex gap-2">
                    <div className="h-6 w-14 rounded bg-gray-100" />
                    <div className="h-6 w-14 rounded bg-gray-100" />
                  </div>
                </div>
                <div className="flex h-36 items-end gap-2 sm:h-44">
                  {[40, 55, 45, 65, 50, 70, 60, 75, 65, 80, 70, 85].map(
                    (h, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-t bg-brand-200/60"
                        style={{ height: `${h}%` }}
                      />
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="border-y border-card-border bg-white px-6 py-14">
        <div className="mx-auto max-w-7xl">
          <p className="mb-8 text-center text-sm font-medium tracking-wide text-muted">
            Trusted by 2,400+ property managers across the country
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4">
            {[
              "AppFolio Alternative",
              "Buildium Alternative",
              "RentManager",
              "Yardi",
              "Entrata",
            ].map((name) => (
              <div
                key={name}
                className="flex h-8 items-center rounded bg-gray-100 px-5"
              >
                <span className="text-xs font-medium tracking-wide text-gray-400">
                  {name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="px-6 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-3 text-sm font-semibold tracking-wide text-brand-500">
              Features
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Everything you need to manage smarter
            </h2>
            <p className="mt-4 text-lg text-muted">
              AI-powered tools that handle the complexity so you can focus on
              growing your portfolio.
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className={`animate-fade-in stagger-${i + 1} rounded-xl border border-card-border bg-white p-6 transition-shadow hover:shadow-md`}
                >
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50">
                    <Icon className="h-5 w-5 text-brand-500" />
                  </div>
                  <h3 className="mb-2 text-base font-semibold text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white px-6 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-3 text-sm font-semibold tracking-wide text-brand-500">
              How it works
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Up and running in three steps
            </h2>
          </div>
          <div className="mx-auto mt-16 grid max-w-5xl gap-8 sm:grid-cols-3">
            {STEPS.map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.number} className="relative text-center">
                  <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-card-border bg-background">
                    <Icon className="h-6 w-6 text-brand-500" />
                  </div>
                  <span className="mb-2 block text-xs font-bold tracking-widest text-brand-400">
                    STEP {step.number}
                  </span>
                  <h3 className="mb-2 text-lg font-semibold text-foreground">
                    {step.title}
                  </h3>
                  <p className="mx-auto max-w-xs text-sm leading-relaxed text-muted">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="px-6 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-3 text-sm font-semibold tracking-wide text-brand-500">
              Pricing
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Simple, transparent pricing
            </h2>
            <p className="mt-4 text-lg text-muted">
              Start free for 14 days. No credit card required.
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-5xl gap-6 lg:grid-cols-3">
            {PRICING_TIERS.map((tier) => (
              <div
                key={tier.name}
                className={`relative flex flex-col rounded-xl border p-8 ${
                  tier.popular
                    ? "border-brand-500 bg-white shadow-lg shadow-brand-500/5"
                    : "border-card-border bg-white"
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-500 px-3 py-0.5 text-xs font-semibold text-white">
                    Popular
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-foreground">
                    {tier.name}
                  </h3>
                  <div className="mt-3 flex items-baseline gap-1">
                    <span className="text-4xl font-bold tracking-tight text-foreground">
                      {tier.price}
                    </span>
                    {tier.unit && (
                      <span className="text-sm text-muted">{tier.unit}</span>
                    )}
                  </div>
                  <p className="mt-1 text-xs text-muted">{tier.minimum}</p>
                  <p className="mt-3 text-sm text-muted">{tier.description}</p>
                </div>
                <ul className="mb-8 flex flex-1 flex-col gap-3">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
                      <span className="text-sm text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/dashboard"
                  className={`block rounded-lg py-2.5 text-center text-sm font-semibold transition-colors ${
                    tier.popular
                      ? "bg-brand-500 text-white hover:bg-brand-600"
                      : "border border-card-border bg-white text-foreground hover:bg-gray-50"
                  }`}
                >
                  {tier.name === "Enterprise" ? "Contact Sales" : "Get Started"}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white px-6 py-24 sm:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Ready to manage smarter?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted">
            Join 2,400+ property managers who&apos;ve automated their workflow
            with Arid.
          </p>
          <div className="mt-10">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 rounded-lg bg-brand-500 px-8 py-3.5 text-base font-semibold text-white transition-colors hover:bg-brand-600"
            >
              Start Your Free Trial
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="about" className="border-t border-card-border px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <Link
                href="/"
                className="text-xl font-bold tracking-tight text-foreground"
              >
                Arid
              </Link>
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">
                AI-native property management. Built to automate the tedious so
                you can focus on what matters.
              </p>
            </div>
            {Object.entries(FOOTER_LINKS).map(([category, links]) => (
              <div key={category}>
                <h4 className="mb-4 text-sm font-semibold text-foreground">
                  {category}
                </h4>
                <ul className="flex flex-col gap-2.5">
                  {links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-sm text-muted transition-colors hover:text-foreground"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-14 border-t border-card-border pt-8">
            <p className="text-xs text-muted">
              &copy; {new Date().getFullYear()} Arid, Inc. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
