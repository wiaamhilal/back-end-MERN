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
  },
  {
    timeseries: true,
    timestamps: true,
  }
);

// const validateReturnOrder = (obj) => {
//   const schema = Joi.object({
//     reason: Joi.string().trim().min(2).max(200).required(),
//   });
//   return schema.validate(obj);
// };
const ReturnOrder = mongoose.model("ReturnOrder", returnOrderSchema);

module.exports = {
  ReturnOrder,
  // validateReturnOrder,
};
