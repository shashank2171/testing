// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const watchlistRoutes = require('./routes/Watchlist');
const authRoutes = require('./routes/auth');
const tokenRoutes = require('./routes/tokens');
const path = require("path");

const app = express();
app.use(cors());


const port = 5000;
const mongoURI = 'mongodb+srv://harshtripathi042:harsh123@cluster0.etqbz6r.mongodb.net/unidash';

mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use(bodyParser.json());
app.use('/api/v1/watchlist', watchlistRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/tokens', tokenRoutes);

//-----------------------Deployment--------------

// const NODE_ENV = "production";
// const __dirname1 = path.resolve();
// if (NODE_ENV === "production") {
//   // Adjust the path to the client build folder
//   app.use(express.static(path.join(__dirname1, "../client/dist")));

//   // Catch-all handler for all other routes, sending back the index.html file
//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname1, "../client/dist/index.html"));
//   });
// } else {
//   app.get("/", (req, res) => {
//     res.send("API is running successfully");
//   });
// }

//-----------------------Deployment--------------


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
