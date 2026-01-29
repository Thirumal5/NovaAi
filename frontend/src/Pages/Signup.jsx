import  { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { HiArrowRight } from "react-icons/hi2";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FaUser, FaEnvelope, FaLock, FaBriefcase, FaPhone } from "react-icons/fa";
import axios from 'axios';
import { toast } from 'react-toastify';
import { Auth } from '../Context/ContextProvider';

export default function Signup() {
 

  const [name, setName] = useState('');
  const [showpassword,setshowPassword]=useState(false);
  const [showconfirmpassword,setshowconfirmPassword]=useState(false);
  const [email, setEmail] = useState('');
  const[experience,setExperience]=useState('')
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [targetRole, setTargetRole] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);

 

  const handleSubmit = async (e) => {
    e.preventDefault();

  
    if (!name || !email || !password || !confirmPassword || !phoneNumber || !targetRole||!experience) {
      toast.error("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        'http://localhost:5000/api/auth/signup',
        {
          name,
          email,
          password,
          phonenumber: phoneNumber,
          targetrole: targetRole,
          experience

        }
      );

      if (response.data.success) {
        toast.success("Registration Successful");
        localStorage.setItem("token", response.data.token);
        window.location.href = "/";
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Registration failed";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-green-50'>
      <div className='bg-white w-[390px] p-8 rounded shadow'>
        <div className='flex flex-col items-center gap-2 mb-4'>
          <div className='w-16 h-16 rounded-full bg-gradient-to-r from-[#3B82F6] to-[#10B981] flex items-center justify-center'>
            🚀
          </div>
          <h2 className='text-xl font-bold text-center'>Create Account</h2>
          <p className='text-sm text-gray-500 text-center'>
            Join thousands of students landing dream jobs
          </p>
        </div>

       <form onSubmit={handleSubmit} className="space-y-3">

  <div className="flex flex-col space-y-1">
    <label>Full Name</label>
    <div className="relative">
      <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
      <input
        type="text"
        className="w-full p-2 pl-10 bg-gray-100 rounded"
        placeholder="Your name"
        onChange={(e) => setName(e.target.value)}
      />
    </div>
  </div>

  <div className="flex flex-col space-y-1">
    <label>Email</label>
    <div className="relative">
      <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
      <input
        type="email"
        className="w-full p-2 pl-10 bg-gray-100 rounded"
        placeholder="abc@gmail.com"
        onChange={(e) => setEmail(e.target.value)}
      />
    </div>
  </div>

  <div className="flex flex-col space-y-1">
    <label>Target Role</label>
    <div className="relative">
      <FaBriefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
      <input
        type="text"
        className="w-full p-2 pl-10 bg-gray-100 rounded"
        placeholder="Software Developer"
        onChange={(e) => setTargetRole(e.target.value)}
      />
    </div>
  </div>
<div className="flex flex-col gap-2">
  <label className="font-medium">Experience Level</label>

  <div className="grid grid-cols-2 gap-3">

    <div
      onClick={() => setExperience("intern")}
      className={`cursor-pointer border rounded-lg p-3 text-center transition
        ${experience === "intern"
          ? "border-blue-500 bg-blue-50 text-blue-600"
          : "border-gray-300 hover:border-blue-400"}
      `}
    >
      Intern
    </div>

    <div
      onClick={() => setExperience("entry")}
      className={`cursor-pointer border rounded-lg p-3 text-center transition
        ${experience === "entry"
          ? "border-blue-500 bg-blue-50 text-blue-600"
          : "border-gray-300 hover:border-blue-400"}
      `}
    >
      Entry Level
    </div>

    <div
      onClick={() => setExperience("mid")}
      className={`cursor-pointer border rounded-lg p-3 text-center transition
        ${experience === "mid"
          ? "border-blue-500 bg-blue-50 text-blue-600"
          : "border-gray-300 hover:border-blue-400"}
      `}
    >
      Mid Level
    </div>

    <div
      onClick={() => setExperience("senior")}
      className={`cursor-pointer border rounded-lg p-3 text-center transition
        ${experience === "senior"
          ? "border-blue-500 bg-blue-50 text-blue-600"
          : "border-gray-300 hover:border-blue-400"}
      `}
    >
      Senior
    </div>

  </div>
</div>
  <div className="flex flex-col space-y-1">
    <label>Phone Number</label>
    <div className="relative">
      <FaPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
      <input
        type="tel"
        className="w-full p-2 pl-10 bg-gray-100 rounded"
        placeholder="+91 9876543210"
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
    </div>
  </div>

  <div className="flex flex-col space-y-1">
    <label>Password</label>
    <div className="relative">
      <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
      <input
        type={showpassword ? "text" : "password"}
        className="w-full p-2 pl-10 pr-10 bg-gray-100 rounded"
        placeholder="•••••••"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        type="button"
        onClick={() => setshowPassword(!showpassword)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
      >
        {showpassword ? <FaEyeSlash /> : <FaEye />}
      </button>
    </div>
  </div>

  <div className="flex flex-col space-y-1">
    <label>Confirm Password</label>
    <div className="relative">
      <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
      <input
        type={showconfirmpassword ? "text" : "password"}
        className="w-full p-2 pl-10 pr-10 bg-gray-100 rounded"
        placeholder="•••••••"
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <button
        type="button"
        onClick={() => setshowconfirmPassword(!showconfirmpassword)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
      >
        {showconfirmpassword ? <FaEyeSlash /> : <FaEye />}
      </button>
    </div>
  </div>

  {confirmPassword && (
    <p className={`text-sm ${password === confirmPassword ? "text-green-500" : "text-red-500"}`}>
      {password === confirmPassword ? "Password Match" : "Password Not Match"}
    </p>
  )}

  <button
    type="submit"
    disabled={loading || password !== confirmPassword}
    className={`w-full mt-4 p-2 rounded text-white font-semibold
      bg-gradient-to-r from-[#3B82F6] to-[#10B981]
      ${loading || password !== confirmPassword ? "opacity-50 cursor-not-allowed" : "hover:opacity-90"}
    `}
  >
    {loading ? "Creating Account..." : "Create Account"}
    <HiArrowRight className="inline ml-2" />
  </button>

</form>



        <div className='flex justify-center gap-1 mt-4 text-sm'>
          <span>Already have an account?</span>
          <Link to="/signin" className="text-blue-500 font-medium">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}