"use client";

import { useState } from "react";
import {
  MessageSquare,
  Send,
  Search,
  Sparkles,
  Clock,
  Star,
  Flag,
  Mail,
  MailOpen,
  Bot,
  Filter,
  Paperclip,
  MoreHorizontal,
  ChevronRight,
  Check,
  X,
  Pencil,
  ThumbsUp,
  AlertCircle,
  Zap,
  Users,
  TrendingUp,
  ArrowUpRight,
} from "lucide-react";
import clsx from "clsx";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type MessageStatus = "read" | "unread";
type MessageTag = "ai-drafted" | "flagged" | "important" | "ai-auto-sent";
type FilterTab = "all" | "unread" | "ai-drafted" | "flagged";

interface MessagePreview {
  id: string;
  sender: string;
  avatar: string;
  avatarColor: string;
  subject: string;
  preview: string;
  time: string;
  status: MessageStatus;
  tags: MessageTag[];
  isSystem?: boolean;
}

interface ThreadMessage {
  id: string;
  sender: string;
  avatar: string;
  avatarColor: string;
  content: string;
  time: string;
  isOwn?: boolean;
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const stats = [
  {
    label: "Total Messages",
    value: "342",
    sub: "this month",
    icon: MessageSquare,
    color: "text-brand-500",
    bgColor: "bg-brand-100",
  },
  {
    label: "AI Drafted",
    value: "67%",
    sub: "of responses",
    icon: Sparkles,
    color: "text-info",
    bgColor: "bg-info/10",
  },
  {
    label: "Avg Response Time",
    value: "2.1 hrs",
    sub: "down from 4.3 hrs",
    icon: Clock,
    color: "text-success",
    bgColor: "bg-success/10",
  },
  {
    label: "Satisfaction",
    value: "4.8/5",
    sub: "tenant rating",
    icon: Star,
    color: "text-warning",
    bgColor: "bg-warning/10",
  },
];

const messages: MessagePreview[] = [
  {
    id: "1",
    sender: "Sarah Chen",
    avatar: "SC",
    avatarColor: "bg-brand-100 text-brand-600",
    subject: "Re: Maintenance update for Unit 4B",
    preview: "Thank you for the update. When can we expect the plumber to...",
    time: "2h ago",
    status: "read",
    tags: [],
  },
  {
    id: "2",
    sender: "Marcus Johnson",
    avatar: "MJ",
    avatarColor: "bg-danger/10 text-danger",
    subject: "Late payment arrangement",
    preview: "I wanted to discuss a payment plan for this month's rent...",
    time: "3h ago",
    status: "unread",
    tags: ["flagged"],
  },
  {
    id: "3",
    sender: "Emily Rodriguez",
    avatar: "ER",
    avatarColor: "bg-warning/10 text-warning",
    subject: "Move-out notice",
    preview: "I'm writing to formally notify you of my intent to vacate...",
    time: "5h ago",
    status: "unread",
    tags: ["important"],
  },
  {
    id: "4",
    sender: "Building-wide",
    avatar: "BW",
    avatarColor: "bg-info/10 text-info",
    subject: "Parking lot resurfacing notice",
    preview: "Dear residents, we will be resurfacing the parking lot...",
    time: "1d ago",
    status: "read",
    tags: ["ai-drafted"],
    isSystem: true,
  },
  {
    id: "5",
    sender: "David Kim",
    avatar: "DK",
    avatarColor: "bg-success/10 text-success",
    subject: "Lease renewal question",
    preview: "Hi, I was wondering about the terms for my upcoming lease...",
    time: "1d ago",
    status: "read",
    tags: [],
  },
  {
    id: "6",
    sender: "Jessica Williams",
    avatar: "JW",
    avatarColor: "bg-brand-100 text-brand-600",
    subject: "Noise complaint follow-up",
    preview: "Thanks for addressing the noise issue. Things have been much...",
    time: "2d ago",
    status: "read",
    tags: [],
  },
  {
    id: "7",
    sender: "Aisha Patel",
    avatar: "AP",
    avatarColor: "bg-success/10 text-success",
    subject: "Thank you for quick repair!",
    preview: "Just wanted to say thank you for the quick turnaround on...",
    time: "2d ago",
    status: "read",
    tags: [],
  },
  {
    id: "8",
    sender: "System",
    avatar: "SY",
    avatarColor: "bg-foreground/5 text-muted",
    subject: "Monthly rent reminders sent",
    preview: "Automated rent reminders were sent to 47 tenants for April...",
    time: "3d ago",
    status: "read",
    tags: ["ai-auto-sent"],
    isSystem: true,
  },
];

const thread: ThreadMessage[] = [
  {
    id: "t1",
    sender: "Sarah Chen",
    avatar: "SC",
    avatarColor: "bg-brand-100 text-brand-600",
    content:
      "Hi Jordan, I wanted to follow up on the maintenance request I submitted last week for Unit 4B. The kitchen faucet is still leaking and it seems to have gotten worse. Could you let me know when someone will be able to come take a look?",
    time: "Yesterday, 10:23 AM",
  },
  {
    id: "t2",
    sender: "Jordan Davis",
    avatar: "JD",
    avatarColor: "bg-brand-500 text-white",
    content:
      "Hi Sarah, thanks for following up. I've scheduled a plumber to come by this Thursday between 9 AM and 12 PM. They'll replace the faulty cartridge and check for any water damage. Could you confirm someone will be available to let them in?",
    time: "Yesterday, 2:15 PM",
    isOwn: true,
  },
  {
    id: "t3",
    sender: "Sarah Chen",
    avatar: "SC",
    avatarColor: "bg-brand-100 text-brand-600",
    content:
      "Thank you for the update. When can we expect the plumber to arrive exactly? I work from home on Thursdays so I should be available all morning. Also, is there anything I should do to prepare, like clearing under the sink?",
    time: "Today, 9:47 AM",
  },
];

const aiDraftReply =
  "Hi Sarah, the plumber is scheduled to arrive between 9:00 AM and 10:30 AM this Thursday. It would be helpful if you could clear the area under the kitchen sink beforehand so they have easy access. The repair should take about 30-45 minutes. Please don't hesitate to reach out if you need to reschedule. Thank you for your patience!";

// ---------------------------------------------------------------------------
// Helper Components
// ---------------------------------------------------------------------------

function TagBadge({ tag }: { tag: MessageTag }) {
  const config: Record<
    MessageTag,
    { label: string; className: string; icon: React.ElementType }
  > = {
    flagged: {
      label: "Flagged",
      className: "bg-danger/10 text-danger",
      icon: Flag,
    },
    important: {
      label: "Important",
      className: "bg-warning/10 text-warning",
      icon: AlertCircle,
    },
    "ai-drafted": {
      label: "AI Drafted",
      className: "bg-info/10 text-info",
      icon: Bot,
    },
    "ai-auto-sent": {
      label: "AI Auto-sent",
      className: "bg-foreground/5 text-muted",
      icon: Zap,
    },
  };
  const c = config[tag];
  const Icon = c.icon;
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
        c.className
      )}
    >
      <Icon className="h-2.5 w-2.5" />
      {c.label}
    </span>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function CommunicationsPage() {
  const [selectedId, setSelectedId] = useState("1");
  const [activeFilter, setActiveFilter] = useState<FilterTab>("all");

  const filters: { key: FilterTab; label: string }[] = [
    { key: "all", label: "All" },
    { key: "unread", label: "Unread" },
    { key: "ai-drafted", label: "AI Drafted" },
    { key: "flagged", label: "Flagged" },
  ];

  const filteredMessages = messages.filter((m) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "unread") return m.status === "unread";
    if (activeFilter === "ai-drafted") return m.tags.includes("ai-drafted");
    if (activeFilter === "flagged") return m.tags.includes("flagged");
    return true;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* -------------------------------------------------------------- */}
      {/* Header                                                         */}
      {/* -------------------------------------------------------------- */}
      <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground lg:text-3xl">
            Communications
          </h1>
          <p className="mt-1 text-sm text-muted">
            AI-assisted tenant communication hub
          </p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-brand-600 hover:shadow-md active:scale-[0.98]">
          <Send className="h-4 w-4" />
          New Message
        </button>
      </header>

      {/* -------------------------------------------------------------- */}
      {/* Stats                                                          */}
      {/* -------------------------------------------------------------- */}
      <section className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div
              key={s.label}
              className="group rounded-xl border border-card-border bg-card-bg p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition-shadow hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-muted">
                    {s.label}
                  </p>
                  <p className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
                    {s.value}
                  </p>
                  <p className="mt-0.5 text-xs text-muted">{s.sub}</p>
                </div>
                <div
                  className={clsx(
                    "flex h-9 w-9 items-center justify-center rounded-lg",
                    s.bgColor
                  )}
                >
                  <Icon className={clsx("h-4.5 w-4.5", s.color)} />
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* -------------------------------------------------------------- */}
      {/* Two-panel layout                                               */}
      {/* -------------------------------------------------------------- */}
      <section className="mb-6 flex flex-col gap-4 lg:flex-row lg:gap-0">
        {/* Left panel — Message list */}
        <div className="flex w-full flex-col rounded-xl border border-card-border bg-card-bg shadow-[0_1px_3px_rgba(0,0,0,0.04)] lg:w-[40%] lg:rounded-r-none lg:border-r-0">
          {/* Search */}
          <div className="border-b border-card-border p-3">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted" />
              <input
                type="text"
                placeholder="Search messages..."
                className="h-9 w-full rounded-lg border border-card-border bg-background pl-9 pr-4 text-[13px] text-foreground placeholder:text-muted/70 focus:border-brand-500/40 focus:outline-none focus:ring-1 focus:ring-brand-500/20"
              />
            </div>
          </div>

          {/* Filter tabs */}
          <div className="flex gap-1 border-b border-card-border px-3 py-2">
            {filters.map((f) => (
              <button
                key={f.key}
                onClick={() => setActiveFilter(f.key)}
                className={clsx(
                  "rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
                  activeFilter === f.key
                    ? "bg-brand-500 text-white"
                    : "text-muted hover:bg-foreground/5 hover:text-foreground"
                )}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Message list */}
          <div className="flex-1 divide-y divide-card-border overflow-y-auto">
            {filteredMessages.map((m) => (
              <button
                key={m.id}
                onClick={() => setSelectedId(m.id)}
                className={clsx(
                  "flex w-full items-start gap-3 px-4 py-3.5 text-left transition-colors",
                  selectedId === m.id
                    ? "bg-brand-50/60"
                    : "hover:bg-background/60",
                  m.status === "unread" && "bg-brand-50/30"
                )}
              >
                <div
                  className={clsx(
                    "flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold",
                    m.avatarColor
                  )}
                >
                  {m.avatar}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={clsx(
                        "truncate text-sm",
                        m.status === "unread"
                          ? "font-semibold text-foreground"
                          : "font-medium text-foreground"
                      )}
                    >
                      {m.sender}
                    </span>
                    <span className="shrink-0 text-[11px] text-muted">
                      {m.time}
                    </span>
                  </div>
                  <p
                    className={clsx(
                      "mt-0.5 truncate text-[13px]",
                      m.status === "unread"
                        ? "font-medium text-foreground"
                        : "text-muted"
                    )}
                  >
                    {m.subject}
                  </p>
                  <p className="mt-0.5 truncate text-xs text-muted/80">
                    {m.preview}
                  </p>
                  {m.tags.length > 0 && (
                    <div className="mt-1.5 flex flex-wrap gap-1">
                      {m.tags.map((tag) => (
                        <TagBadge key={tag} tag={tag} />
                      ))}
                    </div>
                  )}
                </div>
                {m.status === "unread" && (
                  <div className="mt-2 h-2 w-2 shrink-0 rounded-full bg-brand-500" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Right panel — Message detail */}
        <div className="flex w-full flex-col rounded-xl border border-card-border bg-card-bg shadow-[0_1px_3px_rgba(0,0,0,0.04)] lg:w-[60%] lg:rounded-l-none">
          {/* Thread header */}
          <div className="flex items-center justify-between border-b border-card-border px-6 py-4">
            <div className="min-w-0 flex-1">
              <h3 className="truncate text-sm font-semibold text-foreground">
                Re: Maintenance update for Unit 4B
              </h3>
              <p className="mt-0.5 text-xs text-muted">
                Sarah Chen &middot; Unit 4B, Pine Valley Apartments
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-card-border text-muted transition-colors hover:bg-foreground/5 hover:text-foreground">
                <Paperclip className="h-3.5 w-3.5" />
              </button>
              <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-card-border text-muted transition-colors hover:bg-foreground/5 hover:text-foreground">
                <MoreHorizontal className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Thread messages */}
          <div className="flex-1 space-y-1 overflow-y-auto p-6">
            {thread.map((msg) => (
              <div
                key={msg.id}
                className={clsx(
                  "flex gap-3",
                  msg.isOwn && "flex-row-reverse"
                )}
              >
                <div
                  className={clsx(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold",
                    msg.avatarColor
                  )}
                >
                  {msg.avatar}
                </div>
                <div
                  className={clsx(
                    "max-w-[75%] rounded-xl px-4 py-3",
                    msg.isOwn
                      ? "rounded-tr-sm bg-brand-500 text-white"
                      : "rounded-tl-sm bg-background"
                  )}
                >
                  <div className="mb-1 flex items-center gap-2">
                    <span
                      className={clsx(
                        "text-xs font-semibold",
                        msg.isOwn ? "text-white/90" : "text-foreground"
                      )}
                    >
                      {msg.sender}
                    </span>
                    <span
                      className={clsx(
                        "text-[10px]",
                        msg.isOwn ? "text-white/60" : "text-muted"
                      )}
                    >
                      {msg.time}
                    </span>
                  </div>
                  <p
                    className={clsx(
                      "text-[13px] leading-relaxed",
                      msg.isOwn ? "text-white/95" : "text-foreground"
                    )}
                  >
                    {msg.content}
                  </p>
                </div>
              </div>
            ))}

            {/* AI Draft Suggestion */}
            <div className="mt-4 rounded-xl border border-warning/30 bg-warning/5 p-4">
              <div className="mb-2.5 flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-md bg-warning/15">
                  <Sparkles className="h-3.5 w-3.5 text-warning" />
                </div>
                <span className="text-xs font-semibold text-foreground">
                  AI-Suggested Reply
                </span>
                <span className="text-[10px] text-muted">
                  Based on maintenance request history
                </span>
              </div>
              <p className="mb-3 text-[13px] leading-relaxed text-foreground/85">
                {aiDraftReply}
              </p>
              <div className="flex items-center gap-2">
                <button className="inline-flex items-center gap-1.5 rounded-lg bg-brand-500 px-3 py-1.5 text-xs font-medium text-white transition-all hover:bg-brand-600 active:scale-[0.98]">
                  <Check className="h-3 w-3" />
                  Accept
                </button>
                <button className="inline-flex items-center gap-1.5 rounded-lg border border-card-border bg-card-bg px-3 py-1.5 text-xs font-medium text-foreground transition-all hover:bg-foreground/5 active:scale-[0.98]">
                  <Pencil className="h-3 w-3" />
                  Edit
                </button>
                <button className="inline-flex items-center gap-1.5 rounded-lg border border-card-border bg-card-bg px-3 py-1.5 text-xs font-medium text-muted transition-all hover:bg-foreground/5 hover:text-foreground active:scale-[0.98]">
                  <X className="h-3 w-3" />
                  Reject
                </button>
              </div>
            </div>
          </div>

          {/* Reply box */}
          <div className="border-t border-card-border px-6 py-4">
            <div className="flex items-end gap-3">
              <div className="relative min-w-0 flex-1">
                <textarea
                  rows={2}
                  placeholder="Type your reply..."
                  className="w-full resize-none rounded-lg border border-card-border bg-background px-4 py-2.5 text-[13px] text-foreground placeholder:text-muted/70 focus:border-brand-500/40 focus:outline-none focus:ring-1 focus:ring-brand-500/20"
                />
              </div>
              <div className="flex gap-2">
                <button className="inline-flex items-center gap-1.5 rounded-lg border border-brand-500/30 bg-brand-50 px-3 py-2.5 text-xs font-medium text-brand-600 transition-all hover:bg-brand-100 active:scale-[0.98]">
                  <Sparkles className="h-3.5 w-3.5" />
                  AI Draft Reply
                </button>
                <button className="inline-flex items-center gap-1.5 rounded-lg bg-brand-500 px-4 py-2.5 text-xs font-medium text-white shadow-sm transition-all hover:bg-brand-600 hover:shadow-md active:scale-[0.98]">
                  <Send className="h-3.5 w-3.5" />
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------- */}
      {/* AI Communication Insights Banner                               */}
      {/* -------------------------------------------------------------- */}
      <section className="rounded-xl border border-brand-200 bg-gradient-to-r from-brand-50/60 via-card-bg to-card-bg p-[1px] shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
        <div className="flex flex-col gap-4 rounded-[11px] bg-card-bg px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-100">
              <Sparkles className="h-4 w-4 text-brand-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">
                AI has drafted 12 responses today, saving approximately 2.4
                hours
              </p>
              <p className="mt-0.5 text-xs text-muted">
                Communication efficiency increased by 34% this month
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-lg border border-warning/30 bg-warning/5 px-3 py-2">
            <AlertCircle className="h-3.5 w-3.5 text-warning" />
            <span className="text-xs font-medium text-foreground">
              3 messages require personal attention
            </span>
            <ChevronRight className="h-3.5 w-3.5 text-muted" />
          </div>
        </div>
      </section>
    </div>
  );
}
