import React, { useState, useRef, useEffect } from "react";
import { HiArrowLeft } from "react-icons/hi2";
import { LuUpload } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import { FaFileAlt } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";
import { HiSparkles } from "react-icons/hi2";
import axios from "axios";
import { toast } from "react-toastify";



export default function Resumeupload() {
  const fileupload = useRef(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

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
    <div className='min-h-screen bg-[#0f172a] text-white p-6 md:p-10 font-["Outfit"]'>

      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <Link to="/">
          <button className="flex items-center gap-2 text-sm px-4 py-2 rounded-xl glass hover:bg-white/10 transition border border-white/10 mb-8">
            <HiArrowLeft /> Back to Home
          </button>
        </Link>

        {loading ? (
          <div className="glass p-10 rounded-3xl border border-white/10 flex flex-col items-center justify-center min-h-[400px]">
            <div className="relative w-20 h-20 mb-6">
              <div className="absolute inset-0 rounded-full border-4 border-blue-500/30"></div>
              <div className="absolute inset-0 rounded-full border-4 border-t-blue-500 animate-spin"></div>
            </div>
            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">Analyzing Resume...</h2>
            <p className="text-white/60 mt-2 text-center max-w-md">Our AI is extracting your skills, experience, and matching you with the best opportunities.</p>
          </div>
        ) : (
          <div className="block">
            <div className="glass p-1 p-8 rounded-3xl border border-white/10 shadow-2xl">

              {resume ? (
                <div className="flex flex-col items-center gap-8 py-8">
                  <div className="w-full bg-white/5 rounded-2xl p-6 flex items-center justify-between border border-white/10">
                    <div className="flex items-center gap-5">
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center shadow-lg">
                        <FaFileAlt className="text-white text-3xl" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">{resume.name}</h3>
                        <p className="text-white/50 text-sm">{(resume.size / 1024).toFixed(2)} KB</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setResume(null)}
                      className="p-3 rounded-full hover:bg-white/10 text-white/60 hover:text-red-400 transition"
                    >
                      <GiCancel className="text-2xl" />
                    </button>
                  </div>

                  <div className="w-full glass bg-blue-500/5 rounded-2xl p-8 border border-blue-500/10">
                    <h2 className="text-xl font-bold text-blue-400 mb-4 flex items-center gap-2">
                      <HiSparkles /> Prediction Preview
                    </h2>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {['Technical Skills Extraction', 'Experience & Projects Analysis', 'Education Verification', 'Job Market Alignment'].map((item, i) => (
                        <li key={i} className="flex items-center gap-3 text-white/70">
                          <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs">✓</div>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    onClick={fileanalyze}
                    className="w-full py-4 rounded-xl font-bold text-lg bg-gradient-to-r from-blue-600 to-emerald-600 hover:scale-[1.01] transition-all shadow-lg hover:shadow-blue-500/25"
                  >
                    Start Analysis
                  </button>
                </div>
              ) : (
                <div className="py-12 flex flex-col items-center justify-center text-center">
                  <div
                    onClick={uploadfile}
                    className="w-32 h-32 rounded-full bg-white/5 border-2 border-dashed border-white/20 flex items-center justify-center cursor-pointer hover:bg-white/10 hover:border-blue-500/50 hover:scale-105 transition-all group mb-6"
                  >
                    <LuUpload className="text-4xl text-white/40 group-hover:text-blue-400 transition-colors" />
                  </div>

                  <h2 className="text-3xl font-bold text-white mb-2">Upload Your Resume</h2>
                  <p className="text-white/50 mb-8">Supported formats: PDF, DOC, DOCX (Max 5MB)</p>

                  <input
                    type="file"
                    accept=".doc,.docx,.pdf"
                    ref={fileupload}
                    hidden
                    onChange={(e) => e.target.files && setResume(e.target.files[0])}
                  />

                  <button
                    onClick={uploadfile}
                    className="px-8 py-3 rounded-xl font-bold text-white bg-white/10 border border-white/10 hover:bg-white/20 transition-all"
                  >
                    Browse Files
                  </button>
                </div>
              )}
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass p-6 rounded-2xl border border-white/10 flex items-start gap-4">
                <div className="text-2xl">💡</div>
                <div>
                  <h3 className="font-bold text-white mb-1">Smart Tips</h3>
                  <p className="text-sm text-white/50">Ensure high scanability by using standard headings and clear bullet points.</p>
                </div>
              </div>
              <div className="glass p-6 rounded-2xl border border-white/10 flex items-start gap-4">
                <div className="text-2xl">⚡</div>
                <div>
                  <h3 className="font-bold text-white mb-1">Instant Match</h3>
                  <p className="text-sm text-white/50">Our AI matches you with real-time job openings immediately after analysis.</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
