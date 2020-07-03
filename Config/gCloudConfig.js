const { Storage } = require("@google-cloud/storage");
const path = require("path");
const servicekey = require("../Assets/weconnect-7a79a-7722933295ec.json");

let storage = null;
if (process.env.NODE_ENV === "production") {
  storage = new Storage({
    projectId: process.env.PROJECT_ID,
    keyFilename: process.env.gcloud_base64,
  });
} else {
  storage = new Storage({
    projectId: "weconnect-7a79a",
    keyFilename: servicekey,
  });
}

module.exports = storage;
