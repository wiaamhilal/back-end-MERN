const Joi = require("joi");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const returnOrderSchema = new mongoose.Schema(
  {
    reason: {
      type: String,
    },
    user: {
      type: Object,
    },
    order: {
      type: Object,
    },
    images: {
      type: Array,
    },
  },
  {
    timeseries: true,
    timestamps: true,
  }
);

// const validateReturnOrder = (obj) => {
//   const schema = Joi.object({
//     reason: Joi.string().required(),
//     images: Joi.array().required(),
//     order: Joi.required(),
//   });
//   return schema.validate(obj);
// };
const ReturnOrder = mongoose.model("ReturnOrder", returnOrderSchema);

module.exports = {
  ReturnOrder,
  // validateReturnOrder,
};

// const Joi = require("joi");
// const mongoose = require("mongoose");

// const returnOrderSchema = new mongoose.Schema(
//   {
//     reason: {
//       type: String,
//       required: true,
//       minlength: 2,
//       maxlength: 200,
//       trim: true,
//     },
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     order: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Order",
//       required: true,
//     },
//     images: {
//       type: [String],
//       default: [],
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// const validateReturnOrder = (obj) => {
//   const schema = Joi.object({
//     reason: Joi.string().trim().min(2).max(200).required(),
//     user: Joi.string().required(),
//     order: Joi.string().required(),
//     images: Joi.array().items(Joi.string().uri()),
//   });
//   return schema.validate(obj);
// };

// const ReturnOrder = mongoose.model("ReturnOrder", returnOrderSchema);

// module.exports = {
//   ReturnOrder,
//   validateReturnOrder,
// };
