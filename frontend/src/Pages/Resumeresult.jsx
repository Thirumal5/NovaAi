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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-4 md:p-8">
      <Link to="/">
        <button className="flex gap-2 items-center border border-blue-500 ml-5
          text-blue-500 p-2 rounded-lg w-24 justify-center hover:bg-blue-500 hover:text-white transition">
          <HiArrowLeft /> Back
        </button>
      </Link>

      <h2 className="text-center text-blue-400 font-bold text-xl mt-4">
        AI Analysis Results
      </h2>

    
      <section className="bg-gradient-to-r from-blue-500 to-green-500 p-8 shadow-xl m-4 text-white flex justify-between rounded-lg">
        <div>
          <div className="flex items-center gap-2">
            <HiSparkles className="text-3xl" />
            <h2 className="text-3xl font-bold">Overall Match Score</h2>
          </div>
          <p>Your resume has been analyzed by AI</p>
        </div>

        <div className="w-20 h-20 border-4 border-white rounded-full flex items-center justify-center">
          <span className="text-3xl">
            {analysis.overallScore * 10}%
          </span>
        </div>
      </section>

      
      <section className="bg-white shadow-lg p-6 m-4 rounded-lg">
        <h2 className="font-bold text-xl">Skills Assessment</h2>

        <div className="flex flex-wrap gap-6 mt-5">
          {analysis.skills &&
            Object.entries(analysis.skills).map(([skill, score]) => {
              const percent = Math.min(100, Math.round(score * 100));

              return (
                <div key={skill} className="w-60">
                  <div className="flex justify-between mb-1">
                    <span>{skill}</span>
                    <span>{percent}%</span>
                  </div>
                  <div className="bg-gray-200 h-2 rounded">
                    <div
                      className="bg-blue-500 h-2 rounded"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              );
            })}
        </div>
      </section>

      
      <section className="bg-white shadow-lg p-6 m-4 rounded-lg">
        <h2 className="font-bold text-xl">Strengths</h2>
        {analysis.strengths?.map((s, i) => (
          <div key={i} className="flex gap-4 mt-4">
            <CiCircleCheck className="text-green-600 text-2xl" />
            <span>{s}</span>
          </div>
        ))}
      </section>

    
      <section className="bg-white shadow-lg p-6 m-4 rounded-lg">
        <h2 className="font-bold text-xl">Areas to Improve</h2>
        {analysis.improvementPlans?.map((p, i) => (
          <div key={i} className="flex gap-4 mt-4">
            <GrCircleAlert className="text-red-600 text-2xl" />
            <span>{p}</span>
          </div>
        ))}
      </section>

      
      <section className="bg-white shadow-lg p-6 m-4 rounded-lg">
        <h2 className="font-bold text-xl">Missing Skills</h2>
        <div className="flex flex-wrap gap-3 mt-4">
          {analysis.missingSkills?.map((skill, i) => (
            <span
              key={i}
              className="bg-red-100 text-red-700 px-3 py-1 rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>
      </section>

      <Link to="/JobMatches">
        <div className="text-white flex justify-center items-center gap-2 rounded-lg
          bg-gradient-to-r from-blue-500 to-green-500 p-3 m-4 shadow-xl">
          <h2>View Matching Jobs</h2>
          <HiArrowRight className="text-xl" />
        </div>
      </Link>
    </div>
  );
}
