const express = require("express");
const { requireSignin, isAdmin } = require("../controllers/auth.controllers");
const { userById } = require("../controllers/user.controllers");
const router = express.Router();

const { create } = require("../controllers/product.controllers");

//routes
router.post(
  "/product/create/:userId",
  requireSignin,
  isAdmin,
  isAdmin,
  create
);
router.param("userId", userById);

module.exports = router;