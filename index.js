const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json({limit: '50mb',extended: true}));
app.use(express.urlencoded({limit: '50mb',extended: true}));
app.use(express.static('public'));

app.use('/pincode', require('./controller/pincode/index'));

module.exports = app;