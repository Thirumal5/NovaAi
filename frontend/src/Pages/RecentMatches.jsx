import { JobMatches } from "./data";

export default function RecentMatches() {
  return (
    <div>
      <h2 className="font-bold text-2xl text-gray-800 tracking-tight">
        Recent Matches
      </h2>

      <div className="mt-6 px-2 py-2 flex gap-6 flex-wrap">
        {JobMatches.map((job) => (
          <div
            key={job.id}
            className="
              mb-6
              w-[32%]
              min-w-[300px]
              bg-white
              h-44
              rounded-2xl
              shadow-md
              hover:shadow-xl
              transition-all duration-300
              border border-gray-100
              hover:-translate-y-1
              p-5
            "
          >
            <div className="flex justify-between items-center mt-2">
              <div>
                <h2 className="text-lg font-bold text-gray-800">
                  {job.company}
                </h2>
                <h3 className="text-sm text-gray-500 mt-1">
                  {job.role}
                </h3>
              </div>

              <button
                className="
                  bg-gradient-to-r from-[#3B82F6] to-[#10B981]
                  text-white
                  rounded-full
                  px-4 py-1.5
                  text-sm
                  font-semibold
                  shadow-md
                "
              >
                {job.matchPercentage}%
              </button>
            </div>

            <div className="w-full h-2.5 bg-gray-200 rounded-full mt-6 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#3B82F6] to-[#10B981] rounded-full transition-all duration-500"
                style={{ width: `${job.matchPercentage}%` }}
              />
            </div>

            <p className="text-xs text-center mt-3 text-gray-500 tracking-wide">
              Match Score
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
