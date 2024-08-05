const {
  createCommentCtrl,
  getAllCommentCtrl,
  deleteCommentCtrl,
  updateCommentCtrl,
} = require("../controllers/commentsController");
const {
  createClientCommentCtrl,
  getAllClientCommentsCtrl,
  deleteAllClientCommentsCtrl,
} = require("../controllers/postsController");
const validateObjedtId = require("../middlewares/validateObjedtId");
const {
  verifyToken,
  verfyTokenAndAdmin,
} = require("../middlewares/verifyToken");

const router = require("express").Router();

// /api/comments
router
  .route("/")
  .post(verifyToken, createCommentCtrl)
  .get(verfyTokenAndAdmin, getAllCommentCtrl);

// /api/comments/:id
router
  .route("/:id")
  .delete(validateObjedtId, verifyToken, deleteCommentCtrl)
  .put(validateObjedtId, verifyToken, updateCommentCtrl);

// /api/comments/client-comment
router
  .route("/client-comment")
  .post(verifyToken, createClientCommentCtrl)
  .get(getAllClientCommentsCtrl)
  .delete(verfyTokenAndAdmin, deleteAllClientCommentsCtrl);

module.exports = router;
