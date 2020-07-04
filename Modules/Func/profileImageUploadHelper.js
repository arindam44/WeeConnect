const firebase = require("../../Config/fbConfig");
const storage = require("../../Config/gCloudConfig");
const util = require("util");
const { createWriteStream } = require("fs");

const bucket = storage.bucket("weconnect-7a79a.appspot.com");

const profileImageUploadHelper = (file) => {
  const { originalname, buffer } = file;
  const blob = bucket.file(originalname.replace(/ /g, "_"));
  const blobStream = blob.createWriteStream({
    metadata: {
      contentType: "image/png",
    },
    resumable: false,
    gzip: true,
  });

  blobStream
    .on("finish", () => {
      var blobName = blob.name;
      console.log("BLOB NAME: " + blobName);
      const publicUrl = util.format(
        `https://firebasestorage.googleapis.com/v0/b/weconnect-7a79a.appspot.com/o/${blob.name}?alt=media`
      );
      //resolve(publicUrl);
    })
    .on("error", () => {
      console.log(`Unable to upload Image`);
    })
    .end(buffer);
};
module.exports = profileImageUploadHelper;
