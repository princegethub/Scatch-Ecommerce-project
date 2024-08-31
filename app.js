const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const ejs = require("ejs");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("./config/mongoose-connection");
const ownersRouter = require("./routes/ownersRouter");
const productsRouter = require("./routes/porductsRouter");
const usersRouter = require("./routes/usersRouter");
const indexRouter = require("./routes/index");
const flash = require("connect-flash");
const expressSession = require("express-session");
require("dotenv").config();

const app = express();
const port = 3000;

// ================Middlewares========================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

// Configure session middleware
app.use(
  expressSession({
    secret: process.env.JWT_KEY, // Ensure this is set
    resave: false,
    saveUninitialized: false,
  })
);

// Configure flash middleware after session middleware
app.use(flash());
app.use(cookieParser());
// ================Middlewares========================

// ================Router========================
app.use("/owners", ownersRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);
app.use("/", indexRouter);
// ================Router========================

app.get("/", (req, res) => res.send("Hello World!"));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
