import React from 'react'
import { HiArrowLeft } from 'react-icons/hi2'
import { Link } from 'react-router-dom'

export default function JobMatches() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-900 dark:to-gray-800 p-4 md:p-8 '>
         <Link to={'/'} >
            <button className='flex gap-2 items-center border border-[#3B82f6] pointer ml-5
             text-[#3B82F6]
             p-2 rounded-lg
             w-24 justify-center hover:bg-[#3B82F6] hover:text-white transition'><HiArrowLeft/>Back</button>
         </Link>
                
            <section className='bg-gradient-to-r from-[#3B82F6] to-[#10B981] p-8 shadow-xl m-4 text-white flex items-center justify-between rounded-lg'>
                
             
                <div className='flex flex-col items-center gap-2 m-2'>
                   
                   <h2 className='text-3xl font-bold mr-30'>6 Jobs Found</h2>
                    <p className='text-white'>Matched based on your skills and resume analysis</p>
                </div>
                
             
             </section>

             <section>
                 <article>
        <div className="bg-white rounded-xl w-[25%] m-2 shadow-md p-6 hover:shadow-xl transition">
        <div className="flex justify-between items-center">
    <h3 className="text-xl font-bold">Zoho</h3>
    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
      82% Match
    </span>
  </div>
  <p className="text-lg font-semibold text-gray-800 mt-1">
    Frontend Developer
  </p>
<div className="flex gap-6 text-sm text-gray-500 mt-2">
    <span>📍 Chennai</span>
    <span>💰 6–12 LPA</span>
  </div>

 
  <div className="flex flex-wrap gap-2 mt-4">
    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
      React
    </span>
    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
      JavaScript
    </span>
  </div>

  
  <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-3">
    <p className="text-red-700 text-sm font-semibold">
      Missing Skills:
    </p>
    <div className="flex gap-2 mt-2">
      <span className="bg-red-200 text-red-700 px-2 py-1 rounded text-xs">
        TypeScript
      </span>
    </div>
  </div>

  
  <div className="mt-5 flex flex-end">
    <button className="bg-[#3B82F6] text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition">
      Apply Now
    </button>
  </div>
</div>
</article>
</section>
</div>
  )
}
