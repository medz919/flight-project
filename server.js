require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

const PORT = 3001;

const duffelHeaders = {
  'Authorization': `Bearer ${process.env.DUFFEL_API_KEY}`,
  'Duffel-Version': 'v2',
  'Content-Type': 'application/json'
};

// TEST ROUTE
app.get('/', (req, res) => {
  res.send('Flight API is working');
});

// SEARCH FLIGHTS
app.post('/flights/search', async (req, res) => {
  try {
    const { origin, destination, date, adults } = req.body;

    const offerRequest = await axios.post(
      'https://api.duffel.com/air/offer_requests',
      {
        data: {
          slices: [{
            origin: origin,
            destination: destination,
            departure_date: date
          }],
          passengers: [{ type: 'adult' }],
          cabin_class: 'economy'
        }
      },
      { headers: duffelHeaders }
    );

const offerId = offerRequest.data.data.id;

    const offers = await axios.get(
      `https://api.duffel.com/air/offers?offer_request_id=${offerId}&limit=50`,
      { headers: duffelHeaders }
    );

    const firstOffer = offers.data?.data?.[0];
  console.log('FIRST OFFER SLICES:', JSON.stringify(firstOffer?.slices?.[0]?.segments?.map(s => ({from: s.origin?.iata_code, to: s.destination?.iata_code})), null, 2));
  res.json(offers.data);

  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to search flights' });
  }
});

// BOOK FLIGHT
app.post('/flights/book', async (req, res) => {
  try {
    const { offerId, passengers } = req.body;

    const order = await axios.post(
      'https://api.duffel.com/air/orders',
      {
        data: {
          type: 'instant',
          selected_offers: [offerId],
          passengers: passengers
        }
      },
      { headers: duffelHeaders }
    );

    res.json(order.data);

  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to book flight' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});