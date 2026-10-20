export const THEMES = [
  {
    id: 'alabaster_gold',
    name: 'Alabaster & Radiant Gold',
    category: 'Ultra-Luxury',
    cardBg: '#faf8f5',
    cardBorder: '#d4af37',
    primaryText: '#1c1b18',
    secondaryText: '#68645e',
    accentText: '#a47c23',
    foilType: 'gold',
    envelopeColor: '#f3efe8',
    envelopeAccent: '#c59b27',
    liner: 'marble_gold',
    waxSealColor: '#a47c23',
    sealIcon: 'monogram'
  },
  {
    id: 'champagne_noir',
    name: 'Noir & Liquid Champagne',
    category: 'Haute Soirée',
    cardBg: '#131416',
    cardBorder: '#d4af37',
    primaryText: '#f5f4f0',
    secondaryText: '#9b9aa0',
    accentText: '#e5c46b',
    foilType: 'gold',
    envelopeColor: '#1d1e22',
    envelopeAccent: '#d4af37',
    liner: 'deco_gold',
    waxSealColor: '#2b2c31',
    sealIcon: 'wreath'
  },
  {
    id: 'emerald_brass',
    name: 'Royal Emerald & Antique Brass',
    category: 'Bespoke Gala',
    cardBg: '#0e1f18',
    cardBorder: '#c29b38',
    primaryText: '#f2f8f4',
    secondaryText: '#8fa99c',
    accentText: '#deb853',
    foilType: 'gold',
    envelopeColor: '#153227',
    envelopeAccent: '#deb853',
    liner: 'botanical',
    waxSealColor: '#10271e',
    sealIcon: 'wreath'
  },
  {
    id: 'rose_burgundy',
    name: 'Rose Quartz & Imperial Burgundy',
    category: 'Romantic Couture',
    cardBg: '#fdf7f7',
    cardBorder: '#b76e79',
    primaryText: '#2e0f15',
    secondaryText: '#7b545c',
    accentText: '#9d3d52',
    foilType: 'rose_gold',
    envelopeColor: '#3a111a',
    envelopeAccent: '#b76e79',
    liner: 'botanical_rose',
    waxSealColor: '#631828',
    sealIcon: 'rose'
  },
  {
    id: 'celestial_midnight',
    name: 'Celestial Midnight & Platinum',
    category: 'Modernist Evening',
    cardBg: '#0b0f19',
    cardBorder: '#94a3b8',
    primaryText: '#f8fafc',
    secondaryText: '#94a3b8',
    accentText: '#cbd5e1',
    foilType: 'silver',
    envelopeColor: '#131a29',
    envelopeAccent: '#cbd5e1',
    liner: 'celestial',
    waxSealColor: '#1e293b',
    sealIcon: 'star'
  },
  {
    id: 'warm_parchment',
    name: 'Warm Parchment & Espresso',
    category: 'Artisanal Minimal',
    cardBg: '#f6f2e9',
    cardBorder: '#c4baa6',
    primaryText: '#231e1a',
    secondaryText: '#71675c',
    accentText: '#8c5934',
    foilType: 'copper',
    envelopeColor: '#ebe4d8',
    envelopeAccent: '#8c5934',
    liner: 'linen',
    waxSealColor: '#783820',
    sealIcon: 'monogram'
  }
];

export const FONT_PAIRINGS = [
  {
    id: 'clash_raleway',
    name: 'Clash & Raleway',
    serifFamily: "'Clash Display', sans-serif",
    sansFamily: "'Raleway', sans-serif",
    accentFamily: "'Alex Brush', cursive",
    desc: 'Bespoke modern display with refined Raleway'
  },
  {
    id: 'cormorant_jakarta',
    name: 'Royale Editorial',
    serifFamily: "'Cormorant Garamond', Georgia, serif",
    sansFamily: "'Raleway', sans-serif",
    accentFamily: "'Alex Brush', cursive",
    desc: 'Editorial luxury with elegant Raleway'
  },
  {
    id: 'cinzel_montserrat',
    name: 'Imperial Roman',
    serifFamily: "'Cinzel', Georgia, serif",
    sansFamily: "'Raleway', sans-serif",
    accentFamily: "'Alex Brush', cursive",
    desc: 'Classic monumental caps & Raleway body'
  },
  {
    id: 'playfair_alex',
    name: 'Romantic Calligraphy',
    serifFamily: "'Playfair Display', Georgia, serif",
    sansFamily: "'Raleway', sans-serif",
    accentFamily: "'Alex Brush', cursive",
    desc: 'Bespoke wedding & high-society gala'
  },
  {
    id: 'prata_montserrat',
    name: 'Haute Fashion',
    serifFamily: "'Prata', Georgia, serif",
    sansFamily: "'Raleway', sans-serif",
    accentFamily: "'Alex Brush', cursive",
    desc: 'High contrast Didone fashion aesthetic'
  }
];

