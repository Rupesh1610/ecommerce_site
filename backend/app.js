const express = require("express");
const errorMiddleware = require("./middleware/error");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

//Import routes

const product = require("./routes/productRoute"); //product route

const user = require("./routes/userRoute"); //user route

const order = require("./routes/orderRoute"); // order route

app.use("/api", product);
app.use("/api", user);
app.use("/api", order);

//middleware for error

app.use(errorMiddleware);

module.exports = app;
