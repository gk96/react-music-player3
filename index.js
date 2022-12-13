const express = require('express');
const moment = require('moment-timezone');
const cors = require('cors');
const routes = require("./routes/index.js");
const dotenv = require('dotenv');
const app = express();
const cors_proxy = require('cors-anywhere');
const path = require("path");


// if .env file is located in some other directory or with some other name
dotenv.config({ path: `.env.${process.env.ENV}` }) ;


const port = process.env.PORT || 3005;
app.use(cors());
app.options("*", cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", routes);

app.use(express.static(path.join(__dirname, "react-music/build")));
app.use(express.static("public"));

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "react-music/build", "index.html"));
});


app.listen(port, () => {
    console.log(`Server listening at PORT ${port} on ${moment().tz("Asia/Kolkata").format('DD/MM/YYYY h:mm A')}`);
  });

module.exports = app;

