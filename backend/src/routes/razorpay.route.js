const {Router} = require('express');
const {isAlreadyReg} = require('../middlewares/isAlreadyReg.middleware');
const {createOrderController} = require('../controllers/payment.controller')

const razorpayRouter = Router();


/**
 * @route POST /api/payment/create-order
 * @description create order for razorpay popup
 * @access private
 */

razorpayRouter.post('/create-order',isAlreadyReg,createOrderController)


module.exports = razorpayRouter;