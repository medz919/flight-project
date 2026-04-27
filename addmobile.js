const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const mobileCSS = `
@media (max-width: 768px) {
  /* Search form stacks vertically */
  .search-form-row {
    flex-direction: column !important;
    gap: 10px !important;
  }
  .search-form-group {
    width: 100% !important;
  }
  /* Search button full width */
  #searchFlightsBtn {
    width: 100% !important;
    padding: 12px !important;
    font-size: 16px !important;
  }
  /* Header smaller */
  header h1, .departures-title {
    font-size: 24px !important;
  }
  /* Hide VIA and SCHEDULED columns on mobile */
  .col-via, .cell-via,
  .col-scheduled, .cell-scheduled {
    display: none !important;
  }
  /* Flight rows smaller */
  .flight-row, .board-header {
    grid-template-columns: 60px 1fr 1fr !important;
    font-size: 12px !important;
  }
  /* Status badge smaller */
  .status-badge {
    font-size: 10px !important;
    padding: 3px 6px !important;
  }
  /* Filters wrap */
  .filters {
    flex-wrap: wrap !important;
    gap: 6px !important;
  }
  .filter-btn {
    font-size: 11px !important;
    padding: 4px 10px !important;
  }
  /* Clock smaller */
  .clock {
    font-size: 16px !important;
  }
  /* Passengers dropdown full width */
  #passengersInput {
    width: 100% !important;
  }
  /* Date input full width */
  #dateInput {
    width: 100% !important;
  }
  /* Controls padding */
  .controls {
    padding: 8px 12px !important;
  }
  /* Board container */
  .board-container {
    padding: 8px 12px !important;
  }
  /* Autocomplete dropdown */
  .autocomplete-dropdown {
    font-size: 12px !important;
  }
  .autocomplete-item {
    padding: 8px 10px !important;
  }
}

@media (max-width: 480px) {
  /* Extra small phones */
  .flight-number {
    font-size: 11px !important;
  }
  header {
    padding: 10px 12px !important;
  }
  .col-airline, .cell-airline {
    display: none !important;
  }
  .flight-row, .board-header {
    grid-template-columns: 55px 1fr 80px !important;
  }
}`;

html = html.replace('</style>', mobileCSS + '\n</style>');
fs.writeFileSync('index.html', html);
console.log('Done!');
