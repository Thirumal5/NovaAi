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
    <div className="w-full text-white">

      <div className="relative glass rounded-3xl p-8 flex flex-col md:flex-row items-center gap-10">

        <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-emerald-500 flex items-center justify-center text-4xl shadow-[0_0_20px_rgba(59,130,246,0.3)] border-2 border-white/20">
          👨‍🎓
        </div>

        <div className="flex-1 text-center md:text-left">
          <h1 className="text-xl text-black ">
            {user.name}
          </h1>
          <p className="text-blue-300 text-lg mt-2 font-medium">
            {user.targetrole}
          </p>
        </div>

        <div className="relative w-28 h-28">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="50%"
              cy="50%"
              r="45%"
              fill="transparent"
              stroke="#1e293b"
              strokeWidth="8"
            />
            <circle
              cx="50%"
              cy="50%"
              r="45%"
              fill="transparent"
              stroke="url(#gradient)"
              strokeWidth="8"
              strokeDasharray="283"
              strokeDashoffset={283 - (283 * score) / 100}
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="100%" stopColor="#10B981" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-blue-300">{score}%</span>
            <span className="text-[10px] text-white/50 uppercase">Match</span>
          </div>
        </div>
      </div>

      <div className="mt-8 relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 to-emerald-600 p-[1px]">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-emerald-600 blur-xl opacity-40"></div>
        <div className="relative bg-[#0f172a]/90 backdrop-blur-xl rounded-[23px] p-8 flex flex-col md:flex-row items-center justify-between gap-8 h-full">
          <div className="relative z-10">
            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
              Upload Your Resume
            </h2>
            <p className="text-white/60 mt-2 text-md max-w-xl leading-relaxed">
              Get AI-powered resume analysis and personalized job matches
              tailored to your skills and experience.
            </p>
          </div>

          <Link to="/Resumeupload" className="relative z-10">
            <button className="group flex items-center gap-3 bg-white text-slate-900 px-8 py-3 rounded-xl font-bold text-md hover:scale-105 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)]">
              <LuUpload className="text-xl group-hover:rotate-12 transition-transform" />
              Upload Resume
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
