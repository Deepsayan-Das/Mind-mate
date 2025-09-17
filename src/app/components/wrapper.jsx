'use client'

import React from 'react'
import { Canvas, useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three'
import Brain from './Brain'

function BrainCanvas() {
    

    // Adjust texture properties
    

    return (
        <Canvas className="w-full h-screen" shadows gl={{ alpha: true }} style={{backgroundImage:'url(/canvas-bg.jpg)', backgroundSize:'cover', backgroundPosition:'center'}}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 5, 5]} intensity={1} />
            <directionalLight position={[-5, 5, 5]} intensity={1} />
            <directionalLight position={[5, -15, 5]} intensity={1} />         
            <pointLight position={[10, 10, 10]} intensity={1} castShadow />
            <pointLight position={[-10, -10, -10]} intensity={0.5} />
            <spotLight position={[0, 10, 10]} angle={0.3} penumbra={1} intensity={1} castShadow />
            <Brain />
        </Canvas>
    )
}

export default BrainCanvas
