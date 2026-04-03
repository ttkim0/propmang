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

      <div className="lg:pl-[280px]">
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-border-light bg-cream/80 px-6 backdrop-blur-md lg:px-10">
          <div className="w-10 lg:hidden" />

          {/* Search */}
          <div className="relative max-w-xs flex-1">
            <Search
              size={14}
              strokeWidth={1.5}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-text-tertiary"
            />
            <input
              type="text"
              placeholder="Search..."
              className="h-9 w-full pl-10 pr-4 text-[13px]"
            />
          </div>

          {/* Right */}
          <div className="flex items-center gap-3">
            <button className="relative flex h-9 w-9 items-center justify-center rounded-full border border-border bg-white text-text-tertiary transition-colors hover:text-text-primary">
              <Bell size={15} strokeWidth={1.5} />
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[9px] font-medium text-text-inverse">
                3
              </span>
            </button>

            <button className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-[11px] font-medium text-text-inverse">
              JD
            </button>
          </div>
        </header>

        <main className="p-6 lg:px-10 lg:py-10">
          {children}
        </main>
      </div>
    </div>
  );
}
