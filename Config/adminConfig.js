const admin = require("firebase-admin");

require("dotenv").config();

if (process.env.NODE_ENV === "production") {
  admin.initializeApp({
    credential: admin.credential.cert({
      project_id: process.env.PROJECT_ID,
      private_key: JSON.parse(process.env.PRIVATE_KEY),
      client_email: process.env.CLIENT_EMAIL,
    }),
    storageBucket: "weconnect-7a79a.appspot.com",
  });
} else {
  admin.initializeApp({
    credential: admin.credential.cert({
      project_id: process.env.PROJECT_ID,
      private_key: process.env.PRIVATE_KEY.replace(/\n/g, "\n"),
      client_email: process.env.CLIENT_EMAIL,
    }),
    storageBucket: "weconnect-7a79a.appspot.com",
  });
}
module.exports = admin;
