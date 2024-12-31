const {
  createNewOrderCtrl,
  getAllOrdersCtrl,
} = require("../controllers/ordersController");
const {
  createPostCtrl,
  getAllPostsCtrl,
  getSinglePostCtrl,
  getPostCountCtrl,
  deletePostCtrl,
  updatePostCtrl,
  updatePostImageCtrl,
  toggleLikeCtrl,
  toggleDislikeCtrl,
  updatePostImage2Ctrl,
} = require("../controllers/postsController");
const photoUpload = require("../middlewares/photoUpload");
const validateObjedtId = require("../middlewares/validateObjedtId");
const { verifyToken } = require("../middlewares/verifyToken");

const router = require("express").Router();

// /api/posts
router
  .route("/")
  .post(verifyToken, photoUpload.array("images", 5), createPostCtrl)
  .get(getAllPostsCtrl);

// /api/posts/count
router.route("/count").get(getPostCountCtrl);

// /api/posts/:id
router
  .route("/:id")
  .get(validateObjedtId, getSinglePostCtrl)
  .delete(validateObjedtId, verifyToken, deletePostCtrl)
  .put(validateObjedtId, verifyToken, updatePostCtrl);

// /api/posts/update-image/:id
router
  .route("/update-image/:id")
  .put(
    validateObjedtId,
    verifyToken,
    photoUpload.single("image"),
    updatePostImageCtrl
  );

// /api/posts/update-image2/:id
router
  .route("/update-image2/:id")
  .put(
    validateObjedtId,
    verifyToken,
    photoUpload.single("image"),
    updatePostImage2Ctrl
  );

// /api/posts/like/:id
router.route("/like/:id").put(validateObjedtId, verifyToken, toggleLikeCtrl);

// /api/posts/dislike/:id
router
  .route("/dislike/:id")
  .put(validateObjedtId, verifyToken, toggleDislikeCtrl);

module.exports = router;
