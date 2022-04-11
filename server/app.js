var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
// var session = require("express-session");
var operationsRouter = require("./routes/operations");
var usersRouter = require("./routes/users");
// var cors = require("cors");
var app = express();

app.listen(process.env.PORT || 3001, () => console.log("Esto fue exitoso"));

// app.use(
//   cors({
//       origin: ["http://localhost:3000/"],
//   })
// );
// app.use(
//   session({
//       secret: "Shh, a secret",
//       resave: false,
//       saveUninitialized: false,
//   })
// );

app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/operations", operationsRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

module.exports = app;