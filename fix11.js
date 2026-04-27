const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// The segments array is inside slice but we need to access it differently
// Replace the entire allFlights mapping
const oldMap = `allFlights = (data.data || []).map(offer => {
    const slice = offer.slices?.[0] || {};
    const segments = slice.segments || [];
    const stops = segments.length > 1 
    ? segments.slice(1).map(s => s.origin?.iata_code || s.origin?.name || '').filter(Boolean).join(', ') 
    : null;
    const duration = slice.duration || null;
    return {
      flight: { iata: segments[0]?.operating_carrier_flight_number || '-' },
      airline: { name: offer.owner?.name || '-', iata: offer.owner?.iata_code || '' },
      departure: { iata: slice.origin?.iata_code || '-', airport: slice.origin?.name || '-', scheduled: slice.departing_at || null, delay: 0 },
      arrival: { iata: slice.destination?.iata_code || '-', airport: slice.destination?.name || '-' },
      flight_status: 'scheduled',
      stops: stops,
      duration: duration,
      segments: segments.length
    };
  });`;

const newMap = `allFlights = (data.data || []).map(offer => {
    const slice = offer.slices?.[0] || {};
    const segments = slice.segments || [];
    let stops = null;
    if (segments.length > 1) {
      stops = segments.slice(1).map(s => {
        const org = s.origin || {};
        return org.iata_code || org.iata_city_code || '';
      }).filter(Boolean).join(', ');
    }
    const duration = slice.duration || null;
    return {
      flight: { iata: segments[0]?.operating_carrier_flight_number || '-' },
      airline: { name: offer.owner?.name || '-', iata: offer.owner?.iata_code || '' },
      departure: { iata: slice.origin?.iata_code || '-', airport: slice.origin?.name || '-', scheduled: slice.departing_at || null, delay: 0 },
      arrival: { iata: slice.destination?.iata_code || '-', airport: slice.destination?.name || '-' },
      flight_status: 'scheduled',
      stops: stops || null,
      duration: duration,
      segments: segments.length
    };
  });`;

html = html.replace(oldMap, newMap);
fs.writeFileSync('index.html', html);
console.log('Done! Replaced:', !html.includes(oldMap) ? 'YES' : 'NO');
