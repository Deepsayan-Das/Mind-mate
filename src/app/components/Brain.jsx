'use client'
import React, { useRef, useEffect } from 'react'
import { Canvas, useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import gsap from 'gsap'

function Brain() {
    const modelRef = useRef()
    const model = useLoader(GLTFLoader, "/brain.glb");

    useEffect(() => {
        console.log("useEffect running, model:", model);
        console.log("modelRef.current:", modelRef.current);
        
        // Use a small delay to ensure the model is attached to the DOM
        const timer = setTimeout(() => {
            if (modelRef.current) {
                console.log("Model ref found after timeout:", modelRef.current);
                
                // Set initial rotation
                modelRef.current.rotation.set(0, -Math.PI/2, 0);
                
                const tl = gsap.timeline({repeat: -1, defaults: {ease: "none"}});
                
                // Use a simpler approach - just rotate continuously
                tl.to(modelRef.current.rotation, {
                    y: "+=6.283", // Full rotation (2π)
                    duration: 10,
                    onStart: () => console.log("GSAP animation started"),
                    onUpdate: () => {
                        console.log("Current Y rotation:", modelRef.current.rotation.y);
                    }
                });
            } else {
                console.log("modelRef.current is still null after timeout");
            }
        }, 100);
        
        return () => clearTimeout(timer);
    }, [model])

    return (
        <Canvas className='w-full h-screen' shadows gl={{ alpha: true }}>
            <ambientLight intensity={1} />
            <pointLight position={[10, 10, 10]} intensity={50} castShadow/>
            <mesh receiveShadow>
                <primitive 
                    ref={modelRef} 
                    object={model.scene} 
                    scale={10} 
                    position={[0, 0, -5]}
                    // Remove the rotation prop to avoid conflicts
                />
                <shadowMaterial color={"blue"} opacity={0.5} />
            </mesh>
        </Canvas>
    )
}

export default Brain