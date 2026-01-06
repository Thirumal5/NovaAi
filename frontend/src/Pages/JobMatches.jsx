import React, { useEffect, useState } from "react";
import axios from "axios";
import { HiArrowLeft } from "react-icons/hi2";
import { Link, useNavigate } from "react-router-dom";
import { Auth } from "../Context/ContextProvider";

export default function JobMatches() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = Auth();
  const navigate = useNavigate();

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
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(res)
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

      <section className="flex flex-wrap gap-5 justify-around">
        {jobs.map((job, index) => (
          <div
            key={index}
            className="bg-white rounded-xl w-[25%] min-w-[300px] shadow-md p-6 hover:shadow-xl transition mt-5"
          >
            <div >
              <h3 className="text-xl font-bold text-center ">
                {job.company.display_name}
              </h3>
            </div>

            

            <div className="mt-5 text-center">
              <span>📍 {job.location.display_name}</span>
              <span>
                💰 {job.salary_min ? `${job.salary_min} - ${job.salary_max}` : "Not disclosed"}
              </span>
            </div>
            <p className="text-lg font-semibold mt-1 text-center mt-5">
              {job.title}
            </p>
            <div className="mt-5 flex justify-center">
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
