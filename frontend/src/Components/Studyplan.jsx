import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { HiArrowLeft } from "react-icons/hi";

export default function Studyplan() {
  const [studyPlan, setStudyPlan] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchStudyPlan = async () => {
      try {
        if (!token) {
          setError("Login required");
          setLoading(false);
          return;
        }

        const { data } = await axios.get(
          "https://carrerloopaibackend.onrender.com/api/studyplan",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setStudyPlan(data?.studyPlan || {});
      } catch (err) {
        setError(
          err.response?.data?.error || "Failed to load study plan"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchStudyPlan();
  }, [token]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <p className="text-indigo-600 text-lg font-semibold">
          Loading Study Plan…
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <p className="text-red-500 text-lg">No study plan is generated upload u r resume</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <nav className="w-full h-16 bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-between px-8 shadow-md border-b border-white/30">
        <div className="flex items-center gap-6">
          <Link to="/">
            <button className="flex items-center gap-2 text-sm px-4 py-2 rounded-lg border border-white/30 hover:bg-white/10 transition text-white">
              <HiArrowLeft /> Back
            </button>
          </Link>

          <div className="text-white text-xl font-bold tracking-wide ml-30">
            CarrerloopAi
          </div>
        </div>

        <FaUser className="text-white text-lg cursor-pointer" />
      </nav>

      <section className="max-w-6xl mx-auto mt-10 bg-white/80 backdrop-blur-lg rounded-3xl p-10 shadow-xl border border-indigo-200">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-3">
          AI Study Roadmap
        </h1>

        <p className="text-gray-500 mb-8">
          Smart personalized roadmap based on your missing skills.
        </p>

        <div className="flex gap-16">
          <div>
            <p className="text-3xl font-bold text-indigo-600">
              {studyPlan.totalDays || 0}
            </p>
            <p className="text-gray-500 text-sm">Total Days</p>
          </div>

          <div>
            <p className="text-3xl font-bold text-purple-600">
              {studyPlan.roadmap?.length || 0}
            </p>
            <p className="text-gray-500 text-sm">Skills Covered</p>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 px-6 pb-12">
        {studyPlan.roadmap?.map((day, i) => (
          <div
            key={i}
            className="p-[2px] rounded-3xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:scale-[1.02] transition"
          >
            <div className="bg-white rounded-3xl p-7 shadow-md h-full">
              <span className="text-xs font-semibold text-indigo-500 tracking-widest">
                DAY {day.day}
              </span>

              <h3 className="text-xl font-bold mt-3 text-gray-800 border-b pb-2 border-gray-200">
                {day.skill}
              </h3>

              <div className="mt-4 border border-indigo-200 bg-indigo-50 px-4 py-3 rounded-xl text-sm text-gray-700">
                {day.topics?.map((topic, idx) => (
                  <p key={idx} className="flex gap-2">
                    <span className="text-indigo-600 font-bold">•</span>
                    {topic}
                  </p>
                ))}
              </div>

              {day.wheretostudy?.map((r, idx) => (
                <div
                  key={idx}
                  className="mt-5 border border-indigo-100 rounded-xl px-3 py-2 bg-indigo-50/50"
                >
                  <span className="text-sm font-medium text-gray-800">
                    {r.platform} —{" "}
                    {r.link ? (
                      <a
                        href={r.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600 hover:text-purple-600 underline"
                      >
                        {r.resource}
                      </a>
                    ) : (
                      r.resource
                    )}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
