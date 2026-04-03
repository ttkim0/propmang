import { Search, Bell, ChevronDown } from "lucide-react";
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
      <div className="lg:pl-[272px]">
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex h-[72px] items-center justify-between border-b border-warm-gray-200 bg-warm-gray-50/80 px-6 backdrop-blur-md lg:px-10">
          {/* Spacer for mobile */}
          <div className="w-10 lg:hidden" />

          {/* Search */}
          <div className="relative max-w-sm flex-1">
            <Search
              size={15}
              strokeWidth={1.6}
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-warm-gray-400"
            />
            <input
              type="text"
              placeholder="Search anything..."
              className="h-10 w-full rounded-xl border-warm-gray-200 bg-card-bg pl-10 pr-4 text-[13px] text-foreground shadow-sm placeholder:text-warm-gray-400"
            />
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-4">
            {/* Notifications */}
            <button className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-warm-gray-200 bg-card-bg text-warm-gray-400 shadow-sm transition-colors hover:text-foreground">
              <Bell size={16} strokeWidth={1.6} />
              <span className="absolute -right-0.5 -top-0.5 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-danger text-[10px] font-semibold text-white">
                3
              </span>
            </button>

            {/* User */}
            <button className="flex items-center gap-2.5 rounded-xl border border-warm-gray-200 bg-card-bg py-1.5 pl-1.5 pr-3 shadow-sm transition-colors hover:border-warm-gray-300">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-navy text-[11px] font-semibold text-white">
                JD
              </div>
              <span className="hidden text-[13px] font-medium text-foreground sm:block">Jordan</span>
              <ChevronDown size={13} className="hidden text-warm-gray-400 sm:block" />
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6 lg:p-10">
          {children}
        </main>
      </div>
    </div>
  );
}
