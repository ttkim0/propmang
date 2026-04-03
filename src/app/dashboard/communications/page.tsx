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
  AlertCircle,
  Zap,
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
  initials: string;
  avatarBg: string;
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
    avatarBg: "bg-[#E8F0ED] text-[#4A7C6F]",
    subject: "Re: Maintenance update for Unit 4B",
    preview:
      "Thanks for the quick response. When can I expect them?",
    time: "2h ago",
    status: "read",
    tags: [],
  },
  {
    id: "2",
    sender: "Marcus Johnson",
    initials: "MJ",
    avatarBg: "bg-[#F3E0E0] text-[#B85C5C]",
    subject: "Late payment arrangement",
    preview:
      "I wanted to discuss a payment plan for this month's rent...",
    time: "3h ago",
    status: "unread",
    tags: ["flagged"],
  },
  {
    id: "3",
    sender: "Emily Rodriguez",
    initials: "ER",
    avatarBg: "bg-[#F0E6D6] text-[#C4975A]",
    subject: "Move-out notice",
    preview:
      "I'm writing to formally notify you of my intent to vacate...",
    time: "5h ago",
    status: "unread",
    tags: ["important"],
  },
  {
    id: "4",
    sender: "Building-wide",
    initials: "BW",
    avatarBg: "bg-[#DDE8F0] text-[#5B82A0]",
    subject: "Parking lot resurfacing notice",
    preview:
      "Dear residents, we will be resurfacing the parking lot...",
    time: "1d ago",
    status: "read",
    tags: ["ai-drafted"],
  },
  {
    id: "5",
    sender: "David Kim",
    initials: "DK",
    avatarBg: "bg-[#E0EDE6] text-[#5B9A7D]",
    subject: "Lease renewal question",
    preview:
      "Hi, I was wondering about the terms for my upcoming lease...",
    time: "1d ago",
    status: "read",
    tags: [],
  },
  {
    id: "6",
    sender: "Jessica Williams",
    initials: "JW",
    avatarBg: "bg-[#E8F0ED] text-[#4A7C6F]",
    subject: "Noise complaint follow-up",
    preview:
      "Thanks for addressing the noise issue. Things have been much...",
    time: "2d ago",
    status: "read",
    tags: [],
  },
  {
    id: "7",
    sender: "Aisha Patel",
    initials: "AP",
    avatarBg: "bg-[#E0EDE6] text-[#5B9A7D]",
    subject: "Thank you for quick repair!",
    preview:
      "Just wanted to say thank you for the quick turnaround on...",
    time: "2d ago",
    status: "read",
    tags: [],
  },
  {
    id: "8",
    sender: "System",
    initials: "SY",
    avatarBg: "bg-[#EEECEA] text-[#9B9790]",
    subject: "Monthly rent reminders sent",
    preview:
      "Automated rent reminders were sent to 47 tenants for April...",
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
    content:
      "Thanks for the quick response. When can I expect them?",
    time: "Today, 9:47 AM",
  },
];

const aiDraftText =
  "Hi Sarah, I've scheduled the plumber for tomorrow between 10 AM and 12 PM. They'll address the remaining leak in your bathroom. I'll send you a confirmation once the appointment is locked in. Please let me know if that time works for you.";

// ---------------------------------------------------------------------------
// Tag Badge
// ---------------------------------------------------------------------------

