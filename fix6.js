const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Update the allFlights mapping to include stops/connections
html = html.replace(
  `allFlights = (data.data || []).map(offer => ({
    flight: { iata: offer.slices?.[0]?.segments?.[0]?.operating_carrier_flight_number || '-' },
    airline: { name: offer.owner?.name || '-', iata: offer.owner?.iata_code || '' },
    departure: { iata: offer.slices?.[0]?.origin?.iata_code || '-', airport: offer.slices?.[0]?.origin?.name || '-', scheduled: offer.slices?.[0]?.departing_at || null, delay: 0 },
    arrival: { iata: offer.slices?.[0]?.destination?.iata_code || '-', airport: offer.slices?.[0]?.destination?.name || '-' },
    flight_status: 'scheduled'
  }));`,
  `allFlights = (data.data || []).map(offer => {
    const slice = offer.slices?.[0] || {};
    const segments = slice.segments || [];
    const stops = segments.length > 1 ? segments.slice(0, -1).map(s => s.destination?.iata_code || '').join(', ') : null;
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
  });`
);

// Update flight row to show stops and duration
html = html.replace(
  `<div class="airport-name">\${short(arr.airport || '', 22)}</div>
        </div>`,
  `<div class="airport-name">\${short(arr.airport || '', 22)}</div>
        </div>
        <div class="cell">
          <div class="airport-code" style="color: \${f.stops ? '#f5c518' : '#00e676'}; font-size:0.7rem;">\${f.stops ? 'VIA ' + f.stops : 'DIRECT'}</div>
          <div class="airport-name">\${f.duration ? f.duration.replace('PT','').toLowerCase() : ''}</div>
        </div>`
);

fs.writeFileSync('index.html', html);
console.log('Done!');
