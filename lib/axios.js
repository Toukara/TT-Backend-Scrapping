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

instance.interceptors.request.use((config) => {
  return config;
});

instance.interceptors.response.use((response) => {
  // console.log("Response was received");
  return response;
});

module.exports = instance;
