const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.get('/search', async (req, res) => {
  const { query, limit } = req.query;
  const options = {
    method: 'GET',
    url: 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities',
    // headers: {
    //   'x-rapidapi-key': process.env.RAPIDAPI_KEY,
    //   'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com'
    // },
    headers: {
		'x-rapidapi-key': '5311a8fb43msh2c35b9d28fd1965p1eabc5jsn5288a1491059',
		'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com'
	},
    params: {
      namePrefix: query,
      limit: limit || 5
    }
  };

  try {
    const response = await axios.request(options);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data' });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
