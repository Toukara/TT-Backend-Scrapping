const axios = require("axios");
const BASE_URL = "https://www.pingpocket.fr";

const instance = axios.create({
  credentials: "include",
  baseURL: BASE_URL + "/app/fftt",
  mode: "cors",
  headers: {
    Accept: "*/*",
    "X-Requested-With": "XMLHttpRequest",
    "Alt-Used": "www.pingpocket.fr",
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
    Referer: BASE_URL + "/app/fftt",
  },
});

module.exports = instance;
