const express = require("express");
const { requireSignin, isAdmin } = require("../controllers/auth.controllers");
const { userById } = require("../controllers/user.controllers");
const router = express.Router();

const { create, productById,read } = require("../controllers/product.controllers");

//routes
router.get('/product/:productId',read)
router.post(
  "/product/create/:userId",
  requireSignin,
  isAdmin,
  isAdmin,
  create
);
router.param("userId", userById);
router.param("productId", productById);

module.exports = router;