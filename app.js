//ExpressJS Requirments
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require('morgan')
const app = express();


app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({extended: true,limit: "10mb",parameterLimit: 50000,}));


const config = require("./config/dbdepandencies");
const serverConfig = require("./config/serverConfig");
const port = process.env.PORT || serverConfig.ServerPort;


const user = require("./src/routes/Student");
const mendor = require("./src/routes/Mendor");


mongoose
.connect(config.dbURL)
.then(() => {console.log("Connected to MongoDB");})
.catch((err) => {console.error("MongoDB connection error:", err);});

app.use(morgan('dev'));

//MiddleWares
app.use( user);
app.use( mendor);



//Middleware for health check
app.use("/api/v1/health", async (req, res) => {
  try {await mongoose.connection.db.command({ ping: 1 });res.json({status: "Database is healthy",health: "API Server is up & running",});
  } catch (error) {console.error("Database is not healthy:", error);res.status(500).json({ status: "Database is not healthy", error: error.message });}
});



app.listen(port, () => {
  console.log("CONNECT Server is running on http://localhost: " + port);
});



