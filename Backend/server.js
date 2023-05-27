require("dotenv").config();
const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3500;
const app = express();
const cors = require("cors");
const errHandler = require("./middleware/errorHandler");
const corsOptions = require("./config/corsOptions");
const { connectDB } = require("./config/dbConnect");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const { verifyJWT } = require("./middleware/verifyJWT");

// connect to DB
connectDB();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  res.header("Access-Control-Allow-Credentials", true);
  // res.header("Access-Control-Allow-Origin", "*");
  next();
});

// handle form data
app.use(express.urlencoded({ extended: false }));

//handle json data
app.use(express.json());

// middleware to parse/handle cookies
app.use(cookieParser());

//seve static files like css,images etc
app.use(express.static(path.join(__dirname, "public")));

//cors middleware

app.use(cors(corsOptions));

// routes
app.use("/api/register", require("./routes/auth/register"));
app.use("/api/login", require("./routes/auth/auth"));
app.use("/api/refresh", require("./routes/auth/refresh"));
app.use("/api/logout", require("./routes/auth/logout"));
app.use("/api/patients", require("./routes/patients/patient"));
app.use("/api/hospital/register", require("./routes/hospital/register"));
app.use("/api/hospital/login", require("./routes/hospital/login"));
app.use("/api/hospital/logout", require("./routes/hospital/logout"));
app.use(
  "/api/hospital/activecards",
  require("./routes/hospital/fetchActiveCards")
);
app.use(verifyJWT);
app.use("/api/users", require("./routes/users/testUsers"));

app.use(errHandler);

mongoose.connection.once("open", () => {
  console.log("Connected to Mongo DB");
  app.listen(PORT, () => {
    console.log(`Connected to port ${PORT}`);
  });
});
