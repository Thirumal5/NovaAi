import { Router } from "express";
import AIAnalysis from "../Model/Analysis";
import axios from 'axios'
const route=Router()

route.get('/match',async(req,res)=>{

    try{
            const analysis=await AIAnalysis.findone({"userId":"demo"}).sort({createdAt:-1})
            if(!analysis)
            {
                return res.status(404).json({success:false,message:"No analysis found"})
            }
            const skills=analysis.skills.map((skill)=>skill.toLowerCase());
            const role=analysis.recommendedPrimaryRole;

            const response=await axios.get("https://api.adzuna.com/v1/api/jobs/in/search/1",
                {
                    params:{
                            app_id: process.env.ADZUNA_APP_ID,
                            app_key: process.env.ADZUNA_APP_KEY,
                            what:role,
                            result_per_page:20
                    }
                }
            )
            const job=response.data.result;
            
            
    }
    catch(err)
    {

    }
})