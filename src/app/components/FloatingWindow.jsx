"use client";
import React, { useState, useRef, useEffect } from 'react';

const FloatingWindow = ({ onClose }) => {
  const [messages, setMessages] = useState([
    { sender: 'ai', text: "Hello! I'm here to listen. What's on your mind?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (input.trim() === '' || isLoading) return;

    const userMessage = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      const aiMessage = { sender: 'ai', text: data.reply };
      setMessages(prev => [...prev, aiMessage]);

    } catch (error) {
      console.error("Failed to fetch AI response:", error);
      const errorMessage = { sender: 'ai', text: "I'm having trouble connecting. Please try again later." };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
  <div className="fixed bottom-4 right-[15vw] w-[70vw] h-[90vh] bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl flex flex-col z-50">
    
    {/* Header */}
    <div className="p-4 bg-[#2c2c2c]/80 rounded-t-2xl flex items-center justify-center text-[#e0e0e0] backdrop-blur-sm relative">

  {/* Mac-style window controls (positioned absolutely to the left) */}
  <div className="absolute left-4 flex space-x-2">
    <button onClick={onClose} className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 focus:outline-none cursor-pointer transition-colors duration-200" />
    <button className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-400 focus:outline-none cursor-pointer transition-colors duration-200" />
    <button className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-400 focus:outline-none cursor-pointer transition-colors duration-200" />
  </div>

  <h3 className="font-bold text-lg text-center">AI Assistant</h3>

</div>

    {/* Messages */}
    <div className="flex-1 p-4 overflow-y-auto bg-[#2a2a2a]/80 backdrop-blur-sm">
      {messages.map((msg, index) => (
        <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} mb-3`}>
          <div className={`p-3 rounded-lg max-w-[50%] break-words ${
            msg.sender === 'user' ? 'bg-[#3a7afe]/80 text-white' : 'bg-[#3c3c3c]/80 text-white'
          }`}>
            {msg.text}
          </div>
        </div>
      ))}
      {isLoading && (
        <div className="flex justify-start mb-3">
          <div className="p-3 rounded-lg bg-gray-200/80 text-gray-500">
            Typing...
          </div>
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>

    {/* Input */}
    <div className="p-4 border-t border-white/20 flex backdrop-blur-sm">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        placeholder="Type your message..."
        className="flex-1 p-2 border border-gray-300 rounded-l-full focus:outline-none focus:ring-1 focus:border-none focus:ring-[#3a7afe] text-white bg-white/10"
        disabled={isLoading}
      />
      <button onClick={handleSend} disabled={isLoading} className="px-6 py-2 bg-[#3a7afe]/80 text-white font-bold rounded-r-full hover:bg-cyan-600 disabled:bg-gray-400">
        Send
      </button>
    </div>

  </div>
);
};

export default FloatingWindow;