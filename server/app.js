
const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const cors = require('cors');


const busRouter =require("./routes/routes")

const app = express();
app.use(cors());

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use('/api', busRouter);



// const server = http.createServer(app);



mongoose.connect("mongodb://127.0.0.1:27017/busInfo",
 { useNewUrlParser: true, useUnifiedTopology: true }).then((value) => {
  console.log("Connection success");
});

app.listen(3001, () => {
  console.log(`Success`);

});