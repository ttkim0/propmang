import { Search, Bell } from "lucide-react";
import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />

      {/* Main content area */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-card-border bg-background/80 px-6 backdrop-blur-sm lg:px-8">
          {/* Spacer for mobile menu button */}
          <div className="w-9 lg:hidden" />

          {/* Search */}
          <div className="relative max-w-md flex-1">
            <Search
              size={15}
              strokeWidth={1.75}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted"
            />
            <input
              type="text"
              placeholder="Search properties, tenants, leases..."
              className="h-9 w-full rounded-lg border border-card-border bg-card-bg pl-9 pr-4 text-[13px] text-foreground placeholder:text-muted/70 focus:border-brand-500/40 focus:outline-none focus:ring-1 focus:ring-brand-500/20"
            />
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            {/* Notification bell */}
            <button className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-card-border bg-card-bg text-muted transition-colors hover:text-foreground">
              <Bell size={16} strokeWidth={1.75} />
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-brand-500 text-[10px] font-semibold text-white">
                3
              </span>
            </button>

            {/* User avatar */}
            <button className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-500 text-[12px] font-semibold text-white transition-opacity hover:opacity-90">
              JD
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="min-h-[calc(100vh-4rem)] p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
