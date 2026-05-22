const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname)));

const DUFFEL_TOKEN = process.env.DUFFEL_API_KEY;

const duffelHeaders = {
  'Authorization': 'Bearer ' + DUFFEL_TOKEN,
  'Duffel-Version': 'v2',
  'Content-Type': 'application/json',
  'Accept': 'application/json'
};

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/flights/search', async (req, res) => {
  try {
    const { origin, destination, date, passengers } = req.body;
    const response = await axios.post('https://api.duffel.com/air/offer_requests', {
      data: {
        slices: [{ origin, destination, departure_date: date }],
        passengers: Array(parseInt(passengers) || 1).fill({ type: 'adult' }),
        cabin_class: 'economy'
      }
    }, { headers: duffelHeaders });
    const requestId = response.data.data.id;
    const offersResponse = await axios.get(
      'https://api.duffel.com/air/offers?offer_request_id=' + requestId + '&limit=20',
      { headers: duffelHeaders }
    );
    res.json(offersResponse.data);
  } catch (error) {
    console.error('Search error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to search flights', details: error.response?.data });
  }
});

app.post('/flights/book', async (req, res) => {
  try {
    const { offerId, passengers, amount, currency } = req.body;
    const response = await axios.post('https://api.duffel.com/air/orders', {
      data: {
        type: 'instant',
        selected_offers: [offerId],
        passengers: passengers,
        payments: [{ type: 'balance', currency: currency || 'USD', amount: amount || '0.00' }]
      }
    }, { headers: duffelHeaders });
    res.json(response.data);
  } catch (error) {
    console.error('Booking error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to book flight', details: error.response?.data });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log('Server running on port ' + PORT);
});
