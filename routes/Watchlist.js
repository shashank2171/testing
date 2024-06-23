// routes/watchlist.js
const express = require('express');
const router = express.Router();
const Watchlist = require('../models/Watchlist');

// Get all watchlist items
router.get('/', async (req, res) => {
  try {
    const watchlist = await Watchlist.find();
    res.json(watchlist);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new item to the watchlist
router.post('/', async (req, res) => {
  const watchlistItem = new Watchlist({
    tick: req.body.tick,
    curPrice: req.body.curPrice,
    changePrice: req.body.changePrice,
    btcVolume: req.body.btcVolume,
    amountVolume: req.body.amountVolume,
    holders: req.body.holders,
    symbol: req.body.symbol,
    alertPrice: req.body.alertPrice
  });

  try {
    const newWatchlistItem = await watchlistItem.save();
    res.status(201).json(newWatchlistItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete an item from the watchlist
router.delete('/:tick', async (req, res) => {
  try {
    const watchlistItem = await Watchlist.findOneAndDelete({ tick: req.params.tick });
    if (!watchlistItem) {
      return res.status(404).json({ message: 'Watchlist item not found' });
    }
    res.json({ message: 'Watchlist item deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;
