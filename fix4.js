const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Remove duplicate onclick handler and replace with clean one
html = html.replace(
  `document.getElementById('searchFlightsBtn').onclick = function() {
  const from = document.getElementById('fromInput').value.toUpperCase().trim();
  const to = document.getElementById('toInput').value.toUpperCase().trim();
  const date = document.getElementById('dateInput').value;
  const passengers = document.getElementById('passengersInput').value;
  if (!from || !to || !date) { alert('Please fill in From, To, and Date!'); return; }
  loadFlights(from, to, date, passengers);
};`,
  ''
);

fs.writeFileSync('index.html', html);
console.log('Done!');
