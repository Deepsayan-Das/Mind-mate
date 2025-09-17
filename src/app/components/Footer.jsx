'use client'
import React from 'react'

function Footer() {
  return (
    <footer className="w-full bg-[#0a0a0a] text-white py-8 px-6">
      <hr/>
      <br/>
      <br/>
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-2xl font-bold font-inter mb-4">Mind-Mate</h2>
        <p className="text-gray-300 font-inter">
          Your Mental Health Companion
        </p>
        <p className="text-gray-400 text-sm mt-4">
          © {new Date().getFullYear()} Mind-Mate. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer
