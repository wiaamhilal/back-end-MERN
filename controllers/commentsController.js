const asyncHandler = require("express-async-handler");
const {
  validateCreateComment,
  Comment,
  validateUpdateComment,
} = require("../models/comments");
const {User} = require("../models/users");

//-----------------------------
// desc greate a new coment
// route /api/comments
// method POST
// access only logged user
//-----------------------------

module.exports.createCommentCtrl = asyncHandler(async (req, res) => {
  const {error} = validateCreateComment(req.body);
  if (error) {
    res.status(400).json({message: error.details[0].message});
  }
  const profile = await User.findById(req.user.id);

  const comment = await Comment.create({
    postId: req.body.postId,
    text: req.body.text,
    user: req.user.id,
    username: profile.username,
  });
  res.status(201).json(comment);
});

//-----------------------------
// desc get all comments
// route /api/comments
// method GET
// access only the amin
//-----------------------------
module.exports.getAllCommentCtrl = asyncHandler(async (req, res) => {
  const comments = await Comment.find().populate("user");
  res.status(200).json(comments);
});

//-----------------------------
// desc delete comment
// route /api/comments/:id
// method DELETE
// access only the amin or the owner
//-----------------------------
module.exports.deleteCommentCtrl = asyncHandler(async (req, res) => {
  const comment = await Comment.findById(req.params.id);
  if (!comment) {
    res.status(404).json({message: "comment not found"});
  } else if (req.user.isAdmin || req.user.id === comment.user.toString()) {
    await Comment.findByIdAndDelete(req.params.id);
    res.status(200).json({message: "the comment has been deleted"});
  } else {
    res
      .status(403)
      .json({message: "unauthoraized, you cant delete the comment"});
  }
});

//-----------------------------
// desc update coment
// route /api/comments/:id
// method PUT
// access only the comment owner
//-----------------------------

module.exports.updateCommentCtrl = asyncHandler(async (req, res) => {
  const {error} = validateUpdateComment(req.body);
  const comment = await Comment.findById(req.params.id);
  if (error) {
    return res.status(400).json({message: error.details[0].message});
  } else if (!comment) {
    return res.status(404).json({message: "comment not found"});
  } else if (req.user.id !== comment.user.toString()) {
    return res
      .status(403)
      .json({message: "unauthoraized, only the comment owner"});
  } else {
    const updateComment = await Comment.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          text: req.body.text,
        },
      },
      {new: true}
    );
    res.status(200).json(updateComment);
  }
});
