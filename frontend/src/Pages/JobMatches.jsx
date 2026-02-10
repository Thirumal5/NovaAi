import React, { useEffect, useState } from "react";
import axios from "axios";
import { HiArrowLeft } from "react-icons/hi2";
import { FaMapMarkerAlt, FaMoneyBillWave } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

export default function JobMatches() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const fetchJobs = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/jobs", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setJobs(res.data.jobs || []);
    } catch (err) {
      console.error("Fetch jobs failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const refreshJobs = async () => {
    try {
      setRefreshing(true);

      await axios.post(
        "https://carrerloopaibackend.onrender.com/api/refresh/jobs",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      await fetchJobs();
    } catch (err) {
      console.error("Refresh jobs failed:", err);
    } finally {
      setRefreshing(false);
    }
  };
  

  useEffect(() => {
    if (!token) {
      navigate("/signin");
      return;
    }
    
    fetchJobs();
     const interval= setInterval(()=>{
        refreshJobs();
     }, 4 * 60 * 60 * 1000)

    return () => clearInterval(interval);
  }, [token, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
        <div className="animate-spin h-10 w-10 border-4 border-indigo-500 border-t-transparent rounded-full"></div>
        <p className="mt-4 text-lg text-gray-700">
          Loading AI job matches...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-6 md:px-16 py-12">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-12">
        <Link to="/">
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-200 transition">
            <HiArrowLeft /> Back
          </button>
        </Link>

        <div className="flex items-center gap-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            AI Job Matches
          </h1>

          <button
            onClick={refreshJobs}
            disabled={refreshing}
            className="px-6 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold hover:opacity-90 transition disabled:opacity-50 shadow"
          >
            {refreshing ? "Refreshing…" : "Refresh Jobs"}
          </button>
        </div>
      </div>

      {/* Jobs Count Card */}
      <div className="rounded-2xl bg-white border p-10 mb-16 shadow">
        <h2 className="text-6xl font-extrabold text-gray-800">
          {jobs.length}
        </h2>
        <p className="text-gray-500 text-lg mt-2">
          Jobs available in your database
        </p>
      </div>

      {jobs.length === 0 ? (
        <div className="text-center mt-24">
          <p className="text-2xl font-semibold text-gray-700">
            No jobs found
          </p>
          <p className="text-gray-500 mt-2">
            Click “Refresh Jobs” to fetch new jobs
          </p>
        </div>
      ) : (
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
          {jobs.map((job, index) => (
            <div
              key={index}
              className="rounded-2xl bg-white border shadow-md p-7 hover:shadow-xl transition"
            >
              <h3 className="text-xl font-bold text-gray-800">
                {job.companyname || "Company"}
              </h3>

              <p className="text-gray-600 mt-1 text-sm">
                {job.title}
              </p>

              <div className="mt-5 space-y-2 text-sm text-gray-700">
                <div className="flex items-center gap-2">
                  <FaMapMarkerAlt className="text-indigo-500" />
                  {job.location || "Location not specified"}
                </div>

                <div className="flex items-center gap-2">
                  <FaMoneyBillWave className="text-green-500" />
                  {job.salary || "Salary not disclosed"}
                </div>
              </div>

              {job.applyurl && (
                <a
                  href={job.applyurl}
                  target="_blank"
                  rel="noreferrer"
                  className="block mt-8 text-center rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 py-3 text-white font-semibold hover:opacity-90 transition"
                >
                  Apply Now →
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
