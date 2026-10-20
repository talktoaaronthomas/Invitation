export const INITIAL_INVITATION_DATA = {
  eventType: 'Black Tie Gala & Soirée',
  monogram: 'E & A',
  preTitle: 'Together with their families',
  title: 'Elena Vance\n& Alexander Croft',
  tagline: 'Request the honor of your presence to celebrate their Union',
  hosts: 'Lord & Lady Vance and Ambassador Croft',
  dateFormatted: 'Saturday, October 24th, 2026',
  rawDate: '2026-10-24T18:00:00',
  timeFormatted: 'Six o’clock in the evening',
  venue: 'The Grand Orangery at Belvedere Estate',
  address: '840 Crestview Terrace, Hudson Valley, New York',
  dressCode: 'Black Tie & Venetian Mask Encouraged',
  rsvpDeadline: 'Please respond by September 25th',
  note: 'Cocktails and chamber quartet reception will commence upon arrival. Valet parking provided at the North Gate.',
  
  // Design configuration
  themeId: 'alabaster_gold',
  fontPairing: 'clash_raleway',
  foilType: 'gold',
  borderStyle: 'double_gold',
  headerImage: 'https://images.unsplash.com/photo-1544984243-ec57ea16fe25?auto=format&fit=crop&w=1000&q=80',
  headerImageShape: 'arch',
  headerImageHeight: 'standard',
  headerImageBorder: true,
  envelopeColor: '#f4f0e8',
  linerPattern: 'marble_gold',
  waxSealColor: '#b38728',
  waxSealIcon: 'monogram',

  // Details for back of card
  itinerary: [
    { time: '6:00 PM', title: 'Sunset Cocktails & Strings', desc: 'Champagne and hors d’oeuvres on the south terrace' },
    { time: '7:15 PM', title: 'The Grand Entrance & Vows', desc: 'Exchange of promises in the glass conservatory' },
    { time: '8:30 PM', title: 'Curated Four-Course Dinner', desc: 'Seasonal tasting menu paired with biodynamic reserve wines' },
    { time: '10:00 PM', title: 'Midnight Waltz & Revelry', desc: 'Live jazz symphony orchestra and celebratory toast' }
  ],
  accommodations: 'A dedicated block of suites has been reserved at The St. Regis Hudson Valley under Croft-Vance.',
  directionsUrl: 'https://maps.google.com/?q=Belvedere+Estate+Hudson+Valley',
  
  // RSVP Form Options
  rsvpSettings: {
    allowPlusOnes: true,
    askDietary: true,
    askSongRequest: true,
    customFieldLabel: 'A celebratory message or blessing for the hosts'
  }
};

export const INITIAL_RSVPS = [
  {
    id: 'rsvp_1',
    name: 'Julian & Genevieve Laurent',
    email: 'j.laurent@prestige.com',
    status: 'attending',
    guests: 2,
    guestNames: 'Julian Laurent, Genevieve Laurent',
    dietary: 'Vegetarian',
    song: 'Claire de Lune — Claude Debussy',
    message: 'We are overjoyed for you both! Looking forward to an unforgettable night.',
    timestamp: '2 hours ago'
  },
  {
    id: 'rsvp_2',
    name: 'Lord Sebastian Sterling',
    email: 'sterling.estate@vance.uk',
    status: 'attending',
    guests: 1,
    guestNames: 'Sebastian Sterling',
    dietary: 'Gluten-Free',
    song: 'What a Wonderful World — Louis Armstrong',
    message: 'An absolute honor to witness this magnificent union.',
    timestamp: '5 hours ago'
  },
  {
    id: 'rsvp_3',
    name: 'Madeleine De La Tour',
    email: 'm.delatour@couture.fr',
    status: 'declined',
    guests: 0,
    guestNames: '',
    dietary: 'None',
    song: '',
    message: 'Sending all our love and warmest wishes across the Atlantic!',
    timestamp: 'Yesterday'
  },
  {
    id: 'rsvp_4',
    name: 'Marcus & Camille Vance',
    email: 'c.vance@archdesign.com',
    status: 'attending',
    guests: 2,
    guestNames: 'Marcus Vance, Camille Vance',
    dietary: 'None',
    song: 'La Vie En Rose — Édith Piaf',
    message: 'Counting the seconds until we toast together!',
    timestamp: '2 days ago'
  }
];
