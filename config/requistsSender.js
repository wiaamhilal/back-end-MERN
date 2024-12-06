const https = require("https");

setInterval(() => {
  https
    .get("https://wiaam-store.web.app/products", (res) => {
      console.log(`Status Code: ${res.statusCode}`);
    })
    .on("error", (err) => {
      console.error(`Error: ${err.message}`);
    });
}, 300000); // Ping every 5 minutes
