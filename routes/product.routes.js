const express = require("express");
const {
  requireSignin,
  isAdmin,
  isAuth,
} = require("../controllers/auth.controllers");
const { userById } = require("../controllers/user.controllers");
const router = express.Router();

const {
  create,
  productById,
  read,
  remove,
  update,
  list,
  listRelated,
} = require("../controllers/product.controllers");
const { route } = require("./category.routes");

//routes
router.get("/product/:productId", read);
router.post("/product/create/:userId", requireSignin, isAuth, isAdmin, create);
router.delete(
  "/product/:productId/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  remove
);
router.put(
  "/product/:productId/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  update
);

router.get("/products", list);
router.get("/products/related/:productId", listRelated);

router.param("userId", userById);
router.param("productId", productById);

module.exports = router;
