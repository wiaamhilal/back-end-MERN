const asyncHander = require("express-async-handler");
const { User, validateUpdateUser } = require("../models/users");
const { Post } = require("../models/posts");
const { Comment } = require("../models/comments");
const bcrypt = require("bcryptjs");
const path = require("path");
const {
  cloudinaryUploadImage,
  cloudinaryReoveImage,
  cloudinaryReoveMultipleImage,
} = require("../utils/cloudinary");
const fs = require("fs");

//-----------------------------
// desc get all users profile
// route /api/users/profile
// method GET
// access only the admin
//-----------------------------

module.exports.getAllUsersCtrl = asyncHander(async (req, res) => {
  const users = await User.find().select("-password");
  res.status(200).json(users);
});

//-----------------------------
// desc get user profile
// route /api/users/profile/:id
// method GET
// access public
//-----------------------------

module.exports.getUserProfileCtrl = asyncHander(async (req, res) => {
  const user = await User.findById(req.params.id)
    .select("-password")
    .populate("posts");
  if (!user) {
    res.status(404).json({ message: "user not found" });
  }
  res.status(200).json(user);
});

//-----------------------------
// desc update user profile
// route /api/users/profile/:id
// method POT
// private (only user himself)
//-----------------------------

module.exports.upadateUserProfileCtrl = asyncHander(async (req, res) => {
  const { error } = validateUpdateUser(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  if (req.body.password) {
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
  }

  const updateUser = await User.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        username: req.body.username,
        password: req.body.password,
        bio: req.body.bio,
      },
    },
    { new: true }
  )
    .select("-password")
    .populate("posts");
  res.status(200).json(updateUser);
});

//-----------------------------
// desc get users cout
// route /api/users/count
// method GET
// access only the admin
//-----------------------------

module.exports.getUsersCountCtrl = asyncHander(async (req, res) => {
  const usersCount = await User.countDocuments();
  res.status(200).json(usersCount);
});

//-----------------------------
// desc upload user photo
// route /api/users/profile/profile-photo-upload
// method POST
// access only logged in user
//-----------------------------

module.exports.profilePhotoUploadCtrl = asyncHander(async (req, res) => {
  // validation
  if (!req.file) {
    return res.status(400).json({ message: "no file provided" });
  }
  // 2-get the image path
  const imagePath = path.join(__dirname, `../images/${req.file.filename}`);

  // 3-upload to cloudinary
  const result = await cloudinaryUploadImage(imagePath);

  // 4-get the user from DB
  const user = await User.findById(req.user.id);

  // 5-delete the old photo if exist
  if (user.profilePhoto.publicId !== null) {
    await cloudinaryReoveImage(user.profilePhoto.publicId);
  }

  // 6-change the profile photo field form DB
  user.profilePhoto = {
    url: result.secure_url,
    publicId: result.public_id,
  };
  await user.save();

  // 7-send response to the client
  res.status(200).json({
    message: "you have been uploaded your photo successfuly",
    profilePhoto: {
      url: result.secure_url,
      publicId: result.public_id,
    },
  });

  // 8- remove the image form the server
  fs.unlinkSync(imagePath);
});

//-----------------------------
// delete user profile
// route /api/users/profile/:id
// method delete
// private (only the admin or the user him self)
//-----------------------------
module.exports.deleteUserPfofileCtrl = asyncHander(async (req, res) => {
  // 1-get user from DB
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ message: "user is not exist" });
  }
  // 2- got all posts from db
  const posts = await Post.find({ user: user._id });

  // 3- get the public id from the posts
  const publicIds = posts?.map((post) => post.image.publicId);

  // 4- delete all posts image from cloudinary that belong to this user
  if (publicIds?.length > 0) {
    await cloudinaryReoveMultipleImage(publicIds);
  }

  // 5-delete the profile pic from cloudinary
  if (user.profilePhoto.publicId !== null) {
    await cloudinaryReoveImage(user.profilePhoto.publicId);
  }

  // 6-delete user posts and comments
  await Post.deleteMany({ user: user._id });
  await Comment.deleteMany({ user: user._id });

  // 7-delete the user himself
  await User.findByIdAndDelete(req.params.id);

  // 8-send response to the client
  res.status(200).json({ message: "the user has been deleted" });
});

// module.exports.addUserCommentCtrl = asyncHander(async(req,res) => {
//   const user = req.user;

// })
