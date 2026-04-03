"use client";

import Link from "next/link";
import {
  Wrench,
  DollarSign,
  FileText,
  TrendingUp,
  Users,
  MessageSquare,
  Check,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

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
      "Requests are automatically categorized, prioritized, and routed to the right vendor. Resolution times drop by 40% on average.",
  },
  {
    icon: DollarSign,
    title: "Smart Rent Optimization",
    description:
      "Market-aware pricing recommendations ensure every unit is priced competitively. Stop leaving revenue on the table.",
  },
  {
    icon: FileText,
    title: "Lease Intelligence",
    description:
      "Predict renewal likelihood months in advance. Automate offers and reduce vacancy with data-driven insights.",
  },
  {
    icon: TrendingUp,
    title: "Financial Clarity",
    description:
      "Real-time cash flow projections, budget anomaly detection, and NOI optimization. Your books, finally making sense.",
  },
  {
    icon: Users,
    title: "Tenant Insights",
    description:
      "Proactive risk assessment and satisfaction tracking. Address concerns before they become problems.",
  },
  {
    icon: MessageSquare,
    title: "AI Communications",
    description:
      "Professional, context-aware responses drafted automatically. Maintain quality communication at scale.",
  },
];

const STEPS = [
  {
    number: "1",
    title: "Import your portfolio",
    description:
      "Connect your existing tools or add properties manually. Arid adapts to your workflow.",
  },
  {
    number: "2",
    title: "AI learns your patterns",
    description:
      "Our models analyze your data to understand your properties, tenants, and operational rhythms.",
  },
  {
    number: "3",
    title: "Manage with confidence",
    description:
      "Actionable insights, automated workflows, and predictive analytics from day one.",
  },
];

