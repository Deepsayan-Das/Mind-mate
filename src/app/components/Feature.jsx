'use client'
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Bot, ShieldCheck, Zap, BarChart, Settings, Layers, Code } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// 1. Data array with objects for each feature
const featuresData = [
  {
    icon: <Bot size={32} className="text-white" />,
    title: "AI-Powered Assistant",
    line1: "Engage with an intelligent assistant.",
    line2: "Trained for helpful, safe conversations."
  },
  {
    icon: <ShieldCheck size={32} className="text-white" />,
    title: "Privacy First",
    line1: "Your conversations are secure and private.",
    line2: "We don't store personal chat data."
  },
  {
    icon: <Zap size={32} className="text-white" />,
    title: "Fast Responses",
    line1: "Optimized for speed and efficiency.",
    line2: "Get the information you need, instantly."
  },
  {
    icon: <BarChart size={32} className="text-white" />,
    title: "Insightful Analytics",
    line1: "Track your usage and performance.",
    line2: "Understand patterns and improve."
  },
  {
    icon: <Settings size={32} className="text-white" />,
    title: "Customizable",
    line1: "Tailor the experience to your needs.",
    line2: "Adjust settings for a perfect fit."
  },
  {
    icon: <Layers size={32} className="text-white" />,
    title: "Scalable Infrastructure",
    line1: "Built to handle growth and demand.",
    line2: "Reliable service at any scale."
  },
  {
    icon: <Code size={32} className="text-white" />,
    title: "Developer Friendly",
    line1: "Easy to integrate with our API.",
    line2: "Robust documentation and support."
  }
];

function Feature() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
      },
    });

    tl.fromTo(
      headerRef.current.children,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 1.2,
        ease: 'power3.out',
      }
    );

    tl.fromTo(
      cardsRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.2,
        duration: 1,
        ease: 'power3.out',
      },
      '-=1'
    );
  }, []);

  const handleMouseEnter = (e) => {
    gsap.to(e.currentTarget, {
      scale: 1.02,
      boxShadow: '0 8px 16px rgba(255,255,255,0.15)',
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = (e) => {
    gsap.to(e.currentTarget, {
      scale: 1,
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  return (
    <div
      ref={sectionRef}
      className="min-h-screen w-full flex flex-col items-center justify-center px-6 py-12 bg-[#0a0a0a] text-white"
    >
      <h1
        ref={headerRef}
        className="text-7xl font-inter font-extrabold mb-12 flex space-x-2 flex-wrap justify-center"
      >
        {'FEATURES'.split('').map((letter, idx) => (
          <span key={idx} className="inline-block">
            {letter}
          </span>
        ))}
      </h1>

      <div className="flex flex-wrap justify-center gap-8 max-w-6xl w-full">
        {/* 2. Render cards by mapping over the data array */}
        {featuresData.map((feature, i) => (
          <div
            key={i}
            ref={(el) => (cardsRef.current[i] = el)}
            className="bg-[#121212] rounded-xl p-6 text-center shadow-sm min-w-[280px] max-w-xs"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {/* 3. Render the icon from the data */}
            <div className="w-16 h-16 bg-red-500 mx-auto mb-4 rounded-lg flex items-center justify-center">
              {feature.icon}
            </div>
            {/* 4. Render the title and description from the data */}
            <h2 className="text-xl font-semibold mb-2">{feature.title}</h2>
            <p className="text-gray-300 text-sm">
              {feature.line1}<br />
              {feature.line2}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Feature;