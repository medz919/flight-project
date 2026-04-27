const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const oldStops = `stops = segments.slice(1).map(s => {
        const org = s.origin || {};
        return org.iata_code || org.iata_city_code || '';
      }).filter(Boolean).join(', ');`;

const newStops = `stops = segments.slice(0, -1).map(s => {
        const dest = s.destination || {};
        return dest.iata_code || dest.iata_city_code || '';
      }).filter(Boolean).join(', ');`;

html = html.replace(oldStops, newStops);
fs.writeFileSync('index.html', html);
console.log('Done! Replaced:', !html.includes(oldStops) ? 'YES' : 'NO');
