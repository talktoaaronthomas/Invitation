import React from 'react';
import { Calendar, MapPin, Sparkles, ExternalLink, CheckCircle2, Clock, Download } from 'lucide-react';
import { FOIL_OPTIONS, FONT_PAIRINGS, THEMES } from '../data/presets';
import { downloadICS, getGoogleCalendarUrl } from '../utils/calendar';

export function InvitationCard({
  data,
  onOpenRSVP,
  hasRSVPed = false
}) {
  const currentTheme = THEMES.find((t) => t.id === data.themeId) || THEMES[0];
  const currentFont = FONT_PAIRINGS.find((f) => f.id === data.fontPairing) || FONT_PAIRINGS[0];
  const currentFoil = FOIL_OPTIONS.find((f) => f.id === data.foilType) || FOIL_OPTIONS[0];

  const foilGradient = currentFoil.gradient;
  const isDark = currentTheme.id === 'champagne_noir' || currentTheme.id === 'emerald_brass' || currentTheme.id === 'celestial_midnight';

  return (
    <div
      className={`invitation-card invitation-card-lengthy border-${data.borderStyle} ${isDark ? 'theme-dark' : 'theme-light'}`}
      style={{
        backgroundColor: currentTheme.cardBg,
        borderColor: currentTheme.cardBorder,
        color: currentTheme.primaryText,
        '--theme-primary': currentTheme.primaryText,
        '--theme-secondary': currentTheme.secondaryText,
        '--theme-accent': currentTheme.accentText,
        '--foil-gradient': foilGradient,
        '--foil-color': currentFoil.color,
        fontFamily: currentFont.sansFamily
      }}
    >
      {/* Subtle paper grain and foil sheen overlay */}
      <div className="card-paper-texture" />
      <div className="card-foil-sheen" />

      {/* Luxury Inner Frame */}
      <div className="card-inner-frame">
        {/* ================= HEADER CUSTOM ARTWORK / IMAGE ================= */}
        {data.headerImage && (
          <div
            className={`card-header-artwork-container shape-${data.headerImageShape || 'arch'} height-${data.headerImageHeight || 'standard'} ${data.headerImageBorder !== false ? 'has-gilded-border' : ''}`}
          >
            <img
              src={data.headerImage}
              alt="Invitation Header Artwork"
              className="header-artwork-image"
              loading="eager"
            />
            <div className="header-artwork-glow" />
          </div>
        )}

        {/* ================= 1. HEADER EVENT TYPE (NO FOIL CREST) ================= */}
        {data.eventType && (
          <div className="card-header-event">
            <span className="card-event-badge">
              {data.eventType}
            </span>
          </div>
        )}

        {/* ================= 2. PRE-TITLE & GRAND TITLE ================= */}
        <div className="card-pretitle">
          <p>{data.preTitle}</p>
        </div>

        <h1
          className="card-grand-title foil-text"
          style={{ fontFamily: currentFont.serifFamily }}
        >
          {data.title.split('\n').map((line, idx) => (
            <span key={idx} className="title-line">
              {line}
            </span>
          ))}
        </h1>

        <p className="card-tagline">
          {data.tagline}
        </p>

        <div className="gold-ornament-divider">
          <span className="divider-line" />
          <span className="divider-diamond">✦</span>
          <span className="divider-line" />
        </div>

        {/* ================= 3. DATE & TIME ================= */}
        <div className="card-datetime-block">
          <div className="date-display" style={{ fontFamily: currentFont.serifFamily }}>
            {data.dateFormatted}
          </div>
          <div className="time-display">
            {data.timeFormatted}
          </div>
        </div>

        {/* ================= 4. VENUE & LOCATION ================= */}
        <div className="card-venue-block">
          <h3 className="venue-name" style={{ fontFamily: currentFont.serifFamily }}>
            {data.venue}
          </h3>
          <p className="venue-address">{data.address}</p>
          {data.directionsUrl && (
            <a
              href={data.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="card-venue-link"
              onClick={(e) => e.stopPropagation()}
            >
              <MapPin size={13} />
              <span>View Map & Directions</span>
              <ExternalLink size={11} />
            </a>
          )}
        </div>

        {/* ================= 5. DRESS CODE & RSVP NOTICE ================= */}
        <div className="card-footer-details">
          <div className="dress-code-badge">
            <span className="badge-label">Dress Code</span>
            <span className="badge-value">{data.dressCode}</span>
          </div>
          <p className="rsvp-deadline">{data.rsvpDeadline}</p>
        </div>

        <div className="gold-ornament-divider small">
          <span className="divider-line" />
          <span className="divider-diamond">✦</span>
          <span className="divider-line" />
        </div>

        {/* ================= 6. PROGRAM & ITINERARY ================= */}
        <div className="card-section-program">
          <div className="program-header">
            <span className="program-eyebrow">The Program & Schedule</span>
            <h3
              className="program-title foil-text"
              style={{ fontFamily: currentFont.serifFamily }}
            >
              Order of Events
            </h3>
          </div>

          <div className="itinerary-timeline">
            {data.itinerary && data.itinerary.map((item, idx) => (
              <div key={idx} className="timeline-item">
                <div className="timeline-marker">
                  <span className="marker-dot" />
                  {idx < data.itinerary.length - 1 && <span className="marker-line" />}
                </div>
                <div className="timeline-content">
                  <span className="timeline-time">{item.time}</span>
                  <h4
                    className="timeline-item-title"
                    style={{ fontFamily: currentFont.serifFamily }}
                  >
                    {item.title}
                  </h4>
                  <p className="timeline-desc">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ================= 7. CALENDAR & LOGISTICS ================= */}
        <div className="card-calendar-bar">
          <span className="calendar-bar-lbl">Add to Your Calendar</span>
          <div className="calendar-btn-group">
            <button
              type="button"
              className="btn-calendar-link"
              onClick={(e) => {
                e.stopPropagation();
                downloadICS(data);
              }}
              title="Download .ICS for Apple Calendar, Outlook, or mobile"
            >
              <Download size={13} />
              <span>Download .ICS</span>
            </button>

            <a
              href={getGoogleCalendarUrl(data)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-calendar-link"
              onClick={(e) => e.stopPropagation()}
            >
              <Calendar size={13} />
              <span>Google Calendar</span>
            </a>
          </div>
        </div>

        {/* ================= 8. HOST NOTE & SIGNATURE ================= */}
        {data.note && (
          <div className="card-host-note-section">
            <p className="host-note-text">"{data.note}"</p>
            <span className="host-signature" style={{ fontFamily: currentFont.accentFamily }}>
              {data.hosts}
            </span>
          </div>
        )}

        {/* ================= 9. PRIMARY RSVP CALL TO ACTION ================= */}
        <div className="card-action-bar single-action-bar">
          <button
            type="button"
            className="btn-luxury-rsvp btn-rsvp-prominent"
            onClick={(e) => {
              e.stopPropagation();
              onOpenRSVP();
            }}
          >
            {hasRSVPed ? (
              <>
                <CheckCircle2 size={18} className="btn-icon" />
                <span>View / Edit Your RSVP</span>
              </>
            ) : (
              <>
                <Sparkles size={18} className="btn-icon foil-sparkle" />
                <span>Respond to Invitation</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
