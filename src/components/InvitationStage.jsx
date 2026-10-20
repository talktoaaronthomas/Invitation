import React from 'react';
import { InvitationCard } from './InvitationCard';
import { Sparkles, Calendar, Share2 } from 'lucide-react';

export function InvitationStage({
  data,
  onOpenRSVP,
  hasRSVPed = false
}) {
  return (
    <div className="invitation-stage-showcase">
      {/* Floating Quick Action Bar */}
      <div className="stage-quick-controls">
        <button
          type="button"
          className="stage-ctrl-btn btn-highlight"
          onClick={onOpenRSVP}
        >
          <Sparkles size={14} />
          <span>{hasRSVPed ? 'View / Edit RSVP' : 'Respond to Invitation'}</span>
        </button>
      </div>

      {/* Main Invitation Card Presentation */}
      <div className="invitation-card-display-container">
        <InvitationCard
          data={data}
          onOpenRSVP={onOpenRSVP}
          hasRSVPed={hasRSVPed}
        />
      </div>
    </div>
  );
}
