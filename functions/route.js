const express = require('express');
const cors = require('cors');
const api = require('./api');

const app = express();

app.use(cors({ origin: true }));

app.post('/landFromEmail', api.landFromEmail);
app.post('/landFromContact', api.landFromContact);
app.post('/landFromBanner', api.landFromBanner);

exports.app = app;