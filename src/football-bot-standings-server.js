const express = require('express');
const path = require('path');
const { getStandings, getStandingsData, getScheduleStringifyed, getAllData } = require('./football-bot');


const app = express();
const PORT = process.env.PORT || 3000;

// serve static files from public/
app.use(express.static(path.join(__dirname, '..', 'public')));

// proxy endpoint to avoid CORS
app.get('/api/standings', async (req, res) => {
  try {
        const data = await getStandingsData();
        res.json(data);
  } catch (err) {
        console.error('API error:', err.stack || err);
        res.status(500).json({ error: err.message || 'Internal Server Error' });
  }
});

app.get('/api/schedule', async (req, res) => {
  try {
        const data = await getScheduleStringifyed();
        res.json(data);
  } catch (err) {
        console.error('API error:', err.stack || err);
        res.status(500).json({ error: err.message || 'Internal Server Error' });
  }
});

app.get('/api/getAllData', async (req, res) => {
  try {
        const data = await getAllData();
        res.json(data);
  } catch (err) {
        console.error('API error:', err.stack || err);
        res.status(500).json({ error: err.message || 'Internal Server Error' });
  }
});

app.listen(PORT, () => console.log(`Server running: http://localhost:${PORT}`));