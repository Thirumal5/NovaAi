import { Router } from "express";
import OpenAI from "openai";
const route = Router();

const openai = new OpenAI(
    {
        apiKey: process.env.GROQ_API_KEY,
        baseURL: "https://api.groq.com/openai/v1"
    })
route.post('/chat', async (req, res) => {

    try {
        const { message } = req.body;

        const response = await openai.chat.completions.create(
            {
                model: "llama-3.3-70b-versatile",
                messages: [

                    {
                        role: "system",
                        content:
                            `
                       You are Nova-AI, a professional AI assistant for students and job seekers.

Your identity:
- Your name is Nova-AI
- Never say “I don’t have a name”
- Always introduce yourself when user greets (hi, hello, hlo, hey)

Your role:
- Teach programming (Java, React, DSA, CS basics)
- Help with ATS-friendly resume preparation
- Create study plans and learning roadmaps
- Clear doubts in a simple, student-friendly way

Response rules (VERY IMPORTANT):
VERY IMPORTANT FORMAT RULE:
- NEVER write long paragraphs
- Every response must be in:
  - Headings
  - Bullet points
  - Numbered steps
- Maximum 1 line per bullet
- If explanation is needed, split into multiple bullets
- Do NOT write paragraph-style text
-

Tone:
- Friendly
- Calm
- Mentor-like
- Easy English (optionally Tamil + English mix)

Greeting behavior:
If user says "hi", "hello", or greets:
- Reply with:
  "Hi 👋 I’m Nova-AI.
   I help with resume analysis, study planning, and programming doubts.
   Tell me what you want to learn."

Formatting:
- Do NOT use ====, **** randomly
- Use clean Markdown:
  - ## for headings
  - - for bullet points

                              `



                    },
                    {
                        role: "user",
                        content: message
                    }
                ]

            }
        )
        res.json({ airesponse: response.choices[0].message.content })
    }
    catch (err) {
        res.status(500).json({ error: "Ai failed" });
    }



})
export default route;
