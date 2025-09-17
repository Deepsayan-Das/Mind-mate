'use client'
import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import FloatingWindow from './FloatingWindow'

gsap.registerPlugin(ScrollTrigger)

function Proto() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  
  const sectionRef = useRef(null)
  const h1Ref = useRef(null)

  const h1Lines = [
    "Your Mental Health Companion is,",
    "Just a Click Away"
  ]
  
  const h3Lines = [
    "Our specialized AI chatbot provides immediate,",
    "confidential support in a safe, stigma-free environment.",
    "No judgment. No wait."
  ]

  const createSpans = (text) =>
    text.split('').map((letter, index) => (
      <span key={index} className="inline-block">
        {letter === ' ' ? '\u00A0' : letter}
      </span>
    ))

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'bottom 70%',
          scrub:3,
          toggleActions: 'play none none reverse',
          markers: false
        }
      })

      // Initial state
      gsap.set('.proto-h1 span, .proto-h3 span', { y: 150, opacity: 0 })
      gsap.set('.proto-underline', { width: 0, opacity: 1, transformOrigin: 'center' })

      // Animate h1 spans
      tl.to('.proto-h1 span', {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power2.out',
        stagger: { amount: 0.8, from: 'start' }
      })

      // Animate underline after h1 text animation
      tl.to('.proto-underline', {
        width: '100%',
        duration: 0.8,
        ease: 'power2.out'
      }, '-=0.4')

      // Animate h3 spans
      tl.to('.proto-h3 span', {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power2.inOut',
        stagger: { amount: 1.2, from: 'start' }
      }, '-=0.5')

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={sectionRef} className='w-[100vw] mt-28 h-[50vh] flex flex-col justify-evenly items-center proto-section'>

      {/* Container to wrap h1 and underline */}
      <div className="inline-block text-center">
        <h1 ref={h1Ref} className='font-bold font-inter text-2xl md:text-4xl lg:text-5xl wave-text proto-h1'>
          {h1Lines.map((line, lineIndex) => (
            <React.Fragment key={lineIndex}>
              {createSpans(line)}
              {lineIndex < h1Lines.length - 1 && <br />}
            </React.Fragment>
          ))}
        </h1>

        {/* Underline with gradient fade at edges */}
        <div className="proto-underline h-[2px] mt-2 mx-auto" style={{
          background: 'linear-gradient(to right, transparent, white, transparent)',
          width: '0'
        }}></div>
      </div>

      <br />

      <h3 className='font-thin font-inter text-md md:text-xl lg:text-2xl w-full text-center wave-text proto-h3'>
        {h3Lines.map((line, lineIndex) => (
          <React.Fragment key={lineIndex}>
            {createSpans(line)}
            {lineIndex < h3Lines.length - 1 && <br />}
          </React.Fragment>
        ))}
      </h3>

      <br/>

      <button onClick={() => setIsChatOpen(true)} className='relative w-[40%] h-12 rounded-full border-2 border-white bg-transparent hover:text-black transition-all ease-in-out duration-500 font-bold overflow-hidden proto-button'>
        <span className='relative z-10'>Talk to Our AI</span>
        <div className='absolute top-0 right-0 h-full w-0 bg-white transition-all duration-500 ease-in-out hover:w-full'></div>
      </button>
      {isChatOpen && <FloatingWindow onClose={() => setIsChatOpen(false)} />}
    </div>
  )
}

export default Proto
