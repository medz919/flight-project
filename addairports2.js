const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const oldLine = `  {iata:'MNL',name:'Ninoy Aquino International',city:'Manila',country:'Philippines'},`;

const newLine = `  {iata:'MNL',name:'Ninoy Aquino International',city:'Manila',country:'Philippines'},
  {iata:'CRK',name:'Clark International Airport',city:'Clark',country:'Philippines'},
  {iata:'ILO',name:'Iloilo International Airport',city:'Iloilo',country:'Philippines'},
  {iata:'BCD',name:'Bacolod-Silay Airport',city:'Bacolod',country:'Philippines'},
  {iata:'GES',name:'General Santos International',city:'General Santos',country:'Philippines'},
  {iata:'KLO',name:'Kalibo International Airport',city:'Kalibo Boracay',country:'Philippines'},
  {iata:'MPH',name:'Godofredo P. Ramos Airport',city:'Caticlan Boracay',country:'Philippines'},
  {iata:'TAG',name:'Tagbilaran Airport',city:'Tagbilaran Bohol',country:'Philippines'},
  {iata:'PPS',name:'Puerto Princesa International',city:'Puerto Princesa',country:'Philippines'},
  {iata:'ZAM',name:'Zamboanga International Airport',city:'Zamboanga',country:'Philippines'},
  {iata:'CGY',name:'Laguindingan Airport',city:'Cagayan de Oro',country:'Philippines'},
  {iata:'DGT',name:'Sibulan Airport',city:'Dumaguete',country:'Philippines'},
  {iata:'TAC',name:'Daniel Z. Romualdez Airport',city:'Tacloban',country:'Philippines'},`;

html = html.replace(oldLine, newLine);
fs.writeFileSync('index.html', html);
console.log('Done:', !html.includes(oldLine) ? 'YES' : 'NO');
