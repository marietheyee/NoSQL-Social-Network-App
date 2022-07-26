// dependencies
const express = require('express');
const mongoose = require('mongoose');

// routing
const routes = require('./routes');

// express & port
const app = express();
const PORT = process.env.PORT || 3001;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// connect db to mongoose
mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost/27017',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// for logging mongo queries being used
mongoose.set('debug', true);

app.use(require('./routes'));

// port listening
app.listen(PORT, () => console.log(`Status: @ localhost:${PORT}`));