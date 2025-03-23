const {
  createNewOrderCtrl,
  getAllOrdersCtrl,
  updateOrderStatus,
  getOrderCountCtrl,
  getMaxAllOrdersCtrl,
  returnOrderCtrl,
  getAllReturnOrdersCtrl,
  sendEmailConfirmCtrl,
  sendEmailDiclineCtrl,
} = require("../controllers/ordersController");
const {
  verifyToken,
  verfyTokenAndAdmin,
} = require("../middlewares/verifyToken");

const router = require("express").Router();

// /api/orders/my-orders
router
  .route("/my-orders")
  .post(verifyToken, createNewOrderCtrl)
  .get(getAllOrdersCtrl);

// /api/orders/my-orders/:id
router.route("/my-orders/:id").put(verfyTokenAndAdmin, updateOrderStatus);

// /api/orders/count
router.route("/count").get(getOrderCountCtrl);

// /api/orders/all-orders
router.route("/all-orders").get(getMaxAllOrdersCtrl);

// api/orders/return-order
router
  .route("/return-order")
  .post(verifyToken, returnOrderCtrl)
  .get(getAllReturnOrdersCtrl);

// api/orders/approve-return
router.route("/approve-return").post(verfyTokenAndAdmin, sendEmailConfirmCtrl);

router.route("/reject-return").post(verfyTokenAndAdmin, sendEmailDiclineCtrl);
module.exports = router;
