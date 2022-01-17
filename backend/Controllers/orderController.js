import Order from "../models/OrderModel.js";
import statusCode from "../Constants/HttpStatusCode.js";

export const addOrderItem = async (req, res) => {
  try {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;
    if (orderItems && orderItems.length === 0) {
      res.status(statusCode.BAD_REQUEST);
      throw new Error("No Order Found");
    } else {
      const order = new Order({
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        user: req.user._id,
      });
      const createOrder = await order.save();
      res.status(statusCode.OK).json({
        data: createOrder,
        message: `Order Details`,
      });
    }
  } catch (err) {
    console.log(err.message);
  }
};