export const FOIL_OPTIONS = [
  { id: 'gold', name: '24K Liquid Gold', color: '#d4af37', gradient: 'linear-gradient(135deg, #bf953f, #fcf6ba, #b38728, #fbf5b7, #aa771c)' },
  { id: 'rose_gold', name: 'Rose Gold Foil', color: '#b76e79', gradient: 'linear-gradient(135deg, #b76e79, #f7d8d5, #c77e8a, #fae2e0, #964e59)' },
  { id: 'silver', name: 'Platinum Silver', color: '#cbd5e1', gradient: 'linear-gradient(135deg, #94a3b8, #f8fafc, #cbd5e1, #ffffff, #64748b)' },
  { id: 'copper', name: 'Antique Bronze', color: '#b87333', gradient: 'linear-gradient(135deg, #8b4513, #e69c69, #a0522d, #f4b486, #6b330e)' },
  { id: 'none', name: 'Matte Ink Only', color: 'currentColor', gradient: 'none' }
];

export const BORDER_STYLES = [
  { id: 'double_gold', name: 'Dual Fine Lines', desc: 'Double concentric luxury hairline' },
  { id: 'arch_frame', name: 'Architectural Arch', desc: 'Curved cathedral arch header' },
  { id: 'minimal_thin', name: 'Single Hairline', desc: 'Understated ultra-thin border' },
  { id: 'crest_corners', name: 'Corner Filigree', desc: 'Art-deco geometric corner notches' },
  { id: 'none', name: 'Borderless Clean', desc: 'Contemporary bleed edge' }
];

export const ENVELOPE_COLORS = [
  { id: 'alabaster', name: 'Warm Alabaster', hex: '#f4f0e8', flapHex: '#e8e2d6' },
  { id: 'noir', name: 'Obsidian Noir', hex: '#16171a', flapHex: '#1e2025' },
  { id: 'emerald', name: 'Deep Forest Emerald', hex: '#132c22', flapHex: '#1b3b2e' },
  { id: 'burgundy', name: 'Imperial Burgundy', hex: '#3d121c', flapHex: '#4f1a27' },
  { id: 'midnight', name: 'Midnight Navy', hex: '#111726', flapHex: '#1a2238' },
  { id: 'blush', name: 'Tuscan Blush', hex: '#ebd8d4', flapHex: '#dec6c1' }
];

export const WAX_COLORS = [
  { id: 'gold', name: 'Gilded Brass', hex: '#b38728', border: '#fcf6ba' },
  { id: 'burgundy', name: 'Wine Velvet', hex: '#581622', border: '#781d2e' },
  { id: 'noir', name: 'Onyx Black', hex: '#1e2024', border: '#333742' },
  { id: 'emerald', name: 'Forest Green', hex: '#163b2c', border: '#225842' },
  { id: 'blush', name: 'Rose Quartz', hex: '#995963', border: '#bd7782' }
];

export const WAX_ICONS = [
  { id: 'monogram', name: 'Crest Monogram' },
  { id: 'wreath', name: 'Olive Laurel' },
  { id: 'rose', name: 'Botanical Rose' },
  { id: 'star', name: 'Celestial Star' },
  { id: 'crown', name: 'Imperial Crown' }
];

export const HEADER_ARTWORK_PRESETS = [
  {
    id: 'estate_belvedere',
    name: 'Belvedere Chateau',
    category: 'Architecture',
    url: 'https://images.unsplash.com/photo-1544984243-ec57ea16fe25?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'noir_conservatory',
    name: 'Gilded Conservatory',
    category: 'Atmospheric',
    url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'botanical_olive',
    name: 'Tuscan Villa Flora',
    category: 'Botanical',
    url: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'cathedral_arch',
    name: 'Cathedral Archway',
    category: 'Minimal Arch',
    url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80'
  }
];

export const HEADER_IMAGE_SHAPES = [
  { id: 'arch', name: 'Cathedral Arch', desc: 'Classic rounded arched top' },
  { id: 'banner', name: 'Cinema Banner', desc: 'Wide landscape panorama' },
  { id: 'oval', name: 'Cameo Oval', desc: 'Regal medallion vignette' },
  { id: 'rounded', name: 'Soft Rounded', desc: 'Modern refined luxury frame' }
];

export const HEADER_IMAGE_HEIGHTS = [
  { id: 'compact', name: 'Compact', label: '100px' },
  { id: 'standard', name: 'Standard', label: '140px' },
  { id: 'dramatic', name: 'Dramatic', label: '185px' }
];

