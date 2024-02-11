const express = require("express");
const cors = require("cors");

const router = require("./routes/index");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1", router);

app.get("/", (req,res) => {
  const q = req.query;
  res.send(q);
})

// app.get("/", (req, res) => {
//   res.send(process.env.JWT_PASSWORD);
// });
app.listen(3000);
