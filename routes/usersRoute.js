const {
  getAllUsersCtrl,
  getUserProfileCtrl,
  getUsersCount,
  profilePhotoUploadCtrl,
  deleteUserPfofileCtrl,
  getUsersCountCtrl,
} = require("../controllers/usersController");
const {
  verfyTokenAndAdmin,
  verfyTokenAndUser,
  verifyToken,
  verfyTokenAndAuthoriation,
} = require("../middlewares/verifyToken");
const validateObjectId = require("../middlewares/validateObjedtId");
const {upadateUserProfileCtrl} = require("../controllers/usersController");
const photoUpload = require("../middlewares/photoUpload");

const router = require("express").Router();

// /api/users/profile/
router.route("/profile").get(verfyTokenAndAdmin, getAllUsersCtrl);

// /api/users/profile/:id
router
  .route("/profile/:id")
  .get(validateObjectId, getUserProfileCtrl)
  .put(validateObjectId, verfyTokenAndUser, upadateUserProfileCtrl)
  .delete(validateObjectId, verfyTokenAndAuthoriation, deleteUserPfofileCtrl);

// /api/users/count
router.route("/count").get(verfyTokenAndAdmin, getUsersCountCtrl);

// /api/users/profile/profile-photo-upload
router
  .route("/profile/profile-photo-upload")
  .post(verifyToken, photoUpload.single("image"), profilePhotoUploadCtrl);

module.exports = router;
