const Order = require("../models/Order");
const Cart = require("../models/Cart");
const Product = require("../models/Product");

exports.createOrder = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate("items.product");
    if (!cart || cart.items.length === 0) return res.status(400).json({ message: "Cart is empty" });

    let subtotal = 0;
    const orderItems = [];

    for (let item of cart.items) {
      const product = await Product.findById(item.product._id);
      if (!product || product.stock < item.quantity) {
        return res.status(400).json({ message: `Product ${product ? product.name : 'unknown'} is out of stock` });
      }
      
      const price = product.discountPrice || product.price;
      subtotal += price * item.quantity;
      
      orderItems.push({
        product: product._id,
        name: product.name,
        image: product.images[0],
        quantity: item.quantity,
        price
      });

      // Reduce stock
      product.stock -= item.quantity;
      await product.save();
    }

    const shippingFee = subtotal > 500 ? 0 : 50; // Simple logic
    const total = subtotal + shippingFee;

    const order = await Order.create({
      user: req.user._id,
      items: orderItems,
      shippingAddress: req.body.shippingAddress,
      subtotal,
      shippingFee,
      total
    });

    await Cart.findOneAndDelete({ user: req.user._id });

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getOrder = async (req, res) => {
  try {
    const order = await Order.findOne({ _id: req.params.id, user: req.user._id });
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.cancelOrder = async (req, res) => {
  try {
    const order = await Order.findOne({ _id: req.params.id, user: req.user._id });
    if (!order) return res.status(404).json({ message: "Order not found" });
    if (order.orderStatus !== "pending") return res.status(400).json({ message: "Cannot cancel order at this stage" });
    
    order.orderStatus = "cancelled";
    await order.save();
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};