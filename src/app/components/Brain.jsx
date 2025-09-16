import React, { useRef, useEffect } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import gsap from 'gsap'

function Brain() {
    const modelRef = useRef()
    const model = useLoader(GLTFLoader, "/brain.glb")

    const targetRotation = useRef(0)
    const currentVelocity = useRef(0)

    useEffect(() => {
        let lastMouseX = null
        const velocityDecay = 0.95
        const sensitivity = 0.0005

        const handleMouseMove = (e) => {
            if (lastMouseX !== null) {
                const deltaX = e.clientX - lastMouseX
                currentVelocity.current = deltaX * sensitivity
            }
            lastMouseX = e.clientX
        }

        window.addEventListener('mousemove', handleMouseMove)

        const animate = () => {
            targetRotation.current += currentVelocity.current
            currentVelocity.current *= velocityDecay

            if (Math.abs(currentVelocity.current) < 0.0001) {
                targetRotation.current += 0.001 // passive rotation speed
            }

            requestAnimationFrame(animate)
        }

        // Intro animation: scale up and rise from below
        gsap.fromTo(
            modelRef.current.scale,
            { x: 0, y: 0, z: 0 },
            { x: 12, y: 12, z: 12, duration: 1, ease: "power2.out" }
        )
        gsap.fromTo(
            modelRef.current.position,
            { y: -10 },
            { y: 0, duration: 1, ease: "power2.out" }
        )

        animate()

        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
        }
    }, [])

    useFrame(() => {
        if (modelRef.current) {
            modelRef.current.rotation.y = -Math.PI / 2 + targetRotation.current
        }
    })

    return (
        <primitive
            ref={modelRef}
            object={model.scene}
            scale={12}
            position={[0, 0, -5]}
        />
    )
}

export default Brain
