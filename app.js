require("dotenv").config();
const express = require("express");

const playersRoutes = require("./routes/players");

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/clubs", playersRoutes);


app.listen(1000, () => {
  console.log("Server started on port 1000");
});
