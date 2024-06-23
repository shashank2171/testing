const mongoose = require('mongoose');

const TokenSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
});

module.exports = mongoose.model('Token', TokenSchema);
