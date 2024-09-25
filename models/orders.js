const Joi = require("joi");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const userOrdersSchema = new mongoose.Schema(
  {
    orderDetails: {
      type: Object,
      required: true,
      //   ref: "Post",
      //   trim: true,
      //   minlength: 2,
      //   maxlenth: 100,
    },
    userDetails: {
      type: mongoose.Schema.Types.ObjectId,
      // ref: "User",
    },
    userInfo: {
      type: Object,
      require: true,
    },
    // imageURL: {
    //   type: String,
    //   required: true,
    //   trim: true,
    //   minlength: 2,
    // },
    orderStatus: {
      type: String,
      required: true,
    },
  },
  {
    timeseries: true,
    timestamps: true,
    // toJSON: { virtuals: true },
    // toObject: { virtuals: true },
  }
);

// populate comment for this post
// userOrdersSchema.virtual("users", {
//   ref: "User",
//   foreignField: "user._id",
//   localField: "userDetails",
// });

// postSchema.virtual("posts", {
//     ref: "Post",
//     foreignField: "post._id",
//     localField: "post",
//   });

const validateCreateOrder = (obj) => {
  const schema = Joi.object({
    text: Joi.string().trim().min(2).max(200).required(),
  });
  return schema.validate(obj);
};
const validateUpdateOrder = (obj) => {
  const schema = Joi.object({
    text: Joi.string().trim().min(2).max(200).required(),
  });
  return schema.validate(obj);
};
const UserOrder = mongoose.model("Userorder", userOrdersSchema);

module.exports = {
  UserOrder,
  validateCreateOrder,
  validateUpdateOrder,
};
