import { useEffect, useState } from "react";
import logo from "../assets/chatbotlogo.jpeg";
import ReactMarkdown from "react-markdown";
import { HiArrowLeft } from "react-icons/hi2";
import { Link, useNavigate } from "react-router-dom";

function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/signin");
    }
  }, [token, navigate]);

  async function handleclick() {
    if (!input.trim() || loading) return;

    const userMessage = {
      text: input,
      sender: "user",
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message: userMessage.text }),
      });

      const data = await res.json();

      if (!res.ok || !data.airesponse) {
        throw new Error("AI response failed");
      }

      const botMessage = {
        text: data.airesponse,
        sender: "bot",
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { text: "⚠️ Nova-AI error. Please try again.", sender: "bot" },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-slate-950 to-black">
      <div className="h-[70px] bg-slate-900/80 backdrop-blur sticky top-0 z-50 flex items-center justify-center border-b border-slate-700">
        <div className="absolute left-2">
          <Link to="/">
            <button className="flex text-white items-center gap-2 text-sm px-4 py-2 rounded-lg border border-white/20 hover:bg-white/10 transition">
              <HiArrowLeft /> Back
            </button>
          </Link>
        </div>

        <div className="h-[48px] w-[48px] rounded-full mr-3 relative">
          <img
            src={logo}
            alt="bot"
            className="h-full w-full rounded-full object-cover"
          />
          <span className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 border-2 border-slate-900 rounded-full"></span>
        </div>

        <div className="flex flex-col">
          <p className="text-white text-xl font-semibold">Nova-AI</p>
          <p className="text-emerald-400 text-xs">Online</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pt-6 pb-32">
        <div className="max-w-3xl mx-auto">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              } my-3`}
            >
              <div
                className={`rounded-2xl px-4 py-3 max-w-[75%] text-white shadow-md
                ${
                  msg.sender === "user"
                    ? "bg-gradient-to-r from-blue-600 to-violet-600"
                    : "bg-slate-800 border border-slate-700"
                }`}
              >
                <div className="prose prose-invert text-sm">
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                </div>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start my-3">
              <div className="bg-slate-800 border border-slate-700 px-4 py-2 rounded-xl text-white text-sm">
                Nova-AI is typing…
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 w-full bg-gradient-to-t from-black via-black/80 to-transparent">
        <div className="max-w-3xl mx-auto px-4 pb-4">
          <div className="flex items-center gap-2 bg-slate-900/70 backdrop-blur rounded-2xl px-4 py-3 border border-slate-700 shadow-lg">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Nova-AI…"
              className="flex-1 bg-transparent text-white outline-none placeholder-slate-400 text-sm"
              onKeyDown={(e) => e.key === "Enter" && handleclick()}
            />

            <button
              onClick={handleclick}
              disabled={loading}
              className="bg-gradient-to-r from-blue-600 to-emerald-600 hover:scale-105 transition-transform w-11 h-11 rounded-xl flex items-center justify-center text-white disabled:opacity-50"
            >
              ➤
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
