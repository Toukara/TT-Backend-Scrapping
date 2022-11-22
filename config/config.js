require("dotenv").config();

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
};
