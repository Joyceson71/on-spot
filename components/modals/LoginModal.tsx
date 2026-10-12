'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';

export default function LoginModal() {
  const { activeModal, closeModal, login } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (activeModal !== 'login-modal') {
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <div
      className={`modal-overlay ${activeModal === 'login-modal' ? 'open' : ''}`}
      id="login-modal"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeModal('login-modal');
      }}
    >
      <div className="modal-card">
        <div className="modal-header">
          <h3>Login to OnSpot</h3>
          <button className="close-btn" onClick={() => closeModal('login-modal')}>
            ✕
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email / Phone</label>
            <input
              type="text"
              className="form-control"
              id="login-email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              id="login-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div style={{ textAlign: 'right', marginBottom: '16px' }}>
            <a
              href="#"
              style={{
                fontSize: '12px',
                color: 'var(--mint-primary)',
                textDecoration: 'none',
              }}
              onClick={(e) => e.preventDefault()}
            >
              Forgot Password?
            </a>
          </div>
          <button
            type="submit"
            className="btn-action-primary"
            style={{ width: '100%', justifyContent: 'center', padding: '11px' }}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
