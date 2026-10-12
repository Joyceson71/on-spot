'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { ChatMessage } from '@/types';
import { getSupabaseBrowserClient, isSupabaseConfigured } from '@/lib/supabase/client';

export default function ChatModal() {
  const { activeModal, activeModalShift, closeModal, userProfile } = useApp();

  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const dealerName = activeModalShift?.dealerName || 'Dealer';
  const dealerAvatarLetter = dealerName.charAt(0).toUpperCase() || 'D';

  useEffect(() => {
    if (activeModal === 'chat-modal') {
      const convId = activeModalShift?.id || 'conv-general';

      // Default welcome message from dealer
      const initial: ChatMessage[] = [
        {
          id: 'welcome-msg',
          conversationId: convId,
          senderId: 'dealer_system',
          senderName: dealerName,
          receiverId: userProfile.id,
          message: `Hello! I am ${dealerName}. Thank you for your interest in "${activeModalShift?.title || 'our opening'}". How can I assist you?`,
          timestamp: new Date().toISOString(),
          read: true,
        },
      ];
      setMessages(initial);

      if (isSupabaseConfigured()) {
        const supabase = getSupabaseBrowserClient();

        // Fetch existing messages
        supabase
          .from('messages')
          .select('*')
          .eq('conversation_id', convId)
          .order('created_at', { ascending: true })
          .then(({ data: dbMsgs }) => {
            if (dbMsgs && dbMsgs.length > 0) {
              const mapped: ChatMessage[] = dbMsgs.map((m: any) => ({
                id: m.id,
                conversationId: m.conversation_id,
                senderId: m.sender_id,
                senderName: m.sender_id === userProfile.id ? userProfile.name : dealerName,
                receiverId: m.receiver_id || undefined,
                message: m.message,
                timestamp: m.created_at,
                read: m.read || false,
              }));
              setMessages([...initial, ...mapped]);
            }
          });

        // Realtime subscription for incoming messages
        const channel = supabase
          .channel(`chat:${convId}`)
          .on(
            'postgres_changes',
            {
              event: 'INSERT',
              schema: 'public',
              table: 'messages',
              filter: `conversation_id=eq.${convId}`,
            },
            (payload) => {
              const newMsg = payload.new as any;
              if (newMsg.sender_id !== userProfile.id) {
                setMessages((prev) => [
                  ...prev,
                  {
                    id: newMsg.id,
                    conversationId: newMsg.conversation_id,
                    senderId: newMsg.sender_id,
                    senderName: dealerName,
                    receiverId: newMsg.receiver_id || undefined,
                    message: newMsg.message,
                    timestamp: newMsg.created_at,
                    read: true,
                  },
                ]);
              }
            }
          )
          .subscribe();

        return () => {
          supabase.removeChannel(channel);
        };
      }
    }
  }, [activeModal, activeModalShift, dealerName, userProfile.id, userProfile.name]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  if (activeModal !== 'chat-modal') {
    return null;
  }

  const handleSend = () => {
    const text = inputMessage.trim();
    if (!text) return;

    const convId = activeModalShift?.id || 'conv-general';
    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      conversationId: convId,
      senderId: userProfile.id,
      senderName: userProfile.name,
      receiverId: activeModalShift?.dealerName || 'dealer',
      message: text,
      timestamp: new Date().toISOString(),
      read: true,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');

    if (isSupabaseConfigured()) {
      try {
        const supabase = getSupabaseBrowserClient();
        (supabase.from('messages') as any).insert({
          conversation_id: convId,
          sender_id: userProfile.id,
          message: text,
        });
      } catch (err) {
        console.warn('Supabase message send error:', err);
      }
    }

    // Simulated auto-reply
    setTimeout(() => {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        const replyMsg: ChatMessage = {
          id: `reply-${Date.now()}`,
          conversationId: convId,
          senderId: 'dealer_system',
          senderName: dealerName,
          receiverId: userProfile.id,
          message: `Thanks for your message! Looking forward to having you on shift for ${activeModalShift?.title || 'the gig'}.`,
          timestamp: new Date().toISOString(),
          read: true,
        };
        setMessages((prev) => [...prev, replyMsg]);
      }, 1500);
    }, 600);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div
      className={`chat-modal-overlay ${activeModal === 'chat-modal' ? 'open' : ''}`}
      id="chat-modal"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeModal('chat-modal');
      }}
    >
      <div className="chat-container">
        <div className="chat-header">
          <button className="chat-back-btn" onClick={() => closeModal('chat-modal')}>
            ‹
          </button>
          <div className="chat-avatar" id="chat-avatar-text">
            {dealerAvatarLetter}
          </div>
          <div className="chat-user-info">
            <div className="chat-user-name" id="chat-user-name">
              {dealerName}
            </div>
            <div className="chat-user-status" id="chat-user-status">
              Online
            </div>
          </div>
        </div>

        <div className="chat-messages" id="chat-messages">
          {messages.map((msg) => {
            const isSent = msg.senderId === userProfile.id;
            const timeStr = new Date(msg.timestamp).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            });
            return (
              <div
                key={msg.id}
                className={`chat-message ${isSent ? 'sent' : 'received'}`}
              >
                {msg.message}
                <span className="chat-message-time">{timeStr}</span>
              </div>
            );
          })}
          {isTyping && (
            <div className="chat-typing" id="chat-typing-indicator" style={{ padding: '0 16px' }}>
              typing...
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="chat-input-area">
          <input
            type="text"
            className="chat-input"
            id="chat-input"
            placeholder="Type a message..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button className="chat-send-btn" onClick={handleSend}>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
