const express = require("express");
const mongoose = require("mongoose");
const swagger = require('swagger-ui-express');
const cors = require('cors');


const busRouter =require("./routes/routes")
const {MONGO_URL, PORT}= require("./configs/config")
const { _mainErrorHandler, notFoundError } = require("./errors/error.handler");
const swaggerJson = require('./swagger.json')


const app = express();

async function init () {
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }));

  app.use(cors({origin: '*'}));
  // res.header("Access-Control-Allow-Origin", "*")

  await mongoose.connect(MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true }).then((value) => {
    console.log("Connection success");
  });
  app.use('/api', busRouter);
  app.use('/api-docs', swagger.serve, swagger.setup(swaggerJson));
  app.use('*', notFoundError);
  app.use(_mainErrorHandler);


  app.listen(PORT, () => {
    console.log(`Started on ${PORT} port`);
  });

}

void init();
