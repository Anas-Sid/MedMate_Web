import { useState } from 'react';

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{ text: "Hi! How can I help you today?", sender: "bot" }]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim() !== "") {
      setMessages([...messages, { text: input, sender: "user" }, { text: "Thank you for your message! We will assist you shortly.", sender: "bot" }]);
      setInput("");
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-blue-700 text-white w-16 h-16 rounded-full shadow-lg text-3xl flex items-center justify-center hover:bg-blue-600 transition"
        title="Chat with us"
      >
        ✉️
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 bg-white border border-gray-300 rounded-lg shadow-lg flex flex-col">
          <div className="bg-blue-700 text-white px-4 py-2 font-bold">AI Support</div>
          <div className="p-4 h-64 overflow-y-auto space-y-2 text-sm">
            {messages.map((msg, i) => (
              <div key={i} className={`p-2 rounded ${msg.sender === "bot" ? "bg-blue-100 text-blue-900" : "bg-gray-200 text-gray-800 text-right"}`}>
                {msg.text}
              </div>
            ))}
          </div>
          <div className="flex border-t">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type your message..."
              className="flex-1 p-2 text-sm outline-none"
            />
            <button onClick={handleSend} className="px-4 py-2 text-blue-700 font-bold">Send</button>
          </div>
        </div>
      )}
    </>
  );
}
