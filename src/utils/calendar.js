// Generates standard iCalendar (.ics) files for Apple Calendar, Google Calendar, Outlook

export function generateICS({ title, description, venue, address, startDate, endDate }) {
  const formatDate = (date) => {
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  };

  const start = startDate ? new Date(startDate) : new Date(Date.now() + 86400000 * 30);
  const end = endDate ? new Date(endDate) : new Date(start.getTime() + 4 * 60 * 60 * 1000); // 4 hours duration

  const now = formatDate(new Date());
  const dtStart = formatDate(start);
  const dtEnd = formatDate(end);
  const uid = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}@aura-invitations.com`;

  const location = [venue, address].filter(Boolean).join(', ');

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//AURA Haute Invitation Studio//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${now}`,
    `DTSTART:${dtStart}`,
    `DTEND:${dtEnd}`,
    `SUMMARY:${title || 'Special Event'}`,
    `DESCRIPTION:${(description || '').replace(/\n/g, '\\n')}`,
    `LOCATION:${location}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  return icsContent;
}

export function downloadICS(eventData) {
  const icsContent = generateICS({
    title: eventData.title,
    description: `${eventData.subtitle || ''}\n\nHost: ${eventData.hosts || ''}\nDress Code: ${eventData.dressCode || ''}\n\n${eventData.note || ''}`,
    venue: eventData.venue,
    address: eventData.address,
    startDate: eventData.rawDate || new Date().toISOString()
  });

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `${(eventData.title || 'event-invitation').toLowerCase().replace(/\s+/g, '-')}.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function getGoogleCalendarUrl(eventData) {
  const start = eventData.rawDate ? new Date(eventData.rawDate) : new Date(Date.now() + 86400000 * 30);
  const end = new Date(start.getTime() + 4 * 60 * 60 * 1000);

  const formatGoogleDate = (d) => d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: eventData.title || 'Special Event',
    dates: `${formatGoogleDate(start)}/${formatGoogleDate(end)}`,
    details: `${eventData.subtitle || ''}\nHosted by ${eventData.hosts || ''}\nDress code: ${eventData.dressCode || ''}`,
    location: [eventData.venue, eventData.address].filter(Boolean).join(', ')
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
