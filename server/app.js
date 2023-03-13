const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const cors = require('cors');


const busRouter =require("./routes/routes")
const {MONGO_URL, PORT}= require("./configs/config")
const { _mainErrorHandler, notFoundError } = require("./errors/error.handler");


const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use(cors({origin: '*'}));
// res.header("Access-Control-Allow-Origin", "*")

mongoose.connect(MONGO_URL,
 { useNewUrlParser: true, useUnifiedTopology: true }).then((value) => {
  console.log("Connection success");

});
app.use('/api', busRouter);
app.use('*', notFoundError);
app.use(_mainErrorHandler);





app.listen(PORT, () => {
  console.log(`Started on ${PORT} port`);

});