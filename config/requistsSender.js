const axios = require("axios");

const url = "https://wiaam-store.web.app/products";

setInterval(async () => {
  try {
    const response = await axios.get(url);
    console.log(`Pinged ${url}, status code: ${response.status}`);
  } catch (error) {
    console.error(`error pinging ${url}:`, error.message);
  }
}, 300000);
