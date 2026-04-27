const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Fix stops - segments is an array in slice
html = html.replace(
  `const stops = segments.length > 1 
    ? segments.slice(1).map(s => s.origin?.iata_code || '').filter(Boolean).join(', ') 
    : null;`,
  `const stops = segments.length > 1 
    ? segments.slice(1).map(s => s.origin?.iata_code || s.origin?.name || '').filter(Boolean).join(', ') 
    : null;`
);

fs.writeFileSync('index.html', html);
console.log('Done!');
