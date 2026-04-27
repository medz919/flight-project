const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

// Find and log what segments look like
const match = html.match(/segments = slice\.segments/);
console.log('Segments line found:', match ? 'YES' : 'NO');
