import React, { useEffect, useState } from "react";
import {
  FaUser,
  FaClipboardCheck,
  FaChartBar,
  FaCalendarAlt,
  FaStar,
  FaCode,
  FaSignOutAlt,
} from "react-icons/fa";
import { HiArrowLeft } from "react-icons/hi";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Profile() {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        const { data } = await axios.get(
          "http://localhost:5000/api/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUser(data);
      } catch (err) {
        setError("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading)
    return <p className="p-6">Loading profile...</p>;

  if (error)
    return <p className="text-red-500 p-6">{error}</p>;

  return (
    <>
      <nav className="w-full h-16 bg-gradient-to-r from-indigo-600 to-purple-700 flex items-center justify-between px-8 shadow-lg">
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

        <button
          onClick={logout}
          className="flex items-center gap-2 text-white border border-white/20 px-4 py-2 rounded-lg hover:bg-white/10 transition"
        >
          <FaSignOutAlt /> Logout
        </button>
      </nav>

      <div className="min-h-screen bg-gradient-to-br from-slate-100 via-indigo-50 to-purple-100 pt-10 px-4">
        <div className="max-w-5xl mx-auto">

          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-8 shadow-lg mb-8 text-white">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-full bg-white text-indigo-600 flex items-center justify-center text-3xl">
                <FaUser />
              </div>

              <div>
                <h1 className="text-2xl font-bold">
                  {user.name || "User"}
                </h1>
                <p>{user.email}</p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">

            <div className="bg-slate-50 hover:bg-white transition rounded-xl p-6 shadow-md">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <FaClipboardCheck /> Experience Level
              </h3>
              <p>{user.experience}</p>
            </div>

            <div className="bg-slate-50 hover:bg-white transition rounded-xl p-6 shadow-md">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <FaChartBar /> ATS Resume Score
              </h3>
              <p className="text-indigo-600 font-bold text-xl">
                {user.atsScore}%
              </p>
            </div>

            <div className="bg-slate-50 hover:bg-white transition rounded-xl p-6 shadow-md">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <FaCalendarAlt /> Study Plan Days
              </h3>
              <p>{user.studyDays} Days</p>
            </div>

          </div>

          <div className="grid md:grid-cols-2 gap-6">

            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <FaStar /> Strength Skills
              </h3>

              <div className="flex flex-wrap gap-2">
                {user.strengths?.map((s, i) => (
                  <span
                    key={i}
                    className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <FaCode /> Missing Skills
              </h3>

              <div className="flex flex-wrap gap-2">
                {user.missing?.map((s, i) => (
                  <span
                    key={i}
                    className="bg-rose-100 text-rose-700 px-3 py-1 rounded-full text-sm"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>
    </>
  );
}
