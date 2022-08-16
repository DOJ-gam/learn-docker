const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Hello from Node JS");
});

app.listen(8080, () => {
  console.log("Running on port 8080");
});
