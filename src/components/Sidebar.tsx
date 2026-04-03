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
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className="flex h-[72px] items-center px-7">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-brand-500">
            <span className="text-sm font-bold text-white tracking-tight">A</span>
          </div>
          <span className="text-[17px] font-semibold tracking-[-0.03em] text-sidebar-active">
            Arid
          </span>
        </Link>
      </div>

      {/* Portfolio summary */}
      <div className="mx-5 mb-5 rounded-2xl bg-white/[0.04] px-4 py-3.5">
        <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-sidebar-text/50">
          Portfolio
        </p>
        <p className="mt-1 text-[13px] font-medium text-sidebar-active/90">
          12 Properties
        </p>
        <p className="text-[12px] text-sidebar-text/70">
          847 Units &middot; 94.7% occupied
        </p>
      </div>

      {/* Main nav */}
      <nav className="flex-1 px-4">
        <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.08em] text-sidebar-text/40">
          Manage
        </p>
        <div className="space-y-1">
          {navItems.map((item) => {
            const active = isActive(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={clsx(
                  "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium transition-all duration-200",
                  active
                    ? "bg-white/[0.08] text-sidebar-active"
                    : "text-sidebar-text hover:bg-white/[0.04] hover:text-sidebar-active/80"
                )}
              >
                <Icon
                  size={17}
                  strokeWidth={1.6}
                  className={clsx(
                    "shrink-0 transition-colors duration-200",
                    active ? "text-brand-400" : "text-sidebar-text/60 group-hover:text-sidebar-text"
                  )}
                />
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Bottom section */}
      <div className="px-4 pb-3">
        <div className="mb-3 h-px bg-white/[0.06]" />
        <Link
          href="/dashboard/settings"
          onClick={() => setOpen(false)}
          className={clsx(
            "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium transition-all duration-200",
            isActive("/dashboard/settings")
              ? "bg-white/[0.08] text-sidebar-active"
              : "text-sidebar-text hover:bg-white/[0.04] hover:text-sidebar-active/80"
          )}
        >
          <Settings
            size={17}
            strokeWidth={1.6}
            className={clsx(
              "shrink-0 transition-colors duration-200",
              isActive("/dashboard/settings") ? "text-brand-400" : "text-sidebar-text/60 group-hover:text-sidebar-text"
            )}
          />
          Settings
        </Link>
      </div>

      {/* AI Status */}
      <div className="mx-4 mb-5 rounded-2xl border border-white/[0.06] bg-white/[0.03] px-4 py-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-500/20">
            <Sparkles size={13} className="text-brand-400" />
          </div>
          <div>
            <p className="text-[12px] font-medium text-sidebar-active/90">AI Assistant</p>
            <div className="flex items-center gap-1.5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </span>
              <span className="text-[11px] text-sidebar-text/60">Active</span>
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
        className="fixed left-4 top-5 z-40 flex h-10 w-10 items-center justify-center rounded-xl border border-warm-gray-200 bg-card-bg text-foreground shadow-sm lg:hidden"
        aria-label="Open sidebar"
      >
        <Menu size={18} strokeWidth={1.6} />
      </button>

      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-navy/60 backdrop-blur-sm lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <aside
        className={clsx(
          "fixed inset-y-0 left-0 z-50 w-[272px] bg-sidebar-bg transition-transform duration-300 ease-out lg:hidden",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <button
          onClick={() => setOpen(false)}
          className="absolute right-3 top-5 flex h-8 w-8 items-center justify-center rounded-xl text-sidebar-text hover:text-sidebar-active"
          aria-label="Close sidebar"
        >
          <X size={16} strokeWidth={1.6} />
        </button>
        {sidebarContent}
      </aside>

      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 hidden w-[272px] bg-sidebar-bg lg:block">
        {sidebarContent}
      </aside>
    </>
  );
}
