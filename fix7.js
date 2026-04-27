const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Update grid to add via column
html = html.replace(
  'grid-template-columns: 80px 140px 1fr 1fr 160px 120px',
  'grid-template-columns: 80px 140px 1fr 1fr 120px 160px 120px'
);

// Add VIA header
html = html.replace(
  '<div class="col-label col-scheduled">Scheduled</div>',
  '<div class="col-label">Via</div><div class="col-label col-scheduled">Scheduled</div>'
);

fs.writeFileSync('index.html', html);
console.log('Done!');
