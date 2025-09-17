'use client'
import { useEffect } from "react";
import gsap from "gsap";
import About from "./components/About";
import Feature from "./components/Feature";
import Proto from "./components/Proto";
import BrainCanvas from "./components/wrapper";

function PlaceholderCanvas() {
  return (
    <div className="flex items-center justify-center h-full text-white text-xl">
      3D Model Placeholder
    </div>
  );
}

export default function Home() {
  const text = "YOUR MIND MATTERS";
  const shouldLoadBrain = true;  // Toggle this flag as needed

  useEffect(() => {
    const spans = document.querySelectorAll('.wave-text span');
    gsap.fromTo(spans, { y: 150 }, { y: 0, duration: 0.8, ease: "power2.out", stagger: (index) => index * 0.05 + Math.sin(index * 0.3) * 0.1 });
  }, []);

  return (
    <div className="h-screen w-screen">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 mix-blend-difference">
        <h1 className="text-white opacity-100 font-bold font-inter text-5xl md:text-7xl lg:text-8xl w-full text-center whitespace-nowrap negetive wave-text">
          {text.split('').map((letter, index) => (
            <span key={index}>
              {letter === ' ' ? '\u00A0' : letter}
            </span>
          ))}
        </h1>
      </div>

      {shouldLoadBrain ? <BrainCanvas /> : <PlaceholderCanvas />}
      <br/><br/>
      <About />
      <Proto />
      <br/><br/><br/>
      <Feature />
    </div>
  );
}
