const { client } = require("../index.js");

client.on("error", err => {
  console.log(`[Error] Error: ${err.message}`);
  console.log("[Status] I am now offline!");
});
