'use client'
import React, { useRef, useEffect } from 'react'
import { Canvas, useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import gsap from 'gsap'

function Brain() {
    const modelRef = useRef()
    const model = useLoader(GLTFLoader, "/brain.glb");

    useEffect(() => {
        if(modelRef.current){
            console.log("inside useEffect")
            const tl = gsap.timeline({repeat: -1, defaults: {ease: "none"}});
            tl.fromTo(modelRef.current.rotation, {x:0, y:-Math.PI/2, z:0}, {x:0, y:-Math.PI/2, z:0, duration: 40,repeat:1});
        }

    }, [])

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