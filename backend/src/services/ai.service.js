const { GoogleGenAI } = require("@google/genai");
const { z } = require("zod");
const { zodToJsonSchema } = require("zod-to-json-schema");
const puppeteer = require("puppeteer");

// for validate by zod to kaise data hona chaiye ai ka 
const interviewReportSchema = z.object({
  matchScore: z
    .number()
    .describe(
      "A score between 0 and 100 indicating how well the candidate's profile matches the job describe",
    ),
  technicalQuestions: z
    .array(
      z.object({
        question: z
          .string()
          .describe("The technical question can be asked in the interview"),
        intention: z
          .string()
          .describe("The intention of interviewer behind asking this question"),
        answer: z
          .string()
          .describe(
            "How to answer this question, what points to cover, what approach to take etc.",
          ),
      }),
    )
    .describe(
      "Technical questions that can be asked in the interview along with their intention and how to answer them",
    ),
  behavioralQuestions: z
    .array(
      z.object({
        question: z
          .string()
          .describe("The technical question can be asked in the interview"),
        intention: z
          .string()
          .describe("The intention of interviewer behind asking this question"),
        answer: z
          .string()
          .describe(
            "How to answer this question, what points to cover, what approach to take etc.",
          ),
      }),
    )
    .describe(
      "Behavioral questions that can be asked in the interview along with their intention and how to answer them",
    ),
  skillGaps: z
    .array(
      z.object({
        skill: z.string().describe("The skill which the candidate is lacking"),
        severity: z
          .enum(["low", "medium", "high"])
          .describe(
            "The severity of this skill gap, i.e. how important is this skill for the job and how much it can impact the candidate's chances",
          ),
      }),
    )
    .describe(
      "List of skill gaps in the candidate's profile along with their severity",
    ),
  preparationPlan: z
    .array(
      z.object({
        day: z
          .number()
          .describe("The day number in the preparation plan, starting from 1"),
        focus: z
          .string()
          .describe(
            "The main focus of this day in the preparation plan, e.g. data structures, system design, mock interviews etc.",
          ),
        tasks: z
          .array(z.string())
          .describe(
            "List of tasks to be done on this day to follow the preparation plan, e.g. read a specific book or article, solve a set of problems, watch a video etc.",
          ),
      }),
    )
    .describe(
      "A day-wise preparation plan for the candidate to follow in order to prepare for the interview effectively",
    ),
  title: z
    .string()
    .describe(
      "The title of the job for which the interview report is generated",
    ),
});

//yah btata h ki ai ko kis format min data dena hai 
const responseSchema = {
  type: "object",

  properties: {
    matchScore: {
      type: "number",
    },

    technicalQuestions: {
      type: "array",

      items: {
        type: "object",

        properties: {
          question: { type: "string" },
          intention: { type: "string" },
          answer: { type: "string" },
        },
      },
    },

    behavioralQuestions: {
      type: "array",

      items: {
        type: "object",

        properties: {
          question: { type: "string" },
          intention: { type: "string" },
          answer: { type: "string" },
        },
      },
    },

    skillGaps: {
      type: "array",

      items: {
        type: "object",

        properties: {
          skill: { type: "string" },

          severity: {
            type: "string",
          },
        },
      },
    },

    preparationPlan: {
      type: "array",

      items: {
        type: "object",

        properties: {
          day: { type: "number" },

          focus: { type: "string" },

          tasks: {
            type: "array",

            items: {
              type: "string",
            },
          },
        },
      },
    },

    title: {
      type: "string",
    },
  },
};

const api = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GENAI_API_KEY,
});

async function generateInterviewReport({
  selfDescription,
  resume,
  jobDescription,
}) {
  const prompt = `
You are an AI interview assistant.

Return ONLY valid JSON.

Do not add markdown.
Do not add explanation.

IMPORTANT:
All arrays must contain proper JSON objects.

Do NOT flatten object properties into arrays of strings.

The response MUST be valid JSON.

IMPORTANT RULES:

1. Arrays must contain ONLY JSON objects.
2. Do NOT flatten object properties into arrays.
3. technicalQuestions must be an array of objects.
4. behavioralQuestions must be an array of objects.
5. skillGaps must be an array of objects.
6. preparationPlan must be an array of objects.
7. Never return arrays of strings like:
   ["question","answer"]

Correct format example:

{
  "matchScore": 90,

  "technicalQuestions": [
    {
      "question": "Explain React hooks",
      "intention": "Check React knowledge",
      "answer": "Explain useState and useEffect"
    }
  ],

  "behavioralQuestions": [
    {
      "question": "Tell me about a challenge",
      "intention": "Check problem solving",
      "answer": "Use STAR method"
    }
  ],

  "skillGaps": [
    {
      "skill": "Redux",
      "severity": "medium"
    }
  ],

  "preparationPlan": [
    {
      "day": 1,
      "focus": "React",
      "tasks": [
        "Learn hooks",
        "Build mini project"
      ]
    }
  ],

  "title": "Frontend Developer Intern"
}

Resume:
${resume}

Self Description:
${selfDescription}

Job Description:
${jobDescription}
`;

  try {
    const response = await api.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseJsonSchema: responseSchema,
      },
    });

    const result = interviewReportSchema.parse(JSON.parse(response.text));

    return result;
  } catch (error) {
    if (error.status === 429) {
      console.log("Rate limit exceeded. Try again later.");
    }

    console.log(error.message);

    return null;
  }
}

async function generateResumePdfFormat(htmlContent){
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(htmlContent, { waitUntil: "networkidle0" })

    const pdfBuffer = await page.pdf({
        format: "A4", margin: {
            top: "20mm",
            bottom: "20mm",
            left: "15mm",
            right: "15mm"
        }
    })

    await browser.close()

    return pdfBuffer
}

async function generateResumePdf({ resume, selfDescription, jobDescription }) {

    const resumePdfSchema = z.object({
        html: z.string().describe("The HTML content of the resume which can be converted to PDF using any library like puppeteer")
    })

    const prompt = `Generate resume for a candidate with the following details:
                        Resume: ${resume}
                        Self Description: ${selfDescription}
                        Job Description: ${jobDescription}

                        the response should be a JSON object with a single field "html" which contains the HTML content of the resume which can be converted to PDF using any library like puppeteer.
                        The resume should be tailored for the given job description and should highlight the candidate's strengths and relevant experience. The HTML content should be well-formatted and structured, making it easy to read and visually appealing.
                        The content of resume should be not sound like it's generated by AI and should be as close as possible to a real human-written resume.
                        you can highlight the content using some colors or different font styles but the overall design should be simple and professional.
                        The content should be ATS friendly, i.e. it should be easily parsable by ATS systems without losing important information.
                        The resume should not be so lengthy, it should ideally be 1-2 pages long when converted to PDF. Focus on quality rather than quantity and make sure to include all the relevant information that can increase the candidate's chances of getting an interview call for the given job description.
                    `

    const response = await api.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: zodToJsonSchema(resumePdfSchema),
        }
    })


    const jsonContent = JSON.parse(response.text)

    const pdfBuffer = await generateResumePdfFormat(jsonContent.html)

    return pdfBuffer

}

module.exports = {generateInterviewReport,generateResumePdf};
