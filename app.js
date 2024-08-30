const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const ejs = require("ejs");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("./config/mongoose-connection");
const { resourceUsage } = require("process");
const ownersRouter = require("./routes/ownersRouter");
const productsRouter = require("./routes/porductsRouter");
const usersRouter = require("./routes/usersRouter");

const app = express();
const port = 3000;
// ================Middlewares========================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.use(cookieParser());
// ================Middlewares========================
// ================router========================
app.use("/owners", ownersRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);
// ================router========================

app.get("/", (req, res) => res.send("Hello World!"));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
