import React, { useState, useRef ,useEffect} from "react";
import { HiArrowLeft } from "react-icons/hi2";
import { LuUpload } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import { FaFileAlt } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";
import axios from "axios";
import { toast } from "react-toastify";
import  { Auth } from "../Context/ContextProvider";


export default function Resumeupload() {
  const fileupload = useRef(null);
  const navigate = useNavigate();
  const{token}=Auth()
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);

  const uploadfile = () => {
    fileupload.current.click();
  };

  useEffect(() => {
  if (!token) {
    toast.error("Please login to upload resume");
    navigate("/signin");
  }
}, [token, navigate]);

  const fileanalyze = async () => {
    if (!resume) {
      toast.error("Upload the resume");
      return;
    }

   
    if (resume.size > 5 * 1024 * 1024) {
      toast.error("Resume must be under 5MB");
      return;
    }

    const resumedata = new FormData();
    resumedata.append("resume", resume);
    

    try {
      setLoading(true);

      const response = await axios.post(

        "http://localhost:5000/api/resume/resumeAnalyzer",
        resumedata,
        {
      headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  }
      );
      console.log(response.data.analysis)
      if (response.data.success) {
        navigate("/Resumeresult", {
          state: response.data.analysis,
        });
      } else {
        toast.error("Resume analysis failed");
      }
    } catch (err) {
      console.error(err);
      toast.error(
        err.response?.data?.message || "Server error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-4 md:p-8">
      
     
      <Link to="/">
        <button className="flex gap-2 items-center border border-blue-500 text-blue-500 p-2 rounded-lg w-24 hover:bg-blue-500 hover:text-white transition">
          <HiArrowLeft /> Back
        </button>
      </Link>

     
      {loading ? (
        <div className="flex justify-center items-center min-h-screen gap-2">
          <div className="animate-spin h-5 w-5 border-2 border-blue-500 border-t-transparent rounded-full"></div>
          <span className="text-blue-500">AI is analyzing your resume...</span>
        </div>
      ) : (
        <div className="flex justify-center mt-10">
          <div className="bg-white shadow-lg border-dotted border-gray-300 border-4 w-[70%] p-6">
            
           
            {resume ? (
              <div className="flex flex-col items-center gap-6">
                <div className="flex justify-between items-center w-full bg-blue-50 p-4 rounded">
                  <div className="flex items-center gap-4">
                    <div className="bg-gradient-to-r from-blue-500 to-green-500 h-12 w-12 rounded-full flex justify-center items-center">
                      <FaFileAlt className="text-white text-xl" />
                    </div>
                    <div>
                      <p className="font-semibold">{resume.name}</p>
                      <p className="text-sm text-gray-500">
                        {(resume.size / 1024).toFixed(2)} KB
                      </p>
                    </div>
                  </div>
                  <GiCancel
                    className="cursor-pointer text-xl"
                    onClick={() => setResume(null)}
                  />
                </div>

                <div className="bg-blue-50 p-6 w-full rounded">
                  <h2 className="font-bold text-blue-500 mb-3">
                    What we’ll analyze
                  </h2>
                  <ul className="space-y-2">
                    <li>✔ Technical skills & proficiency</li>
                    <li>✔ Experience & projects</li>
                    <li>✔ Education & certifications</li>
                    <li>✔ Job market alignment</li>
                  </ul>
                </div>

                <button
                  onClick={fileanalyze}
                  className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-6 py-2 rounded-lg"
                >
                  Analyze Resume
                </button>
              </div>
            ) : (
             
              <div className="flex flex-col items-center gap-4">
                <button
                  onClick={uploadfile}
                  className="bg-gradient-to-r from-blue-500 to-green-500 h-16 w-16 rounded-full flex justify-center items-center"
                >
                  <LuUpload className="text-white text-3xl" />
                </button>

                <input
                  type="file"
                  accept=".doc,.docx"
                  ref={fileupload}
                  hidden
                  onChange={(e) =>
                    e.target.files && setResume(e.target.files[0])
                  }
                />

                <h2 className="font-semibold">Upload your resume</h2>
                <p className="text-sm text-gray-500">
                  DOC / DOCX only (Max 5MB)
                </p>

                <button
                  onClick={uploadfile}
                  className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-6 py-2 rounded-lg"
                >
                  Browse Files
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      
      <div className="flex justify-center mt-8">
        <div className="bg-white w-[70%] shadow-lg p-6">
          <h2 className="font-bold mb-4">💡 Tips for Better Results</h2>
          <div className="grid grid-cols-2 gap-4">
            <p>✔ Use a well-formatted recent resume</p>
            <p>✔ List quantifiable achievements</p>
            <p>✔ Include specific technical skills</p>
            <p>✔ Keep it under 2 pages</p>
          </div>
        </div>
      </div>
    </div>
  );
}
