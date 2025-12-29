import React, { useState } from 'react'
import { HiArrowLeft } from 'react-icons/hi2'
import { LuUpload } from 'react-icons/lu'
import { Link, useNavigate } from 'react-router-dom'
import { useRef } from 'react'
import { FaFileAlt } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";

import { toast } from 'react-toastify'
import axios from 'axios'
export default function Resumeupload() {
    const fileupload = useRef(null)
    const navigate=useNavigate();
    const[loading,setLoading]=useState(false)
    const [resume, setResume] = useState(null);

    const uploadfile = () => {
        fileupload.current.click();
    }
    const fileanalyze=async ()=>{
         if(!resume)
         {
            toast.error('upload the resume')
            return;
         }
         const resumedata=new FormData();
         resumedata.append("resume",resume);
         try{
            setLoading(true);
          const response=await axios.post('http://localhost:5000/api/resume/resumeanalyzer',resumedata)
          console.log(response.data.data)
          {
           if(response.data.success)
            {

                navigate('/Resumeresult',{state:response.data.data}
                )
            }  
          }
          
         }
         catch(err)
         {
          console.log(err);
          toast.error(err.message);
         }
         finally
         {
          setLoading(false)
         }
    }

    return (
        <div className='min-h-screen bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-900 dark:to-gray-800 p-4 md:p-8 '>

            <section className='w-[5%]'>
                <Link to={'/'} >
            <button className='flex gap-2 items-center border border-[#3B82f6] pointer
             text-[#3B82F6]
             p-2 rounded-lg
               w-24 justify-center hover:bg-[#3B82F6] hover:text-white transition'><HiArrowLeft/>Back</button>
            </Link>
            </section>
            
            { loading?
            <div className='flex justify-center items-center gap-2  min-h-screen'>
         <div className='animate-spin h-5 w-5 border-2 border-blue-500 border-t-transparent rounded-full'></div>
      <span className='text-blue-500'>AI is analyzing your resume...</span>
     </div>
    :
            <div className='relative'>
                <div className='flex justify-center '>
                    <div className='bg-white  shadow-lg border-dotted  border-gray-300 border-4   w-[70%] p-2 '>
                        {
                 resume ?
                <div className='flex flex-col  items-center gap-5 mt-5  '>
                <div className='bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-900 dark:to-gray-800 w-[80%] '>
                <section className='flex justify-between items-center gap-10'>
                    <div className='flex items-center gap-4 ml-2 p-2'>
                    <div className='bg-gradient-to-r from-[#3B82F6] to-[#10B981] w-15 h-15 rounded-full  flex justify-center items-center'>
                        <FaFileAlt  className='text-white text-xl'/>

                  </div>
                <div>
                {resume.name}
                <p>{(resume.size/1024).toFixed(2)}KB</p>
                </div>
                </div>
                <span className='mr-4' onClick={()=>setResume(null)}>
                <GiCancel />
                </span>
                </section>
                </div>
                <div className='bg-gradient-to-br from-blue-50    to-green-50 dark:from-gray-900 dark:to-gray-800 h-48 w-[80%] '>
                <section className="flex relative right-50 flex-col mt-4 items-center">
                 <h2 className="font-bold text-[#3B82F6] mb-3 mr-20">
                What we'll analyze
                </h2>

                <ul className="flex flex-col  gap-3">
                <li className="flex items-center gap-2">
                <span className="bg-[#10B981] h-1.5 w-1.5 rounded-full"></span>
                <span>Technical skills and expertise levels</span>
                </li>

                <li className="flex items-center gap-2">
                <span className="bg-[#10B981] h-1.5 w-1.5 rounded-full"></span>
                <span>Experience and project relevance</span>
                </li>
                  <li className="flex items-center gap-2">
                 <span className="bg-[#10B981] h-1.5 w-1.5 rounded-full"></span>
                 <span>Education and certifications</span>
                </li>
                <li className="flex items-center gap-2">
                <span className="bg-[#10B981] h-1.5 w-1.5 rounded-full"></span>
                <span>Job market alignment</span>
                </li>
                </ul>
                </section>
                </div>
                <button className='bg-gradient-to-r from-[#3B82F6] to-[#10B981] w-[80%] p-2 text-white' onClick={fileanalyze}>Analayze</button>
                </div> :
             <div className='flex flex-col justify-center items-center gap-5 mt-5 '>
                <div>
            <button className='bg-gradient-to-r from-[#3B82F6] to-[#10B981] w-15 h-15 rounded-full  flex justify-center items-center ' onClick={uploadfile}  >
            <input type="file" accept='.doc,.docx' ref={fileupload} onChange={(e) => setResume(e.target.files[0])} hidden /><LuUpload className='text-white text-3xl' /> </button>
             </div>
            <h2>Upload Your Resume here</h2>
            <p>or click to browse files</p>
            <p>Supports DOC,DOCX (Max 5MB)</p>
            <button className='bg-gradient-to-r from-[#3B82F6] to-[#10B981] h-10 p-4 rounded-xl text-white font-semibold  flex items-center justify-center' onClick={uploadfile} >
            Browse Files
            </button>
            </div>                        
            }
            </div>
           </div>
          <div>

            <div className='flex justify-center mt-5'>
            <div className='bg-white  w-[70%] h-50 shadow-lg p-2'>
            <h2 className='text-lg font-bold mt-5' >💡Tips for Better Results</h2>
            <div className='flex gap-50'>
            <div className='flex flex-col gap-5 mt-10'>
                <h3>✔️ use a well-formated ,recent resume</h3>
                <h3>✔️ List Quantifiable achivements</h3>
            </div>
            <div className='flex flex-col gap-5 mt-10'>
                 <h3>✔️ Include specific techninal Skills</h3>
                <h3>✔️ Keep it under 2 pages</h3>
            </div>

            </div>
            </div>
            </div>
            </div>
            </div>
}
        </div>
    )
}
