'use client'
import React, { useEffect, useState } from 'react'

function Navbar() {
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY < lastScrollY) {
        // Scrolling up
        setIsVisible(true)
      } else if (currentScrollY > lastScrollY && currentScrollY > window.innerHeight) {
        // Scrolling down and past home section
        setIsVisible(false)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [lastScrollY])

  return (
    <nav className={`fixed top-0 left-0 w-full bg-[#0a0a0a] text-white py-4 px-6 z-50 transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold font-inter">Mind-Mate</h1>
        <ul className="flex space-x-8">
          <li>
            <a href="#home" className="text-gray-300 hover:text-white transition-colors duration-300">
              Home
            </a>
          </li>
          <li>
            <a href="#about" className="text-gray-300 hover:text-white transition-colors duration-300">
              About Us
            </a>
          </li>
          <li>
            <a href="#chat" className="text-gray-300 hover:text-white transition-colors duration-300">
              Have a Chat
            </a>
          </li>
          <li>
            <a href="#features" className="text-gray-300 hover:text-white transition-colors duration-300">
              Features
            </a>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
