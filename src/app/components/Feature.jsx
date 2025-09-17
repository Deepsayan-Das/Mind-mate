'use client'
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

function Feature() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate header letters
            gsap.fromTo(
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

            // Animate cards one by one
            gsap.to(cardsRef.current, {
              opacity: 1,
              y: 0,
              stagger: 0.2,
              duration: 1,
              ease: 'power3.out',
            });
          } else {
            // Reverse animation when section leaves viewport
            gsap.to(headerRef.current.children, {
              opacity: 0,
              y: 50,
              scrub:3,
              duration: 0.8,
              ease: 'power3.in',
            });
            gsap.to(cardsRef.current, {
              opacity: 0,
              y: 50,
              scrub:3,
              duration: 0.8,
              ease: 'power3.in',
            });
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    cardsRef.current.forEach((card) => {
      if (card) gsap.set(card, { opacity: 0, y: 50 });
    });
    if (headerRef.current) {
      gsap.set(headerRef.current.children, { opacity: 0, y: 50 });
    }

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  const handleMouseEnter = (e) => {
    gsap.to(e.currentTarget, {
      scale: 1.02,
      boxShadow: '0 8px 16px rgba(255,255,255,0.15)',
      duration: 0.3,
      ease: 'power2.out'
    });
  };

  const handleMouseLeave = (e) => {
    gsap.to(e.currentTarget, {
      scale: 1,
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      duration: 0.3,
      ease: 'power2.out'
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
        {Array.from({ length: 7 }, (_, i) => (
          <div
            key={i}
            ref={(el) => (cardsRef.current[i] = el)}
            className="bg-[#121212] rounded-xl p-6 text-center shadow-sm min-w-[280px] max-w-xs"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="w-16 h-16 bg-red-500 mx-auto mb-4 rounded-lg"></div>
            <h2 className="text-xl font-semibold mb-2">Feature {i + 1}</h2>
            <p className="text-gray-300 text-sm">
              First line description for feature {i + 1}.<br />
              Second line description for feature {i + 1}.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Feature;
