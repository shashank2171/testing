const express = require('express');
const router = express.Router();
const Token = require('../models/Token');

// Route to store token names
router.post('/store', async (req, res) => {
  try {
    const tokenNames = req.body;

    if (!Array.isArray(tokenNames)) {
      return res.status(400).json({ message: 'Invalid data format' });
    }

    const tokenDocs = tokenNames.map(name => ({ name }));

    await Token.insertMany(tokenDocs, { ordered: false });

    res.status(200).json({ message: 'Token names stored successfully' });
  } catch (error) {
    console.error('Error storing token names:', error);
    res.status(500).json({ message: error.message });
  }
});

// Route to fetch all token names from MongoDB
router.get('/api/v1/tokens', async (req, res) => {
    try {
      const tokens = await Token.find({}, 'name'); // Fetch only 'name' field from tokens collection
      const tokenNames = tokens.map(token => token.name);
      res.json(tokenNames);
    } catch (error) {
      console.error('Error fetching token names:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  // Route to fetch data from external API based on token names
  router.get('/api/v1/brc20/:name', async (req, res) => {
    const { name } = req.params;
    try {
      const response = await axios.get(`https://api.ordiscan.com/v1/brc20/${name}`);
      res.json(response.data);
    } catch (error) {
      console.error(`Error fetching data for token ${name}:`, error);
      res.status(500).json({ error: 'Failed to fetch data' });
    }
  });
  

module.exports = router;
