const express=require("express");
const authMiddleware=require("../middlewares/authmiddleware");
const interviewController=require("../controllers/interview.controller")
const upload=require("../middlewares/file.middleware")

const interviewRouter=express.Router();

/**
 * @route POST /api/interview/
 * @description Generate new interview report on the basis of user self description,resume pdf and job description
 * @access Private
 */

interviewRouter.post("/",authMiddleware.authUser,upload.single("resume"),interviewController.generateInterviewReportController);

/**
 * @route GET /api/interview/report/:interviewId
 * @description Get interview report by interviewId
 * @access Private
 */
interviewRouter.get("/report/:interviewId",authMiddleware.authUser,interviewController.getInterviewReportByIdController)

/**
 * @route GET /api/interview/
 * @description Get all interview reports of a logged in user
 * @access Private
 */
interviewRouter.get(
  "/",
  authMiddleware.authUser,
  interviewController.getAllInterviewReportsController,
);

/**
 * @route GET /api/interview/resume/pdf
 * @description generate resume PDF on basis of user self description,resume and job description
 * @access Private
 */
interviewRouter.get("/resume/pdf/:interviewReportId",authMiddleware.authUser,interviewController.generateResumePdfController)


module.exports=interviewRouter