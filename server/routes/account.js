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
  const session = await mongoose.startSession();

  session.startTransaction();
  const { amount, to } = req.body;

  // Fetch the accounts within the transaction
  const from = await account.findOne({ userId: req.userId }).session(session);

  if (!from || from.balance < amount) {
    await session.abortTransaction();
    return res.status(400).json({
      message: "Insufficient balance",
    });
  }

  const toAccount = await account.findOne({ userId: to }).session(session);

  if (!toAccount) {
    await session.abortTransaction();
    return res.status(400).json({
      message: "Invalid account",
    });
  }

  // Perform the transfer
  await account
    .updateOne({ userId: req.userId }, { $inc: { balance: -amount } })
    .session(session);
  await account
    .updateOne({ userId: to }, { $inc: { balance: amount } })
    .session(session);

  // Commit the transaction
  await session.commitTransaction();
  res.json({
    message: "Transfer successful",
  });
});
module.exports = router;
