import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { FaUser } from "react-icons/fa";

export default  function Studyplan() {

  const[Studyplan,setstudyplan]=useState([])
  const[loading,setLoading]=useState(false)
  const token=localStorage.getItem('token')
  useEffect(() => {
  const fetchStudyPlan = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/studyplan",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setstudyplan(response.data.studyPlan || []);
    } catch (err) {
      console.log("Error fetching study plan:", err);
    } finally {
      setLoading(false);
    }
  };

  fetchStudyPlan();
}, [token]);

  return (
    <>
      <nav className="w-full h-16 bg-gradient-to-r from-slate-900 to-slate-950 flex items-center  justify-between px-8 shadow-lg">
       
        <div className="text-white text-xl font-semibold tracking-wide">
          NovaAI
        </div>
        <div className="text-white text-lg cursor-pointer">
          <FaUser />
        </div>
      </nav>
      <section className="w-full bg-gradient-to-r from-slate-900 to-slate-950 rounded-2xl p-8  mt-6 text-white shadow-lg">
  
  <h1 className="text-3xl font-bold mb-2">
    Full Stack DevOps Path
  </h1>

  
  <p className="text-slate-300 max-w-3xl mb-6">
    A comprehensive 16-day roadmap covering TypeScript, GraphQL, Docker, and Kubernetes
    to take you from frontend to containerized deployment.
  </p>

  
  <div className="flex gap-10">
   
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-slate-800">
        📅
      </div>
      <div>
        <p className="text-lg font-semibold">{Studyplan.totalDays}</p>
        <p className="text-sm text-slate-400">Total Days</p>
      </div>
    </div>

   
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-slate-800">
        📘
      </div>
      <div>
        <p className="text-lg font-semibold">4</p>
        <p className="text-sm text-slate-400">Core Skills</p>
      </div>
    </div>
  </div>
</section>
 <div className="mt-8 max-w-sm rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

  <div className="flex items-center gap-2 mb-4">
    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-blue-600 font-semibold">
      &lt;/&gt;
    </div>
    <span className="text-xs font-semibold text-blue-600 tracking-wide">
      DAY 1
    </span>
  </div>

  
  <h3 className="text-lg font-semibold text-slate-900 mb-4">
    TypeScript
  </h3>

  
  <div className="mb-4">
    <p className="text-xs font-semibold text-slate-500 mb-2">
      TOPICS
    </p>
    <ul className="list-disc list-inside space-y-1 text-sm text-slate-700">
      <li>Introduction to TypeScript</li>
      <li>TypeScript Basics</li>
    </ul>
  </div>

 
  <div>
    <p className="text-xs font-semibold text-slate-500 mb-2">
      RESOURCES
    </p>
    <div className="space-y-2">
      <a
        href="#"
        className="block text-sm text-blue-600 hover:underline"
      >
        FreeCodeCamp – TypeScript Tutorial
      </a>
      <a
        href="#"
        className="block text-sm text-blue-600 hover:underline"
      >
        Official TypeScript Docs
      </a>
    </div>
  </div>
</div>



    </>
  );
}
