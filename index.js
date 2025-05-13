const express = require('express');
const apiRoutes = require('./api.js');
const apiRoutes_speech = require('./api_deepl.js')
const app = express();
const port = 3000;

// Body parser middleware
app.use(express.urlencoded({ extended: true }));  // for x-www-form-urlencoded
app.use(express.static('public'));
app.use(express.json());  // for json

// API routes
app.get('/home', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});
app.use('/chat-bot', apiRoutes);
app.use('/speech-translate',apiRoutes_speech)
// Server start
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});