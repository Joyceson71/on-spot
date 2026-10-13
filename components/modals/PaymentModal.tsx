'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';

export default function PaymentModal() {
  const { activeModal, activeModalShift, closeModal, applyForJob, showToast } = useApp();
  const [method, setMethod] = useState<'upi' | 'card'>('upi');
  const [upiId, setUpiId] = useState('');
  const [cardNum, setCardNum] = useState('');
  const [cardExp, setCardExp] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardName, setCardName] = useState('');
  const [processing, setProcessing] = useState(false);

  if (activeModal !== 'payment-modal') {
    return null;
  }

  const handleProcessPayment = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      showToast('Payment Successful! Application Submitted.');
      if (activeModalShift) {
        applyForJob(activeModalShift);
      }
      closeModal('payment-modal');
    }, 1500);
  };

  return (
    <div
      className={`modal-overlay ${activeModal === 'payment-modal' ? 'open' : ''}`}
      id="payment-modal"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeModal('payment-modal');
      }}
    >
      <div className="modal-card">
        <div className="modal-header">
          <h3>Secure Payment</h3>
          <button className="close-btn" onClick={() => closeModal('payment-modal')}>
            ✕
          </button>
        </div>
        <div style={{ textAlign: 'center', margin: '0 0 20px 0' }}>
          <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Amount to Pay</div>
          <div
            style={{
              fontSize: '28px',
              fontWeight: 800,
              color: 'var(--mint-primary)',
              fontFamily: '"Space Grotesk", sans-serif',
            }}
            id="payment-amount-display"
          >
            {activeModalShift?.pay || '₹0'}
          </div>
        </div>
        <div className="form-group">
          <label>Payment Method</label>
          <select
            className="form-control"
            id="payment-method-select"
            value={method}
            onChange={(e) => setMethod(e.target.value as 'upi' | 'card')}
          >
            <option value="upi">UPI (GPay, PhonePe, Paytm, BHIM)</option>
            <option value="card">Debit / Credit Card</option>
          </select>
        </div>

        {method === 'upi' ? (
          <div id="payment-upi-fields" className="form-group">
            <label>Enter UPI ID</label>
            <input
              type="text"
              className="form-control"
              id="payment-upi-id"
              placeholder="e.g. name@okbank"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
            />
          </div>
        ) : (
          <div id="payment-card-fields">
            <div className="form-group">
              <label>Card Number</label>
              <input
                type="text"
                className="form-control"
                id="payment-card-num"
                placeholder="XXXX XXXX XXXX XXXX"
                value={cardNum}
                onChange={(e) => setCardNum(e.target.value)}
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Expiry Date</label>
                <input
                  type="text"
                  className="form-control"
                  id="payment-card-exp"
                  placeholder="MM/YY"
                  value={cardExp}
                  onChange={(e) => setCardExp(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>CVV</label>
                <input
                  type="password"
                  className="form-control"
                  id="payment-card-cvv"
                  placeholder="123"
                  value={cardCvv}
                  onChange={(e) => setCardCvv(e.target.value)}
                />
              </div>
            </div>
            <div className="form-group">
              <label>Card Holder Name</label>
              <input
                type="text"
                className="form-control"
                id="payment-card-name"
                placeholder="Name on card"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
              />
            </div>
          </div>
        )}

        <button
          type="button"
          className="btn-action-primary"
          style={{ width: '100%', justifyContent: 'center', padding: '11px' }}
          disabled={processing}
          onClick={handleProcessPayment}
        >
          {processing ? 'Processing...' : 'Pay Securely'}
        </button>
        <div
          style={{
            fontSize: '11px',
            color: 'var(--text-muted)',
            textAlign: 'center',
            marginTop: '10px',
          }}
        >
          🔒 This is a secure sandbox environment. Do not enter real banking credentials.
        </div>
      </div>
    </div>
  );
}
