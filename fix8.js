const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Fix stops mapping - try different Duffel data structure
html = html.replace(
  "const stops = segments.length > 1 ? segments.slice(0, -1).map(s => s.destination?.iata_code || '').join(', ') : null;",
  "const stops = segments.length > 1 ? segments.slice(0, -1).map(s => s.destination?.iata_code || s.arriving_airport || '').join(', ') : null;"
);

fs.writeFileSync('index.html', html);
console.log('Done!');
