import React, { useState, useRef } from 'react';
import {
  Type,
  Palette,
  ListOrdered,
  Settings,
  Plus,
  Trash2,
  Sparkles,
  Check,
  Calendar,
  Layers,
  Sliders,
  UploadCloud,
  Image as ImageIcon,
  X,
  RefreshCw
} from 'lucide-react';
import {
  THEMES,
  FONT_PAIRINGS,
  FOIL_OPTIONS,
  BORDER_STYLES,
  HEADER_ARTWORK_PRESETS,
  HEADER_IMAGE_SHAPES,
  HEADER_IMAGE_HEIGHTS
} from '../data/presets';

export function VisualEditor({
  data,
  onChange
}) {
  const [activeTab, setActiveTab] = useState('content');
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const updateField = (field, value) => {
    onChange({
      ...data,
      [field]: value
    });
  };

  const handleImageFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file (PNG, JPG, SVG, WebP).');
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      updateField('headerImage', event.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      alert('Please drop a valid image file (PNG, JPG, SVG, WebP).');
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      updateField('headerImage', event.target.result);
    };
    reader.readAsDataURL(file);
  };

  const updateNestedField = (parent, field, value) => {
    onChange({
      ...data,
      [parent]: {
        ...data[parent],
        [field]: value
      }
    });
  };

  const handleAddItineraryItem = () => {
    const newItem = {
      time: '11:00 PM',
      title: 'Midnight Fireworks & Send-off',
      desc: 'Sparkler pathway outside the grand courtyard'
    };
    onChange({
      ...data,
      itinerary: [...(data.itinerary || []), newItem]
    });
  };

  const handleUpdateItinerary = (index, field, value) => {
    const newItinerary = [...data.itinerary];
    newItinerary[index] = {
      ...newItinerary[index],
      [field]: value
    };
    onChange({
      ...data,
      itinerary: newItinerary
    });
  };

  const handleDeleteItinerary = (index) => {
    const newItinerary = data.itinerary.filter((_, idx) => idx !== index);
    onChange({
      ...data,
      itinerary: newItinerary
    });
  };

  const handleThemeSelect = (theme) => {
    onChange({
      ...data,
      themeId: theme.id,
      foilType: theme.foilType
    });
  };

  return (
    <div className="visual-editor-container">
      {/* Editor Tab Navigation */}
      <div className="editor-nav-tabs">
        <button
          type="button"
          className={`editor-tab-btn ${activeTab === 'content' ? 'active' : ''}`}
          onClick={() => setActiveTab('content')}
          title="Edit text and event details"
        >
          <Type size={16} />
          <span>Details</span>
        </button>

        <button
          type="button"
          className={`editor-tab-btn ${activeTab === 'design' ? 'active' : ''}`}
          onClick={() => setActiveTab('design')}
          title="Themes, fonts, foil and borders"
        >
          <Palette size={16} />
          <span>Design</span>
        </button>



        <button
          type="button"
          className={`editor-tab-btn ${activeTab === 'itinerary' ? 'active' : ''}`}
          onClick={() => setActiveTab('itinerary')}
          title="Schedule of events"
        >
          <ListOrdered size={16} />
          <span>Program</span>
        </button>

        <button
          type="button"
          className={`editor-tab-btn ${activeTab === 'rsvp' ? 'active' : ''}`}
          onClick={() => setActiveTab('rsvp')}
          title="RSVP Form Settings"
        >
          <Settings size={16} />
          <span>RSVP</span>
        </button>
      </div>

      <div className="editor-tab-body">
        {/* ================= TAB 1: DETAILS & CONTENT ================= */}
        {activeTab === 'content' && (
          <div className="editor-section-group">
            {/* Header Artwork & Image Upload Section */}
            <div className="section-title-wrap">
              <h3 className="section-title">Header Artwork & Image</h3>
              <p className="section-desc">Upload a bespoke estate illustration, monogram, or venue photo for the invitation header</p>
            </div>

            {/* Hidden native file input */}
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleImageFileChange}
              style={{ display: 'none' }}
            />

            {data.headerImage ? (
              <div className="header-artwork-preview-card">
                <div className="header-preview-image-wrap">
                  <img
                    src={data.headerImage}
                    alt="Active Header Preview"
                    className="header-preview-thumb"
                  />
                  <div className="header-preview-badge">
                    <span>{HEADER_IMAGE_SHAPES.find((s) => s.id === (data.headerImageShape || 'arch'))?.name || 'Arch'}</span>
                  </div>
                </div>

                <div className="header-preview-actions">
                  <button
                    type="button"
                    className="btn-editor-action"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <RefreshCw size={13} />
                    <span>Upload New File</span>
                  </button>
                  <button
                    type="button"
                    className="btn-editor-action danger"
                    onClick={() => updateField('headerImage', null)}
                  >
                    <Trash2 size={13} />
                    <span>Remove Artwork</span>
                  </button>
                </div>

                {/* Framing & Shape Controls */}
                <div className="artwork-style-controls">
                  <div className="input-group">
                    <label className="editor-label">Header Silhouette Framing</label>
                    <div className="shape-picker-grid">
                      {HEADER_IMAGE_SHAPES.map((shape) => (
                        <button
                          key={shape.id}
                          type="button"
                          className={`shape-pill-btn ${(data.headerImageShape || 'arch') === shape.id ? 'active' : ''}`}
                          onClick={() => updateField('headerImageShape', shape.id)}
                        >
                          <span className="shape-name">{shape.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="input-group">
                    <label className="editor-label">Header Height Scale</label>
                    <div className="height-picker-row">
                      {HEADER_IMAGE_HEIGHTS.map((h) => (
                        <button
                          key={h.id}
                          type="button"
                          className={`height-pill-btn ${(data.headerImageHeight || 'standard') === h.id ? 'active' : ''}`}
                          onClick={() => updateField('headerImageHeight', h.id)}
                        >
                          <span>{h.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="checkbox-toggle-wrap">
                    <label className="custom-checkbox-row">
                      <input
                        type="checkbox"
                        checked={data.headerImageBorder !== false}
                        onChange={(e) => updateField('headerImageBorder', e.target.checked)}
                      />
                      <span className="checkbox-label">Gilded Hairline Frame Accent</span>
                    </label>
                  </div>
                </div>
              </div>
            ) : (
              <div
                className={`header-upload-dropzone ${isDragging ? 'is-dragging' : ''}`}
                onClick={() => fileInputRef.current?.click()}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <div className="dropzone-icon-circle">
                  <UploadCloud size={24} />
                </div>
                <div className="dropzone-text">
                  <span className="dropzone-main-text">Click to upload header image</span>
                  <span className="dropzone-sub-text">or drag and drop your image file here</span>
                  <span className="dropzone-specs">Supports PNG, JPG, SVG, WebP (up to 15MB)</span>
                </div>
              </div>
            )}

            {/* Curated Stationery Artwork Presets */}
            <div className="curated-presets-section">
              <span className="preset-row-label">Or choose a curated stationery artwork:</span>
              <div className="curated-artwork-grid">
                {HEADER_ARTWORK_PRESETS.map((preset) => (
                  <button
                    key={preset.id}
                    type="button"
                    className={`artwork-preset-thumb-btn ${data.headerImage === preset.url ? 'active' : ''}`}
                    onClick={() => {
                      updateField('headerImage', preset.url);
                    }}
                    title={preset.name}
                  >
                    <img src={preset.url} alt={preset.name} />
                    <span className="preset-thumb-title">{preset.name}</span>
                    {data.headerImage === preset.url && (
                      <div className="preset-active-check">
                        <Check size={10} />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="editor-divider" />

            <div className="section-title-wrap">
              <h3 className="section-title">Invitation Typography & Wording</h3>
              <p className="section-desc">Tailor every line with bespoke wording</p>
            </div>

            <div className="editor-input-grid">
              <div className="input-group">
                <label className="editor-label">Event Type Header</label>
                <input
                  type="text"
                  value={data.eventType}
                  onChange={(e) => updateField('eventType', e.target.value)}
                  className="editor-input"
                  placeholder="e.g. Black Tie Gala & Soirée"
                />
              </div>

              <div className="input-group">
                <label className="editor-label">Crest Monogram</label>
                <input
                  type="text"
                  value={data.monogram}
                  onChange={(e) => updateField('monogram', e.target.value)}
                  className="editor-input"
                  placeholder="e.g. E & A or V"
                  maxLength={6}
                />
              </div>
            </div>

            <div className="input-group">
              <label className="editor-label">Pre-title Announcement</label>
              <input
                type="text"
                value={data.preTitle}
                onChange={(e) => updateField('preTitle', e.target.value)}
                className="editor-input"
                placeholder="Together with their families"
              />
            </div>

            <div className="input-group">
              <label className="editor-label">Grand Title / Honorees</label>
              <textarea
                rows={2}
                value={data.title}
                onChange={(e) => updateField('title', e.target.value)}
                className="editor-input editor-textarea"
                placeholder="Elena Vance & Alexander Croft"
              />
              <span className="input-hint">Use Enter to create an elegant two-line title</span>
            </div>

            <div className="input-group">
              <label className="editor-label">Invitation Request Phrase</label>
              <input
                type="text"
                value={data.tagline}
                onChange={(e) => updateField('tagline', e.target.value)}
                className="editor-input"
                placeholder="Request the honor of your presence..."
              />
            </div>

            <div className="editor-divider" />

            <div className="editor-input-grid">
              <div className="input-group">
                <label className="editor-label">Date (Formatted Wording)</label>
                <input
                  type="text"
                  value={data.dateFormatted}
                  onChange={(e) => updateField('dateFormatted', e.target.value)}
                  className="editor-input"
                  placeholder="Saturday, October 24th, 2026"
                />
              </div>

              <div className="input-group">
                <label className="editor-label">Time (Formatted)</label>
                <input
                  type="text"
                  value={data.timeFormatted}
                  onChange={(e) => updateField('timeFormatted', e.target.value)}
                  className="editor-input"
                  placeholder="Six o’clock in the evening"
                />
              </div>
            </div>

            <div className="input-group">
              <label className="editor-label">Calendar Date Picker (For .ICS export)</label>
              <input
                type="datetime-local"
                value={data.rawDate ? data.rawDate.substring(0, 16) : ''}
                onChange={(e) => updateField('rawDate', e.target.value)}
                className="editor-input"
              />
            </div>

            <div className="input-group">
              <label className="editor-label">Venue Name</label>
              <input
                type="text"
                value={data.venue}
                onChange={(e) => updateField('venue', e.target.value)}
                className="editor-input"
                placeholder="The Grand Orangery at Belvedere Estate"
              />
            </div>

            <div className="input-group">
              <label className="editor-label">Venue Address / Region</label>
              <input
                type="text"
                value={data.address}
                onChange={(e) => updateField('address', e.target.value)}
                className="editor-input"
                placeholder="840 Crestview Terrace, Hudson Valley, NY"
              />
            </div>

            <div className="editor-input-grid">
              <div className="input-group">
                <label className="editor-label">Dress Code</label>
                <input
                  type="text"
                  value={data.dressCode}
                  onChange={(e) => updateField('dressCode', e.target.value)}
                  className="editor-input"
                  placeholder="Black Tie & Venetian Mask"
                />
              </div>

              <div className="input-group">
                <label className="editor-label">RSVP Deadline</label>
                <input
                  type="text"
                  value={data.rsvpDeadline}
                  onChange={(e) => updateField('rsvpDeadline', e.target.value)}
                  className="editor-input"
                  placeholder="Please respond by September 25th"
                />
              </div>
            </div>

            <div className="input-group">
              <label className="editor-label">Personal Note / Logistics Note</label>
              <textarea
                rows={2}
                value={data.note}
                onChange={(e) => updateField('note', e.target.value)}
                className="editor-input editor-textarea"
                placeholder="Cocktails and chamber quartet reception will commence upon arrival..."
              />
            </div>

            <div className="input-group">
              <label className="editor-label">Hosts Signature / Names</label>
              <input
                type="text"
                value={data.hosts}
                onChange={(e) => updateField('hosts', e.target.value)}
                className="editor-input"
                placeholder="Lord & Lady Vance and Ambassador Croft"
              />
            </div>
          </div>
        )}

        {/* ================= TAB 2: DESIGN & THEMES ================= */}
        {activeTab === 'design' && (
          <div className="editor-section-group">
            <div className="section-title-wrap">
              <h3 className="section-title">Luxury Themes & Palettes</h3>
              <p className="section-desc">Hand-curated haute aesthetic suites</p>
            </div>

            {/* Theme Presets Grid */}
            <div className="theme-presets-grid">
              {THEMES.map((theme) => (
                <button
                  key={theme.id}
                  type="button"
                  className={`theme-card-option ${data.themeId === theme.id ? 'active' : ''}`}
                  onClick={() => handleThemeSelect(theme)}
                >
                  <div
                    className="theme-card-preview"
                    style={{
                      backgroundColor: theme.cardBg,
                      borderColor: theme.cardBorder
                    }}
                  >
                    <span
                      className="preview-accent"
                      style={{ color: theme.accentText }}
                    >
                      ✦
                    </span>
                    <span
                      className="preview-txt"
                      style={{ color: theme.primaryText }}
                    >
                      Aa
                    </span>
                  </div>
                  <div className="theme-card-meta">
                    <span className="theme-card-name">{theme.name}</span>
                    <span className="theme-card-category">{theme.category}</span>
                  </div>
                  {data.themeId === theme.id && (
                    <div className="theme-card-check">
                      <Check size={12} />
                    </div>
                  )}
                </button>
              ))}
            </div>

            <div className="editor-divider" />

            {/* Typography Font Pairings */}
            <div className="section-title-wrap">
              <h4 className="section-subtitle">Typography Suite</h4>
              <p className="section-desc">Paired Google Fonts for editorial elegance</p>
            </div>

            <div className="font-pairings-list">
              {FONT_PAIRINGS.map((font) => (
                <button
                  key={font.id}
                  type="button"
                  className={`font-pair-option ${data.fontPairing === font.id ? 'active' : ''}`}
                  onClick={() => updateField('fontPairing', font.id)}
                >
                  <div className="font-pair-info">
                    <span
                      className="font-pair-title"
                      style={{ fontFamily: font.serifFamily }}
                    >
                      {font.name}
                    </span>
                    <span className="font-pair-desc">{font.desc}</span>
                  </div>
                  <span
                    className="font-pair-sample"
                    style={{ fontFamily: font.serifFamily }}
                  >
                    Vance & Croft
                  </span>
                </button>
              ))}
            </div>

            <div className="editor-divider" />

            {/* Foil Finishes */}
            <div className="section-title-wrap">
              <h4 className="section-subtitle">Metallic Foil Finishes</h4>
              <p className="section-desc">Dynamic reflective metallic shimmer</p>
            </div>

            <div className="foil-options-grid">
              {FOIL_OPTIONS.map((foil) => (
                <button
                  key={foil.id}
                  type="button"
                  className={`foil-choice-btn ${data.foilType === foil.id ? 'active' : ''}`}
                  onClick={() => updateField('foilType', foil.id)}
                >
                  <span
                    className="foil-swatch"
                    style={{ background: foil.gradient !== 'none' ? foil.gradient : '#555' }}
                  />
                  <span className="foil-name">{foil.name}</span>
                </button>
              ))}
            </div>

            <div className="editor-divider" />

            {/* Border Styling */}
            <div className="section-title-wrap">
              <h4 className="section-subtitle">Card Border Frame</h4>
              <p className="section-desc">Architectural lines & filigree geometry</p>
            </div>

            <div className="border-options-grid">
              {BORDER_STYLES.map((b) => (
                <button
                  key={b.id}
                  type="button"
                  className={`border-choice-btn ${data.borderStyle === b.id ? 'active' : ''}`}
                  onClick={() => updateField('borderStyle', b.id)}
                >
                  <span className="border-btn-name">{b.name}</span>
                  <span className="border-btn-desc">{b.desc}</span>
                </button>
              ))}
            </div>
          </div>
        )}



        {/* ================= TAB 4: ITINERARY / PROGRAM ================= */}
        {activeTab === 'itinerary' && (
          <div className="editor-section-group">
            <div className="section-title-wrap">
              <h3 className="section-title">Event Schedule & Itinerary</h3>
              <p className="section-desc">Displayed on the reverse side of the card</p>
            </div>

            <div className="itinerary-items-editor">
              {data.itinerary && data.itinerary.map((item, idx) => (
                <div key={idx} className="itinerary-edit-row">
                  <div className="itinerary-row-header">
                    <span className="itinerary-item-num">Item #{idx + 1}</span>
                    <button
                      type="button"
                      className="btn-trash-item"
                      onClick={() => handleDeleteItinerary(idx)}
                      title="Remove schedule milestone"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>

                  <div className="editor-input-grid">
                    <input
                      type="text"
                      value={item.time}
                      onChange={(e) => handleUpdateItinerary(idx, 'time', e.target.value)}
                      className="editor-input"
                      placeholder="e.g. 6:30 PM"
                    />
                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) => handleUpdateItinerary(idx, 'title', e.target.value)}
                      className="editor-input"
                      placeholder="Milestone title"
                    />
                  </div>

                  <input
                    type="text"
                    value={item.desc}
                    onChange={(e) => handleUpdateItinerary(idx, 'desc', e.target.value)}
                    className="editor-input"
                    placeholder="Short description or location"
                  />
                </div>
              ))}

              <button
                type="button"
                className="btn-add-itinerary"
                onClick={handleAddItineraryItem}
              >
                <Plus size={16} />
                <span>Add Schedule Milestone</span>
              </button>
            </div>

            <div className="editor-divider" />

            <div className="input-group">
              <label className="editor-label">Google Maps Link for Directions</label>
              <input
                type="text"
                value={data.directionsUrl}
                onChange={(e) => updateField('directionsUrl', e.target.value)}
                className="editor-input"
                placeholder="https://maps.google.com/?q=..."
              />
            </div>
          </div>
        )}

        {/* ================= TAB 5: RSVP FORM SETTINGS ================= */}
        {activeTab === 'rsvp' && (
          <div className="editor-section-group">
            <div className="section-title-wrap">
              <h3 className="section-title">RSVP Options & Rules</h3>
              <p className="section-desc">Configure fields presented to your guests</p>
            </div>

            <div className="rsvp-toggles-list">
              <label className="toggle-row">
                <div className="toggle-info">
                  <span className="toggle-title">Allow Plus-Ones / Party Size</span>
                  <span className="toggle-desc">Guests can RSVP for multiple people</span>
                </div>
                <input
                  type="checkbox"
                  checked={data.rsvpSettings?.allowPlusOnes ?? true}
                  onChange={(e) => updateNestedField('rsvpSettings', 'allowPlusOnes', e.target.checked)}
                  className="luxury-checkbox"
                />
              </label>

              <label className="toggle-row">
                <div className="toggle-info">
                  <span className="toggle-title">Ask Dietary Requirements & Allergies</span>
                  <span className="toggle-desc">Collect vegan, vegetarian, gluten-free choices</span>
                </div>
                <input
                  type="checkbox"
                  checked={data.rsvpSettings?.askDietary ?? true}
                  onChange={(e) => updateNestedField('rsvpSettings', 'askDietary', e.target.checked)}
                  className="luxury-checkbox"
                />
              </label>

              <label className="toggle-row">
                <div className="toggle-info">
                  <span className="toggle-title">Ask Song Request</span>
                  <span className="toggle-desc">Let guests suggest a favorite track for the band</span>
                </div>
                <input
                  type="checkbox"
                  checked={data.rsvpSettings?.askSongRequest ?? true}
                  onChange={(e) => updateNestedField('rsvpSettings', 'askSongRequest', e.target.checked)}
                  className="luxury-checkbox"
                />
              </label>
            </div>

            <div className="input-group" style={{ marginTop: '1.25rem' }}>
              <label className="editor-label">Custom Message Prompt</label>
              <input
                type="text"
                value={data.rsvpSettings?.customFieldLabel || ''}
                onChange={(e) => updateNestedField('rsvpSettings', 'customFieldLabel', e.target.value)}
                className="editor-input"
                placeholder="A celebratory message or note for the hosts"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
