'use client'
import React, { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function About() {
  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.about-section',
        start: 'top 80%',
        end: 'bottom 20%',
        scrub: 4,
        toggleActions: 'play none none reverse'
      }
    })

    tl.fromTo('.about-line', { height: 0 }, { height: '100%', duration: 0.5, ease: "power2.out" })
    tl.fromTo('.about-header', { x: -100, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5, ease: "power2.out" }, "-=0.2")
    tl.fromTo('.about-text', { x: -100, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5, ease: "power2.out", stagger: 0.2 }, "-=0.2")
  }, [])

  return (
    <div className='h-[50vh] w-screen relative about-section'>
      <div className="absolute left-[10%] top-4 h-full w-2  bg-white about-line"></div>
      <div className='h-full w-[40%] ml-[10%]'>
        <h1 className='font-bold font-inter text-5xl md:text-7xl lg:text-8xl ml-8 about-header'>About Us</h1><br/>
        <div className='font-inter text-2xl md:text-4xl lg:text-5xl font-extrathin ml-8'>
          {[
            "Breaking the stigma.",
            "Providing accessible",
            "mental health support",
            "to every corner of India"
          ].map((line, index) => (
            <p key={index} className="about-text" style={{ marginBottom: '0.5rem' }}>
              {line}
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}

export default About
