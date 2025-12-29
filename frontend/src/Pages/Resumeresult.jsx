import React from 'react'
import { HiArrowLeft, HiArrowRight, HiSparkles } from 'react-icons/hi2'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { CiCircleCheck } from "react-icons/ci";
import { GrCircleAlert } from "react-icons/gr";
export default function Resumeresult() {
    const location=useLocation();
    const analysis=location.state
  return (
    <>  
        <div className='min-h-screen bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-900 dark:to-gray-800 p-4 md:p-8 '>
         <Link to={'/'} >
            <button className='flex gap-2 items-center border border-[#3B82f6] pointer ml-5
             text-[#3B82F6]
             p-2 rounded-lg
             w-24 justify-center hover:bg-[#3B82F6] hover:text-white transition'><HiArrowLeft/>Back</button>
         </Link>
                <h2 className='flex justify-center text-blue-400 font-bold text-xl'>AI Analysis Results</h2>
            <section className='bg-gradient-to-r from-[#3B82F6] to-[#10B981] p-8 shadow-xl m-4 text-white flex items-center justify-between rounded-lg'>
                
             <div className='flex flex-col gap-2 '>
                <span className='flex  items-center gap-2'>
                   <HiSparkles className='text-3xl'/>
                   <h2 className='text-3xl font-bold'>Overall Match Score</h2>
                </span>
                <h2>Your resume has been analyzed by AI</h2>
             </div>
              <div className='w-20 h-20 border-4 border-white rounded-full flex justify-center items-center'>
                <span className='text-white text-3xl'>{analysis.overallScore*10}%</span>
                
                </div>
              
         </section>
         
            <section className='bg-white shadow-lg p-6 m-4 rounded-lg'>
           <h2 className='font-bold text-xl'>Skills Assesments</h2>
           <div className='flex flex-wrap gap-10 m-2 mt-5'>
          {Object.entries(analysis.skills).map(([skill,score])=> 
         (
    
           <article key={skill}  className='w-60 flex'>
                 <div className='w-60 flex flex-col gap-2 m-4'>
                    <div className='flex justify-between'>
                        <span>{skill}</span>
                        <span className='text-gray-800'>{score*10}%</span>
                    </div>
                    <div className='bg-gray-200 w-full h-2 shadow-lg rounded-lg'>
                        
                        <div className='bg-black h-2 shadow-lg rounded-lg' style={{width:`${score*10}%`}}></div>
                    </div>
                 </div>
           </article>
           
           ))}
           </div>
         </section>
        
        <section className='grid grid-cols-2 gap-2'>
            <article className='bg-white shadow-lg  m-4 rounded-lg p-2' >
              <div className='ml-10 '> 
                <div className='flex gap-3 items-center mt-1'>
                    <div className='bg-green-300 rounded-full h-10 w-10  p-2 flex justify-center items-center' >
                        <span><CiCircleCheck className='text-green-600 text-3xl font-bold'/></span>
                    </div>
                    <h3 className='font-bold text-2xl'>Strengths</h3>
                </div>
                {analysis.strengths.map((strength,index)=>(
                    <div key={index} className='flex gap-4 mt-5'>
                    <span><CiCircleCheck className='text-green-600 text-2xl'/></span>
                    <h2>{strength}</h2>
                </div>))}
              </div>
            </article>
            <article className='bg-white shadow-lg  m-4 rounded-lg p-2 '>
                <div className='ml-10 '> 
                <div className='flex gap-3 items-center mt-2'>
                    <div className='bg-red-300 rounded-full h-10 w-10  p-2 flex justify-center items-center' >
                        <span><GrCircleAlert  className='text-red-600 text-3xl font-bold'/></span>
                    </div>
                    <h3 className='font-bold text-2xl'>Areas to Improve</h3>
                </div>

                {analysis.improvementPlan.map((plan)=>(
                    <div className='flex gap-4 mt-5'>
                    <span><GrCircleAlert  className='text-red-600 text-2xl'/></span>
                    <h2>{plan}</h2>
                </div>
                ))}
              </div>
            </article>
        </section>
         
         <section className="bg-white shadow-lg m-4 rounded-lg p-4">
  <div className="flex flex-col gap-2 ml-10 m-2">
    <h2 className="text-xl font-bold">Missing Skills Highlights</h2>
    <p className="text-gray-600">
      These skills are commonly required for your target roles
    </p>

    
  </div>

  <article className="ml-10 flex flex-wrap gap-5 m-2 mt-5">
    {analysis.missingSkills.highPriority.map((skill, index) => (
      <div
        key={index}
        className="flex items-center bg-red-50 border border-red-200
                   w-[40%] rounded-lg p-3 justify-between shadow-sm"
      >
        <span className="font-semibold text-red-700">{skill}</span>
        <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm">
          High Priority
        </span>
      </div>
    ))}

    {analysis.missingSkills.mediumPriority.map((skill, index) => (
      <div
        key={index}
        className="flex items-center bg-orange-50 border border-orange-200
                   w-[40%] rounded-lg p-3 justify-between shadow-sm"
      >
        <span className="font-semibold text-orange-700">{skill}</span>
        <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm">
          Medium Priority
        </span>
      </div>
    ))}

    {analysis.missingSkills.lowPriority.map((skill, index) => (
      <div
        key={index}
        className="flex items-center bg-green-50 border border-green-200
                   w-[40%] rounded-lg p-3 justify-between shadow-sm"
      >
        <span className="font-semibold text-green-700">{skill}</span>
        <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm">
          Low Priority
        </span>
      </div>
    ))}
  </article>
</section>
    
    
        <Link to={'/JobMatches'}>
         <div className='text-white flex justify-center items-center gap-2 rounded-lg bg-gradient-to-r from-[#3B82F6] to-[#10B981] p-2 m-4 shadow-xl '>
            <h2>View Matching Jobs</h2>
            <HiArrowRight className='text-white text-xl'  />
        </div>
        </Link>
   
         
      </div>
    </>
  )
}
