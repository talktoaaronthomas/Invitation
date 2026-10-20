import React, { useState } from 'react';
import { X, Copy, Check, Share2, Mail, MessageCircle, QrCode } from 'lucide-react';

export function ShareModal({
  isOpen,
  onClose,
  invitationData
}) {
  const [copied, setCopied] = useState(false);
  const inviteUrl = typeof window !== 'undefined' ? window.location.href : 'https://aura-invitations.com';

  const handleCopy = () => {
    navigator.clipboard.writeText(inviteUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareEmail = `mailto:?subject=${encodeURIComponent(invitationData?.title ? invitationData.title + ' — You are cordially invited' : 'Invitation')}&body=${encodeURIComponent(
    `You are cordially invited to ${invitationData?.title || ''}.\n\nDate: ${invitationData?.dateFormatted || ''}\nVenue: ${invitationData?.venue || ''}\n\nOpen your bespoke invitation and RSVP here: ${inviteUrl}`
  )}`;

  const shareWhatsApp = `https://api.whatsapp.com/send?text=${encodeURIComponent(
    `You are cordially invited to *${invitationData?.title || ''}* on ${invitationData?.dateFormatted || ''}.\n\nView your invitation & RSVP here: ${inviteUrl}`
  )}`;

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-luxury-window share-window" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="modal-close-btn" onClick={onClose} aria-label="Close">
          <X size={18} />
        </button>

        <div className="modal-header">
          <span className="modal-eyebrow">Transmission Protocol</span>
          <h2 className="modal-title">Share Your Bespoke Invitation</h2>
          <p className="modal-subtitle">
            Recipients will experience the interactive 3D envelope opening and can RSVP directly.
          </p>
        </div>

        {/* QR Code Presentation */}
        <div className="share-qr-section">
          <div className="qr-gold-frame">
            <svg viewBox="0 0 100 100" className="share-qr-svg">
              <rect width="100" height="100" fill="#ffffff" rx="4" />
              {/* Corner position locators */}
              <rect x="10" y="10" width="24" height="24" fill="#1c1b18" />
              <rect x="14" y="14" width="16" height="16" fill="#ffffff" />
              <rect x="17" y="17" width="10" height="10" fill="#1c1b18" />

              <rect x="66" y="10" width="24" height="24" fill="#1c1b18" />
              <rect x="70" y="14" width="16" height="16" fill="#ffffff" />
              <rect x="73" y="17" width="10" height="10" fill="#1c1b18" />

              <rect x="10" y="66" width="24" height="24" fill="#1c1b18" />
              <rect x="14" y="70" width="16" height="16" fill="#ffffff" />
              <rect x="17" y="73" width="10" height="10" fill="#1c1b18" />

              {/* Data modules */}
              <rect x="42" y="12" width="6" height="6" fill="#1c1b18" />
              <rect x="52" y="18" width="6" height="6" fill="#1c1b18" />
              <rect x="42" y="28" width="6" height="6" fill="#1c1b18" />
              <rect x="52" y="38" width="6" height="6" fill="#1c1b18" />
              <rect x="14" y="44" width="6" height="6" fill="#1c1b18" />
              <rect x="24" y="50" width="6" height="6" fill="#1c1b18" />
              <rect x="68" y="44" width="6" height="6" fill="#1c1b18" />
              <rect x="78" y="52" width="6" height="6" fill="#1c1b18" />
              <rect x="42" y="68" width="6" height="6" fill="#1c1b18" />
              <rect x="54" y="76" width="6" height="6" fill="#1c1b18" />
              <rect x="70" y="70" width="6" height="6" fill="#1c1b18" />
              <rect x="80" y="80" width="6" height="6" fill="#1c1b18" />
            </svg>
          </div>
          <span className="qr-hint">Scan with mobile camera to view invitation</span>
        </div>

        {/* Copy Link Input */}
        <div className="share-link-box">
          <input
            type="text"
            readOnly
            value={inviteUrl}
            className="share-url-input"
          />
          <button
            type="button"
            className="btn-copy-link"
            onClick={handleCopy}
          >
            {copied ? (
              <>
                <Check size={14} className="text-gold" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy size={14} />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        {/* Quick Social / Email Buttons */}
        <div className="share-buttons-grid">
          <a
            href={shareWhatsApp}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-share-channel whatsapp"
          >
            <MessageCircle size={16} />
            <span>Send via WhatsApp</span>
          </a>

          <a
            href={shareEmail}
            className="btn-share-channel email"
          >
            <Mail size={16} />
            <span>Send via Email</span>
          </a>
        </div>
      </div>
    </div>
  );
}
