import { useState, useEffect } from "react";
import type { ContactMessage } from "../../types/contact";

type AdminSection =
  | "overview"
  | "projects"
  | "services"
  | "jobs"
  | "contacts"
  | "hero"
  | "eom"
  | "blog";

interface DashboardSummaryProps {
  projectsCount: number;
  servicesCount: number;
  jobsCount: number;
  contacts: ContactMessage[];
  onNavigate: (section: AdminSection) => void;
}

import API_BASE from '../../config/api';

const API = API_BASE;

const formatDate = (value: string) =>
  new Date(value).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

export const DashboardSummary = ({
  projectsCount,
  servicesCount,
  jobsCount,
  contacts,
  onNavigate,
}: DashboardSummaryProps) => {
  const [heroCount, setHeroCount] = useState<number | null>(null);
  const [eomCount, setEomCount] = useState<number | null>(null);
  const [blogPublished, setBlogPublished] = useState<number | null>(null);
  const [blogDrafts, setBlogDrafts] = useState<number | null>(null);

  useEffect(() => {
    // Hero images count (public endpoint)
    fetch(`${API}/hero-images`)
      .then((r) => r.json())
      .then((d) => { if (d.success) setHeroCount(d.data.length); })
      .catch(() => {});

    // Employee of Month count (public endpoint)
    fetch(`${API}/employee-of-month`)
      .then((r) => r.json())
      .then((d) => { if (d.success) setEomCount(d.data.length); })
      .catch(() => {});

    // Blog counts (admin endpoint for all including drafts)
    fetch(`${API}/admin/blogs`, { credentials: "include" })
      .then((r) => r.json())
      .then((d) => {
        if (d.success) {
          setBlogPublished(d.data.filter((b: { published: boolean }) => b.published).length);
          setBlogDrafts(d.data.filter((b: { published: boolean }) => !b.published).length);
        }
      })
      .catch(() => {});
  }, []);

  const contactsCount = contacts.length;
  const unreadCount = contacts.filter((c) => !c.read).length;
  const recentContacts = contacts.slice(0, 3);

  const stats: {
    label: string;
    value: number | string;
    sub: string;
    section: AdminSection;
    accent: string;
    badge?: string;
  }[] = [
    {
      label: "Projects",
      value: projectsCount,
      sub: "Portfolio entries",
      section: "projects",
      accent: "hover:border-slate-900",
    },
    {
      label: "Services",
      value: servicesCount,
      sub: "Offerings listed",
      section: "services",
      accent: "hover:border-blue-600",
    },
    {
      label: "Open Roles",
      value: jobsCount,
      sub: "Career positions",
      section: "jobs",
      accent: "hover:border-violet-600",
    },
    {
      label: "Messages",
      value: contactsCount,
      sub: unreadCount > 0 ? `${unreadCount} unread` : "All read",
      section: "contacts",
      accent: "hover:border-emerald-600",
      badge: unreadCount > 0 ? String(unreadCount) : undefined,
    },
    {
      label: "Hero Images",
      value: heroCount ?? "—",
      sub: "Homepage slider",
      section: "hero",
      accent: "hover:border-orange-500",
    },
    {
      label: "Employee of Month",
      value: eomCount ?? "—",
      sub: "All records",
      section: "eom",
      accent: "hover:border-amber-500",
    },
    {
      label: "Blog Posts",
      value: blogPublished ?? "—",
      sub:
        blogDrafts !== null && blogDrafts > 0
          ? `${blogDrafts} draft${blogDrafts !== 1 ? "s" : ""}`
          : "All published",
      section: "blog",
      accent: "hover:border-pink-600",
      badge: blogDrafts !== null && blogDrafts > 0 ? `${blogDrafts} drafts` : undefined,
    },
  ];

  const quickActions: { label: string; section: AdminSection }[] = [
    { label: "+ Add project", section: "projects" },
    { label: "+ Add service", section: "services" },
    { label: "+ Post job", section: "jobs" },
    { label: "+ Upload hero image", section: "hero" },
    { label: "+ New blog post", section: "blog" },
    { label: "+ Add employee of month", section: "eom" },
  ];

  return (
    <div className="space-y-10">
      {/* Page title */}
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Dashboard</h1>
        <p className="mt-1 text-sm text-slate-500">
          Overview of all website content. Click a card to manage that section.
        </p>
      </div>

      {/* Stat cards — 2 col mobile, 4 col desktop */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <button
            key={stat.label}
            type="button"
            onClick={() => onNavigate(stat.section)}
            className={`group relative rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm transition hover:shadow-md ${stat.accent}`}
          >
            {stat.badge && (
              <span className="absolute right-4 top-4 rounded-full bg-red-500 px-2 py-0.5 text-[10px] font-bold text-white">
                {stat.badge}
              </span>
            )}
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 transition group-hover:text-slate-600">
              {stat.label}
            </p>
            <p className="mt-3 text-4xl font-semibold text-slate-900">
              {stat.value}
            </p>
            <p className="mt-3 flex items-center gap-1 text-xs text-slate-400 transition group-hover:text-slate-600">
              {stat.sub}
              <span className="ml-auto opacity-0 transition group-hover:opacity-100">→</span>
            </p>
          </button>
        ))}
      </div>

      {/* Quick actions */}
      <div className="flex flex-wrap gap-3">
        {quickActions.map((action) => (
          <button
            key={action.label}
            type="button"
            onClick={() => onNavigate(action.section)}
            className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-900 hover:bg-slate-50"
          >
            {action.label}
          </button>
        ))}
      </div>

      {/* Recent messages */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-base font-semibold text-slate-900">Recent messages</h2>
          {contactsCount > 3 && (
            <button
              type="button"
              onClick={() => onNavigate("contacts")}
              className="text-sm text-slate-400 hover:text-slate-900"
            >
              View all {contactsCount} →
            </button>
          )}
        </div>

        {recentContacts.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-200 p-10 text-center">
            <p className="text-sm text-slate-400">No messages yet.</p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            {recentContacts.map((contact, idx) => (
              <div
                key={contact._id}
                className={`p-5 ${idx !== recentContacts.length - 1 ? "border-b border-slate-100" : ""} ${
                  !contact.read ? "bg-blue-50/40" : ""
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      {!contact.read && (
                        <span className="inline-block h-2 w-2 shrink-0 rounded-full bg-primary" />
                      )}
                      <p className="font-semibold text-slate-900">{contact.subject}</p>
                    </div>
                    <p className="mt-0.5 text-sm text-slate-500">
                      {contact.name} · {contact.email}
                    </p>
                    <p className="mt-2 line-clamp-2 text-sm text-slate-600">
                      {contact.message}
                    </p>
                  </div>
                  <time className="shrink-0 text-xs text-slate-400">
                    {formatDate(contact.createdAt)}
                  </time>
                </div>
              </div>
            ))}
            {contactsCount > 3 && (
              <button
                type="button"
                onClick={() => onNavigate("contacts")}
                className="block w-full border-t border-slate-100 py-3 text-center text-sm text-slate-400 transition hover:bg-slate-50 hover:text-slate-700"
              >
                View all {contactsCount} messages →
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
