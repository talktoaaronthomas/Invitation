import React from 'react';
import {
  ArrowLeft,
  Share2,
  Eye,
  Sliders,
  Calendar,
  Sparkles
} from 'lucide-react';
import { downloadICS } from '../utils/calendar';

export function Header({
  currentScreen,
  viewMode,
  setViewMode,
  onOpenShare,
  onOpenTemplates,
  invitationData
}) {
  // On homepage: show only the clean, minimal luxury brand banner
  if (currentScreen === 'templates') {
    return (
      <header className="site-header site-header-homepage">
        <div className="header-brand">
          <div className="brand-crest">
            <span className="brand-crest-icon">✦</span>
          </div>
          <div className="brand-text">
            <span className="brand-name">AURA</span>
            <span className="brand-tagline">Haute Stationery Studio</span>
          </div>
        </div>
      </header>
    );
  }

  // Inside Studio / Editor view:
  return (
    <header className="site-header">
      <div className="header-brand" onClick={onOpenTemplates} style={{ cursor: 'pointer' }} title="Return to Templates">
        <div className="brand-crest">
          <span className="brand-crest-icon">✦</span>
        </div>
        <div className="brand-text">
          <span className="brand-name">AURA</span>
          <span className="brand-tagline">Haute Stationery Studio</span>
        </div>
      </div>

      {/* Center Controls: Back to Templates + Mode Switcher */}
      <div className="header-center-nav">
        <button
          type="button"
          className="btn-header-templates"
          onClick={onOpenTemplates}
          title="Return to homepage to choose a template"
        >
          <ArrowLeft size={14} />
          <span>Change Template</span>
        </button>

        <div className="header-mode-toggle">
          <button
            type="button"
            className={`mode-btn ${viewMode === 'editor' ? 'active' : ''}`}
            onClick={() => setViewMode('editor')}
          >
            <Sliders size={14} />
            <span>Studio Editor</span>
          </button>

          <button
            type="button"
            className={`mode-btn ${viewMode === 'guest' ? 'active' : ''}`}
            onClick={() => setViewMode('guest')}
          >
            <Eye size={14} />
            <span>Guest View</span>
          </button>
        </div>
      </div>

      {/* Right Actions (No Guest Roster) */}
      <div className="header-actions">
        <button
          type="button"
          className="btn-header-action"
          onClick={() => downloadICS(invitationData)}
          title="Download calendar event file"
        >
          <Calendar size={14} />
          <span className="hide-mobile">Add to Calendar</span>
        </button>

        <button
          type="button"
          className="btn-header-action share-btn"
          onClick={onOpenShare}
          title="Share invitation link & QR code"
        >
          <Share2 size={14} />
          <span>Share</span>
        </button>
      </div>
    </header>
  );
}
