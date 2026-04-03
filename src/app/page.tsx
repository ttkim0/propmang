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
      "Requests are automatically categorized, prioritized, and routed to the right vendor. Resolution times drop by 40%.",
  },
  {
    icon: DollarSign,
    title: "Smart Rent Optimization",
    description:
      "Market-aware pricing recommendations ensure every unit is priced competitively. Never leave revenue behind.",
  },
  {
    icon: FileText,
    title: "Lease Intelligence",
    description:
      "Predict renewal likelihood months in advance. Automate offers and reduce vacancy with precision.",
  },
  {
    icon: TrendingUp,
    title: "Financial Clarity",
    description:
      "Real-time cash flow projections, budget anomaly detection, and NOI optimization. Your books, finally clear.",
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
      "Professional, context-aware responses drafted automatically. Quality communication at scale.",
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
      "Our models analyze your data to understand properties, tenants, and operational rhythms.",
  },
  {
    number: "3",
    title: "Manage with confidence",
    description:
      "Actionable insights, automated workflows, and predictive analytics from day one.",
  },
];

const FOOTER_LINKS: Record<string, { label: string; href: string }[]> = {
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
    <div className="min-h-screen bg-cream font-sans text-text-primary">
      {/* ---------------------------------------------------------- */}
      {/*  Navigation                                                 */}
      {/* ---------------------------------------------------------- */}
      <nav className="sticky top-0 z-50 h-20 border-b border-border-light bg-cream/80 backdrop-blur-md">
        <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-6">
          <Link href="/" className="font-serif text-[24px] text-text-primary">
            Arid
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-sans text-[13px] text-text-secondary transition-colors hover:text-text-primary"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-5">
            <Link
              href="/dashboard"
              className="hidden font-sans text-[13px] text-text-secondary transition-colors hover:text-text-primary sm:block"
            >
              Sign in
            </Link>
            <Link
              href="/dashboard"
              className="rounded-full bg-accent px-5 py-2 font-sans text-[13px] font-medium text-text-inverse transition-colors hover:bg-accent-hover"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* ---------------------------------------------------------- */}
      {/*  Hero                                                       */}
      {/* ---------------------------------------------------------- */}
      <section className="px-6 py-40">
        <div className="mx-auto max-w-3xl text-center">
          <span className="animate-fade-in inline-block rounded-full border border-border px-4 py-1.5 font-sans text-[11px] font-medium uppercase tracking-[0.1em] text-text-secondary">
            AI-Native Property Management
          </span>

          <h1 className="animate-fade-in stagger-1 mt-8 font-serif text-[64px] leading-[1.08] tracking-tight text-text-primary">
            Property management, intelligently automated.
          </h1>

          <p className="animate-fade-in stagger-2 mx-auto mt-8 max-w-lg font-sans text-[16px] leading-relaxed text-text-secondary">
            Arid combines AI with thoughtful design to automate maintenance,
            optimize revenue, and give you clarity across your entire portfolio.
          </p>

          <div className="animate-fade-in stagger-3 mt-10 flex items-center justify-center gap-3">
            <Link
              href="/dashboard"
              className="rounded-full bg-accent px-8 py-3 font-sans text-[14px] font-medium text-text-inverse transition-colors hover:bg-accent-hover"
            >
              Start Free Trial
            </Link>
            <a
              href="#features"
              className="rounded-full border border-border px-8 py-3 font-sans text-[14px] font-medium text-text-primary transition-colors hover:border-text-tertiary"
            >
              Learn More
            </a>
          </div>

          {/* Dashboard mockup */}
          <div className="animate-fade-in stagger-4 mx-auto mt-20 max-w-4xl">
            <div className="rounded-[24px] border border-border bg-white p-6 shadow-[0_24px_48px_-12px_rgba(0,0,0,0.05)] sm:p-8">
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-20 rounded-2xl bg-cream-dark"
                  />
                ))}
              </div>
              <div className="mt-4 h-40 rounded-2xl bg-cream-dark" />
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/*  Social Proof                                               */}
      {/* ---------------------------------------------------------- */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl text-center">
          <p className="font-sans text-[13px] tracking-wide text-text-tertiary">
            Trusted by 2,400+ property managers
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-8">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="h-6 w-20 rounded-full bg-cream-deeper"
              />
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/*  Features                                                   */}
      {/* ---------------------------------------------------------- */}
      <section id="features" className="bg-cream-dark px-6 py-36">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <p className="font-sans text-[11px] font-medium uppercase tracking-[0.15em] text-text-tertiary">
              Features
            </p>
            <h2 className="mt-4 font-serif text-[42px] tracking-tight text-text-primary">
              Everything you need, nothing you don&apos;t
            </h2>
          </div>

          <div className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className={`animate-fade-in stagger-${i + 1} rounded-[20px] border border-border bg-white p-8`}
                >
                  <Icon
                    className="h-5 w-5 text-text-tertiary"
                    strokeWidth={1.5}
                  />
                  <h3 className="mt-6 font-serif text-[20px] text-text-primary">
                    {feature.title}
                  </h3>
                  <p className="mt-3 font-sans text-[14px] leading-relaxed text-text-secondary">
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
      <section className="px-6 py-36">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <p className="font-sans text-[11px] font-medium uppercase tracking-[0.15em] text-text-tertiary">
              How it works
            </p>
            <h2 className="mt-4 font-serif text-[42px] tracking-tight text-text-primary">
              Up and running in minutes
            </h2>
          </div>

          <div className="mt-20 flex flex-col items-center gap-16 sm:flex-row sm:items-start sm:justify-center">
            {STEPS.map((step) => (
              <div
                key={step.number}
                className="max-w-[240px] text-center"
              >
                <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-full border border-border font-sans text-[12px] font-medium text-text-tertiary">
                  {step.number}
                </div>
                <h3 className="mt-6 font-serif text-[20px] text-text-primary">
                  {step.title}
                </h3>
                <p className="mt-3 font-sans text-[14px] leading-relaxed text-text-secondary">
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
      <section id="pricing" className="bg-cream-dark px-6 py-36">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <p className="font-sans text-[11px] font-medium uppercase tracking-[0.15em] text-text-tertiary">
              Pricing
            </p>
            <h2 className="mt-4 font-serif text-[42px] tracking-tight text-text-primary">
              Simple, transparent pricing
            </h2>
            <p className="mt-4 font-sans text-[15px] text-text-secondary">
              No hidden fees. Honest pricing that scales with you.
            </p>
          </div>

          <div className="mt-16 grid gap-5 sm:grid-cols-3">
            {/* Starter */}
            <div className="flex flex-col rounded-[20px] border border-border bg-white p-8">
              <span className="font-sans text-[13px] font-medium text-text-secondary">
                Starter
              </span>
              <div className="mt-2 flex items-baseline">
                <span className="font-serif text-[56px] text-text-primary">
                  $2
                </span>
                <span className="ml-1 font-sans text-[14px] text-text-tertiary">
                  /unit/mo
                </span>
              </div>
              <p className="mt-1 font-sans text-[13px] text-text-tertiary">
                From $29/month
              </p>
              <hr className="my-6 border-border" />
              <ul className="mb-8 flex flex-1 flex-col gap-3">
                {[
                  "Up to 50 units",
                  "AI maintenance triage",
                  "Online rent collection",
                  "Tenant portal",
                  "Basic reporting",
                ].map((feat) => (
                  <li key={feat} className="flex items-start gap-2.5">
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-sage" />
                    <span className="font-sans text-[14px] text-text-primary">
                      {feat}
                    </span>
                  </li>
                ))}
              </ul>
              <Link
                href="/dashboard"
                className="block w-full rounded-full border border-border py-2.5 text-center font-sans text-[13px] font-medium text-text-primary transition-colors hover:border-text-tertiary"
              >
                Get Started
              </Link>
            </div>

            {/* Professional */}
            <div className="flex flex-col rounded-[20px] bg-accent p-8 text-text-inverse">
              <div className="flex items-center">
                <span className="font-sans text-[13px] font-medium text-text-inverse/70">
                  Professional
                </span>
                <span className="ml-2 rounded-full bg-white/20 px-2.5 py-0.5 font-sans text-[10px] font-medium text-text-inverse">
                  Popular
                </span>
              </div>
              <div className="mt-2 flex items-baseline">
                <span className="font-serif text-[56px] text-text-inverse">
                  $3.50
                </span>
                <span className="ml-1 font-sans text-[14px] text-text-inverse/60">
                  /unit/mo
                </span>
              </div>
              <p className="mt-1 font-sans text-[13px] text-text-inverse/50">
                From $99/month
              </p>
              <hr className="my-6 border-white/15" />
              <ul className="mb-8 flex flex-1 flex-col gap-3">
                {[
                  "Everything in Starter",
                  "AI communications",
                  "Financial forecasting",
                  "Lease intelligence",
                  "Priority support",
                ].map((feat) => (
                  <li key={feat} className="flex items-start gap-2.5">
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-white/60" />
                    <span className="font-sans text-[14px] text-text-inverse/90">
                      {feat}
                    </span>
                  </li>
                ))}
              </ul>
              <Link
                href="/dashboard"
                className="block w-full rounded-full bg-white py-2.5 text-center font-sans text-[13px] font-medium text-accent transition-opacity hover:opacity-90"
              >
                Get Started
              </Link>
            </div>

            {/* Enterprise */}
            <div className="flex flex-col rounded-[20px] border border-border bg-white p-8">
              <span className="font-sans text-[13px] font-medium text-text-secondary">
                Enterprise
              </span>
              <div className="mt-2">
                <span className="font-serif text-[56px] text-text-primary">
                  Custom
                </span>
              </div>
              <p className="mt-1 font-sans text-[13px] text-text-tertiary">
                Tailored to your needs
              </p>
              <hr className="my-6 border-border" />
              <ul className="mb-8 flex flex-1 flex-col gap-3">
                {[
                  "Everything in Professional",
                  "Custom AI",
                  "API access",
                  "Dedicated manager",
                  "SLA guarantee",
                ].map((feat) => (
                  <li key={feat} className="flex items-start gap-2.5">
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-sage" />
                    <span className="font-sans text-[14px] text-text-primary">
                      {feat}
                    </span>
                  </li>
                ))}
              </ul>
              <Link
                href="#"
                className="block w-full rounded-full border border-border py-2.5 text-center font-sans text-[13px] font-medium text-text-primary transition-colors hover:border-text-tertiary"
              >
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/*  CTA                                                        */}
      {/* ---------------------------------------------------------- */}
      <section className="px-6 py-36">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-[48px] tracking-tight text-text-primary">
            Ready to manage smarter?
          </h2>
          <p className="mt-6 font-sans text-[16px] leading-relaxed text-text-secondary">
            Join thousands of property managers who trust Arid.
          </p>
          <Link
            href="/dashboard"
            className="mt-8 inline-block rounded-full bg-accent px-8 py-3 font-sans text-[14px] font-medium text-text-inverse transition-colors hover:bg-accent-hover"
          >
            Start Your Free Trial
          </Link>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/*  Footer                                                     */}
      {/* ---------------------------------------------------------- */}
      <footer id="about" className="border-t border-border px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-6">
            <div className="lg:col-span-2">
              <div className="flex items-center">
                <span className="font-serif text-[18px] text-text-primary">
                  Arid
                </span>
                <span className="ml-4 font-sans text-[13px] text-text-tertiary">
                  Intelligent property management
                </span>
              </div>
            </div>

            {Object.entries(FOOTER_LINKS).map(([category, links]) => (
              <div key={category}>
                <h4 className="mb-4 font-sans text-[13px] font-medium text-text-primary">
                  {category}
                </h4>
                <ul className="flex flex-col gap-2.5">
                  {links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="font-sans text-[13px] text-text-secondary transition-colors hover:text-text-primary"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-14 border-t border-border pt-8">
            <p className="font-sans text-[12px] text-text-tertiary">
              &copy; 2025 Arid. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
