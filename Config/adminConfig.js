const admin = require("firebase-admin");

require("dotenv").config();

if (process.env.NODE_ENV === "production") {
  admin.initializeApp({
    credential: admin.credential.cert({
      type: process.env.type,
      project_id: process.env.PROJECT_ID,
      private_key_id: process.env.private_key_id,
      private_key: JSON.parse(process.env.PRIVATE_KEY),
      client_email: process.env.CLIENT_EMAIL,
      client_id: process.env.client_id,
      auth_uri: process.env.auth_uri,
      token_uri: process.env.token_uri,
      auth_provider_x509_cert_url: process.env.auth_provider_x509_cert_url,
      client_x509_cert_url: process.env.client_x509_cert_url,
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
