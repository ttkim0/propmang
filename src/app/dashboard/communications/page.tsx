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
  Bot,
  Check,
  X,
  Pencil,
  Zap,
} from "lucide-react";
import clsx from "clsx";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type MessageStatus = "read" | "unread";
type MessageTag = "ai-drafted" | "flagged" | "ai-auto-sent";
type FilterTab = "all" | "unread" | "ai-drafted" | "flagged";

interface MessagePreview {
  id: string;
  sender: string;
  initials: string;
  subject: string;
  preview: string;
  time: string;
  status: MessageStatus;
  tags: MessageTag[];
}

interface ThreadMessage {
  id: string;
  sender: string;
  content: string;
  time: string;
  isOwn?: boolean;
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const stats = [
  { label: "Messages", value: "342", icon: MessageSquare },
  { label: "AI Drafted", value: "67%", icon: Sparkles },
  { label: "Avg Response", value: "2.1 hrs", icon: Clock },
  { label: "Satisfaction", value: "4.8/5", icon: Star },
];

const messages: MessagePreview[] = [
  {
    id: "1",
    sender: "Sarah Chen",
    initials: "SC",
    subject: "Re: Maintenance update for Unit 4B",
    preview: "Thanks for the quick response. When can I expect them?",
    time: "2h ago",
    status: "read",
    tags: [],
  },
  {
    id: "2",
    sender: "Marcus Johnson",
    initials: "MJ",
    subject: "Late payment arrangement",
    preview: "I wanted to discuss a payment plan for this month's rent...",
    time: "3h ago",
    status: "unread",
    tags: ["flagged"],
  },
  {
    id: "3",
    sender: "Emily Rodriguez",
    initials: "ER",
    subject: "Move-out notice",
    preview: "I'm writing to formally notify you of my intent to vacate...",
    time: "5h ago",
    status: "unread",
    tags: [],
  },
  {
    id: "4",
    sender: "Building-wide",
    initials: "BW",
    subject: "Parking lot resurfacing notice",
    preview: "Dear residents, we will be resurfacing the parking lot...",
    time: "1d ago",
    status: "read",
    tags: ["ai-drafted"],
  },
  {
    id: "5",
    sender: "David Kim",
    initials: "DK",
    subject: "Lease renewal question",
    preview: "Hi, I was wondering about the terms for my upcoming lease...",
    time: "1d ago",
    status: "read",
    tags: [],
  },
  {
    id: "6",
    sender: "Jessica Williams",
    initials: "JW",
    subject: "Noise complaint follow-up",
    preview: "Thanks for addressing the noise issue. Things have been much...",
    time: "2d ago",
    status: "read",
    tags: [],
  },
  {
    id: "7",
    sender: "Aisha Patel",
    initials: "AP",
    subject: "Thank you for quick repair!",
    preview: "Just wanted to say thank you for the quick turnaround on...",
    time: "2d ago",
    status: "read",
    tags: [],
  },
  {
    id: "8",
    sender: "System",
    initials: "SY",
    subject: "Monthly rent reminders sent",
    preview: "Automated rent reminders were sent to 47 tenants for April...",
    time: "3d ago",
    status: "read",
    tags: ["ai-auto-sent"],
  },
];

const thread: ThreadMessage[] = [
  {
    id: "t1",
    sender: "Sarah Chen",
    content:
      "Hi, I wanted to check on the status of the bathroom repair in Unit 4B. The plumber came yesterday but the leak is still there.",
    time: "Yesterday, 10:23 AM",
  },
  {
    id: "t2",
    sender: "You",
    content:
      "Thank you for letting us know, Sarah. I'll contact the plumber to schedule a follow-up visit.",
    time: "Yesterday, 2:15 PM",
    isOwn: true,
  },
  {
    id: "t3",
    sender: "Sarah Chen",
    content: "Thanks for the quick response. When can I expect them?",
    time: "Today, 9:47 AM",
  },
];

const aiDraftText =
  "Hi Sarah, I've scheduled the plumber for tomorrow between 10 AM and 12 PM. They'll address the remaining leak in your bathroom. I'll send you a confirmation once the appointment is locked in. Please let me know if that time works for you.";

// ---------------------------------------------------------------------------
// Tag Badge
// ---------------------------------------------------------------------------

function TagBadge({ tag }: { tag: MessageTag }) {
  const config: Record<MessageTag, { label: string; classes: string }> = {
    "ai-drafted": {
      label: "AI Draft",
      classes: "bg-sage-light text-sage-dark",
    },
    flagged: {
      label: "Flagged",
      classes: "bg-warning-light text-warning",
    },
    "ai-auto-sent": {
      label: "AI Auto-sent",
      classes: "bg-sage-light text-sage-dark",
    },
  };
  const c = config[tag];
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium",
        c.classes
      )}
    >
      {tag === "flagged" && <Flag className="h-2.5 w-2.5" />}
      {tag === "ai-drafted" && <Bot className="h-2.5 w-2.5" />}
      {tag === "ai-auto-sent" && <Zap className="h-2.5 w-2.5" />}
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
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <header className="mb-10 flex items-end justify-between">
        <div>
          <h1 className="font-serif text-[32px] text-text-primary">
            Communications
          </h1>
          <p className="mt-1 text-[14px] text-text-secondary">
            AI-assisted tenant communication
          </p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-2.5 text-[13px] font-medium text-text-inverse transition-opacity hover:opacity-90">
          <Send className="h-4 w-4" />
          New Message
        </button>
      </header>

      {/* Stats */}
      <section className="mb-8 grid grid-cols-4 gap-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div
              key={s.label}
              className="rounded-[20px] border border-border bg-white p-6"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[12px] font-medium uppercase tracking-wider text-text-tertiary">
                    {s.label}
                  </p>
                  <p className="mt-2 font-serif text-[28px] text-text-primary">
                    {s.value}
                  </p>
                </div>
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-sage-light">
                  <Icon className="h-[18px] w-[18px] text-sage" />
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* Two-panel email layout */}
      <section className="flex overflow-hidden rounded-[20px] border border-border bg-white min-h-[550px]">
        {/* ---- Left panel ---- */}
        <div className="flex w-[360px] flex-col border-r border-border-light">
          {/* Search */}
          <div className="border-b border-border-light p-4">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-text-tertiary" />
              <input
                type="text"
                placeholder="Search messages..."
                className="h-9 w-full rounded-full border border-border bg-cream pl-9 pr-4 text-[13px] text-text-primary placeholder:text-text-tertiary focus:border-accent/40 focus:outline-none"
              />
            </div>
          </div>

          {/* Filter tabs */}
          <div className="flex gap-1 border-b border-border-light px-4 py-3">
            {filters.map((f) => (
              <button
                key={f.key}
                onClick={() => setActiveFilter(f.key)}
                className={clsx(
                  "rounded-full px-3 py-1.5 text-[12px] font-medium transition-colors",
                  activeFilter === f.key
                    ? "bg-accent text-text-inverse"
                    : "text-text-tertiary hover:text-text-secondary"
                )}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Message list */}
          <div className="flex-1 overflow-y-auto">
            {filteredMessages.map((m) => (
              <button
                key={m.id}
                onClick={() => setSelectedId(m.id)}
                className={clsx(
                  "relative flex w-full cursor-pointer flex-col border-b border-border-light px-5 py-4 text-left transition-colors hover:bg-cream-dark",
                  selectedId === m.id && "bg-cream-dark border-l-2 border-l-accent"
                )}
              >
                {/* Top row */}
                <div className="flex items-center gap-2.5">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-cream-deeper text-[10px] font-medium text-text-secondary">
                    {m.initials}
                  </div>
                  <span
                    className={clsx(
                      "flex-1 truncate text-[13px]",
                      m.status === "unread"
                        ? "font-semibold text-text-primary"
                        : "font-medium text-text-primary"
                    )}
                  >
                    {m.sender}
                  </span>
                  <span className="shrink-0 text-[11px] text-text-tertiary">
                    {m.time}
                  </span>
                </div>

                {/* Subject */}
                <p className="mt-1 truncate text-[13px] text-text-secondary">
                  {m.subject}
                </p>

                {/* Preview */}
                <p className="mt-0.5 truncate text-[12px] text-text-tertiary">
                  {m.preview}
                </p>

                {/* Tags */}
                {m.tags.length > 0 && (
                  <div className="mt-1.5 flex gap-1">
                    {m.tags.map((tag) => (
                      <TagBadge key={tag} tag={tag} />
                    ))}
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* ---- Right panel ---- */}
        <div className="flex flex-1 flex-col">
          {/* Thread header */}
          <div className="flex items-center gap-3 border-b border-border-light px-6 py-4">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-cream-deeper text-[10px] font-medium text-text-secondary">
              SC
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="truncate text-[14px] font-medium text-text-primary">
                Sarah Chen
              </h3>
              <p className="text-[12px] text-text-tertiary">
                Re: Maintenance update for Unit 4B &middot; 2h ago
              </p>
            </div>
          </div>

          {/* Thread messages */}
          <div className="flex-1 space-y-4 overflow-y-auto p-6">
            {thread.map((msg) => (
              <div
                key={msg.id}
                className={clsx(
                  "rounded-2xl p-4",
                  msg.isOwn ? "bg-sage-light" : "bg-cream-dark"
                )}
              >
                <div className="mb-1.5 flex items-center gap-2">
                  <span className="text-[12px] font-medium text-text-primary">
                    {msg.sender}
                  </span>
                  <span className="text-[11px] text-text-tertiary">
                    {msg.time}
                  </span>
                </div>
                <p className="text-[14px] leading-relaxed text-text-primary">
                  {msg.content}
                </p>
              </div>
            ))}

            {/* AI Draft box */}
            <div className="rounded-2xl border border-sage bg-sage-light/50 p-5">
              <div className="mb-3 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-sage-dark" />
                <span className="text-[13px] font-medium text-sage-dark">
                  AI Suggested Reply
                </span>
              </div>
              <p className="mb-4 text-[14px] leading-relaxed text-text-primary">
                {aiDraftText}
              </p>
              <div className="flex items-center gap-2">
                <button className="inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-[12px] font-medium text-text-inverse transition-opacity hover:opacity-90">
                  <Check className="h-3 w-3" />
                  Accept
                </button>
                <button className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-4 py-2 text-[12px] font-medium text-text-primary transition-colors hover:bg-cream-dark">
                  <Pencil className="h-3 w-3" />
                  Edit
                </button>
                <button className="inline-flex items-center gap-1.5 px-3 py-2 text-[12px] font-medium text-text-tertiary transition-colors hover:text-text-secondary">
                  <X className="h-3 w-3" />
                  Dismiss
                </button>
              </div>
            </div>
          </div>

          {/* Reply box */}
          <div className="border-t border-border-light p-4">
            <div className="flex items-end gap-3">
              <textarea
                rows={2}
                placeholder="Type your reply..."
                className="min-w-0 flex-1 resize-none rounded-2xl border border-border bg-cream px-4 py-2.5 text-[13px] text-text-primary placeholder:text-text-tertiary focus:border-accent/40 focus:outline-none"
              />
              <button className="inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-2.5 text-[12px] font-medium text-text-inverse transition-opacity hover:opacity-90">
                <Send className="h-3.5 w-3.5" />
                Send
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* AI banner */}
      <p className="mt-4 text-center text-[13px] text-text-tertiary">
        AI drafted 12 responses today, saving ~2.4 hours
      </p>
    </div>
  );
}
