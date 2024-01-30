const express = require("express");
const app = express.Router();
const student = require("../controllers/Student");

app.post("/student",student.createUser);
app.post("/studentlogin",student.StudentLogin);



module.exports = app;
 