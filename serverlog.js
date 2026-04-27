const fs = require('fs');
let code = fs.readFileSync('server.js', 'utf8');

const oldLine = `    res.json(offers.data);`;
const newLine = `    const firstOffer = offers.data?.data?.[0];
    console.log('SEGMENTS:', JSON.stringify(firstOffer?.slices?.[0]?.segments?.map(s => ({from: s.origin?.iata_code, to: s.destination?.iata_code})), null, 2));
    res.json(offers.data);`;

code = code.replace(oldLine, newLine);
fs.writeFileSync('server.js', code);
console.log('Done:', !code.includes(oldLine) ? 'YES' : 'NO');
