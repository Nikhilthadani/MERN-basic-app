// Import statements

const mongoose = require("mongoose");
const express = require("express");
const productRoutes = require("./routes/product-routes");

const app = express();

//middlewares - dynamic routing also GXNQ8iwFkSz3MmqY

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET,PATCH,POST,DELETE");
  next();
});

app.use((req, res, next) => {
  next();
});
app.use("/products", productRoutes);

//connections and port
mongoose
  .connect(
    "mongodb+srv://admin:GXNQ8iwFkSz3MmqY@cluster0.ypi4s.mongodb.net/application?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("Connected to Database");

    app.listen(5000);
  });
