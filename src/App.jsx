import React, { useState, useEffect } from 'react';
import './App.css';
import { Header } from './components/Header';
import { VisualEditor } from './components/VisualEditor';
import { InvitationStage } from './components/InvitationStage';
import { RSVPModal } from './components/RSVPModal';
import { ShareModal } from './components/ShareModal';
import { TemplateSelector } from './components/TemplateSelector';
import { TEMPLATES } from './data/templates';

export function App() {
  // Screen: 'templates' (Homepage with ONLY the 2 templates) | 'studio' (editor & preview)
  const [currentScreen, setCurrentScreen] = useState('templates');
  const [selectedTemplateId, setSelectedTemplateId] = useState(TEMPLATES[0].id);

  const [invitationData, setInvitationData] = useState(() => {
    try {
      const saved = localStorage.getItem('aura_invitation_data');
      if (saved) return JSON.parse(saved);
      return TEMPLATES[0].data;
    } catch {
      return TEMPLATES[0].data;
    }
  });



  const [viewMode, setViewMode] = useState('editor'); // 'editor' | 'guest'
  const [isRSVPModalOpen, setIsRSVPModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [userRSVP, setUserRSVP] = useState(null);

  // Sync invitationData to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('aura_invitation_data', JSON.stringify(invitationData));
    } catch {
      // storage unavailable
    }
  }, [invitationData]);

  // When user selects one of the 2 templates on the homepage
  const handleSelectTemplate = (template) => {
    setSelectedTemplateId(template.id);
    setInvitationData(template.data);
    setCurrentScreen('studio');
    setViewMode('editor');
  };

  const handleSaveRSVP = (newRSVP) => {
    setUserRSVP(newRSVP);
  };

  return (
    <div className="app-shell">
      {/* Top Header */}
      <Header
        currentScreen={currentScreen}
        viewMode={viewMode}
        setViewMode={setViewMode}
        onOpenShare={() => setIsShareModalOpen(true)}
        onOpenTemplates={() => setCurrentScreen('templates')}
        invitationData={invitationData}
      />

      {/* Screen 1: Homepage (ONLY the templates, nothing else) */}
      {currentScreen === 'templates' ? (
        <TemplateSelector
          onSelectTemplate={handleSelectTemplate}
          currentTemplateId={selectedTemplateId}
        />
      ) : (
        /* Screen 2: Studio Editor & Interactive Canvas */
        <main className="main-workspace">
          <div className={viewMode === 'editor' ? 'workspace-layout-editor' : 'workspace-layout-guest'}>
            {/* Left Column: Visual Customizer (Hidden in Guest View) */}
            {viewMode === 'editor' && (
              <VisualEditor
                data={invitationData}
                onChange={setInvitationData}
              />
            )}

            {/* Right Column / Centered Showcase: Direct Invitation Card */}
            <InvitationStage
              data={invitationData}
              onOpenRSVP={() => setIsRSVPModalOpen(true)}
              hasRSVPed={Boolean(userRSVP)}
            />
          </div>
        </main>
      )}

      {/* Interactive RSVP Form Modal */}
      <RSVPModal
        isOpen={isRSVPModalOpen}
        onClose={() => setIsRSVPModalOpen(false)}
        invitationData={invitationData}
        onSaveRSVP={handleSaveRSVP}
        existingRSVP={userRSVP}
      />

      {/* Share Modal & QR Code Generator */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        invitationData={invitationData}
      />
    </div>
  );
}

export default App;
