import React, { useEffect, useState } from "react";
import axios from "axios";
import { HiArrowLeft } from "react-icons/hi2";
import { FaMapMarkerAlt, FaMoneyBillWave } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

export default function JobMatches() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/signin");
      return;
    }

    const fetchJobs = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/match/jobs",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setJobs(res.data.jobs || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [token, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-[#0f172a] text-white">
        <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full"></div>
        <p className="mt-4 text-lg tracking-wide">
          Matching jobs using AI…
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f172a] text-white px-6 md:px-16 py-10">

      {/* Top Bar */}
      <div className="flex items-center justify-between mb-10">
        <Link to="/">
          <button className="flex items-center gap-2 text-sm px-4 py-2 rounded-lg border border-white/20 hover:bg-white/10 transition">
            <HiArrowLeft /> Back
          </button>
        </Link>

        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
          AI Job Matches
        </h1>
      </div>

      {/* Stats Card */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-500/20 to-green-500/20 border border-white/10 backdrop-blur-xl p-10 mb-14">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-green-500/10 blur-3xl" />
        <h2 className="text-6xl font-extrabold">
          {jobs.length}
        </h2>
        <p className="mt-2 text-lg text-white/70">
          Highly relevant jobs matched to your resume
        </p>
      </div>

      {/* Empty State */}
      {jobs.length === 0 ? (
        <div className="text-center mt-24">
          <p className="text-2xl font-semibold">
            No jobs found
          </p>
          <p className="text-white/60 mt-2">
            Upload a stronger resume to get better matches
          </p>
        </div>
      ) : (
        <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
          {jobs.map((job, index) =>
            job?.company?.display_name && (
              <div
                key={index}
                className="group relative rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl p-7 hover:scale-[1.03] transition-all duration-300"
              >
                {/* Glow */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/10 to-green-500/10 opacity-0 group-hover:opacity-100 transition" />

                <div className="relative z-10">
                  <h3 className="text-xl font-bold">
                    {job.company.display_name}
                  </h3>

                  <p className="text-sm text-white/60 mt-1">
                    {job.title}
                  </p>

                  <div className="mt-5 space-y-2 text-sm text-white/80">
                    <div className="flex items-center gap-2">
                      <FaMapMarkerAlt className="text-blue-400" />
                      {job.location?.display_name || "Location not specified"}
                    </div>

                    <div className="flex items-center gap-2">
                      <FaMoneyBillWave className="text-green-400" />
                      {job.salary_min
                        ? `${job.salary_min} – ${job.salary_max}`
                        : "Salary not disclosed"}
                    </div>
                  </div>

                  <a
                    href={job.redirect_url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block mt-8 w-full text-center rounded-xl bg-gradient-to-r from-blue-500 to-green-500 py-3 font-semibold tracking-wide hover:opacity-90 transition"
                  >
                    Apply Now
                  </a>
                </div>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}
