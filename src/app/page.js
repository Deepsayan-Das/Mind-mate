'use client'
import Image from "next/image";
import Brain from "./components/Brain";
import { Canvas } from "@react-three/fiber";
import BrainCanvas from "./components/wrapper";

export default function Home() {
  return (
    <>
    <div className="h-screen w-screen">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 mix-blend-difference">
        <h1 className="text-white opacity-80 font-bold font-inter text-5xl md:text-7xl lg:text-8xl w-4/5 text-center  whitespace-nowrap negetive">
          YOUR MIND MATTERS
        </h1>
      </div>
      <BrainCanvas/>
      
    </div>


    </>
  );
}
