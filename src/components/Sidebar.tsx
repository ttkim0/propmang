"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Building2,
  Users,
  FileText,
  Wrench,
  DollarSign,
  MessageSquare,
  Settings,
  Menu,
  X,
  Sparkles,
} from "lucide-react";
import clsx from "clsx";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Properties", href: "/dashboard/properties", icon: Building2 },
  { label: "Tenants", href: "/dashboard/tenants", icon: Users },
  { label: "Leases", href: "/dashboard/leases", icon: FileText },
  { label: "Maintenance", href: "/dashboard/maintenance", icon: Wrench },
  { label: "Financials", href: "/dashboard/financials", icon: DollarSign },
  { label: "Communications", href: "/dashboard/communications", icon: MessageSquare },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  function isActive(href: string) {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname.startsWith(href);
  }

  const sidebarContent = (
    <div className="flex h-full flex-col bg-cream">
      {/* Logo */}
      <div className="flex h-20 items-center px-8">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-serif text-[22px] text-text-primary">Arid</span>
        </Link>
      </div>

      {/* Portfolio pill */}
      <div className="mx-6 mb-8 rounded-2xl border border-border-light bg-cream-dark px-5 py-4">
        <p className="text-[11px] font-medium uppercase tracking-[0.1em] text-text-tertiary">
          Portfolio
        </p>
        <p className="mt-1.5 font-serif text-[18px] text-text-primary">
          847 Units
        </p>
        <p className="mt-0.5 text-[12px] text-text-secondary">
          12 properties &middot; 94.7% occupied
        </p>
      </div>

      {/* Main nav */}
      <nav className="flex-1 px-5">
        <div className="space-y-0.5">
          {navItems.map((item) => {
            const active = isActive(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={clsx(
                  "group flex items-center gap-3.5 rounded-full px-4 py-2.5 text-[13px] transition-all duration-200",
                  active
                    ? "bg-accent text-text-inverse font-medium"
                    : "text-text-secondary hover:bg-cream-dark hover:text-text-primary"
                )}
              >
                <Icon
                  size={16}
                  strokeWidth={1.5}
                  className="shrink-0"
                />
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Bottom */}
      <div className="px-5 pb-4">
        <div className="mb-4 h-px bg-border-light" />

        <Link
          href="/dashboard/settings"
          onClick={() => setOpen(false)}
          className={clsx(
            "group flex items-center gap-3.5 rounded-full px-4 py-2.5 text-[13px] transition-all duration-200",
            isActive("/dashboard/settings")
              ? "bg-accent text-text-inverse font-medium"
              : "text-text-secondary hover:bg-cream-dark hover:text-text-primary"
          )}
        >
          <Settings size={16} strokeWidth={1.5} className="shrink-0" />
          Settings
        </Link>

        {/* AI Status */}
        <div className="mt-4 flex items-center gap-3 rounded-2xl border border-border-light bg-cream-dark px-4 py-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sage-light">
            <Sparkles size={14} className="text-sage-dark" />
          </div>
          <div>
            <p className="text-[12px] font-medium text-text-primary">AI Active</p>
            <div className="flex items-center gap-1.5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-50" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success" />
              </span>
              <span className="text-[11px] text-text-tertiary">Ready</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setOpen(true)}
        className="fixed left-5 top-6 z-40 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-cream text-text-primary lg:hidden"
        aria-label="Open sidebar"
      >
        <Menu size={18} strokeWidth={1.5} />
      </button>

      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-text-primary/20 backdrop-blur-sm lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <aside
        className={clsx(
          "fixed inset-y-0 left-0 z-50 w-[280px] border-r border-border-light bg-cream transition-transform duration-300 ease-out lg:hidden",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <button
          onClick={() => setOpen(false)}
          className="absolute right-4 top-6 flex h-8 w-8 items-center justify-center rounded-full text-text-tertiary hover:text-text-primary"
          aria-label="Close sidebar"
        >
          <X size={16} strokeWidth={1.5} />
        </button>
        {sidebarContent}
      </aside>

      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 hidden w-[280px] border-r border-border-light bg-cream lg:block">
        {sidebarContent}
      </aside>
    </>
  );
}
