const {Router} = require('express');
const middleware = require('../middlewares/isAlreadyReg.middleware');
const upload = require('../middlewares/file.middleware');
const interviewController = require('../controllers/interviewReport.controller');

const interviewRouter = Router();

/**
 * @route POST /api/interview/
 * @description generate new interview report on the basis of user self description,resume pdf and job description.
 * @access private
 */
interviewRouter.post("/",middleware.isAlreadyReg,upload.single("resume"),interviewController.generateInterviewReportController);

/**
 * @route Get /api/interview/report:interviewId
 * @description fetch interview reports by id
 * @access private
 */

interviewRouter.get("/report/:interviewId",middleware.isAlreadyReg,interviewController.interviewReportByIdController);

/**
 * @route Get /api/interview/
 * @description fetch all interview reports
 * @access private
 */

interviewRouter.get("/",middleware.isAlreadyReg,interviewController.allInterviewReportsController);

/**
 * @route Post /api/interview/resumePdf/:interviewId
 * @description generate PDF resume for a specific interview report
 * @access private
 */

interviewRouter.post("/resumePdf/:interviewReportId",middleware.isAlreadyReg,interviewController.generateResumePdfController);



module.exports = interviewRouter;