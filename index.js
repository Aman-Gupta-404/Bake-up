const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");

require("dotenv").config();

// database connection
mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((res) => {
    console.log("DB CONNECTED SUCCESSFULLY");
  })
  .catch((err) => console.log(err));

mongoose.set("useFindAndModify", false);

// Getting the routes
var authentication = require("./routes/auth");
var products = require("./routes/products");
var category = require("./routes/category");
var user = require("./routes/user");

// Port variable
const PORT = process.env.PORT || 5000;

// pre built middlewares
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api", authentication);
app.use("/api", products);
app.use("/api", category);
app.use("/api", user);

// serving static accets
if (process.env.NODE_ENV === "production") {
  // set static folder
  app.use(express.static("Client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "Client", "build", "index.html"));
  });
}

// starting the server
app.listen(PORT, () => console.log(`server is up and running at port ${PORT}`));
