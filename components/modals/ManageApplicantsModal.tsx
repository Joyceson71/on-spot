'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Applicant } from '@/types';
import { isSupabaseConfigured, getSupabaseBrowserClient } from '@/lib/supabase/client';

const defaultApplicantsList: Applicant[] = [
  {
    id: 'app-default-1',
    name: 'Ravi Shankar',
    rating: '4.9',
    gigs: 19,
    phone: '+91 98841 12345',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
  },
  {
    id: 'app-default-2',
    name: 'Priya Sundaram',
    rating: '5.0',
    gigs: 28,
    phone: '+91 94443 67890',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
  },
];

export default function ManageApplicantsModal() {
  const { activeModal, activeModalShift, closeModal, openModal, showToast } = useApp();
  const [hiredStatus, setHiredStatus] = useState<Record<string, boolean>>({});
  const [declinedIds, setDeclinedIds] = useState<Set<string>>(new Set());

  if (activeModal !== 'manage-modal') {
    return null;
  }

  const applicants: Applicant[] = activeModalShift?.applicants && activeModalShift.applicants.length > 0
    ? activeModalShift.applicants
    : defaultApplicantsList;

  const visibleApplicants = applicants.filter((app) => !declinedIds.has(app.id));

  const handleAccept = (appId: string, name: string) => {
    setHiredStatus((prev) => ({ ...prev, [appId]: true }));
    showToast(`Accepted ${name}! Shift confirmed.`);

    if (isSupabaseConfigured() && !appId.startsWith('app-default')) {
      const supabase = getSupabaseBrowserClient();
      supabase
        .from('applications')
        .update({ status: 'accepted' })
        .eq('id', appId)
        .then(() => {});
    }
  };

  const handleDecline = (appId: string) => {
    setDeclinedIds((prev) => {
      const next = new Set(prev);
      next.add(appId);
      return next;
    });
    showToast('Applicant declined.');

    if (isSupabaseConfigured() && !appId.startsWith('app-default')) {
      const supabase = getSupabaseBrowserClient();
      supabase
        .from('applications')
        .update({ status: 'rejected' })
        .eq('id', appId)
        .then(() => {});
    }
  };

  const handleTrack = (name: string) => {
    openModal('location-tracker-modal');
  };

  const handleComplete = (name: string) => {
    showToast(`Shift marked complete for ${name}!`);
  };

  return (
    <div
      className={`modal-overlay ${activeModal === 'manage-modal' ? 'open' : ''}`}
      id="manage-modal"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeModal('manage-modal');
      }}
    >
      <div className="modal-card">
        <div className="modal-header">
          <h3>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--mint-primary)"
              strokeWidth="2.5"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            Manage Shift Applicants
          </h3>
          <button className="close-btn" onClick={() => closeModal('manage-modal')}>
            ✕
          </button>
        </div>
        <div>
          <h4
            id="manage-post-title"
            style={{
              fontSize: '14px',
              color: 'var(--mint-primary)',
              marginBottom: '10px',
            }}
          >
            {activeModalShift?.title || 'Opening Title'}
          </h4>
          <div className="applicants-list" id="manage-applicants-list">
            {visibleApplicants.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '30px', color: 'var(--text-muted)' }}>
                No seekers applied yet. Your opening is live in the search feed.
              </div>
            ) : (
              visibleApplicants.map((app) => (
                <div className="applicant-item" id={`app-row-${app.id}`} key={app.id}>
                  {hiredStatus[app.id] ? (
                    <div
                      style={{
                        color: 'var(--mint-primary)',
                        fontWeight: 700,
                        fontSize: '12.5px',
                        padding: '8px 0',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '100%',
                      }}
                    >
                      <span>✓ {app.name} Hired!</span>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button
                          className="btn-action-primary"
                          style={{ padding: '4px 10px', fontSize: '11px' }}
                          onClick={() => handleTrack(app.name)}
                        >
                          Track
                        </button>
                        <button
                          className="btn-cancel"
                          style={{
                            padding: '4px 10px',
                            fontSize: '11px',
                            border: '1px solid var(--mint-primary)',
                            color: 'var(--mint-primary)',
                          }}
                          onClick={() => handleComplete(app.name)}
                        >
                          Complete
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="applicant-info">
                        <img src={app.avatar} className="applicant-avatar" alt={app.name} />
                        <div>
                          <div className="applicant-name">{app.name}</div>
                          <div className="applicant-sub">
                            ★ {app.rating} ({app.gigs} Gigs Completed) • {app.phone}
                          </div>
                        </div>
                      </div>
                      <div className="applicant-actions">
                        <button
                          className="btn-accept"
                          onClick={() => handleAccept(app.id, app.name)}
                        >
                          Accept &amp; Hire
                        </button>
                        <button
                          className="btn-decline"
                          onClick={() => handleDecline(app.id)}
                        >
                          Decline
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
