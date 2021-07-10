const express = require("express");
const { requireSignin, isAdmin } = require("../controllers/auth.controllers");
const { userById } = require("../controllers/user.controllers");
const router = express.Router();

const { create , categoryById,read} = require("../controllers/category.controllers");

//routes
router.post(
  "/category/create/:userId",
  requireSignin,
  isAdmin,
  isAdmin,
  create
);
router.get("/category/:categoryId",read)

router.param("categoryId", categoryById);
router.param("userId", userById);

module.exports = router;
