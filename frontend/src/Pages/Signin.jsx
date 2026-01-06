import { useState } from "react";
import { Link } from "react-router-dom";
import { HiArrowRight } from "react-icons/hi2";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Auth } from "../Context/ContextProvider";

export default function Signin() {
  const{user,setUser}=Auth()
   const [email, SetEmail] = useState('');
    const [password, Setpassword] = useState('');
    const navigate =useNavigate()
    const handlesumbit= async (e)=>{
      e.preventDefault();
      try{
        const response=await axios.post('http://localhost:5000/api/auth/signin',{email,password})
         if(response.data.success)
         {
          toast.success('Login Sucessful')
          localStorage.setItem("token",response.data.token)
          setUser(response.data.user);
          navigate('/')
         }

      }
      catch(err)
      {
         const errorMessage =err.response?.data?.message || "Login failed";
        
          toast.error(errorMessage);
          console.log(err.message);
      }
    }
  return (
    <>
      <div className='min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-900 dark:to-gray-800">'>

        <div className='bg-white w-[390px] h-[550px] p-8 mb-10'>
          <div className='flex flex-col justify-center items-center gap-2 '>
            <div className='inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-[#3B82F6] to-[#10B981] mb-4'>
              <span className='text-2xl text-white'>🎓</span>
            </div>
            <h2 className='text-3xl font-bold bg-gradient-to-r from-[#3B82F6] to-[#10B981] bg-clip-text text-transparent  text-xl'>Nova Ai</h2>
            <p className='text-sm text-gray-600 dark:text-gray-400 text-xl'>Welcome back! Sign in to continue</p>
          </div>
          <form action="" onSubmit={handlesumbit}>
          <div className='flex flex-col gap-2 m-2 mt-5'>
          <div className='space-y-2 flex flex-col gap-2 '>
                <label htmlFor="Email">Email</label>
                <input type="email" className='bg-gray-100 w-full p-2 rounded' placeholder='abc@gmail.com'  onChange={(e)=>SetEmail(e.target.value)} />
              </div>
              <div className='space-y-2 flex flex-col gap-2 '>
                <label htmlFor="Password">Password</label>
                <input type='password' className='bg-gray-100 w-full p-2 rounded ' placeholder='.......' onChange={(e)=>Setpassword(e.target.value)} />
              </div>

          </div>
          <button type="submit" className="w-full mt-6 p-2 rounded text-sm
             bg-gradient-to-r from-[#3B82F6] to-[#10B981]
             hover:opacity-90 transition-opacity
             flex items-center justify-center gap-2 text-white font-semibold">
            SignIn
            <HiArrowRight className="text-sm ml-2" />
          </button>
          <div className='flex gap-2 justify-center mt-2'>
            <p>New to Nova Ai?</p>
            <Link to={'/signup'} className="text-[#3B82F6] hover:font-medium">Create an account</Link>
          </div>
        </form>
      </div>

    </div >
     </>
  )
}
