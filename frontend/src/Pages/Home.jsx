import { HiCheckBadge } from "react-icons/hi2";
import { BsBriefcase } from "react-icons/bs";
import { MdOutlineTrackChanges } from "react-icons/md";
import { Link } from "react-router-dom";
import { MdHome } from "react-icons/md";
import { HiOutlineChatBubbleLeftRight } from "react-icons/hi2";
import Box from "./Box";
import { FiUser } from "react-icons/fi";
import { HiOutlineBookOpen } from "react-icons/hi";
import User from "./User";
import RecentMatches from "./RecentMatches";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-6 md:p-10 pb-36">
      
      <User />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-16">
        <Box
          icon={<MdOutlineTrackChanges className="text-3xl text-blue-500" />}
          complete={"0/5"}
          detail={"Skills Assessed"}
        />
        <Box
          icon={<BsBriefcase className="text-3xl text-emerald-500" />}
          complete={"0"}
          detail={"Job Matches"}
        />
        <Box
          icon={<HiCheckBadge className="text-3xl text-indigo-500" />}
          complete={"0%"}
          detail={"Profile Complete"}
        />
      </div>

      <div className="mt-16">
        <RecentMatches />
      </div>

      <div
        className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50
        w-[95%] max-w-4xl
        bg-white/80 backdrop-blur-xl
        border border-white/40
        shadow-2xl rounded-2xl
        flex justify-evenly items-center p-3"
      >
        <Link
          to="/"
          className="flex flex-col items-center gap-1 px-4 py-2 rounded-xl
          text-blue-600
          hover:text-white
          hover:bg-gradient-to-br hover:from-blue-500 hover:to-indigo-600
          transition-all duration-300"
        >
          <MdHome className="text-2xl" />
          <span className="text-xs font-semibold">Home</span>
        </Link>

        <Link
          to="/JobMatches"
          className="flex flex-col items-center gap-1 px-4 py-2 rounded-xl
          text-emerald-600
          hover:text-white
          hover:bg-gradient-to-br hover:from-emerald-500 hover:to-teal-600
          transition-all duration-300"
        >
          <BsBriefcase className="text-xl" />
          <span className="text-xs font-semibold">Jobs</span>
        </Link>

        <Link
          to="/Chat"
          className="flex flex-col items-center gap-1 px-4 py-2 rounded-xl
          text-indigo-600
          hover:text-white
          hover:bg-gradient-to-br hover:from-indigo-500 hover:to-purple-600
          transition-all duration-300"
        >
          <HiOutlineChatBubbleLeftRight className="text-xl" />
          <span className="text-xs font-semibold">Chat</span>
        </Link>

        <Link
          to="/Studyplan"
          className="flex flex-col items-center gap-1 px-4 py-2 rounded-xl
          text-teal-600
          hover:text-white
          hover:bg-gradient-to-br hover:from-teal-500 hover:to-emerald-600
          transition-all duration-300"
        >
          <HiOutlineBookOpen className="text-xl" />
          <span className="text-xs font-semibold">Study</span>
        </Link>

        <Link
          to="/Profile"
          className="flex flex-col items-center gap-1 px-4 py-2 rounded-xl
          text-gray-600
          hover:text-white
          hover:bg-gradient-to-br hover:from-gray-600 hover:to-gray-800
          transition-all duration-300"
        >
          <FiUser className="text-xl" />
          <span className="text-xs font-semibold">Profile</span>
        </Link>
      </div>
    </div>
  );
}