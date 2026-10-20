import React from 'react';
import { ArrowRight, Palette, Feather, Clock } from 'lucide-react';
import { TEMPLATES } from '../data/templates';
import { FONT_PAIRINGS } from '../data/presets';

export function TemplateSelector({ onSelectTemplate, currentTemplateId }) {
  return (
    <div className="template-selector-screen">
      <div className="template-selector-container">
        {/* Header Hero */}
        <div className="template-hero-header">
          <span className="hero-step-badge">
            Select an Invitation Template
          </span>
          <h1 className="hero-main-title">
            Curated Bespoke Stationery Suites
          </h1>
          <p className="hero-main-desc">
            Choose a signature design to begin. You can customize all wording, font pairings, foil finishes, event schedule, and RSVP settings in the editor.
          </p>
        </div>

        {/* 2 Templates Showcase Grid */}
        <div className="templates-showcase-grid">
          {TEMPLATES.map((tmpl) => {
            const isDark = tmpl.data.themeId === 'champagne_noir';
            return (
              <div
                key={tmpl.id}
                className={`template-showcase-card ${currentTemplateId === tmpl.id ? 'is-selected' : ''}`}
                onClick={() => onSelectTemplate(tmpl)}
              >
                {/* Visual Preview Box */}
                <div
                  className="template-preview-viewport"
                  style={{
                    backgroundColor: tmpl.previewColor,
                    borderColor: tmpl.accentColor
                  }}
                >
                  {/* Card Front Miniature */}
                  <div
                    className={`preview-card-mini ${isDark ? 'mini-dark' : 'mini-light'}`}
                    style={{
                      backgroundColor: tmpl.previewColor,
                      color: isDark ? '#f5f4f0' : '#1c1b18',
                      borderColor: tmpl.accentColor
                    }}
                  >
                    {tmpl.data.headerImage && (
                      <div className="mini-header-artwork">
                        <img src={tmpl.data.headerImage} alt="" />
                      </div>
                    )}

                    <span className="mini-event-type">{tmpl.data.eventType}</span>

                    <h3
                      className="mini-card-title foil-text"
                      style={{
                        fontFamily: FONT_PAIRINGS.find((f) => f.id === tmpl.data.fontPairing)?.serifFamily || "'Clash Display', sans-serif"
                      }}
                    >
                      {tmpl.data.title.split('\n')[0]}
                    </h3>

                    <div className="mini-gold-divider">
                      <span className="line" style={{ background: tmpl.accentColor }} />
                      <span className="dot" style={{ color: tmpl.accentColor }}>✦</span>
                      <span className="line" style={{ background: tmpl.accentColor }} />
                    </div>

                    <span className="mini-date">{tmpl.data.dateFormatted}</span>
                    <span className="mini-venue">{tmpl.data.venue}</span>

                    <div className="mini-card-btn" style={{ borderColor: tmpl.accentColor, color: tmpl.accentColor }}>
                      <span>Respond</span>
                    </div>
                  </div>
                </div>

                <span className="template-badge-pill">{tmpl.badge}</span>

                {/* Card Meta & Details */}
                <div className="template-card-details">
                  <div className="template-title-group">
                    <span className="template-category-lbl">{tmpl.category}</span>
                    <h2 className="template-card-heading">{tmpl.title}</h2>
                    <p className="template-card-subheading">{tmpl.subtitle}</p>
                  </div>

                  <p className="template-card-description">{tmpl.description}</p>

                  {/* Features List */}
                  <div className="template-specs-list">
                    <div className="spec-pill">
                      <Palette size={13} className="spec-icon" />
                      <span>{tmpl.foilLabel}</span>
                    </div>
                    <div className="spec-pill">
                      <Feather size={13} className="spec-icon" />
                      <span>{tmpl.fontLabel}</span>
                    </div>
                    <div className="spec-pill">
                      <Clock size={13} className="spec-icon" />
                      <span>Full Schedule Timeline</span>
                    </div>
                  </div>

                  {/* Selection Button */}
                  <button
                    type="button"
                    className="btn-select-template"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectTemplate(tmpl);
                    }}
                  >
                    <span>Customize This Design</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
