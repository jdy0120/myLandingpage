const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp();

const route = require('./route');
exports.route = functions.https.onRequest(route.app);
