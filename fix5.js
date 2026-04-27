const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Replace hardcoded values with dynamic parameters
html = html.replace(
  "body:JSON.stringify({origin:'MNL',destination:'SIN',date:'2026-05-15',adults:1})",
  "body:JSON.stringify({origin: origin||'MNL', destination: destination||'SIN', date: date||'2026-06-01', adults: parseInt(passengers)||1})"
);

fs.writeFileSync('index.html', html);
console.log('Done! Fixed:', html.includes("origin: origin||'MNL'") ? 'YES' : 'NO');
