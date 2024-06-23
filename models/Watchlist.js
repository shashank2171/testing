const mongoose = require('mongoose');

const WatchlistSchema = new mongoose.Schema({
  tick: { type: String, required: true, unique: true },
  curPrice: { type: Number, required: true },
  changePrice: { type: Number, required: true },
  btcVolume: { type: Number, required: true },
  amountVolume: { type: Number, required: true },
  holders: { type: Number, required: true },
  symbol: { type: String, required: true },
  alertPrice: { type: Number, default: null }
});

module.exports = mongoose.model('Watchlist', WatchlistSchema);
