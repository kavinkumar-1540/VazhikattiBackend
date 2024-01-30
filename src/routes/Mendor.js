const express = require("express");
const app = express.Router();
const mendor = require("../controllers/Mendor");

app.post("/mendor",mendor.createMendor);



module.exports = app;
 