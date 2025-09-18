"use client";
import React, { useState, useRef, useEffect } from "react";

const initialMessages = [
  {
    sender: "user",
    text: "I don’t know what to do anymore. Everything feels too heavy."
  },
  {
    sender: "ai",
    text: "I’m really sorry you’re carrying so much. Can you tell me one thing that’s been weighing on you the most lately?"
  },
  {
    sender: "user",
    text: "Mostly studies... I keep failing and feel like I’ll never succeed."
  },
  {
    sender: "ai",
    text: "That sounds really discouraging. Let’s try to break it down: what’s the one subject or area you struggle with most?"
  },
  {
    sender: "user",
    text: "Math. No matter how much I try, I just can’t get it."
  },
  {
    sender: "ai",
    text: "Okay, that’s specific — good start. Instead of pushing yourself all at once, what if we set a tiny goal, like practicing 2–3 problems a day with breaks? Do you think that would feel more manageable?"
  },
  {
    sender: "user",
    text: "Maybe… I guess small steps are better."
  },
  {
    sender: "ai",
    text: "Exactly 💡 Small wins build momentum. And remember, struggling with math doesn’t define your worth. You’re more than your grades."
  },
  {
    sender: "user",
    text: "Still, sometimes I feel like giving up completely."
  },
  {
    sender: "ai",
    text: "I hear you. When those thoughts come, it’s important not to face them alone. Can I share a helpline number with you, just in case you need to talk to a real human right away?"
  },
  {
    sender: "user",
    text: "Yes, please."
  },
  {
    sender: "ai",
    text: "You can call 9152987821 — it’s the KIRAN Helpline, available 24/7 in India. They’ll listen and support you without judgment."
  },
  {
    sender: "ai",
    text: "And while you’re here, I’ll keep checking in with you and helping you plan steps forward. You don’t have to go through this darkness alone. 🌱"
  }
];

const FloatingWindow = ({ onClose }) => {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [isLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="fixed bottom-4 right-[15vw] w-[70vw] h-[90vh] bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl flex flex-col z-50">
      {/* Header */}
      <div className="p-4 bg-[#2c2c2c]/80 rounded-t-2xl flex items-center justify-center text-[#e0e0e0] backdrop-blur-sm relative">
        {/* Mac-style window controls */}
        <div className="absolute left-4 flex space-x-2">
          <button
            onClick={onClose}
            className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 focus:outline-none cursor-pointer transition-colors duration-200"
          />
          <button className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-400 focus:outline-none cursor-pointer transition-colors duration-200" />
          <button className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-400 focus:outline-none cursor-pointer transition-colors duration-200" />
        </div>
        <h3 className="font-bold text-lg text-center">AI Assistant</h3>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto bg-[#2a2a2a]/80 backdrop-blur-sm">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} mb-3`}
          >
            <div
              className={`p-3 rounded-lg max-w-[50%] break-words ${
                msg.sender === "user" ? "bg-[#3a7afe]/80 text-white" : "bg-[#3c3c3c]/80 text-white"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        <div ref={messagesEndRef} />
      </div>

      {/* Input (disabled for hardcoded demo) */}
      <div className="p-4 border-t border-white/20 flex backdrop-blur-sm">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Demo conversation — input disabled"
          className="flex-1 p-2 border border-gray-300 rounded-l-full focus:outline-none text-white bg-white/10"
          disabled
        />
        <button
          disabled
          className="px-6 py-2 bg-[#3a7afe]/80 text-white font-bold rounded-r-full disabled:opacity-60"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default FloatingWindow;
