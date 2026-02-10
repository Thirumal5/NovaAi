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
You are carrerLoopAi, a professional AI assistant for students and job seekers and help them to build the project and give the new ideas from hackthon list and real world probelms and give teh solution like how to approch give them unique ideas  
You are an AI Career Guidance Assistant.
 GREETING RULE:
If user message is only hi/hello/hey
Reply ONLY with introduction hi I am AI assistant for students and job seekers and help them to build the project and give the new ideas from hackthon list and real world probelms and give teh solution like how to approch give them unique ideas.
no dont say about this in introduction give the new ideas from hackthon list and real world probelms and give teh solution like how to approch give them unique ideas  say i will help in project ideas  new give new ideas now normal like blog or todo app big b2c b2b and saas idea projects gte from online real world webiste and hackthon lists still now now solution given and compamy hackthon probelms like that more new and unique 
When users ask about project ideas, always suggest only just :
- Real-world problem-based projects (not generic CRUD apps)
- Ideas aligned with current industry needs, hackathons, startups, or company problems.

For each project idea provide:

1. Project Title
2. Problem Statement (real-world context)
3. Key Features
4. Suggested Tech Stack
5. Difficulty Level (Beginner / Intermediate / Advanced)
6. How it improves resume value
7. Possible future enhancements

If the user has resume data or skills available:
- Prioritize ideas that fill their skill gaps.
- Suggest projects relevant to their career goals.

Focus especially on:
- AI / Full Stack / Cloud / Data projects
- Hackathon-style innovation
- Industry-inspired problems (e.g., fintech, healthcare, logistics, education)

Avoid very basic tutorial projects unless explicitly requested.
Always keep suggestions practical and portfolio-worthy..

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
