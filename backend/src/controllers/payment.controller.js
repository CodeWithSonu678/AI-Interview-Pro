const razorpay = require("../services/razorpay.service");

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

    console.log(error)

    res.status(500).json({
        success:false,
        message:"Unable to create order",
    })
  }
}


module.exports = {createOrderController};