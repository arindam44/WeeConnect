const admin = require("firebase-admin");

const serviceAccount = require("../Assets/weconnect-7a79a-firebase-adminsdk-ruueo-c11607d124.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "weconnect-7a79a.appspot.com",
});

module.exports = admin;
