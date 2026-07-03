const razorpay = require("../services/razorpay.service");
const crypto = require("crypto");
const authModel = require("../models/auth.model");
const paymentModel = require("../models/paymentHistory.model");

// create order in razorpay

async function createOrderController(req, res) {
  try {
    const { plan } = req.body;

    const prices = {
      pro: 49,
      premium: 99,
    };

    //agar hacker frontend se wrong plan bheje toh detect kar ke reply dena

    if (!prices[plan]) {
      res.status(400).json({
        success: false,
        massage: "Invalid Plan",
      });
    }

    const options = {
      amount: prices[plan] * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Unable to create order",
    });
  }
}

//verify payment 

async function verifyPaymentController(req, res) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, plan } =
      req.body;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.TEST_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    //check razorpay signature match our signature

    if (razorpay_signature !== expectedSignature) {
      res.status(400).json({
        success: false,
        message: "Invalid Payment",
      });
    }

    //UPDATE USER plan
    const user = await authModel.findById(req.user.id);
    user.userPlan = plan;
    user.reportsUsed = 0;

    await user.save();

    //save payment history

    const paymentHistory = await paymentModel.create({
      user: req.user.id,
      plan,
      amount: plan === "pro" ? 49 : 99,
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      signature: razorpay_signature,
    });

    return res.status(200).json({
      success:true,
      message:"Payment Verified !",
      user
    })

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success:false,
      message:"Internal Server Error."
    })
  }
}

module.exports = { createOrderController,verifyPaymentController };
