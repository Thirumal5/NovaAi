import React from "react";
import { LuUpload } from "react-icons/lu";
import { Auth } from "../Context/ContextProvider";
import { Link, Navigate } from "react-router-dom";

export default function User() {
  const { user, loading } = Auth();

  if (loading) return <h2 className="text-center mt-20">Loading...</h2>;
  if (!user) return <Navigate to="/signin" />;

  const score = Math.round(user.matchScore * 10);

  return (
    <div className="min-h-screen bg-[#0f172a] px-6 md:px-16 py-12 text-white">
      
      <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 flex flex-col md:flex-row items-center gap-10 shadow-2xl">
        
        <div className="w-28 h-28 rounded-full bg-gradient-to-r from-blue-500 to-green-500 flex items-center justify-center text-4xl shadow-lg">
          👨‍🎓
        </div>

        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl font-bold tracking-tight">
            {user.name}
          </h1>
          <p className="text-white/70 text-lg mt-1">
            {user.targetrole}
          </p>
        </div>

        <div className="relative w-24 h-24 mb-10">
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: `conic-gradient(#10B981 ${score * 3.6}deg, rgba(255,255,255,0.1) 0deg)`
            }}
          />
          <div className="absolute inset-3 rounded-full bg-[#0f172a] flex items-center justify-center ">
            <span className="text-xl font-bold">{user.matchScore*10}%</span>
          </div>
          <p className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-sm text-white/70 ">
            Match Score
          </p>
        </div>
      </div>

      <div className="mt-16 relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-500/20 to-green-500/20 border border-white/10 backdrop-blur-xl p-10 flex flex-col md:flex-row items-center justify-between gap-8">
        
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-green-500/10 blur-3xl" />

        <div className="relative z-10">
          <h2 className="text-3xl font-bold">
            Upload Your Resume
          </h2>
          <p className="text-white/70 mt-2 text-lg max-w-xl">
            Get AI-powered resume analysis and personalized job matches
            tailored to your skills and experience.
          </p>
        </div>

        <Link to="/Resumeupload" className="relative z-10">
          <button className="flex items-center gap-3 bg-gradient-to-r from-blue-500 to-green-500 px-8 py-4 rounded-xl font-semibold text-lg hover:opacity-90 transition shadow-lg">
            <LuUpload className="text-2xl" />
            Upload Resume
          </button>
        </Link>
      </div>
    </div>
  );
}
