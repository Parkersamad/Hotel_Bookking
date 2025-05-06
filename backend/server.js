const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const organizationRoutes = require("./routes/organizationRoutes");
const errorHandler = require("./middleWare/errorMiddleware");
const cookieParser = require("cookie-parser");

const app = express();

//Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());


// routes middleware
app.use("/api/organizations", organizationRoutes);
app.use("/api/user", userRoutes);

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
