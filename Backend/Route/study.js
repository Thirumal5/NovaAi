import { Router } from "express";
import Analysis from "../Model/Analysis.js";
import OpenAI from "openai";
import middleware from "../Middleware/Middleware.js";
const route=Router();


route.get('/studyplan',middleware,async (req,res)=>{
  
   try{
    const plan=await Analysis.findOne({userId:req.userId})

    if(!plan)
    {
        return res.status(404).json({error:"missing skills not found"});
    }
    const missingskills=plan.missingSkills;
  

    const cilent=new OpenAI(
        {
            apiKey:process.env.GROQ_API_KEY,
            baseURL:"https://api.groq.com/openai/v1",
            
        }
    )
    
    const response=await cilent.chat.completions.create(
        {
           model:"llama-3.3-70b-versatile",
           messages:[
            
                {
                    role:"system",
                    content:` You are an AI career mentor and study planner`
                
                }
                ,{
                    role:'user',
                    content:` Generate a personalized study roadmap using ONLY the data provided below.
            STRICT RULES:
                - Include ONLY the missing skills
                - Do NOT include current skills
                - Do NOT include daily time schedules (hours)
                - Do NOT add motivation or explanation text
                - Keep topics short and bullet-based
                - Limit resources to a maximum of 2 per skill
                - Use beginner-friendly terminology
                - Determine the total number of days dynamically based on:
                 - Number of missing skills
                 - User level
               - Distribute topics logically across days
               - i need to distrubited into single days like day1 ,day2, day3 ive more topics in the  skills  accoridng to it the random days it shoulbe easy for the user more days above 10 days normally  not like day1-5 
                 - Output must be VALID JSON only (no extra text)

              return format in JSON only 
               
              User Data:
              Missingskills:${missingskills}
               
              Output format JSON ONLY:

              {
               totalDays:"0",
               "roadmap":[
                {
                 days:1,
                 skill:"",
                 topics:[""
                 ],
                 "wheretostudy:"
                 [
                 {
                 "platform":"",
                 "resources":"",
                 "link": ""
                  
                 }
                 ]
                }
               
               ]
              }
              `
                }
            
           ]

        }
       
        
    )
    return res.status(200).json(({success:true,
        studyplan:response.choices[0].message.content    }))
   }
   catch(err)
   {
      res.status(500).json({err:"error while generating study plan"})
   }



})
export default route;