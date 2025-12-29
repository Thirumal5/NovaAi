import { JobMatches } from "./data";

export default function RecentMatches() {
  return (
    <div>
      <h2 className="font-bold text-xl">Recent Matches</h2>

      <div className=" rounded-xl mt-6 px-4 py-4 flex gap-6 flex-wrap  ">
        {JobMatches.map((job) => (
          <div key={job.id} className="mb-6 w-[32%] bg-white h-40   ">

            <div className="flex justify-evenly items-center mt-7 ">
              <div>
                <h2 className="text-xl font-semibold">{job.company}</h2>
                <h3 className="text-gray-500">{job.role}</h3>
              </div>

              <button className="bg-gradient-to-r from-[#3B82F6] to-[#10B981]
                text-white rounded-full px-4 py-2 font-semibold">
                {job.matchPercentage}%
              </button>
            </div>

            <div className="w-full h-2 bg-gray-200 rounded-full mt-4">
              <div
                className="h-full bg-gradient-to-r from-[#3B82F6] to-[#10B981] rounded-full"
                style={{ width: `${job.matchPercentage}%` }}
              />
            </div>

            <p className="text-sm text-center mt-2 text-gray-500">
              Match Score
            </p>

          </div>
        ))}
      </div>
    </div>
  );
}
