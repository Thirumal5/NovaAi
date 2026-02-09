import { useEffect, useState } from "react";
import axios from "axios";

export default function RecentMatches() {
  const [job, setjob] = useState([]);

  useEffect(() => {
    const jobfetch = async () => {
      try {
        const token = localStorage.getItem("token");

        const { data } = await axios.get(
          "http://localhost:5000/api/jobmatched",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setjob(data?.jobs || []);
      } catch (err) {
        console.log("Error fetching jobs");
      }
    };

    jobfetch();
  }, []);

  return (
    <div className="mt-12">
      <h2 className="text-3xl font-bold text-gray-800 tracking-tight mb-8">
        Recent Matches
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {job.map((j, i) => (
          <div
            key={i}
            className="
              bg-white
              rounded-2xl
              p-6
              shadow-md
              hover:shadow-xl
              border border-gray-100
              transition-all duration-300
              hover:-translate-y-1
              flex flex-col justify-between
            "
          >
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                {j.companyname}
              </h2>

              <p className="text-gray-600 mt-1 text-sm">
                {j.title || "Role"}
              </p>

              <p className="text-gray-500 text-sm mt-2">
                📍 {j.location || "Location"}
              </p>

              <span className="
                inline-block mt-3
                bg-indigo-100 text-indigo-700
                px-3 py-1 rounded-full
                text-xs font-semibold
              ">
                {j.experienceLevel ||"NA"}
              </span>
            </div>

            {j.applyurl && (
              <a
                href={j.applyurl}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  mt-5
                  text-center
                  px-5 py-2
                  rounded-lg
                  bg-gradient-to-r from-indigo-600 to-purple-600
                  text-white
                  font-semibold
                  text-sm
                  shadow-md
                  hover:from-indigo-700 hover:to-purple-700
                  hover:shadow-lg
                  transition-all duration-300
                "
              >
                Apply Now →
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
