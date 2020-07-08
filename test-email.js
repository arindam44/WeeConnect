const emailExistence = require("email-existence");

emailExistence.check("rarindam8@mail.com", (error, response) => {
  console.log(response);
  console.log("error---", error);
});
