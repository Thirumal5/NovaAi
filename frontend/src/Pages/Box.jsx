import React from 'react'

export default function Box({icon,complete,detail}) {
  return (
    <div className='bg-white p-6 shadow-lg w-95  h-30 flex justify-center items-center gap-7 mt-5 rounded-xl'>
        <div className='bg-green-200 h-15 w-15 rounded-full flex justify-center items-center'>
             <span className='text-3xl'>{icon}</span>
        </div>
        <div>
            <p className='text-2xl font-bold'>{complete}</p>
            <p className='text-lg font-semibold '>{detail}</p>
        </div>
    </div>
  )
}
