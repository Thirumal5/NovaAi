import { Router } from "express";
import OpenAI from "openai";
import middleware from "../Middleware/Middleware.js";
import Analysis from "../Model/Analysis.js";
import Job from "../Model/jobs.js";

const route = Router();

const openai = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

route.post("/chat", middleware, async (req, res) => {
  try {
    const { message } = req.body;

    const resumedata = await Analysis.findOne(
      { userId: req.userId },
      { resumetext: 1 }
    );

    const jobs = await Job.find({ userId: req.userId })
      .select("title companyname location salary description applyurl")
      .limit(15);

    const jobText =
      jobs.length > 0
        ? jobs
            .map(
              (job, i) =>
                `${i + 1}. ${job.title} at ${job.companyname}, ${job.location}, Salary: ${job.salary} description:${job.description}`
            )
            .join("\n")
        : "No jobs available";

    const resumecontent = resumedata?.resumetext
      ? resumedata.resumetext
      : "No resume uploaded yet";

    const response = await openai.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: `
You are Nova-AI, a professional AI assistant for students and job seekers.

GREETING RULE:
If user message is only hi/hello/hey
Reply ONLY with introduction.

FORMAT RULES:
- Only headings and bullet points
- No paragraphs
- Simple English (Tamil + English ok)
          `,
        },
        {
          role: "user",
          content: `
USER QUESTION:
${message}

USER RESUME TEXT:
${resumecontent}

JOBS MATCHED:
${jobText}
          `,
        },
      ],
    });

    res.json({ airesponse: response.choices[0].message.content });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "AI failed" });
  }
});

export default route;
