// src/components/ThreeDScene.js
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere } from '@react-three/drei';

const ThreeDScene = () => {
  return (
    <Canvas style={{ height: '400px' }}>
      <OrbitControls />
      <ambientLight intensity={0.5} />
      <directionalLight position={[0, 5, 5]} />
      <Sphere visible position={[0, 1, 0]} args={[1, 16, 200]}>
        <meshStandardMaterial attach="material" color="hotpink" />
      </Sphere>
    </Canvas>
  );
};

export default ThreeDScene;
