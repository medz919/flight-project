require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

const duffelHeaders = {
  'Authorization': 'Bearer ' + process.env.DUFFEL_API_KEY,
  'Duffel-Version': 'v2',
  'Content-Type': 'application/json'
};

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/flights/search', async (req, res) => {
  try {
    const { origin, destination, date, adults } = req.body;
    const offerRequest = await axios.post('https://api.duffel.com/air/offer_requests', {
      data: {
        slices: [{ origin, destination, departure_date: date }],
        passengers: Array(adults).fill({ type: 'adult' }),
        cabin_class: 'economy'
      }
    }, { headers: duffelHeaders });

    const offerId = offerRequest.data.data.id;
    const offers = await axios.get(
      'https://api.duffel.com/air/offers?offer_request_id=' + offerId + '&limit=50',
      { headers: duffelHeaders }
    );
    res.json(offers.data);
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to search flights' });
  }
});

app.post('/flights/book', async (req, res) => {
  try {
    const { offerId, passengers } = req.body;
    const order = await axios.post('https://api.duffel.com/air/orders', {
      data: {
        type: 'instant',
        selected_offers: [offerId],
        passengers
      }
    }, { headers: duffelHeaders });
    res.json(order.data);
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to book flight' });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log('Server running on port ' + PORT);
});
