import React from "react";
import { HiArrowLeft, HiArrowRight, HiSparkles } from "react-icons/hi2";
import { Link, useLocation, Navigate } from "react-router-dom";
import { CiCircleCheck } from "react-icons/ci";
import { GrCircleAlert } from "react-icons/gr";

export default function Resumeresult() {
  const location = useLocation();
  const analysis = location.state;

  if (!analysis) {
    return <Navigate to="/" />;
  }

  return (
    <div className='min-h-screen bg-[#0f172a] text-white p-6 md:p-10 font-["Outfit"]'>
    
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto space-y-8">

        
        <div className="flex items-center justify-between">
          <Link to="/">
            <button className="flex items-center gap-2 text-sm px-4 py-2 rounded-xl glass hover:bg-white/10 transition border border-white/10">
              <HiArrowLeft /> Back
            </button>
          </Link>
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">Analysis Report</h1>
        </div>

       
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 to-emerald-600 p-[1px] shadow-2xl shadow-blue-900/20">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-emerald-600 blur-xl opacity-40"></div>
          <div className="relative bg-[#0f172a]/90 backdrop-blur-xl rounded-[23px] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="flex-1 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-300 text-sm font-semibold mb-4">
                <HiSparkles /> AI Analysis Complete
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">You're matched for greatness!</h2>
              <p className="text-lg text-white/60 max-w-xl">
                Our AI has analyzed your profile against industry standards. You show strong potential in your target role.
              </p>
            </div>

            <div className="relative w-40 h-40 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="50%" cy="50%" r="45%" fill="transparent" stroke="#1e293b" strokeWidth="8" />
                <circle
                  cx="50%" cy="50%" r="45%" fill="transparent" stroke="url(#score-gradient)"
                  strokeWidth="8" strokeDasharray="283"
                  strokeDashoffset={283 - (283 * analysis.overallScore * 10) / 100}
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="score-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3B82F6" />
                    <stop offset="100%" stopColor="#10B981" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-bold text-white">{Math.round(analysis.overallScore * 10)}</span>
                <span className="text-xs text-white/40 uppercase tracking-wider">Score</span>
              </div>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

         
          <section className="glass p-8 rounded-3xl border border-white/10">
            <h2 className="text-xl font-bold flex items-center gap-3 mb-6">
              <span className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400">⚡</span>
              Skills Assessment
            </h2>
            <div className="space-y-5">
              {analysis.skills && Object.entries(analysis.skills).map(([skill, score]) => {
                const percent = Math.min(100, Math.round(score * 100));
                return (
                  <div key={skill}>
                    <div className="flex justify-between mb-2 text-sm font-medium">
                      <span className="text-white/80">{skill}</span>
                      <span className="text-blue-400">{percent}%</span>
                    </div>
                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <div className="space-y-8">
            
            <section className="glass p-8 rounded-3xl border border-white/10">
              <h2 className="text-xl font-bold flex items-center gap-3 mb-6">
                <span className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400">💪</span>
                Key Strengths
              </h2>
              <div className="flex flex-wrap gap-3">
                {analysis.strengths?.map((s, i) => (
                  <div key={i} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/10 hover:bg-emerald-500/20 transition cursor-default">
                    <CiCircleCheck className="text-emerald-400 text-lg" />
                    <span className="text-emerald-100 text-sm">{s}</span>
                  </div>
                ))}
              </div>
            </section>

           
            <section className="glass p-8 rounded-3xl border border-white/10">
              <h2 className="text-xl font-bold flex items-center gap-3 mb-6">
                <span className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center text-orange-400">📈</span>
                Growth Areas
              </h2>
              <div className="space-y-3">
                {analysis.improvementPlans?.map((p, i) => (
                  <div key={i} className="flex gap-3 items-start p-3 rounded-xl bg-white/5 border border-white/5">
                    <GrCircleAlert className="text-orange-400 text-lg mt-0.5 shrink-0" />
                    <span className="text-white/70 text-sm leading-relaxed">{p}</span>
                  </div>
                ))}
              </div>
            </section>

            
            <section className="glass p-8 rounded-3xl border border-white/10">
              <h2 className="text-xl font-bold flex items-center gap-3 mb-6">
                <span className="w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center text-red-400">🎯</span>
                Missing Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {analysis.missingSkills?.map((skill, i) => (
                  <span key={i} className="px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/10 text-red-300 text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          </div>
        </div>

       
        <Link to="/JobMatches" className="block group">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-emerald-600 p-1">
            <div className="bg-[#0f172a] rounded-[13px] p-6 flex items-center justify-center gap-4 group-hover:bg-opacity-90 transition-all">
              <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">View Matching Jobs</h2>
              <HiArrowRight className="text-2xl text-emerald-400 group-hover:translate-x-2 transition-transform" />
            </div>
          </div>
        </Link>

      </div>
    </div>
  );
}
