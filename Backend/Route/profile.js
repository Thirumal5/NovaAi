import Router from 'express'
import User from '../Model/User.js'
import middleware from '../Middleware/Middleware.js';
import Analysis from '../Model/Analysis.js'
import Studyplan from '../Model/studyplan.js';

const route=Router();

route.get('/profile',middleware,async (req,res)=>{

    try{
        const user=await User.findById(req.userId).select('-password');
        const analysis=await Analysis.findOne({userId:req.userId});
        const studyplan=await Studyplan.findOne({userId:req.userId});


    res.json({
      name: user.name,
      email: user.email,
      experience: analysis?.experienceLevel,
      atsScore: analysis?.overallScore*10 || 0,
      strengths: analysis?.strengths || [],
      missing: analysis?.missingSkills || [],
      studyDays:studyplan?.totalDays || 0,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Profile fetch error" });
  }
});

export default route;

     
