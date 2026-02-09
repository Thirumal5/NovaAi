import { Router } from "express";
import Analysis from "../Model/Analysis.js";
import StudyPlan from "../Model/studyplan.js";
import OpenAI from "openai";
import middleware from "../Middleware/Middleware.js";

const route = Router();

route.get("/studyplan", middleware, async (req, res) => {
  try {
    const existingPlan = await StudyPlan.findOne({
      userId: req.userId,
    });

    if (existingPlan) {
      return res.json({
        success: true,
        studyPlan: existingPlan,
      });
    }

    const analysis = await Analysis.findOne({
      userId: req.userId,
    });

    if (!analysis?.missingSkills?.length) {
      return res.status(404).json({
        error: "Missing skills not found",
      });
    }

    const client = new OpenAI({
      apiKey: process.env.GROQ_API_KEY,
      baseURL: "https://api.groq.com/openai/v1",
    });

    const response = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      temperature: 0.2,
      messages: [
        {
          role: "system",
          content:
            "Return ONLY valid JSON. No markdown. No explanation.",
        },
        {
          role: "user",
          content: `
Generate a structured study roadmap using ONLY:

${analysis.missingSkills.join(", ")}

STRICT RULES:

- Each day MUST include:
  skill, at least 2 topics, at least 1 resource
- Topics cannot be empty
- Resources must include platform, resource, link
- More than 10 total days normally
- Output ONLY JSON

Format:

{
  "totalDays": 0,
  "roadmap": [
    {
      "day": 1,
      "skill": "",
      "topics": ["topic1","topic2"],
      "wheretostudy": [
        {
          "platform": "",
          "resource": "",
          "link": ""
        }
      ]
    }
  ]
}
`,
        },
      ],
    });

    let aiContent = response.choices[0].message.content;

    aiContent = aiContent
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    let parsedData;

    try {
      parsedData = JSON.parse(aiContent);
    } catch (err) {
      console.error("Invalid JSON:", aiContent);

      return res.status(500).json({
        error: "AI returned invalid JSON",
      });
    }

    if (!parsedData?.roadmap?.length) {
      return res.status(500).json({
        error: "Invalid roadmap generated",
      });
    }

    parsedData.roadmap = parsedData.roadmap.filter(
      d =>
        d.skill &&
        d.topics?.length > 0 &&
        d.wheretostudy?.length > 0
    );

    if (!parsedData.roadmap.length) {
      return res.status(500).json({
        error: "AI generated empty roadmap",
      });
    }

    const savedPlan = await StudyPlan.create({
      userId: req.userId,
      totalDays: parsedData.totalDays,
      roadmap: parsedData.roadmap,
    });

    return res.json({
      success: true,
      studyPlan: savedPlan,
    });

  } catch (err) {
    console.error("StudyPlan Error:", err);

    res.status(500).json({
      error: "Error generating study plan",
    });
  }
});

export default route;
