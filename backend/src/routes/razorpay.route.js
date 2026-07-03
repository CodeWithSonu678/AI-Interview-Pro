const {Router} = require('express');
const {isAlreadyReg} = require('../middlewares/isAlreadyReg.middleware');
const {createOrderController,verifyPaymentController} = require('../controllers/payment.controller')

const razorpayRouter = Router();


/**
 * @route POST /api/payment/create-order
 * @description create order for razorpay popup
 * @access private
 */

razorpayRouter.post('/create-order',isAlreadyReg,createOrderController)

/**
 * @route POST /api/payment/verify-payment
 * @description verify payment for secure payment
 * @access private
 */

razorpayRouter.post('/verify-payment',isAlreadyReg,verifyPaymentController)


module.exports = razorpayRouter;