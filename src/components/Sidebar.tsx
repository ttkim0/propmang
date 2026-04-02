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
} from "lucide-react";
import clsx from "clsx";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Properties", href: "/dashboard/properties", icon: Building2 },
  { label: "Tenants", href: "/dashboard/tenants", icon: Users },
  { label: "Leases", href: "/dashboard/leases", icon: FileText },
  { label: "Maintenance", href: "/dashboard/maintenance", icon: Wrench },
  { label: "Financials", href: "/dashboard/financials", icon: DollarSign },
  {
    label: "Communications",
    href: "/dashboard/communications",
    icon: MessageSquare,
  },
];

const bottomItems = [
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  function isActive(href: string) {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname.startsWith(href);
  }

  const sidebarContent = (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className="flex h-16 items-center gap-2.5 px-6">
        <span className="inline-block h-2 w-2 rounded-sm bg-brand-500" />
        <span className="text-[15px] font-semibold tracking-[-0.01em] text-sidebar-active">
          Arid
        </span>
      </div>

      {/* Portfolio summary */}
      <div className="mx-4 mb-4 rounded-md bg-white/[0.04] px-3 py-2.5">
        <p className="text-[11px] font-medium uppercase tracking-[0.05em] text-sidebar-text/60">
          Portfolio
        </p>
        <p className="mt-0.5 text-[12px] font-medium text-sidebar-text">
          12 Properties&nbsp;&middot;&nbsp;847 Units
        </p>
      </div>

      {/* Separator */}
      <div className="mx-4 h-px bg-white/[0.06]" />

      {/* Main nav */}
      <nav className="mt-3 flex-1 space-y-0.5 px-3">
        {navItems.map((item) => {
          const active = isActive(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={clsx(
                "group relative flex items-center gap-3 rounded-md px-3 py-2 text-[13px] font-medium transition-colors duration-150",
                active
                  ? "bg-white/[0.07] text-sidebar-active"
                  : "text-sidebar-text hover:bg-white/[0.04] hover:text-sidebar-active"
              )}
            >
              {active && (
                <span className="absolute left-0 top-1/2 h-4 w-[2px] -translate-y-1/2 rounded-r-full bg-brand-500" />
              )}
              <Icon
                size={16}
                strokeWidth={1.75}
                className={clsx(
                  "shrink-0 transition-colors duration-150",
                  active
                    ? "text-brand-500"
                    : "text-sidebar-text/70 group-hover:text-sidebar-text"
                )}
              />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Separator */}
      <div className="mx-4 h-px bg-white/[0.06]" />

      {/* Bottom nav */}
      <div className="mt-2 space-y-0.5 px-3 pb-2">
        {bottomItems.map((item) => {
          const active = isActive(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={clsx(
                "group relative flex items-center gap-3 rounded-md px-3 py-2 text-[13px] font-medium transition-colors duration-150",
                active
                  ? "bg-white/[0.07] text-sidebar-active"
                  : "text-sidebar-text hover:bg-white/[0.04] hover:text-sidebar-active"
              )}
            >
              {active && (
                <span className="absolute left-0 top-1/2 h-4 w-[2px] -translate-y-1/2 rounded-r-full bg-brand-500" />
              )}
              <Icon
                size={16}
                strokeWidth={1.75}
                className={clsx(
                  "shrink-0 transition-colors duration-150",
                  active
                    ? "text-brand-500"
                    : "text-sidebar-text/70 group-hover:text-sidebar-text"
                )}
              />
              {item.label}
            </Link>
          );
        })}
      </div>

      {/* AI Status */}
      <div className="mx-4 mb-4 flex items-center gap-2.5 rounded-md bg-white/[0.04] px-3 py-2.5">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
        </span>
        <span className="text-[12px] font-medium text-sidebar-text">
          AI Active
        </span>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setOpen(true)}
        className="fixed left-4 top-4 z-40 flex h-9 w-9 items-center justify-center rounded-lg border border-card-border bg-card-bg text-foreground shadow-sm lg:hidden"
        aria-label="Open sidebar"
      >
        <Menu size={18} strokeWidth={1.75} />
      </button>

      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <aside
        className={clsx(
          "fixed inset-y-0 left-0 z-50 w-64 bg-sidebar-bg transition-transform duration-200 ease-in-out lg:hidden",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <button
          onClick={() => setOpen(false)}
          className="absolute right-3 top-4 flex h-7 w-7 items-center justify-center rounded-md text-sidebar-text hover:text-sidebar-active"
          aria-label="Close sidebar"
        >
          <X size={16} strokeWidth={1.75} />
        </button>
        {sidebarContent}
      </aside>

      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 hidden w-64 bg-sidebar-bg lg:block">
        {sidebarContent}
      </aside>
    </>
  );
}
