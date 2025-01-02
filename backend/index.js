const express = require("express");
const cors = require("cors");
const { connection } = require("./db");
const { router } = require("./routes/appointment.routes");

require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());
// app.get("/", (req, res) => {
//   res.send("Welcome to booking appointment app");
// });
app.use("/api", router);

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("Connected to DB");
    console.log(`Server is running on port ${process.env.PORT}`);
  } catch (error) {
    console.log("Error connecting to DB:", error);
  }
});
