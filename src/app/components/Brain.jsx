'use client'
import React, { useRef, useEffect, Suspense } from 'react'
import { Canvas, useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import gsap from 'gsap'

function BrainModel() {
    const modelRef = useRef()
    const model = useLoader(GLTFLoader, "/brain.glb");

    useEffect(() => {
        if(modelRef.current){
            console.log("inside useEffect")
            const tl = gsap.timeline({repeat: -1, defaults: {ease: "none"}});
            tl.fromTo(modelRef.current.rotation, {x:0, y:-Math.PI/2, z:0}, {x:0, y:Math.PI/2, z:0, duration: 20,repeat:1});
        }

    }, [])

    return (
        <mesh receiveShadow>
            <primitive ref={modelRef} object={model.scene} scale={10} position={[0, 0, -5]} rotation={[0,-Math.PI/2,0]} />
        </mesh>
    )
}

function Brain() {
  return (
    <div className="absolute inset-0 z-0">
      <Suspense fallback={<div className="fixed inset-0 flex items-center justify-center bg-black text-white text-2xl font-bold">Loading...</div>}>
        <Canvas className='w-full h-screen' shadows gl={{ alpha: true }}>
            <ambientLight intensity={1} />
            <pointLight position={[10, 10, 10]} intensity={50} castShadow/>
            <BrainModel />
        </Canvas>
      </Suspense>
    </div>
  )
}

export default Brain