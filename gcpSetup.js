const fs = require("fs");
require("dotenv").config();
fs.writeFileSync(process.env.GCP_KEY_FILE, process.env.GCP_CRED, (err) => {});
console.log("file created", process.env.GCP_KEY_FILE);
