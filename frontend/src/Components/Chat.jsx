import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { HiArrowLeft } from "react-icons/hi2";
import { Link, useNavigate } from "react-router-dom";

function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const bottomRef = useRef(null);

  useEffect(() => {
    if (!token) navigate("/signin");
  }, [token, navigate]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function handleclick() {
    if (!input.trim() || loading) return;

    const userMessage = { text: input, sender: "user" };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(
        "https://carrerloopaibackend.onrender.com/api/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ message: userMessage.text }),
        }
      );

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
    <div className="flex flex-col h-screen bg-gray-50">

      <div className="h-[70px] bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center relative text-white shadow">

        <div className="absolute left-6">
          <Link to="/">
            <button className="flex items-center gap-2 px-4 py-2 text-sm rounded-lg hover:bg-white/10 transition">
              <HiArrowLeft />
              Back
            </button>
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <img src="/chatbot.png" alt="bot" className="h-10 w-10 rounded-full" />
          <div>
            <p className="font-semibold">CareerLoop AI</p>
            <p className="text-xs text-green-200">Online</p>
          </div>
        </div>

      </div>

      <div className="flex-1 overflow-y-auto px-8 py-10">

        <div className="max-w-5xl mx-auto space-y-10">

          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex items-start gap-4 ${
                msg.sender === "user"
                  ? "justify-end"
                  : "justify-start"
              }`}
            >

              {msg.sender === "bot" && (
                <img
                  src="/chatbot.png"
                  className="h-9 w-9 rounded-full mt-1"
                />
              )}

              <div
                className={`px-5 py-4 rounded-2xl max-w-[75%] text-[15px] leading-relaxed shadow-md ${
                  msg.sender === "user"
                    ? "bg-indigo-600 text-white"
                    : "bg-white text-gray-800"
                }`}
              >
                <div className="prose prose-sm max-w-none">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {msg.text}
                  </ReactMarkdown>
                </div>
              </div>

            </div>
          ))}

          {loading && (
            <div className="flex items-start gap-4">
              <img
                src="/chatbot.png"
                className="h-9 w-9 rounded-full"
              />
              <div className="bg-white px-4 py-3 rounded-xl text-sm text-gray-500 shadow">
                Nova-AI is typing...
              </div>
            </div>
          )}

          <div ref={bottomRef}></div>

        </div>

      </div>

      <div className="bg-white px-6 py-4 shadow-inner">

        <div className="max-w-5xl mx-auto flex gap-3">

          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask CareerLoop AI anything..."
            className="flex-1 bg-gray-100 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
            onKeyDown={(e) =>
              e.key === "Enter" && handleclick()
            }
          />

          <button
            onClick={handleclick}
            disabled={loading}
            className="bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 transition disabled:opacity-50"
          >
            Send
          </button>

        </div>

      </div>

    </div>
  );
}

export default Chat;