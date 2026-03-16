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
    const msg = message.toLowerCase().trim();

    if (/^(hi|hello|hey|vanakkam)/.test(msg)) {
      return res.json({
        airesponse: `
Hi 👋 I’m CareerLoopAI.

I help students with:

• Resume ATS improvement  
• Job preparation roadmap  
• Company interview preparation  
• Real-world project ideas  

Ask me anything 👍
`,
      });
    }

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
              (job) =>
                `${job.title} | ${job.companyname} | ${job.location} | Salary: ${job.salary}`
            )
            .join("\n")
        : "No jobs available";

    const resumecontent = resumedata?.resumetext || "No resume uploaded";

    let systemPrompt = `
You are CareerLoopAI, an AI mentor helping students prepare for software jobs.

Use the resume and job list to guide the user.

Response style:
• Clear headings
• Bullet points
• Short explanations
• Focus on helping the user get placed
`;

    if (msg.includes("job")) {
      systemPrompt = `
You are an AI job mentor.

Use the resume and job list to:

• Find matching jobs
• Rank them by skill match
• Explain why they match
• Suggest missing skills needed
`;
    }

    if (msg.includes("resume")) {
      systemPrompt = `
You are an ATS resume analyzer.

Analyze the resume and provide:

• Missing skills
• Resume improvement suggestions
• Skills required for software roles
• How to increase ATS score
`;
    }

    if (msg.includes("project")) {
      systemPrompt = `
Suggest real-world software projects inspired by startups and hackathons.

Avoid basic CRUD tutorial projects.

For each project include:

• Project Title
• Problem Statement
• Key Features
• Tech Stack
• Difficulty Level
• Resume Value
`;
    }

    const response = await openai.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      temperature: 0.3,
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: `
USER QUESTION:
${message}

USER RESUME:
${resumecontent}

JOB LIST:
${jobText}
`,
        },
      ],
    });

    const aiText =
      response?.choices?.[0]?.message?.content ||
      "AI couldn't generate a response. Please try again.";

    res.json({ airesponse: aiText });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      airesponse: "⚠️ Nova-AI error. Try again.",
    });
  }
});

export default route;