require("dotenv").config();

const fetchOptions = {
  credentials: "include",
  headers: {
    Accept: "*/*",
    "X-Requested-With": "XMLHttpRequest",
    "Alt-Used": "www.pingpocket.fr",
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
  },
  referrer: "https://www.pingpocket.fr/",
  method: "GET",
  mode: "cors",
};

module.exports = {
  development: {
    dialect: "mysql",
    host: process.env.DB_DEV_HOST,
    username: process.env.DB_DEV_USERNAME,
    password: process.env.DB_DEV_PASSWORD,
    port: process.env.DB_DEV_PORT,
    database: process.env.DB_DEV_DATABASE,
    logging: false,
  },

  production: {
    dialect: "mysql",
    host: process.env.DB_PROD_HOST,
    username: process.env.DB_PROD_USERNAME,
    password: process.env.DB_PROD_PASSWORD,
    port: process.env.DB_PROD_PORT,
    database: process.env.DB_PROD_DATABASE,
    logging: false,
  },

  fetchOptions,
};
