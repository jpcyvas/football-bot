const express = require('express');
const path = require('path');
const { getStandings } = require('./football-bot');


const app = express();
const PORT = process.env.PORT || 3000;

// serve static files from public/
app.use(express.static(path.join(__dirname, '..', 'public')));

// proxy endpoint to avoid CORS
app.get('/api/standings', async (req, res) => {
  try {
        const data = await getStandings();
        res.json(data);
  } catch (err) {
        console.error('API error:', err.stack || err);
        res.status(500).json({ error: err.message || 'Internal Server Error' });
  }
});

app.listen(PORT, () => console.log(`Server running: http://localhost:${PORT}`));