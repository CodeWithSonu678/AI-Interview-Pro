const {Router} = require('express');
const authController = require('../controllers/auth.controller');
const {isAlreadyReg} = require('../middlewares/isAlreadyReg.middleware');

const authRouter = Router();

//Register Api create
authRouter.post("/register",authController.regUser);

//login api create
authRouter.post("/login",authController.loginUser);

//logout api create
authRouter.get("/logout",isAlreadyReg,authController.logoutUser);

//Fetch Get-Me data api create
authRouter.get("/get-me",isAlreadyReg,authController.getMe);

authRouter.post("/google",authController.googleLogin);


module.exports = authRouter;