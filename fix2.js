const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const searchCSS = `<style>
.search-form { background: #0f0f1a; padding: 20px 32px; border-bottom: 1px solid #1e1e35; }
.search-form-row { display: flex; gap: 12px; align-items: flex-end; flex-wrap: wrap; }
.search-form-group { display: flex; flex-direction: column; gap: 6px; }
.search-form-group label { font-size: 0.6rem; color: #f5c518; letter-spacing: 2px; font-family: 'Share Tech Mono', monospace; }
.search-form-group input, .search-form-group select { background: #13131f; border: 1px solid #1e1e35; color: #e8e8f0; padding: 8px 12px; font-family: 'Share Tech Mono', monospace; font-size: 0.85rem; outline: none; text-transform: uppercase; min-width: 100px; }
.search-form-group input:focus, .search-form-group select:focus { border-color: #f5c518; }
#searchFlightsBtn { background: #f5c518; color: #0a0a0f; border: none; padding: 8px 24px; font-family: 'Share Tech Mono', monospace; font-size: 0.85rem; letter-spacing: 2px; cursor: pointer; font-weight: bold; height: 36px; }
#searchFlightsBtn:hover { background: #fff; }
</style>`;

const searchJS = `
document.getElementById('searchFlightsBtn').addEventListener('click', function() {
  const from = document.getElementById('fromInput').value.toUpperCase().trim();
  const to = document.getElementById('toInput').value.toUpperCase().trim();
  const date = document.getElementById('dateInput').value;
  const passengers = document.getElementById('passengersInput').value;
  if (!from || !to || !date) { alert('Please fill in From, To, and Date!'); return; }
  loadFlights(from, to, date, passengers);
});
const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
document.getElementById('dateInput').value = tomorrow.toISOString().split('T')[0];`;

html = html.replace('</head>', searchCSS + '</head>');
html = html.replace('document.getElementById(\'refreshBtn\').addEventListener(\'click\', loadFlights);', 
  'document.getElementById(\'refreshBtn\').addEventListener(\'click\', loadFlights);' + searchJS);

fs.writeFileSync('index.html', html);
console.log('Done!');
