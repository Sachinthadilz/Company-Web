import { useState } from "react";
import type { ContactMessage } from "../../types/contact";

interface ContactsSectionProps {
  contacts: ContactMessage[];
  onDelete: (id: string) => void;
  onReadToggle?: () => void; // called after read state changes so parent can refetch
}

const formatDate = (value: string) =>
  new Date(value).toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

import API_BASE from '../../config/api';

const API = API_BASE;

export const ContactsSection = ({
  contacts: initialContacts,
  onDelete,
  onReadToggle,
}: ContactsSectionProps) => {
  // Keep a local copy so we can optimistically toggle read without a full refetch
  const [contacts, setContacts] = useState<ContactMessage[]>(initialContacts);
  const [expandedId, setExpandedId] = useState<string | null>(
    initialContacts.length > 0 ? initialContacts[0]._id : null,
  );
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const unreadCount = contacts.filter((c) => !c.read).length;

  const handleDeleteClick = (id: string) => {
    if (confirmDeleteId === id) {
      onDelete(id);
      setContacts((prev) => prev.filter((c) => c._id !== id));
      setConfirmDeleteId(null);
      if (expandedId === id) setExpandedId(null);
    } else {
      setConfirmDeleteId(id);
    }
  };

  const toggleRead = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    // Optimistic local update — feels instant
    setContacts((prev) =>
      prev.map((c) => (c._id === id ? { ...c, read: !c.read } : c)),
    );
    try {
      await fetch(`${API}/admin/contacts/${id}/read`, {
        method: "PATCH",
        credentials: "include",
      });
      // Notify parent so DashboardSummary unread count updates too
      onReadToggle?.();
    } catch {
      // Revert on failure
      setContacts((prev) =>
        prev.map((c) => (c._id === id ? { ...c, read: !c.read } : c)),
      );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Messages</h1>
          <p className="mt-1 text-sm text-slate-500">
            {contacts.length === 0
              ? "No messages yet."
              : `${contacts.length} message${contacts.length !== 1 ? "s" : ""} · ${unreadCount} unread`}
          </p>
        </div>
        {unreadCount > 0 && (
          <span className="inline-flex items-center rounded-full bg-primary px-3 py-1 text-xs font-bold text-white">
            {unreadCount} new
          </span>
        )}
      </div>

      {contacts.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-200 py-16 text-center">
          <p className="text-sm text-slate-400">Your inbox is empty.</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          {contacts.map((contact, idx) => {
            const isExpanded = expandedId === contact._id;
            return (
              <div
                key={contact._id}
                className={`transition ${idx !== contacts.length - 1 ? "border-b border-slate-100" : ""} ${
                  !contact.read ? "bg-blue-50/40" : ""
                }`}
              >
                {/* Message header */}
                <div
                  className="flex cursor-pointer items-start justify-between gap-4 p-5 hover:bg-slate-50"
                  onClick={() => setExpandedId(isExpanded ? null : contact._id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setExpandedId(isExpanded ? null : contact._id);
                    }
                  }}
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-baseline gap-2">
                      {/* Unread dot */}
                      {!contact.read && (
                        <span className="inline-block h-2 w-2 shrink-0 rounded-full bg-primary mt-1.5" />
                      )}
                      <p className={`font-semibold text-slate-900 ${!contact.read ? "" : "font-medium"}`}>
                        {contact.subject}
                      </p>
                      {!isExpanded && (
                        <p className="line-clamp-1 text-sm text-slate-400">
                          {contact.message}
                        </p>
                      )}
                    </div>
                    <p className="mt-0.5 text-sm text-slate-500">
                      {contact.name} · {contact.email}
                    </p>
                  </div>

                  <div className="flex shrink-0 items-center gap-3">
                    <time className="hidden text-xs text-slate-400 sm:block">
                      {formatDate(contact.createdAt)}
                    </time>
                    <span className="text-slate-400">
                      {isExpanded ? "↑" : "↓"}
                    </span>
                  </div>
                </div>

                {/* Expanded body */}
                {isExpanded && (
                  <div className="border-t border-slate-100 bg-slate-50 px-5 pb-5 pt-4">
                    <time className="mb-3 block text-xs text-slate-400 sm:hidden">
                      {formatDate(contact.createdAt)}
                    </time>
                    <p className="whitespace-pre-wrap text-sm leading-relaxed text-slate-700">
                      {contact.message}
                    </p>

                    <div className="mt-4 flex flex-wrap items-center gap-3">
                      <a
                        href={`mailto:${contact.email}?subject=Re: ${encodeURIComponent(contact.subject)}`}
                        className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-900 hover:bg-slate-50"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Reply by email ↗
                      </a>

                      {/* Mark as read / unread toggle */}
                      <button
                        type="button"
                        onClick={(e) => toggleRead(contact._id, e)}
                        className={`rounded-xl border px-4 py-2 text-sm font-medium transition ${
                          contact.read
                            ? "border-slate-200 bg-white text-slate-500 hover:border-slate-400 hover:bg-slate-50"
                            : "border-primary/30 bg-primary/5 text-primary hover:bg-primary/10"
                        }`}
                      >
                        {contact.read ? "Mark as unread" : "✓ Mark as read"}
                      </button>

                      {confirmDeleteId === contact._id ? (
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteClick(contact._id);
                            }}
                            className="rounded-xl bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
                          >
                            Confirm delete
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setConfirmDeleteId(null);
                            }}
                            className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600 hover:bg-slate-50"
                          >
                            Keep
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteClick(contact._id);
                          }}
                          className="rounded-xl border border-red-100 px-4 py-2 text-sm font-medium text-red-500 transition hover:border-red-300 hover:bg-red-50"
                        >
                          Delete message
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
