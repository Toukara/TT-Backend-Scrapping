const fs = require("fs");
const path = require("path");

const playersFunctions = {};

fs.readdirSync(path.join(__dirname, "utilities"))
  .filter((file) => {
    return file.indexOf(".") !== 0 && file.slice(-3) === ".js";
  })
  .forEach((file) => {
    // get each module and add it to the fn object
    const module = require(path.join(__dirname, "utilities", file));
    playersFunctions[Object.keys(module)[0]] = Object.values(module)[0];
  });

module.exports = playersFunctions;
