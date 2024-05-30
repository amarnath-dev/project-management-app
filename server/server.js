const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connect = require("../server/src/config/db");
const userRoute = require("../server/src/routes/userRoutes");

const app = express();
dotenv.config();

const corsConfig = {
    origin: "http://localhost:3000",
    credentials: true,
}

connect();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors(corsConfig));

app.use("/api", userRoute)

app.listen(process.env.PORT, () => console.log("Server is running on port", process.env.PORT));

module.exports = app;