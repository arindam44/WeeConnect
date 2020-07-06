const { Storage } = require("@google-cloud/storage");
const path = require("path");
require("dotenv").config();

let storage = null;
const servicekey = path.resolve(__dirname, "./gcpconfig.json");
storage = new Storage({
  projectId: "weconnect-7a79a",
  keyFilename: servicekey,
});

module.exports = storage;
