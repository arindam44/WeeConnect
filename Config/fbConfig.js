const firebase = require('firebase');


var config = {
    apiKey: "AIzaSyAW50wPe79rpaLRvADInJpxkz00Y5JWH_U",
    authDomain: "weconnect-7a79a.firebaseapp.com",
    databaseURL: "https://weconnect-7a79a.firebaseio.com",
    project_id: "weconnect-7a79a",
    storageBucket: "weconnect-7a79a.appspot.com",
    messagingSenderId: "665175799062",
    appId: "1:665175799062:web:578b50417bd462acfd4c37",
    measurementId: "G-G80TKRYSLE"
  };

// Initialize Firebase
firebase.initializeApp(config);


module.exports = firebase;