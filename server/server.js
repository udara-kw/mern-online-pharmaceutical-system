require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const compression = require("compression");
const helmet = require("helmet");
const app = express();

//import routes
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const prescriptionRoutes = require("./routes/prescription");
const filesRoutes = require("./routes/files");
const contactRoutes = require("./routes/contact");

// app middleware
app.use(bodyParser.json());
app.use(helmet());
app.use(
  helmet.frameguard({
    action: "deny",
  })
);
app.use(cors());
app.use(compression());

// route middleware
app.use(userRoutes);
app.use(prescriptionRoutes);
app.use(filesRoutes);
app.use("/api", authRoutes);
app.use(contactRoutes);

const PORT = 8000;

const DB_URL = process.env.MONGO_TOKEN;

mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => {
    // console.log("Error in DB connection", err);
  });

app.listen(PORT, () => {
  console.log(`App is running on ${PORT}`);
});
