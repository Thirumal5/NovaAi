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
          "http://localhost:5000/api/studyplan",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setStudyPlan(data?.studyPlan || {});
      } catch (err) {
        setError(
          err.response?.data?.error ||
          "Failed to load study plan"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchStudyPlan();
  }, [token]);

  if (loading) {
    return (
      <p className="text-white p-6">
        Loading study plan...
      </p>
    );
  }

  if (error) {
    return (
      <p className="text-red-500 p-6">
        {error}
      </p>
    );
  }

  return (
    <>
      <nav className="w-full h-16 bg-gradient-to-r from-slate-900 to-slate-950 flex items-center justify-between px-8 shadow-lg">
        <div className="flex items-center gap-6">
          <Link to="/">
            <button className="flex items-center gap-2 text-sm px-4 py-2 rounded-lg border border-white/20 hover:bg-white/10 transition text-white">
              <HiArrowLeft /> Back
            </button>
          </Link>

          <div className="text-white text-xl font-semibold">
            NovaAI
          </div>
        </div>

        <FaUser className="text-white text-lg cursor-pointer" />
      </nav>

      <section className="w-full bg-gradient-to-r from-slate-900 to-slate-950 rounded-2xl p-8 mt-6 text-white shadow-lg">
        <h1 className="text-3xl font-bold mb-2">
          AI Study Roadmap
        </h1>

        <p className="text-slate-300 mb-6">
          Personalized roadmap based on missing skills
        </p>

        <div className="flex gap-10">
          <div>
            <p className="text-lg font-semibold">
              {studyPlan.totalDays || 0}
            </p>
            <p className="text-sm text-slate-400">
              Total Days
            </p>
          </div>

          <div>
            <p className="text-lg font-semibold">
              {studyPlan.roadmap?.length || 0}
            </p>
            <p className="text-sm text-slate-400">
              Skills Covered
            </p>
          </div>
        </div>
      </section>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 p-6">
        {studyPlan.roadmap?.map((day, i) => (
          <div
            key={i}
            className="rounded-2xl border bg-white p-6 shadow-sm"
          >
            <span className="text-xs font-semibold text-blue-600">
              DAY {day.day}
            </span>

            <h3 className="text-lg font-semibold mt-2">
              {day.skill}
            </h3>

            <ul className="list-disc list-inside mt-3 text-sm">
              {day.topics?.map((topic, idx) => (
                <li key={idx}>{topic}</li>
              ))}
            </ul>

            {day.wheretostudy?.map((r, idx) => (
              <div key={idx} className="mt-3 text-xs">
                📚 {r.platform} —{" "}
                {r.link ? (
                  <a
                    href={r.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    {r.resource}
                  </a>
                ) : (
                  <span>{r.resource}</span>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}
