import { useEffect, useState } from "react";
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
    if (!token) navigate("/signin");
  }, [token, navigate]);

  async function handleclick() {
    if (!input.trim() || loading) return;

    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("https://carrerloopaibackend.onrender.com/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message: userMessage.text }),
      });

      const data = await res.json();

      if (!res.ok || !data.airesponse)
        throw new Error("AI response failed");

      setMessages((prev) => [
        ...prev,
        { text: data.airesponse, sender: "bot" },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { text: "⚠️ Nova-AI error. Try again.", sender: "bot" },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">

    
      <div className="h-[70px] bg-gradient-to-r from-indigo-600 to-purple-600 shadow-md flex items-center justify-center relative text-white">
        <div className="absolute left-4">
          <Link to="/">
            <button className="flex items-center gap-2 px-4 py-2 text-sm rounded-lg border border-white/30 hover:bg-white/10 transition">
              <HiArrowLeft /> Back
            </button>
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <img
            src="/chatbot.png"
            alt="bot"
            className="h-20 w-20 rounded-full  object-cover"
          />

          <div>
            <p className="font-semibold text-lg tracking-wide">
              CarrerLoopAi
            </p>
            <p className="text-green-200 text-xs">Online</p>
          </div>
        </div>
      </div>

     
      <div className="flex-1 overflow-y-auto px-4 pt-8 pb-36">
        <div className="max-w-3xl mx-auto">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.sender === "user"
                  ? "justify-end"
                  : "justify-start"
              } my-4`}
            >
              <div
                className={`rounded-2xl px-5 py-3 max-w-[75%] shadow-sm
                ${
                  msg.sender === "user"
                    ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white"
                    : "bg-white border text-gray-800"
                }`}
              >
              
                <div className="text-sm leading-relaxed">
                  <ReactMarkdown>
                    {msg.text}
                  </ReactMarkdown>
                </div>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start my-4">
              <div className="bg-white border px-4 py-2 rounded-xl text-gray-500 text-sm shadow-sm">
                CarrerLoopAi typing…
              </div>
            </div>
          )}
        </div>
      </div>

     
      <div className="fixed bottom-0 left-0 w-full bg-white  shadow-md">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3 bg-gray-100 rounded-2xl px-4 py-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Nova-AI anything..."
              className="flex-1 bg-transparent outline-none text-gray-700 text-sm"
              onKeyDown={(e) =>
                e.key === "Enter" && handleclick()
              }
            />

            <button
              onClick={handleclick}
              disabled={loading}
              className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white w-11 h-11 rounded-xl flex items-center justify-center hover:scale-105 transition disabled:opacity-50 shadow"
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
