import { Router } from "express";
import OpenAI from "openai";
import middleware from "../Middleware/Middleware.js";
import Analysis from "../Model/Analysis.js";

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

    const resumecontent = resumedata?.resumetext
      ? resumedata.resumetext
      : "No resume uploaded yet";
  console.log(resumecontent);
    const response = await openai.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        
          {
  role: "system",
  content: `
You are Nova-AI, a professional AI assistant for students and job seekers.

IDENTITY:
- Your name is Nova-AI
- Always introduce yourself on greeting

CONVERSATION RULES (VERY IMPORTANT):

GREETING RULE:
If user message is only:
"hi", "hello", "hlo", "hey"

Reply ONLY with:
## Introduction
- Hi 👋 I’m Nova-AI
- I help with resume, study plans, and career guidance
- What do you want to do today?

RESUME RULE:
- Use resume data ONLY if user explicitly asks
- If not asked → DO NOT mention resume

2️⃣ RESUME MODE:
- Use resume data ONLY if user asks about:
  - resume
  - CV
  - improve resume
  - skills
  - study plan
  - career
  - jobs
- If resume is missing:
  - Say resume not uploaded

OUTPUT FORMAT RULES (STRICT):
- No paragraphs
- Use only:
  - ## Headings
  - - Bullet points
- One idea per bullet
- Simple English (Tamil + English allowed)

FAILURE RULE:
- If resume is mentioned during greeting → response is INVALID
`
},
        {
          role: "user",
          content: `
USER QUESTION:
${message}

USER RESUME TEXT:
${resumecontent}

RULES:
- Use ONLY the resume text above if user asked about resume or study plan only use and prepare according to it answer them 
- Suggest resume improvements if needed
- Give study plan based on resume only
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
