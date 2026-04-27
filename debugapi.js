const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const oldLine = `const segments = slice.segments || [];`;
const newLine = `const segments = slice.segments || [];
    console.log('SEGMENTS COUNT:', segments.length, 'DATA:', JSON.stringify(segments.map(s => ({from: s.origin?.iata_code, to: s.destination?.iata_code}))));`;

html = html.replace(oldLine, newLine);
fs.writeFileSync('index.html', html);
console.log('Done:', !html.includes(oldLine) ? 'YES' : 'NO');
