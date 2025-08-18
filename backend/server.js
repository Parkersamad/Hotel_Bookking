const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const errorHandler = require("./middleWare/errorMiddleware");
const cookieParser = require("cookie-parser");
const validator = require("validator");
const RoomCategoryRoutes = require("./routes/roomCategoryRoutes");

const app = express();

//Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

// routes middleware
app.use("/api/user", userRoutes);
app.use("/api/bookings",bookingRoutes);
app.use("/api/roomCategories",RoomCategoryRoutes);

//Routes
app.get("/", (_req, res) => {
  res.send("Home Page");
});

//errorhandler middleware
app.use(errorHandler);

// Connect to db and start server
const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT);
    console.log(`server is running on port ${PORT}`);
  })
  .catch((err) => console.log(err));
