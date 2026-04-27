const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Add autocomplete styles before </style>
const autocompleteCSS = `
.autocomplete-wrapper {
  position: relative;
  width: 100%;
}
.autocomplete-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: #1a1a2e;
  border: 1px solid #c9a84c;
  border-top: none;
  max-height: 250px;
  overflow-y: auto;
  z-index: 1000;
  display: none;
}
.autocomplete-item {
  padding: 10px 14px;
  cursor: pointer;
  color: #fff;
  font-size: 13px;
  border-bottom: 1px solid rgba(201,168,76,0.1);
}
.autocomplete-item:hover {
  background: rgba(201,168,76,0.2);
}
.autocomplete-item .iata {
  font-weight: bold;
  color: #c9a84c;
  margin-right: 8px;
}
.autocomplete-item .city {
  color: #aaa;
  font-size: 11px;
}`;

html = html.replace('</style>', autocompleteCSS + '\n</style>');

// Add autocomplete JS before </script>
const autocompleteJS = `
const airports = [
  {iata:'MNL',name:'Ninoy Aquino International',city:'Manila',country:'Philippines'},
  {iata:'CEB',name:'Mactan-Cebu International',city:'Cebu',country:'Philippines'},
  {iata:'DVO',name:'Francisco Bangoy International',city:'Davao',country:'Philippines'},
  {iata:'LHR',name:'Heathrow Airport',city:'London',country:'UK'},
  {iata:'LGW',name:'Gatwick Airport',city:'London',country:'UK'},
  {iata:'JFK',name:'John F Kennedy International',city:'New York',country:'USA'},
  {iata:'LAX',name:'Los Angeles International',city:'Los Angeles',country:'USA'},
  {iata:'SFO',name:'San Francisco International',city:'San Francisco',country:'USA'},
  {iata:'ORD',name:"O'Hare International",city:'Chicago',country:'USA'},
  {iata:'SIN',name:'Singapore Changi Airport',city:'Singapore',country:'Singapore'},
  {iata:'HKG',name:'Hong Kong International',city:'Hong Kong',country:'China'},
  {iata:'NRT',name:'Narita International',city:'Tokyo',country:'Japan'},
  {iata:'HND',name:'Haneda Airport',city:'Tokyo',country:'Japan'},
  {iata:'ICN',name:'Incheon International',city:'Seoul',country:'South Korea'},
  {iata:'BKK',name:'Suvarnabhumi Airport',city:'Bangkok',country:'Thailand'},
  {iata:'KUL',name:'Kuala Lumpur International',city:'Kuala Lumpur',country:'Malaysia'},
  {iata:'SYD',name:'Sydney Airport',city:'Sydney',country:'Australia'},
  {iata:'MEL',name:'Melbourne Airport',city:'Melbourne',country:'Australia'},
  {iata:'DXB',name:'Dubai International',city:'Dubai',country:'UAE'},
  {iata:'AUH',name:'Abu Dhabi International',city:'Abu Dhabi',country:'UAE'},
  {iata:'DOH',name:'Hamad International',city:'Doha',country:'Qatar'},
  {iata:'CDG',name:'Charles de Gaulle Airport',city:'Paris',country:'France'},
  {iata:'AMS',name:'Amsterdam Schiphol',city:'Amsterdam',country:'Netherlands'},
  {iata:'FRA',name:'Frankfurt Airport',city:'Frankfurt',country:'Germany'},
  {iata:'MAD',name:'Adolfo Suárez Madrid–Barajas',city:'Madrid',country:'Spain'},
  {iata:'BCN',name:'Barcelona–El Prat',city:'Barcelona',country:'Spain'},
  {iata:'FCO',name:'Leonardo da Vinci International',city:'Rome',country:'Italy'},
  {iata:'MXP',name:'Milan Malpensa Airport',city:'Milan',country:'Italy'},
  {iata:'PVG',name:'Shanghai Pudong International',city:'Shanghai',country:'China'},
  {iata:'PEK',name:'Beijing Capital International',city:'Beijing',country:'China'},
  {iata:'CGK',name:'Soekarno-Hatta International',city:'Jakarta',country:'Indonesia'},
  {iata:'SGN',name:'Tan Son Nhat International',city:'Ho Chi Minh City',country:'Vietnam'},
  {iata:'HAN',name:'Noi Bai International',city:'Hanoi',country:'Vietnam'},
  {iata:'DAD',name:'Da Nang International',city:'Da Nang',country:'Vietnam'},
  {iata:'DEL',name:'Indira Gandhi International',city:'New Delhi',country:'India'},
  {iata:'BOM',name:'Chhatrapati Shivaji International',city:'Mumbai',country:'India'},
  {iata:'YYZ',name:'Toronto Pearson International',city:'Toronto',country:'Canada'},
  {iata:'YVR',name:'Vancouver International',city:'Vancouver',country:'Canada'},
  {iata:'GRU',name:'São Paulo/Guarulhos International',city:'São Paulo',country:'Brazil'},
  {iata:'EZE',name:'Ministro Pistarini International',city:'Buenos Aires',country:'Argentina'},
  {iata:'JNB',name:'O.R. Tambo International',city:'Johannesburg',country:'South Africa'},
  {iata:'CAI',name:'Cairo International',city:'Cairo',country:'Egypt'},
  {iata:'IST',name:'Istanbul Airport',city:'Istanbul',country:'Turkey'},
  {iata:'ZRH',name:'Zurich Airport',city:'Zurich',country:'Switzerland'},
  {iata:'VIE',name:'Vienna International Airport',city:'Vienna',country:'Austria'},
  {iata:'CPH',name:'Copenhagen Airport',city:'Copenhagen',country:'Denmark'},
  {iata:'ARN',name:'Stockholm Arlanda Airport',city:'Stockholm',country:'Sweden'},
  {iata:'OSL',name:'Oslo Gardermoen Airport',city:'Oslo',country:'Norway'},
  {iata:'HEL',name:'Helsinki Vantaa Airport',city:'Helsinki',country:'Finland'},
  {iata:'MAN',name:'Manchester Airport',city:'Manchester',country:'UK'},
];

function setupAutocomplete(inputId, dropdownId) {
  const input = document.getElementById(inputId);
  const dropdown = document.getElementById(dropdownId);
  if (!input || !dropdown) return;

  input.addEventListener('input', function() {
    const val = this.value.toLowerCase().trim();
    dropdown.innerHTML = '';
    if (val.length < 1) { dropdown.style.display = 'none'; return; }

    const matches = airports.filter(a =>
      a.iata.toLowerCase().includes(val) ||
      a.name.toLowerCase().includes(val) ||
      a.city.toLowerCase().includes(val) ||
      a.country.toLowerCase().includes(val)
    ).slice(0, 8);

    if (matches.length === 0) { dropdown.style.display = 'none'; return; }

    matches.forEach(a => {
      const item = document.createElement('div');
      item.className = 'autocomplete-item';
      item.innerHTML = '<span class="iata">' + a.iata + '</span>' + a.name + '<br><span class="city">' + a.city + ', ' + a.country + '</span>';
      item.addEventListener('click', function() {
        input.value = a.iata;
        dropdown.style.display = 'none';
      });
      dropdown.appendChild(item);
    });
    dropdown.style.display = 'block';
  });

  document.addEventListener('click', function(e) {
    if (!input.contains(e.target) && !dropdown.contains(e.target)) {
      dropdown.style.display = 'none';
    }
  });
}

setupAutocomplete('fromInput', 'fromDropdown');
setupAutocomplete('toInput', 'toDropdown');`;

html = html.replace('</script>', autocompleteJS + '\n</script>');

// Also fix toInput to have dropdown
html = html.replace(
  '<input type="text" id="toInput" placeholder="e.g. SIN" maxlength="3" />',
  '<div class="autocomplete-wrapper"><input type="text" id="toInput" placeholder="City or airport..." autocomplete="off" /><div class="autocomplete-dropdown" id="toDropdown"></div></div>'
);

fs.writeFileSync('index.html', html);
console.log('Done!');
