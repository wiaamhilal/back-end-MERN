const asyncHandler = require("express-async-handler");
const { User } = require("../models/users");
const { UserOrder } = require("../models/orders");

module.exports.createNewOrderCtrl = asyncHandler(async (req, res) => {
  const user = await User.find({ _id: req.user.id });
  if (!user) {
    res.status(404).json({ message: "user not found" });
  }
  const order = await UserOrder.create({
    userDetails: req.user.id,
    orderDetails: req.body.newOrder,
    orderStatus: false,
    userInfo: user[0],
  });
  res.status(201).json(order);
});

module.exports.getAllOrdersCtrl = asyncHandler(async (req, res) => {
  // const myorders = await UserOrder.find();

  const POST_PER_PAGE = 8;
  const { pageNumber } = req.query;
  let myorders;
  if (pageNumber) {
    myorders = await UserOrder.find()
      .skip((pageNumber - 1) * POST_PER_PAGE)
      .limit(POST_PER_PAGE)
      .sort({ createdAt: -1 });
    // .populate("user", ["-password"]);
  } else {
    myorders = await UserOrder.find().sort({ createdAt: -1 });
    // .populate("user", ["-password"]);
  }
  res.status(200).json(myorders);
});

// update the order status

module.exports.updateOrderStatus = asyncHandler(async (req, res) => {
  const order = await UserOrder.findById(req.params.id);

  if (!order) {
    res.status(404).json({ message: "order not found" });
  }

  const updatePost = await UserOrder.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        orderStatus: req.body.orderStatus,
      },
    },
    { new: true }
  );

  // 5- send response to the client
  res.status(200).json(updatePost);
});

module.exports.getOrderCountCtrl = asyncHandler(async (req, res) => {
  const count = await UserOrder.countDocuments();
  res.status(200).json(count);
});
