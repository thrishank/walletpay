const express = require("express");
const { account } = require("../db/schema");
const { auth_middlware } = require("../middleware/auth");
const { default: mongoose } = require("mongoose");

const router = express.Router();

router.get("/balance", auth_middlware, async (req, res) => {
  const found = await account.findOne({
    userId: req.userId,
  });
  res.status(200).json({
    balance: found.balance,
  });
});

router.post("/transfer", auth_middlware, async (req, res) => {
  const s = await mongoose.startSession();
  s.startTransaction();

  const from = await account.findOne({ userId: req.userId }).session(s);

  if (req.body.amount > from.balance) {
    await s.abortTransaction();
    return res.status(400).json({ message: "Insufficient balance" });
  }

  const to = await account.findOne({ userId: req.body.to });

  if (!to) {
    await s.abortTransaction();
    return res.status(400).json({
      message: "Invalid account",
    });
  }

  await account.findOneAndUpdate(
    { userId: req.userId },
    { $inc: { balance: -req.body.amount } }
  );
  await account.findOneAndUpdate(
    { userId: req.body.to },
    { $inc: { balance: req.body.amount } }
  );

  await s.commitTransaction();
  
  return res.status(200).json({
    message: "Transfer successful",
  });
});
module.exports = router;
