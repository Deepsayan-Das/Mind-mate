'use client'
import { useEffect } from "react";
import Image from "next/image";
import Brain from "./components/Brain";
import { Canvas } from "@react-three/fiber";
import BrainCanvas from "./components/wrapper";
import About from "./components/About";
import gsap from "gsap";
import Feature from "./components/Feature";

export default function Home() {
  const text = "YOUR MIND MATTERS";

  useEffect(() => {
    const spans = document.querySelectorAll('.wave-text span');
    gsap.fromTo(spans, { y: 150 }, { y: 0, duration: 0.8, ease: "power2.out", stagger: (index) => index * 0.05 + Math.sin(index * 0.3) * 0.1 });
  }, []);

  return (
    <>
    <div className="h-screen w-screen">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 mix-blend-difference">
        <h1 className="text-white opacity-80 font-bold font-inter text-5xl md:text-7xl lg:text-8xl w-full text-center whitespace-nowrap negetive wave-text">
          {text.split('').map((letter, index) => (
            <span key={index}>
              {letter === ' ' ? '\u00A0' : letter}
            </span>
          ))}
        </h1>
      </div>
      <BrainCanvas/>
      <About />
       <Feature/>
    </div>


    </>
  );
}
