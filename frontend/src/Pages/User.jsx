import React from 'react';
import { LuUpload } from "react-icons/lu";
import { Auth } from '../Context/ContextProvider';
import { Link, Navigate } from "react-router-dom";


export default function User() {
  const { user, loading } = Auth();
  
  
   if(loading)
   {
      return <h2>loading.....</h2>
   }
   if(!user)
   {
      return <Navigate to='/signin'/>
   }

  
  return (
    <>
      <div className='bg-white p-6 shadow-lg h-42 flex gap-3 items-center mt-10 rounded-lg'>
        <div className='bg-gradient-to-r from-[#3B82F6] to-[#10B981] rounded-full w-20 h-20 flex justify-center items-center text-3xl'>
          <span>👨‍🎓</span>
        </div>

        <div className='flex flex-col gap-2 ml-10'>
          <h1 className='text-3xl font-semibold'>{user.name}</h1>
          <h2 className='text-xl font-thin'>Full stack Developer</h2>

          <div className='flex gap-2 items-center'>
            <div className='w-16 h-16 border-[#10B981] rounded-full border-4 flex justify-center items-center'>
              <span>72%</span>
            </div>
            <p>Match Score</p>
          </div>
        </div>
      </div>

      <div className='bg-gradient-to-r from-[#3B82F6] to-[#10B981] mt-10 h-35 rounded-lg flex items-center justify-between'>
        <div className='flex flex-col gap-2 ml-5'>
          <h2 className='text-xl font-bold text-white'>Upload Your Resume</h2>
          <h2 className='text-sm font-thin text-white'>
            Get AI-Powered Analysis and personalized Job matches
          </h2>
        </div>
        <Link to={'/Resumeupload'}>
        <button
          type='button'
          className='mr-15 bg-white rounded-lg p-2 text-blue-400 flex gap-4 items-center font-semibold w-35' 
        >
         <LuUpload /> 
          upload File
        </button>
         </Link>
      </div>
    </>
  );
}
