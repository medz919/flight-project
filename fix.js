const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const searchForm = `<div class="search-form"><div class="search-form-row"><div class="search-form-group"><label>FROM</label><input type="text" id="fromInput" placeholder="e.g. MNL" maxlength="3" /></div><div class="search-form-group"><label>TO</label><input type="text" id="toInput" placeholder="e.g. SIN" maxlength="3" /></div><div class="search-form-group"><label>DATE</label><input type="date" id="dateInput" /></div><div class="search-form-group"><label>PASSENGERS</label><select id="passengersInput"><option value="1">1 Adult</option><option value="2">2 Adults</option><option value="3">3 Adults</option><option value="4">4 Adults</option></select></div><button id="searchFlightsBtn">SEARCH</button></div></div>`;

html = html.replace('<div class="controls">', searchForm + '<div class="controls">');
html = html.replace('async function loadFlights() {', 'async function loadFlights(origin, destination, date, passengers) {');
html = html.replace("body:JSON.stringify({origin:'MNL',destination:'SIN',date:'2026-06-01',adults:1})", "body:JSON.stringify({origin: origin||'MNL', destination: destination||'SIN', date: date||'2026-06-01', adults: parseInt(passengers)||1})");

fs.writeFileSync('index.html', html);
console.log('Done!');
