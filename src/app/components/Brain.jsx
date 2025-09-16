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
                targetRotation.current = gsap.utils.interpolate(targetRotation.current, 0, 0.1)
            }

            requestAnimationFrame(animate)
        }

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
            scale={10}
            position={[0, 0, -5]}
        />
    )
}

export default Brain
