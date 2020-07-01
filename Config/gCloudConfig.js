const { Storage } = require("@google-cloud/storage");
//const path = require('path');
const servicekey = require("../Assets/weconnect-7a79a-7722933295ec.json");

const storage = new Storage({
  projectId: "weconnect-7a79a",
  keyFilename: servicekey,
});

module.exports = storage;
