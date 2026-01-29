import { useState } from "react";
import { Link } from "react-router-dom";
import { HiArrowRight } from "react-icons/hi2";
import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/signin",
        { email, password }
      );

      if (response.data.success) {
        toast.success("Login Successful");
        localStorage.setItem("token", response.data.token);
        window.location.href = "/";
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Login failed";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-900 dark:to-gray-800">
      <div className="bg-white w-[390px] h-[550px] p-8 mb-10 rounded-lg shadow">
        <div className="flex flex-col justify-center items-center gap-2">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-[#3B82F6] to-[#10B981] mb-4">
            <span className="text-2xl text-white">🎓</span>
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-[#3B82F6] to-[#10B981] bg-clip-text text-transparent">
            Nova Ai
          </h2>
          <p className="text-sm text-gray-600">
            Welcome back! Sign in to continue
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4 mt-6">
            <div className="flex flex-col gap-1">
              <label>Email</label>
              <input
                type="email"
                className="bg-gray-100 w-full p-2 rounded"
                placeholder="abc@gmail.com"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <label>Password</label>
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full p-2 pl-10 pr-10 bg-gray-100 rounded"
                  placeholder="••••••••"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-6 p-2 rounded text-sm bg-gradient-to-r from-[#3B82F6] to-[#10B981] hover:opacity-90 transition-opacity flex items-center justify-center gap-2 text-white font-semibold"
          >
            Sign In
            <HiArrowRight className="text-sm ml-2" />
          </button>

          <div className="flex gap-2 justify-center mt-3">
            <p>New to Nova Ai?</p>
            <Link to="/signup" className="text-[#3B82F6] hover:font-medium">
              Create an account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}