'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';

export default function LoginModal() {
  const { activeModal, closeModal, login, signup } = useApp();
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (activeModal !== 'login-modal') {
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSignUp) {
      signup(email, password, name);
    } else {
      login(email, password);
    }
  };

  const handleDemoLogin = () => {
    setEmail('demo@onspot.app');
    setPassword('Password123!');
    login('demo@onspot.app', 'Password123!');
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
          <h3>{isSignUp ? 'Create an OnSpot Account' : 'Login to OnSpot'}</h3>
          <button className="close-btn" onClick={() => closeModal('login-modal')}>
            ✕
          </button>
        </div>

        {/* Tab switch */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
          <button
            type="button"
            className="filter-chip"
            style={{
              flex: 1,
              justifyContent: 'center',
              background: !isSignUp ? 'var(--mint-primary)' : 'rgba(255,255,255,0.06)',
              color: !isSignUp ? '#05100a' : 'var(--text-secondary)',
              fontWeight: 700,
            }}
            onClick={() => setIsSignUp(false)}
          >
            Sign In
          </button>
          <button
            type="button"
            className="filter-chip"
            style={{
              flex: 1,
              justifyContent: 'center',
              background: isSignUp ? 'var(--mint-primary)' : 'rgba(255,255,255,0.06)',
              color: isSignUp ? '#05100a' : 'var(--text-secondary)',
              fontWeight: 700,
            }}
            onClick={() => setIsSignUp(true)}
          >
            Sign Up
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {isSignUp && (
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                className="form-control"
                id="signup-name"
                required={isSignUp}
                value={name}
                placeholder="e.g. Franklin Stanly"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}

          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              className="form-control"
              id="login-email"
              required
              value={email}
              placeholder="e.g. franklin@example.com"
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
              placeholder="Min 6 characters"
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
            style={{ width: '100%', justifyContent: 'center', padding: '11px', marginBottom: '10px' }}
          >
            {isSignUp ? 'Create Account' : 'Login'}
          </button>

          {!isSignUp && (
            <button
              type="button"
              className="btn-details"
              style={{
                width: '100%',
                justifyContent: 'center',
                padding: '9px',
                fontSize: '12px',
                border: '1px dashed var(--border-mint)',
                color: 'var(--mint-primary)',
              }}
              onClick={handleDemoLogin}
            >
              ⚡ Quick Login with Demo Account
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
