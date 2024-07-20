import React, { Suspense, useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, Text3D, useMatcapTexture, PerspectiveCamera, OrbitControls, useGLTF } from '@react-three/drei';
import { useSpring, animated } from '@react-spring/three';
import * as THREE from 'three';
import gsap from 'gsap';

import { Miggles } from './Miggles';  // Ensure this path is correct

function Pyramid() {
  const { scene } = useGLTF('/Pyramid.glb');
  return <primitive object={scene} position={[0, -50, -100]} />;
}

function Cat() {
  const { scene } = useGLTF('/cat.glb');
  return <primitive scale={100} object={scene} position={[-10, 100, -75]} />;
}

function Floor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -60, -100]}>
      <planeGeometry args={[1000000, 100000]} />
      <meshStandardMaterial color="tan" />
    </mesh>
  );
}

function AnimatedText3D() {
  const textRef = useRef();
  const { viewport, camera } = useThree();
  const [matcapTexture] = useMatcapTexture('3E2335_D36A1B_8E4A2E_2842A5', 256);
  const [springs, api] = useSpring(() => ({
    scale: [1, 1, 1],
    config: { mass: 2, tension: 500, friction: 40 }
  }));

  useEffect(() => {
    let interval = setInterval(() => {
      api.start({
        scale: [1 + Math.random() * 0.1, 1 + Math.random() * 0.1, 1],
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [api]);

  useFrame(() => {
    if (textRef.current) {
      textRef.current.quaternion.copy(camera.quaternion);
    }
  });

  return (
    <group position={[0, -150, 0]}>
      <animated.group scale={springs.scale}>
        <Text3D
          ref={textRef}
          font="/little.json"
          size={viewport.width / 25}
          height={0.2}
          curveSegments={24}
          bevelEnabled
          bevelThickness={0.01}
          bevelSize={0.02}
          bevelOffset={0}
          bevelSegments={5}
        >
          {`3d Miggles`}
          <meshStandardMaterial color="white" metalness={0.5} roughness={0.1} />
        </Text3D>
      </animated.group>
    </group>
  );
}

function Navbar() {
  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      zIndex: 1000,
    }}>
      <nav style={{
        position: 'absolute',
        top: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '15px 30px',
        backgroundColor: 'rgba(0,0,0,0.7)',
        borderRadius: '15px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        pointerEvents: 'auto',
      }}>
        <NavLink href="https://telegram.org">Telegram</NavLink>
        <NavLink href="https://twitter.com">Twitter</NavLink>
        <NavLink href="https://google.com">Google</NavLink>
      </nav>
    </div>
  );
}

function NavLink({ href, children }) {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer" 
      style={{
        color: 'white',
        textDecoration: 'none',
        padding: '10px 20px',
        margin: '0 15px',
        borderRadius: '8px',
        backgroundColor: 'rgba(255,255,255,0.1)',
        transition: 'all 0.3s ease',
        fontWeight: 'bold',
        cursor: 'pointer',
      }}
      onMouseEnter={(e) => {
        e.target.style.backgroundColor = 'rgba(255,255,255,0.3)';
        e.target.style.transform = 'scale(1.1)';
        e.target.style.boxShadow = '0 0 15px rgba(255,255,255,0.5)';
      }}
      onMouseLeave={(e) => {
        e.target.style.backgroundColor = 'rgba(255,255,255,0.1)';
        e.target.style.transform = 'scale(1)';
        e.target.style.boxShadow = 'none';
      }}
    >
      {children}
    </a>
  );
}

function Footer() {
  return (
    <div style={{
      position: 'absolute',
      bottom: '0',
      left: '0',
      right: '0',
      height: '100px',
      overflow: 'hidden',
      backgroundColor: 'rgba(0,0,0,0.5)',
      zIndex: 1000,
    }}>
      <div style={{
        display: 'flex',
        animation: 'scroll 20s linear infinite',
        width: 'fit-content',
      }}>
        {[...Array(10)].map((_, i) => (
          <img 
            key={i} 
            src={`/migglesd.jpeg`} 
            alt={`Gallery image ${i + 1}`} 
            style={{ height: '100px', marginRight: '10px' }} 
          />
        ))}
      </div>
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}

export default function Scene() {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 100, 600]} fov={50} />
        <OrbitControls />
        <Suspense fallback={null}>
          <Pyramid />
          <Cat />
          <AnimatedText3D />
        </Suspense>
        <ambientLight intensity={0.5} />
        <Environment files={'./desert.exr'} background />
        <spotLight position={[100, 100, 100]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <pointLight position={[-100, -100, -100]} intensity={0.5} />
      </Canvas>
      <Navbar />
      <Footer />
    </div>
  );
}