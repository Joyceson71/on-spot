'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';

export default function DealerFloatingButton() {
  const { openModal } = useApp();

  return (
    <button
      className="dealer-fab"
      id="dealer-fab"
      onClick={() => openModal('post-modal')}
      title="Post Work Requirement"
    >
      +
    </button>
  );
}
