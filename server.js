require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

const PORT = process.env.PORT || 3001;

const duffelHeaders = {
  'Authorization': `Bearer ${process.env.DUFFEL_API_KEY}`,
  'Duffel-Version': 'v2',
  'Content-Type': 'application/json'
};

// TEST ROUTE
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
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

app.get("/", (req, res) => {
});

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
