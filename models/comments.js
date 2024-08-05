const mongoose = require("mongoose");
const joi = require("joi");

// comment schema
const commentSchema = new mongoose.Schema(
  {
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// comment model
const Comment = mongoose.model("Comment", commentSchema);

// validate create comment
function validateCreateComment(obj) {
  const schema = joi.object({
    postId: joi.string().required().label("post ID"),
    text: joi.string().trim().required(),
  });
  return schema.validate(obj);
}

// validate update comment
function validateUpdateComment(obj) {
  const schema = joi.object({
    text: joi.string().trim().required(),
  });
  return schema.validate(obj);
}

module.exports = {
  Comment,
  validateCreateComment,
  validateUpdateComment,
};
