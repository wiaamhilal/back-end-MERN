const asyncHandler = require("express-async-handler");
const { User } = require("../models/users");
const { UserOrder } = require("../models/orders");
const { ReturnOrder } = require("../models/returnOrder");
const sendEmail = require("../utils/sendEmail");

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

module.exports.getMaxAllOrdersCtrl = asyncHandler(async (req, res) => {
  const myorders = await UserOrder.find().sort({ createdAt: -1 });
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

module.exports.returnOrderCtrl = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(404).json({ message: "user not found" });
  }
  const returnedOrder = await ReturnOrder.create({
    user: user,
    order: req.body.order,
    reason: req.body.reason,
  });
  res.status(201).json(returnedOrder);
});

module.exports.getAllReturnOrdersCtrl = asyncHandler(async (req, res) => {
  const returnedOrder = await ReturnOrder.find().sort({ createdAt: -1 });
  // .populate("user", ["-password"]);
  res.status(200).json(returnedOrder);
});

module.exports.sendEmailConfirmCtrl = asyncHandler(async (req, res) => {
  const userEmail = await req.body.userEmail;
  const orderName = await req.body.orderName;
  const orderPrice = await req.body.orderPrice;

  const htmlTemplate = `
  <div>
    <p>your order ${orderName} has been improved for return you will receve the money around 3 days total amount is ${orderPrice}dhr </p>
  </div>
  `;
  // sending email to the user
  await sendEmail(userEmail, "Request return order", htmlTemplate);

  await ReturnOrder.findByIdAndDelete(req.body.id);

  res
    .status(200)
    .json({ message: "the information has been send to the user successfuly" });
});

module.exports.sendEmailDiclineCtrl = asyncHandler(async (req, res) => {
  const userEmail = await req.body.userEmail;
  const orderName = await req.body.orderName;
  const retunReason = await req.body.returnReason;

  const htmlTemplate = `
  <div>
    <p>your order ${orderName} has been rejected because ${retunReason}</p>
  </div>
  `;
  // sending email to the user
  await sendEmail(userEmail, "Request return order", htmlTemplate);

  await ReturnOrder.findByIdAndDelete(req.body.id);

  res
    .status(200)
    .json({ message: "the information has been send to the user successfuly" });
});
