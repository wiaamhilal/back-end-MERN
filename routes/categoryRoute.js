const router = require("express").Router();
const {verfyTokenAndAdmin} = require("../middlewares/verifyToken");
const validateObjectId = require("../middlewares/validateObjedtId");
const {
  createCategoryCtrl,
  getAllCategoriesCtrl,
  dlelteCategorieCtrl,
} = require("../controllers/categorysController");

// api/category
router
  .route("/")
  .post(verfyTokenAndAdmin, createCategoryCtrl)
  .get(getAllCategoriesCtrl);

//api/categories/:id
router
  .route("/:id")
  .delete(validateObjectId, verfyTokenAndAdmin, dlelteCategorieCtrl);

module.exports = router;
