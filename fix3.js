const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Check if searchFlightsBtn listener exists
if (!html.includes('searchFlightsBtn')) {
  console.log('Button not found!');
} else {
  console.log('Button found!');
}

// Force add button listener before closing script tag
html = html.replace('</script>', `
document.getElementById('searchFlightsBtn').onclick = function() {
  const from = document.getElementById('fromInput').value.toUpperCase().trim();
  const to = document.getElementById('toInput').value.toUpperCase().trim();
  const date = document.getElementById('dateInput').value;
  const passengers = document.getElementById('passengersInput').value;
  if (!from || !to || !date) { alert('Please fill in From, To, and Date!'); return; }
  loadFlights(from, to, date, passengers);
};
const tom = new Date();
tom.setDate(tom.getDate() + 1);
document.getElementById('dateInput').value = tom.toISOString().split('T')[0];
</script>`);

fs.writeFileSync('index.html', html);
console.log('Done!');
