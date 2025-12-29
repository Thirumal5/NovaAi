import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";

import { HiArrowRight } from "react-icons/hi2";
import axios from 'axios'
import { toast } from 'react-toastify';
import { Auth } from '../Context/ContextProvider';

export default function Signup() {
  const{user,setUser}=Auth()
  const [name, Setname] = useState('');
  const [email, SetEmail] = useState('');
  const [password, Setpassword] = useState('');
  const [phonenumber, Setphonenumber] = useState('')
  const navigate=useNavigate();
  const handlesumbit=async (e)=>
  {
    e.preventDefault();
    try{
       const response=await axios.post('http://localhost:5000/api/auth/signup',{name,email,password,phonenumber});
       if(response.data.success)
       {
        toast.success("Registration Success")
        localStorage.setItem("token",response.data.token)
        setUser(response.data.user);
        navigate('/');
       }
      console.log(response);

    }
    catch(err)
    {
      const errorMessage =
     err.response?.data?.message || "Registration failed";

  toast.error(errorMessage);
    }

  }
  return (
    <div className='min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-900 dark:to-gray-800">'>
      <div className='bg-white w-[390px] h-[550px] p-8 mb-10'>
        <div className='flex flex-col justify-center items-center gap-2 '>
          <div className='inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-[#3B82F6] to-[#10B981] mb-4'>
            <span className='text-2xl text-white'>🚀</span>
          </div>
          <h2 className='text-3xl font-bold bg-gradient-to-r from-[#3B82F6] to-[#10B981] bg-clip-text text-transparent  text-xl'>Create Account</h2>
          <p className='text-sm text-gray-600 dark:text-gray-400'>Join thousands of students landing their dream jobs</p>
        </div>
        <form action="" onSubmit={handlesumbit}>
          <div className='flex flex-col gap-2 m-2'>
            <div className='space-y-2 flex flex-col gap-2 '>
              <label htmlFor="name">Full Name</label>
              <input type="text" className='bg-gray-100 w-full p-2 rounded-sm' placeholder='abc' onChange={(e) => Setname(e.target.value)} />
            </div>
            <div className='space-y-2 flex flex-col gap-2 '>
              <label htmlFor="Email">Email</label>
              <input type="email" className='bg-gray-100 w-full p-2 rounded' placeholder='JohnDoe@gmail.com' onChange={(e) => SetEmail(e.target.value)} />
            </div>
            <div className='space-y-2 flex flex-col gap-2 '>
              <label htmlFor="Password">Password</label>
              <input type='password' className='bg-gray-100 w-full p-2 rounded ' placeholder='.......' onChange={(e) => Setpassword(e.target.value)} />
            </div>
            <div className='space-y-2 flex flex-col gap-2 '>
              <label htmlFor="Password">Phone Number</label>
              <input type="tel" className='bg-gray-100 w-full p-2 rounded ' placeholder='+91 7862000010' onChange={(e) => Setphonenumber(e.target.value)} />
            </div>
          </div>
          <button type="submit" className="w-full mt-6 p-2 rounded text-sm
             bg-gradient-to-r from-[#3B82F6] to-[#10B981]
             hover:opacity-90 transition-opacity
             flex items-center justify-center gap-2 text-white font-semibold">
            Create Account
            <HiArrowRight className="text-sm ml-2" />
          </button>
          <div className='flex gap-2 justify-center mt-2'>
            <p>Already have an Account?</p>
            <Link to={'/signin'} className="text-[#3B82F6] hover:font-medium">Sign In</Link>
          </div>

        </form>
      </div>
    </div>
  )
}
