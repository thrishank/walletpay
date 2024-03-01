const express = require("express");
const z = require("zod");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const { user, account } = require("../db/schema");
const { auth_middlware } = require("../middleware/auth");

const router = express.Router();

router.post("/verify", (req, res) => {
  let token = req.headers.authorization;
  if (!token || !token.startsWith("Bearer"))
    return res.status(411).send("Authorization token is missing");
  token = token.split(" ")[1];
  try {
    var decoded = jwt.verify(token, process.env.JWT_PASSWORD);
    req.userId = decoded.userId;
    return res.status(200).text("verified");
  } catch (err) {
    res.send(err);
  }
});

const userSchema = z.object({
  username: z.string().email().toLowerCase(),
  firstName: z.string(),
  lastName: z.string(),
  password: z.string().min(6),
});

router.post("/signup", async (req, res) => {
  try {
    const { success } = userSchema.safeParse(req.body);
    if (!success)
      return res.status(411).json({
        message: "Incorrect Inputs",
      });

    const found = await user.findOne({ username: req.body.username });

    if (found)
      return res.status(411).json({ message: "Email already exists." });

    const r = await user.create({
      username: req.body.username,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: req.body.password,
    });

    await account.create({
      userId: r._id,
      balance: Math.random() * 1000,
    });
    const jwt_token = jwt.sign({ userId: r._id }, process.env.JWT_PASSWORD);
    res.status(200).json({
      message: "User Created successfully",
      token: jwt_token,
    });
  } catch (err) {
    res.status(411).send(err);
  }
});

const signupSchema = z.object({
  username: z.string().email(),
  password: z.string().min(6),
});

router.post("/signin", async (req, res) => {
  try {
    const { success } = signupSchema.safeParse(req.body);
    if (!success) return res.status(411).json({ message: "Incorrect Inputs" });

    const found = await user.findOne({
      username: req.body.username,
      password: req.body.password,
    });
    if (found) {
      const jwt_token = jwt.sign(
        { userId: found._id },
        process.env.JWT_PASSWORD
      );
      return res
        .status(200)
        .json({ token: jwt_token, message: "Login Successful" });
    }

    res.status(411).json({ message: "User not found login first" });
  } catch (err) {
    res.status(411).json({
      message: "Error while logging" + err,
    });
  }
});

const passwordSchema = z.object({
  password: z.string().min(6).optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
});

router.put("/", auth_middlware, async (req, res) => {
  try {
    const { success } = passwordSchema.safeParse(req.body);
    if (!success) return res.status(411).json({ message: "Invalid inputs" });

    await user.findByIdAndUpdate(req.userId, {
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    });
    res.status(200).json({
      message: "Updated successfully",
    });
  } catch (err) {
    res.status(411).json({
      message: "Error while updating information " + err,
    });
  }
});

router.get("/bulk", async (req, res) => {
  const filter = req.query.filter || "";

  const data = await user.find({
    $or: [
      {
        firstName: {
          $regex: filter,
        },
      },
      {
        lastName: {
          $regex: filter,
        },
      },
    ],
  });

  res.json({
    user: data.map((i) => ({
      username: i.username,
      firstName: i.firstName,
      lastName: i.lastName,
      _id: i._id,
    })),
  });
});

module.exports = router;
