

import { HiCheckBadge } from "react-icons/hi2";
import { BsBriefcase } from "react-icons/bs";
import { MdOutlineTrackChanges } from "react-icons/md";


import Box from "./Box";
import User from "./User";
import RecentMatches from "./RecentMatches";
export default function Home() {
  
  return (
    
   
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-900 dark:to-gray-800 p-4 md:p-8 '>
          
            <User/>
            <div className="grid grid-cols-3 gap-18 mt-10">
                <Box icon={<MdOutlineTrackChanges/> } complete={"0/5"} detail={"Skills Assessed"}/>
                <Box icon={<BsBriefcase/> } complete={"0"} detail={"Job Matches"}/>
                <Box icon={< HiCheckBadge/> } complete={"0%"} detail={"Profile Complete"}/>
               
            </div>
         <div className="mt-10">
            <RecentMatches/>
         </div>
    </div>
  )
}
