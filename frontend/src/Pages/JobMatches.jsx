import React, { useEffect, useState } from "react";
import axios from "axios";
import { HiArrowLeft } from "react-icons/hi2";
import { Link } from "react-router-dom";

export default function JobMatches() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const fetchJobs = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/match/jobs",
        {
          params: {
            userId: "demoUser"
          }
        }
      );
      setJobs(res.data.jobs || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  fetchJobs();
}, []);

  if (loading) {
    return <p className="text-center mt-10">Loading jobs...</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-4 md:p-8">
      
      <Link to="/">
        <button className="flex gap-2 items-center border border-blue-500 text-blue-500 p-2 rounded-lg ml-5">
          <HiArrowLeft /> Back
        </button>
      </Link>

      <section className="bg-gradient-to-r from-blue-500 to-green-500 p-8 shadow-xl m-4 text-white rounded-lg text-center">
        <h2 className="text-3xl font-bold">{jobs.length}</h2>
        <p>Matched based on your skills</p>
      </section>

      <section className="flex flex-wrap gap-5 justify-center">
        {jobs.map((job, index) => (
          <div
            key={index}
            className="bg-white rounded-xl w-[25%] min-w-[300px] shadow-md p-6 hover:shadow-xl transition"
          >
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold">
                {job.company.display_name}
              </h3>
            </div>

            <p className="text-lg font-semibold mt-1">
              {job.title}
            </p>

            <div className="flex gap-6 text-sm text-gray-500 mt-2">
              <span>📍 {job.location.display_name}</span>
              <span>
                💰 {job.salary_min ? `${job.salary_min} - ${job.salary_max}` : "Not disclosed"}
              </span>
            </div>

            <div className="mt-5 flex justify-end">
              <a
                href={job.redirect_url}
                target="_blank"
                rel="noreferrer"
                className="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600"
              >
                Apply Now
              </a>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