const PRICING_TIERS = [
  {
    name: "Starter",
    price: "$2",
    unit: "/unit/mo",
    minimum: "Starting at $29/mo",
    features: [
      "Up to 50 units",
      "AI maintenance triage",
      "Online rent collection",
      "Tenant portal",
      "Basic reporting",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Professional",
    price: "$3.50",
    unit: "/unit/mo",
    minimum: "Starting at $99/mo",
    features: [
      "Everything in Starter",
      "AI communications hub",
      "Financial forecasting",
      "Lease intelligence",
      "Priority support",
    ],
    cta: "Get Started",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    unit: "",
    minimum: "Tailored to your needs",
    features: [
      "Everything in Professional",
      "Custom AI models",
      "API access",
      "Dedicated success manager",
      "SLA guarantee",
    ],
    cta: "Contact Sales",
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
    { label: "Careers", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Contact", href: "#" },
  ],
  Resources: [
    { label: "Documentation", href: "#" },
    { label: "Guides", href: "#" },
    { label: "Support", href: "#" },
    { label: "Status", href: "#" },
  ],
  Legal: [
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
    { label: "Security", href: "#" },
    { label: "Cookies", href: "#" },
  ],
};

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ---------------------------------------------------------- */}
      {/*  Navigation                                                 */}
      {/* ---------------------------------------------------------- */}
      <nav className="sticky top-0 z-50 h-[72px] border-b border-warm-gray-200 bg-card-bg/80 backdrop-blur-md">
        <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-500">
              <span className="text-[15px] font-semibold leading-none text-white">
                A
              </span>
            </div>
            <span className="text-[18px] font-semibold tracking-tight text-foreground">
              Arid
            </span>
          </Link>

          {/* Center links */}
          <div className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[14px] text-warm-gray-500 transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="hidden text-[14px] text-warm-gray-500 transition-colors hover:text-foreground sm:block"
            >
              Sign in
            </Link>
            <Link
              href="/dashboard"
              className="rounded-xl bg-navy px-5 py-2.5 text-[14px] font-medium text-white transition-colors hover:bg-navy-light"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* ---------------------------------------------------------- */}
      {/*  Hero                                                       */}
      {/* ---------------------------------------------------------- */}
      <section className="px-6 py-32">
        <div className="mx-auto max-w-6xl text-center">
          {/* Pill badge */}
          <div className="animate-fade-in inline-flex items-center rounded-full bg-brand-50 px-4 py-1.5 text-[12px] font-medium text-brand-600">
            AI-Native Property Management
          </div>

          {/* Headline */}
          <h1
            className="animate-fade-in stagger-1 mx-auto mt-6 max-w-3xl text-[56px] font-semibold leading-[1.05] text-foreground sm:text-[64px]"
            style={{ letterSpacing: "-0.03em" }}
          >
            Property management,
            <br />
            intelligently automated.
          </h1>

          {/* Subtitle */}
          <p className="animate-fade-in stagger-2 mx-auto mt-6 max-w-xl text-[18px] leading-relaxed text-warm-gray-500">
            Arid combines artificial intelligence with thoughtful design to
            automate maintenance, optimize revenue, and give you clarity across
            your entire portfolio.
          </p>

          {/* Buttons */}
          <div className="animate-fade-in stagger-3 mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/dashboard"
              className="rounded-xl bg-brand-500 px-7 py-3 text-[15px] font-medium text-white transition-colors hover:bg-brand-600"
            >
              Start Free Trial
            </Link>
            <a
              href="#features"
              className="rounded-xl border border-warm-gray-200 px-7 py-3 text-[15px] font-medium text-foreground transition-colors hover:border-warm-gray-300"
            >
              Learn More
            </a>
          </div>

          {/* Dashboard mockup */}
          <div className="animate-fade-in stagger-4 mx-auto mt-16 max-w-4xl">
            <div className="rounded-2xl border border-warm-gray-200 bg-card-bg p-6 shadow-xl sm:p-8">
              {/* Metric cards row */}
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="rounded-xl bg-warm-gray-100 p-4"
                  >
                    <div className="mb-2 h-2.5 w-12 rounded bg-warm-gray-200" />
                    <div className="h-4 w-16 rounded bg-warm-gray-200" />
                  </div>
                ))}
              </div>

              {/* Chart bars area */}
              <div className="mt-4 rounded-xl bg-warm-gray-100 p-5">
                <div className="mb-4 h-2.5 w-20 rounded bg-warm-gray-200" />
                <div className="flex h-28 items-end gap-2 sm:h-36">
                  {[40, 60, 45, 70, 55, 80, 50, 75, 65, 85, 60, 72].map(
                    (h, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-t-md bg-warm-gray-200"
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

      {/* ---------------------------------------------------------- */}
      {/*  Logos Bar                                                   */}
      {/* ---------------------------------------------------------- */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl text-center">
          <p className="text-[13px] text-warm-gray-400">
            Trusted by 2,400+ property managers across the country
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="h-8 w-24 rounded-lg bg-warm-gray-100"
              />
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/*  Features                                                   */}
      {/* ---------------------------------------------------------- */}
      <section id="features" className="bg-card-bg px-6 py-28">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <p className="text-[12px] font-semibold uppercase tracking-[0.1em] text-brand-500">
              Features
            </p>
            <h2
              className="mt-3 text-[36px] font-semibold tracking-tight text-foreground"
            >
              Everything you need, nothing you don&apos;t
            </h2>
            <p className="mt-3 text-[16px] text-warm-gray-500">
              Purpose-built tools for modern property management, powered by AI.
            </p>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className={`animate-fade-in stagger-${i + 1} rounded-2xl border border-warm-gray-200 bg-background p-8`}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50">
                    <Icon className="h-5 w-5 text-brand-500" />
                  </div>
                  <h3 className="mt-5 text-[16px] font-semibold text-foreground">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-warm-gray-500">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/*  How It Works                                               */}
      {/* ---------------------------------------------------------- */}
      <section className="px-6 py-28">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <p className="text-[12px] font-semibold uppercase tracking-[0.1em] text-brand-500">
              How it works
            </p>
            <h2 className="mt-3 text-[36px] font-semibold tracking-tight text-foreground">
              Up and running in minutes
            </h2>
          </div>

          <div className="mt-16 flex flex-col items-center gap-12 sm:flex-row sm:items-start sm:justify-center sm:gap-8">
            {STEPS.map((step) => (
              <div
                key={step.number}
                className="flex max-w-xs flex-col items-center text-center"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-navy text-[14px] font-semibold text-white">
                  {step.number}
                </div>
                <h3 className="mt-5 text-[16px] font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="mt-2 text-[14px] text-warm-gray-500">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/*  Pricing                                                    */}
      {/* ---------------------------------------------------------- */}
      <section id="pricing" className="bg-card-bg px-6 py-28">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <p className="text-[12px] font-semibold uppercase tracking-[0.1em] text-brand-500">
              Pricing
            </p>
            <h2 className="mt-3 text-[36px] font-semibold tracking-tight text-foreground">
              Transparent, straightforward pricing
            </h2>
            <p className="mt-3 text-[16px] text-warm-gray-500">
              No hidden fees. No per-feature charges. Just honest pricing that
              scales with you.
            </p>
          </div>

          <div className="mx-auto mt-16 grid max-w-5xl gap-6 lg:grid-cols-3">
            {PRICING_TIERS.map((tier) => (
              <div
                key={tier.name}
                className={`flex flex-col rounded-2xl p-8 ${
                  tier.popular
                    ? "bg-navy text-white shadow-lg ring-1 ring-navy"
                    : "border border-warm-gray-200 bg-background"
                }`}
              >
                {/* Tier header */}
                <div className="flex items-center gap-3">
                  <span
                    className={`text-[14px] font-semibold ${
                      tier.popular ? "text-white/70" : "text-warm-gray-500"
                    }`}
                  >
                    {tier.name}
                  </span>
                  {tier.popular && (
                    <span className="rounded-full bg-brand-500 px-2.5 py-0.5 text-[11px] font-medium text-white">
                      Most Popular
                    </span>
                  )}
                </div>

                {/* Price */}
                <div className="mt-4 flex items-baseline gap-1">
                  <span
                    className={`text-[48px] font-semibold leading-none ${
                      tier.popular ? "text-white" : "text-foreground"
                    }`}
                  >
                    {tier.price}
                  </span>
                  {tier.unit && (
                    <span
                      className={`text-[14px] ${
                        tier.popular ? "text-white/60" : "text-warm-gray-500"
                      }`}
                    >
                      {tier.unit}
                    </span>
                  )}
                </div>
                <p
                  className={`mt-1 text-[13px] ${
                    tier.popular ? "text-white/50" : "text-warm-gray-400"
                  }`}
                >
                  {tier.minimum}
                </p>

                {/* Divider */}
                <div
                  className={`my-6 h-px ${
                    tier.popular ? "bg-white/15" : "bg-warm-gray-200"
                  }`}
                />

                {/* Feature list */}
                <ul className="mb-8 flex flex-1 flex-col gap-3">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5">
                      <Check
                        className={`mt-0.5 h-4 w-4 shrink-0 ${
                          tier.popular ? "text-brand-400" : "text-brand-500"
                        }`}
                      />
                      <span
                        className={`text-[14px] ${
                          tier.popular ? "text-white/90" : "text-foreground"
                        }`}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA button */}
                <Link
                  href={tier.name === "Enterprise" ? "#" : "/dashboard"}
                  className={`block w-full rounded-xl py-3 text-center text-[14px] font-medium transition-colors ${
                    tier.popular
                      ? "bg-brand-500 text-white hover:bg-brand-600"
                      : "border border-warm-gray-200 text-foreground hover:border-warm-gray-300"
                  }`}
                >
                  {tier.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/*  CTA                                                        */}
      {/* ---------------------------------------------------------- */}
      <section className="px-6 py-28">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-3xl bg-navy p-16 text-center">
            <h2 className="text-[36px] font-semibold text-white">
              Ready to manage smarter?
            </h2>
            <p className="mt-4 text-[16px] text-white/70">
              Join 2,400+ property managers who trust Arid to run their
              portfolio.
            </p>
            <Link
              href="/dashboard"
              className="mt-8 inline-block rounded-xl bg-brand-500 px-8 py-3.5 text-[15px] font-medium text-white transition-colors hover:bg-brand-600"
            >
              Start Your Free Trial
            </Link>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/*  Footer                                                     */}
      {/* ---------------------------------------------------------- */}
      <footer id="about" className="border-t border-warm-gray-200 px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-6">
            {/* Brand column */}
            <div className="lg:col-span-2">
              <Link href="/" className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-500">
                  <span className="text-[15px] font-semibold leading-none text-white">
                    A
                  </span>
                </div>
                <span className="text-[18px] font-semibold tracking-tight text-foreground">
                  Arid
                </span>
              </Link>
              <p className="mt-3 text-[13px] leading-relaxed text-warm-gray-400">
                Intelligent property management
              </p>
            </div>

            {/* Link columns */}
            {Object.entries(FOOTER_LINKS).map(([category, links]) => (
              <div key={category}>
                <h4 className="mb-4 text-[13px] font-semibold text-foreground">
                  {category}
                </h4>
                <ul className="flex flex-col gap-2.5">
                  {links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-[13px] text-warm-gray-400 transition-colors hover:text-foreground"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom bar */}
          <div className="mt-14 border-t border-warm-gray-200 pt-8">
            <p className="text-[12px] text-warm-gray-400">
              &copy; 2025 Arid. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