function TagBadge({ tag }: { tag: MessageTag }) {
  const config: Record<MessageTag, { label: string; bg: string; text: string }> =
    {
      "ai-drafted": {
        label: "AI Drafted",
        bg: "bg-[#EDF3F0]",
        text: "text-[#4A7C6F]",
      },
      flagged: {
        label: "Flagged",
        bg: "bg-[#C4975A]/10",
        text: "text-[#C4975A]",
      },
      important: {
        label: "Important",
        bg: "bg-[#C4975A]/10",
        text: "text-[#C4975A]",
      },
      "ai-auto-sent": {
        label: "AI Auto-sent",
        bg: "bg-[#EDF3F0]",
        text: "text-[#4A7C6F]",
      },
    };
  const c = config[tag];
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium",
        c.bg,
        c.text
      )}
    >
      {tag === "flagged" && <Flag className="h-2.5 w-2.5" />}
      {tag === "important" && <AlertCircle className="h-2.5 w-2.5" />}
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
    <div className="min-h-screen bg-[#FAFAF7]">
      {/* Header */}
      <header className="mb-6 flex items-end justify-between">
        <div>
          <h1 className="text-[28px] font-semibold tracking-tight text-[#2D3436]">
            Communications
          </h1>
          <p className="mt-1 text-[14px] text-[#9B9790]">
            AI-assisted tenant communication
          </p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-2xl bg-[#4A7C6F] px-5 py-2.5 text-[13px] font-medium text-white transition-all hover:bg-[#3D6A5E] active:scale-[0.98]">
          <Send className="h-4 w-4" />
          New Message
        </button>
      </header>

      {/* Stats */}
      <section className="mb-6 grid grid-cols-4 gap-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div
              key={s.label}
              className="rounded-2xl border border-[#E5E3DE] bg-white p-5"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[12px] font-medium uppercase tracking-wider text-[#9B9790]">
                    {s.label}
                  </p>
                  <p className="mt-2 text-[24px] font-semibold tracking-tight text-[#2D3436]">
                    {s.value}
                  </p>
                </div>
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#EDF3F0]">
                  <Icon className="h-[18px] w-[18px] text-[#4A7C6F]" />
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* Two-panel email layout */}
      <section className="mt-6 flex overflow-hidden rounded-2xl border border-[#E5E3DE] bg-white" style={{ minHeight: 600 }}>
        {/* Left panel */}
        <div className="flex w-[380px] flex-col border-r border-[#E5E3DE]">
          {/* Search */}
          <div className="border-b border-[#E5E3DE] p-3">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#9B9790]" />
              <input
                type="text"
                placeholder="Search messages..."
                className="h-9 w-full rounded-xl border border-[#E5E3DE] bg-[#FAFAF7] pl-9 pr-4 text-[13px] text-[#2D3436] placeholder:text-[#C5C2BC] focus:border-[#4A7C6F]/40 focus:outline-none focus:ring-1 focus:ring-[#4A7C6F]/20"
              />
            </div>
          </div>

          {/* Filter tabs */}
          <div className="flex gap-1 border-b border-[#E5E3DE] bg-[#F2F1ED] px-3 py-2">
            {filters.map((f) => (
              <button
                key={f.key}
                onClick={() => setActiveFilter(f.key)}
                className={clsx(
                  "rounded-lg px-3 py-1.5 text-[12px] font-medium transition-colors",
                  activeFilter === f.key
                    ? "bg-white text-[#2D3436] shadow-sm"
                    : "text-[#9B9790] hover:text-[#2D3436]"
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
                  "relative flex w-full cursor-pointer flex-col border-b border-[#E5E3DE] px-5 py-4 text-left transition-colors hover:bg-[#F7F6F3]",
                  selectedId === m.id && "bg-[#F7F6F3]"
                )}
              >
                {/* Active indicator */}
                {selectedId === m.id && (
                  <div className="absolute left-0 top-0 h-full w-[2px] bg-[#4A7C6F]" />
                )}
                {/* Top row: avatar + name + time */}
                <div className="flex items-center gap-2.5">
                  <div
                    className={clsx(
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[10px] font-semibold",
                      m.avatarBg
                    )}
                  >
                    {m.initials}
                  </div>
                  <span
                    className={clsx(
                      "flex-1 truncate text-[13px]",
                      m.status === "unread"
                        ? "font-semibold text-[#2D3436]"
                        : "font-medium text-[#2D3436]"
                    )}
                  >
                    {m.sender}
                  </span>
                  <span className="shrink-0 text-[11px] text-[#C5C2BC]">
                    {m.time}
                  </span>
                </div>
                {/* Subject */}
                <p
                  className={clsx(
                    "mt-1 truncate text-[13px]",
                    m.status === "unread"
                      ? "font-medium text-[#2D3436]"
                      : "text-[#6B6963]"
                  )}
                >
                  {m.subject}
                </p>
                {/* Preview */}
                <p className="mt-0.5 truncate text-[12px] text-[#C5C2BC]">
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

        {/* Right panel */}
        <div className="flex flex-1 flex-col">
          {/* Thread header */}
          <div className="flex items-center gap-3 border-b border-[#E5E3DE] px-6 py-4">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#E8F0ED] text-[10px] font-semibold text-[#4A7C6F]">
              SC
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="truncate text-[14px] font-semibold text-[#2D3436]">
                Sarah Chen
              </h3>
              <p className="text-[12px] text-[#9B9790]">
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
                  msg.isOwn ? "bg-[#EDF3F0]" : "bg-[#F7F6F3]"
                )}
              >
                <div className="mb-1.5 flex items-center gap-2">
                  <span className="text-[12px] font-medium text-[#2D3436]">
                    {msg.sender}
                  </span>
                  <span className="text-[11px] text-[#C5C2BC]">
                    {msg.time}
                  </span>
                </div>
                <p className="text-[13px] leading-relaxed text-[#2D3436]">
                  {msg.content}
                </p>
              </div>
            ))}

            {/* AI Draft box */}
            <div className="mx-6 mt-4 rounded-2xl border-2 border-[#B8D4C9] p-5">
              <div className="mb-3 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-[#3D6A5E]" />
                <span className="text-[13px] font-medium text-[#3D6A5E]">
                  AI Suggested Reply
                </span>
              </div>
              <p className="mb-4 text-[13px] leading-relaxed text-[#2D3436]">
                {aiDraftText}
              </p>
              <div className="flex items-center gap-2">
                <button className="inline-flex items-center gap-1.5 rounded-xl bg-[#4A7C6F] px-4 py-2 text-[12px] font-medium text-white transition-colors hover:bg-[#3D6A5E] active:scale-[0.98]">
                  <Check className="h-3 w-3" />
                  Accept
                </button>
                <button className="inline-flex items-center gap-1.5 rounded-xl border border-[#E5E3DE] bg-white px-4 py-2 text-[12px] font-medium text-[#2D3436] transition-colors hover:bg-[#F7F6F3] active:scale-[0.98]">
                  <Pencil className="h-3 w-3" />
                  Edit
                </button>
                <button className="inline-flex items-center gap-1.5 px-3 py-2 text-[12px] font-medium text-[#C5C2BC] transition-colors hover:text-[#9B9790]">
                  <X className="h-3 w-3" />
                  Dismiss
                </button>
              </div>
            </div>
          </div>

          {/* Reply box */}
          <div className="border-t border-[#E5E3DE] p-4">
            <div className="flex items-end gap-3">
              <textarea
                rows={2}
                placeholder="Type your reply..."
                className="min-w-0 flex-1 resize-none rounded-xl border border-[#E5E3DE] bg-[#FAFAF7] px-4 py-2.5 text-[13px] text-[#2D3436] placeholder:text-[#C5C2BC] focus:border-[#4A7C6F]/40 focus:outline-none focus:ring-1 focus:ring-[#4A7C6F]/20"
              />
              <button className="inline-flex items-center gap-1.5 rounded-xl bg-[#4A7C6F] px-4 py-2.5 text-[12px] font-medium text-white transition-colors hover:bg-[#3D6A5E] active:scale-[0.98]">
                <Sparkles className="h-3.5 w-3.5" />
                AI Draft Reply
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* AI banner */}
      <section className="mt-6 rounded-2xl border border-[#E5E3DE] bg-white p-5">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#EDF3F0]">
            <Sparkles className="h-4 w-4 text-[#4A7C6F]" />
          </div>
          <p className="text-[14px] text-[#2D3436]">
            <span className="font-medium">AI drafted 12 responses today</span>
            , saving approximately 2.4 hours
          </p>
        </div>
      </section>
    </div>
  );
}
