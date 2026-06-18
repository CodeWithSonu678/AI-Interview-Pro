const pdfParse = require("pdf-parse");
const interviewReportModel = require("../models/interviewReport.model");
const {
  generateInterviewReport,
  generateResumePdf,
} = require("../services/ai.service");
const { success } = require("zod");

async function generateInterviewReportController(req, res) {
  const { jobDescription, selfDescription } = req.body;

  let resumeContent = "";

  if (req.file) {
    resumeContent = await new pdfParse.PDFParse(
      Uint8Array.from(req.file.buffer),
    ).getText();
  } else if (selfDescription) {
    resumeContent = {
      text: selfDescription,
    };
  } else {
    return res.status(400).json({
      success: false,
      message: "Resume file or self description is required",
    });
  }

  const interviewReportByAi = await generateInterviewReport({
    selfDescription,
    resumeContent,
    jobDescription,
  });

  if (!interviewReportByAi) {
    return res.status(500).json({
      success: false,
      message: "Failed to generate interview report",
    });
  }

  try {
    const interviewReport = await interviewReportModel.create({
      selfDescription,
      resume: resumeContent.text,
      jobDescription,
      ...interviewReportByAi,
      user: req.user.id,
    });

    res.status(201).json({
      success: true,
      msg: "Interview report generated successfully",
      interviewReport,
    });
  } catch (error) {
    console.log(error);
    res.status(200).json({
      success: false,
      msg: "something went wrong in database !",
    });
  }
}

//fetch particular report by id
async function interviewReportByIdController(req, res) {
  const { interviewId } = req.params;

  try {
    const interviewReport = await interviewReportModel.findOne({
      _id: interviewId,
      user: req.user.id,
    });

    if (!interviewReport) {
      return res.status(404).json({
        success: false,
        msg: "No Interview Report in your id!",
      });
    }

    res.status(200).json({
      success: true,
      msg: "Interview Reports found successfully.",
      interviewReport,
    });
  } catch (error) {
    console.log(error.message);
    res.status(404).json({
      success: false,
      msg: "Something error in your db !",
    });
  }
}

//fetch all reports
async function allInterviewReportsController(req, res) {
  try {
    const interviewReports = await interviewReportModel
      .find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .select(
        "-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan",
      );

    res.status(200).json({
      success: true,
      msg: "All Interview Reports fetched successfully",
      interviewReports,
    });
  } catch (error) {
    console.log(error.message);
    res.status(404).json({
      success: false,
      msg: "Something error in your db !",
    });
  }
}

// create pdf resume
async function generateResumePdfController(req, res) {
  const { interviewReportId } = req.params;
  const interviewReport = await interviewReportModel.findOne({
    _id: interviewReportId,
    user: req.user.id,
  });

  if (!interviewReport) {
    return res.status(404).json({
      success: false,
      msg: "Interview report not found",
    });
  }

  const { resume, selfDescription, jobDescription } = interviewReport;
  // Generate PDF using the interview report data
  const pdfBuffer = await generateResumePdf({
    resume,
    selfDescription,
    jobDescription,
  });

  res.set({
    "Content-Type": "application/pdf",
    "Content-Disposition": `attachment; filename=resume_${interviewReportId}.pdf`,
  });
  res.send(pdfBuffer);
}

module.exports = {
  generateInterviewReportController,
  interviewReportByIdController,
  allInterviewReportsController,
  generateResumePdfController,
};
