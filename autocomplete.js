const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const oldInputs = `<input type="text" id="fromInput" placeholder="e.g. MNL" maxlength="3" />`;

const newInputs = `<div class="autocomplete-wrapper">
  <input type="text" id="fromInput" placeholder="City or airport..." autocomplete="off" />
  <div class="autocomplete-dropdown" id="fromDropdown"></div>
</div>`;

html = html.replace(oldInputs, newInputs);
fs.writeFileSync('index.html', html);
console.log('Done:', !html.includes(oldInputs) ? 'YES' : 'NO');
