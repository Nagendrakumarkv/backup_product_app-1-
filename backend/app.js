const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const config = require("config");
const bodyParser=require('body-parser')

// database connection to mongodb compass
//  const url='mongodb://localhost/ProductDBex'

const app = express();
app.use(cors());

//database connection to mongodb atlas
const dbConfig = config.get('PRODUCT.dbConfig.dbName');

mongoose.connect(dbConfig, { useNewUrlParser: true})
  // .then(() => {
  //   console, log("connected to database");
  // })
  // .catch((err) => {
  //   console.log("not connected to database", err);
  // });

const con = mongoose.connection;

con.on("open", () => {
  console.log("connected");
});

app.use(express.json());

const productRouter = require("./routes/product");
const userRouter = require("./routes/user");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/products", productRouter);
app.use("/user", userRouter);

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
  console.log("server started");
});
