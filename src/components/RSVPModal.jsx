import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { X, Check, Calendar, Download, Sparkles, HeartHandshake, ShieldCheck, Music, Utensils, Users } from 'lucide-react';
import { sound } from '../utils/sound';
import { downloadICS, getGoogleCalendarUrl } from '../utils/calendar';

export function RSVPModal({
  isOpen,
  onClose,
  invitationData,
  onSaveRSVP,
  existingRSVP = null
}) {
  const [status, setStatus] = useState(existingRSVP?.status || 'attending');
  const [name, setName] = useState(existingRSVP?.name || '');
  const [email, setEmail] = useState(existingRSVP?.email || '');
  const [guestsCount, setGuestsCount] = useState(existingRSVP?.guests || 1);
  const [guestNames, setGuestNames] = useState(existingRSVP?.guestNames || '');
  const [dietary, setDietary] = useState(existingRSVP?.dietary || 'None');
  const [customDietary, setCustomDietary] = useState('');
  const [song, setSong] = useState(existingRSVP?.song || '');
  const [message, setMessage] = useState(existingRSVP?.message || '');
  const [submitted, setSubmitted] = useState(false);
  const [savedPassData, setSavedPassData] = useState(null);

  const dietaryOptions = ['None', 'Vegetarian', 'Vegan', 'Gluten-Free', 'Halal', 'Kosher', 'Nut Allergy', 'Other'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    const rsvpEntry = {
      id: existingRSVP?.id || `rsvp_${Date.now()}`,
      name: name.trim(),
      email: email.trim(),
      status,
      guests: status === 'attending' ? Number(guestsCount) : 0,
      guestNames: status === 'attending' && guestsCount > 1 ? guestNames.trim() : name.trim(),
      dietary: dietary === 'Other' && customDietary ? customDietary.trim() : dietary,
      song: song.trim(),
      message: message.trim(),
      timestamp: 'Just now'
    };

    onSaveRSVP(rsvpEntry);
    setSavedPassData(rsvpEntry);

    if (status === 'attending') {
      sound.playCelebrationChime();
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#d4af37', '#f3e5ab', '#e0bfb8', '#ffffff', '#b76e79']
        });
      } catch {
        // fallback
      }
    }

    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-luxury-window rsvp-window"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close dialog"
        >
          <X size={18} />
        </button>

        {!submitted ? (
          <form className="rsvp-form" onSubmit={handleSubmit}>
            <div className="modal-header">
              <span className="modal-eyebrow">Haute Réponse</span>
              <h2 className="modal-title">Répondez S'il Vous Plaît</h2>
              <p className="modal-subtitle">
                {invitationData.rsvpDeadline || 'Kindly confirm your attendance'}
              </p>
            </div>

            {/* Attendance Toggle Buttons */}
            <div className="rsvp-status-toggle">
              <button
                type="button"
                className={`status-choice-btn ${status === 'attending' ? 'active-attending' : ''}`}
                onClick={() => setStatus('attending')}
              >
                <Sparkles size={16} className="btn-icon" />
                <div className="choice-text">
                  <span className="choice-primary">Joyfully Accepts</span>
                  <span className="choice-secondary">I will attend with pleasure</span>
                </div>
              </button>

              <button
                type="button"
                className={`status-choice-btn ${status === 'declined' ? 'active-declined' : ''}`}
                onClick={() => setStatus('declined')}
              >
                <HeartHandshake size={16} className="btn-icon" />
                <div className="choice-text">
                  <span className="choice-primary">Regretfully Declines</span>
                  <span className="choice-secondary">Celebrating with you in spirit</span>
                </div>
              </button>
            </div>

            {/* Guest Form Fields */}
            <div className="form-fields-group">
              <div className="form-row">
                <label className="input-label" htmlFor="rsvp-guest-name">
                  Full Name <span className="req">*</span>
                </label>
                <input
                  id="rsvp-guest-name"
                  type="text"
                  required
                  placeholder="e.g. Lady Vivienne Montgomery"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="luxury-input"
                />
              </div>

              <div className="form-row">
                <label className="input-label" htmlFor="rsvp-guest-email">
                  Email Address (for VIP entry pass & calendar dispatch)
                </label>
                <input
                  id="rsvp-guest-email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="luxury-input"
                />
              </div>

              {status === 'attending' && (
                <>
                  {invitationData.rsvpSettings?.allowPlusOnes && (
                    <div className="form-row party-size-row">
                      <label className="input-label" htmlFor="party-count">
                        <Users size={14} className="label-icon" />
                        <span>Total Guests in Party</span>
                      </label>
                      <div className="guest-stepper">
                        {[1, 2, 3, 4].map((num) => (
                          <button
                            key={num}
                            type="button"
                            className={`stepper-btn ${guestsCount === num ? 'active' : ''}`}
                            onClick={() => setGuestsCount(num)}
                          >
                            {num}
                          </button>
                        ))}
                      </div>

                      {guestsCount > 1 && (
                        <input
                          type="text"
                          placeholder="Names of additional accompanying guests"
                          value={guestNames}
                          onChange={(e) => setGuestNames(e.target.value)}
                          className="luxury-input nested-input"
                        />
                      )}
                    </div>
                  )}

                  {invitationData.rsvpSettings?.askDietary && (
                    <div className="form-row">
                      <label className="input-label">
                        <Utensils size={14} className="label-icon" />
                        <span>Dietary Preferences / Allergies</span>
                      </label>
                      <div className="dietary-pills-grid">
                        {dietaryOptions.map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            className={`dietary-pill ${dietary === opt ? 'active' : ''}`}
                            onClick={() => setDietary(opt)}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                      {dietary === 'Other' && (
                        <input
                          type="text"
                          placeholder="Please specify your dietary restriction"
                          value={customDietary}
                          onChange={(e) => setCustomDietary(e.target.value)}
                          className="luxury-input nested-input"
                        />
                      )}
                    </div>
                  )}

                  {invitationData.rsvpSettings?.askSongRequest && (
                    <div className="form-row">
                      <label className="input-label" htmlFor="rsvp-song">
                        <Music size={14} className="label-icon" />
                        <span>Song Request for the Orchestra / DJ</span>
                      </label>
                      <input
                        id="rsvp-song"
                        type="text"
                        placeholder="e.g. Can't Take My Eyes Off You — Frankie Valli"
                        value={song}
                        onChange={(e) => setSong(e.target.value)}
                        className="luxury-input"
                      />
                    </div>
                  )}
                </>
              )}

              <div className="form-row">
                <label className="input-label" htmlFor="rsvp-message">
                  {invitationData.rsvpSettings?.customFieldLabel || 'Note for the Hosts'}
                </label>
                <textarea
                  id="rsvp-message"
                  rows={2}
                  placeholder="Leave a heartfelt note or congratulatory wish..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="luxury-textarea"
                />
              </div>
            </div>

            <div className="form-actions">
              <button type="button" className="btn-secondary" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="btn-primary-luxury">
                <Check size={16} />
                <span>Confirm RSVP</span>
              </button>
            </div>
          </form>
        ) : (
          /* ================= CONFIRMATION & VIP PASS ================= */
          <div className="rsvp-confirmation">
            <div className="confirm-icon-seal">
              <ShieldCheck size={36} className="seal-gold-icon" />
            </div>

            <span className="modal-eyebrow">Confirmation Received</span>
            <h2 className="modal-title">
              {savedPassData.status === 'attending'
                ? 'We Look Forward to Welcoming You'
                : 'Thank You for Letting Us Know'}
            </h2>
            <p className="modal-subtitle">
              {savedPassData.status === 'attending'
                ? `Your VIP reservation for ${savedPassData.guests} guest${savedPassData.guests > 1 ? 's' : ''} has been registered.`
                : 'Your warm wishes have been relayed to the hosts.'}
            </p>

            {savedPassData.status === 'attending' && (
              <div className="vip-pass-card">
                <div className="vip-pass-header">
                  <span className="vip-pass-badge">AURA VIP PASS</span>
                  <span className="vip-pass-monogram">{invitationData.monogram}</span>
                </div>
                <div className="vip-pass-body">
                  <h3 className="vip-guest-name">{savedPassData.name}</h3>
                  <div className="vip-details-grid">
                    <div>
                      <span className="vip-lbl">DATE</span>
                      <span className="vip-val">{invitationData.dateFormatted}</span>
                    </div>
                    <div>
                      <span className="vip-lbl">TIME</span>
                      <span className="vip-val">{invitationData.timeFormatted}</span>
                    </div>
                    <div>
                      <span className="vip-lbl">GUESTS</span>
                      <span className="vip-val">{savedPassData.guests}</span>
                    </div>
                    <div>
                      <span className="vip-lbl">DRESS CODE</span>
                      <span className="vip-val">{invitationData.dressCode}</span>
                    </div>
                  </div>
                  <div className="vip-venue-row">
                    <span className="vip-lbl">VENUE</span>
                    <span className="vip-val">{invitationData.venue}</span>
                  </div>

                  {/* Clean SVG Mock QR Code */}
                  <div className="vip-qr-wrapper">
                    <svg viewBox="0 0 100 100" className="vip-qr-code">
                      <rect width="100" height="100" fill="#ffffff" />
                      {/* Corner markers */}
                      <rect x="10" y="10" width="25" height="25" fill="#1c1b18" />
                      <rect x="15" y="15" width="15" height="15" fill="#ffffff" />
                      <rect x="18" y="18" width="9" height="9" fill="#1c1b18" />

                      <rect x="65" y="10" width="25" height="25" fill="#1c1b18" />
                      <rect x="70" y="15" width="15" height="15" fill="#ffffff" />
                      <rect x="73" y="18" width="9" height="9" fill="#1c1b18" />

                      <rect x="10" y="65" width="25" height="25" fill="#1c1b18" />
                      <rect x="15" y="70" width="15" height="15" fill="#ffffff" />
                      <rect x="18" y="73" width="9" height="9" fill="#1c1b18" />

                      {/* Random aesthetic QR bits */}
                      <rect x="42" y="12" width="6" height="6" fill="#1c1b18" />
                      <rect x="52" y="18" width="6" height="6" fill="#1c1b18" />
                      <rect x="42" y="30" width="6" height="6" fill="#1c1b18" />
                      <rect x="48" y="42" width="6" height="6" fill="#1c1b18" />
                      <rect x="60" y="45" width="6" height="6" fill="#1c1b18" />
                      <rect x="15" y="45" width="6" height="6" fill="#1c1b18" />
                      <rect x="25" y="52" width="6" height="6" fill="#1c1b18" />
                      <rect x="70" y="65" width="8" height="8" fill="#1c1b18" />
                      <rect x="80" y="78" width="6" height="6" fill="#1c1b18" />
                      <rect x="45" y="75" width="6" height="6" fill="#1c1b18" />
                      <rect x="55" y="82" width="8" height="8" fill="#1c1b18" />
                    </svg>
                    <span className="qr-caption">Scan for rapid check-in at reception</span>
                  </div>
                </div>
              </div>
            )}

            <div className="confirmation-actions">
              {savedPassData.status === 'attending' && (
                <button
                  type="button"
                  className="btn-calendar-action"
                  onClick={() => downloadICS(invitationData)}
                >
                  <Download size={15} />
                  <span>Download .ICS Calendar Event</span>
                </button>
              )}

              <div className="modal-sub-actions">
                <button type="button" className="btn-text-link" onClick={handleReset}>
                  Edit My Response
                </button>
                <button type="button" className="btn-primary-luxury" onClick={onClose}>
                  Done
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
