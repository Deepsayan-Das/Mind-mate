'use client'

import React from 'react'
import { Canvas } from '@react-three/fiber'
import Brain from './Brain'

function BrainCanvas() {
    return (
        <Canvas className="w-full h-screen" shadows gl={{ alpha: true }}>
            <ambientLight intensity={1} />
            <pointLight position={[10, 10, 10]} intensity={50} castShadow />
            <Brain />
        </Canvas>
    )
}

export default BrainCanvas
