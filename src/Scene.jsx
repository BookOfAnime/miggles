import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text3D, useMatcapTexture, PerspectiveCamera, OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';

// Assume this import is correct for your project structure
import { Miggles } from './Miggles';

// You'll need to create this CSS file

function Pyramid() {
  const { scene } = useGLTF('/Pyramid.glb');
  return <primitive object={scene} position={[0, -50, -100]} />;
}

function Cat() {
  const { scene } = useGLTF('/cat.glb');
  const catRef = useRef();

  useFrame((state, delta) => {
    if (catRef.current) {
      catRef.current.rotation.y += delta * 0.2;
    }
  });

  return <primitive ref={catRef} scale={100} object={scene} position={[-10, 100, -75]} />;
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

  useEffect(() => {
    const tl = gsap.timeline({ repeat: -1, yoyo: true });
    tl.to(textRef.current.scale, {
      x: 1.1,
      y: 1.1,
      z: 1,
      duration: 2,
      ease: 'power1.inOut'
    });
  }, []);

  useFrame(() => {
    if (textRef.current) {
      textRef.current.quaternion.copy(camera.quaternion);
    }
  });

  return (
    <group position={[0, -150, 0]}>
      <group ref={textRef}>
        <Text3D
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
      </group>
    </group>
  );
}

function CameraController({ isInfoCardOpen }) {
  const { camera } = useThree();
  
  useEffect(() => {
    gsap.to(camera.position, {
      x: isInfoCardOpen ? -10 : 0,
      y: isInfoCardOpen ? 150 : 100,
      z: isInfoCardOpen ? 100 : 600,
      duration: 2,
      ease: 'power2.inOut'
    });
  }, [isInfoCardOpen, camera]);

  return null;
}

function Navbar({ onInfoClick }) {
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
        flexWrap: 'wrap',
      }}>
        <NavLink href="https://telegram.org">Telegram</NavLink>
        <NavLink href="https://twitter.com">Twitter</NavLink>
        <NavLink href="https://google.com">Google</NavLink>
        <PraiseMigglesButton onClick={onInfoClick} />
      </nav>
    </div>
  );
}

function NavLink({ href, children }) {
  const linkRef = useRef();

  const handleMouseEnter = () => {
    gsap.to(linkRef.current, {
      backgroundColor: 'rgba(255,255,255,0.3)',
      scale: 1.1,
      boxShadow: '0 0 15px rgba(255,255,255,0.5)',
      duration: 0.3
    });
  };

  const handleMouseLeave = () => {
    gsap.to(linkRef.current, {
      backgroundColor: 'rgba(255,255,255,0.1)',
      scale: 1,
      boxShadow: 'none',
      duration: 0.3
    });
  };

  return (
    <a 
      ref={linkRef}
      href={href} 
      target="_blank" 
      rel="noopener noreferrer" 
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        color: 'white',
        textDecoration: 'none',
        padding: '10px 20px',
        margin: '5px 15px',
        borderRadius: '8px',
        backgroundColor: 'rgba(255,255,255,0.1)',
        fontWeight: 'bold',
        cursor: 'pointer',
      }}
    >
      {children}
    </a>
  );
}

function PraiseMigglesButton({ onClick }) {
  const buttonRef = useRef();

  const handleMouseEnter = () => {
    gsap.to(buttonRef.current, {
      backgroundColor: '#ffd700',
      scale: 1.1,
      boxShadow: '0 0 20px rgba(255,215,0,0.7)',
      duration: 0.3
    });
  };

  const handleMouseLeave = () => {
    gsap.to(buttonRef.current, {
      backgroundColor: '#ffaa00',
      scale: 1,
      boxShadow: '0 0 10px rgba(255,170,0,0.5)',
      duration: 0.3
    });
  };

  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        color: '#000',
        background: '#ffaa00',
        border: 'none',
        padding: '10px 20px',
        margin: '5px 15px',
        borderRadius: '8px',
        fontWeight: 'bold',
        cursor: 'pointer',
        fontSize: '16px',
        textTransform: 'uppercase',
        letterSpacing: '1px',
        boxShadow: '0 0 10px rgba(255,170,0,0.5)',
        transition: 'all 0.3s ease'
      }}
    >
      Praise Miggles!
    </button>
  );
}

function Footer() {
  return (
    <div style={{
      position: 'absolute',
      bottom: '0',
      left: '0',
      right: '0',
      height: '80px',
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
            style={{ height: '80px', marginRight: '10px' }} 
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

function InfoCard({ isOpen, onClose, onToggle }) {
  const [activeTab, setActiveTab] = useState('about');
  const cardRef = useRef();

  useEffect(() => {
    gsap.to(cardRef.current, {
      y: isOpen ? '0%' : '-100%',
      opacity: isOpen ? 1 : 0,
      duration: 0.5,
      ease: 'power2.inOut'
    });
  }, [isOpen]);

  const memes = [
    '/meme1.jpg',
    '/meme2.jpg',
    '/meme3.jpg',
    // Add more meme image paths as needed
  ];

  const buttonStyle = {
    padding: '10px 20px',
    margin: '0 10px 10px 0',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#ffaa00',
    color: 'black',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  };

  const activeButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#ffd700',
    boxShadow: '0 0 10px rgba(255,215,0,0.7)',
  };

  return (
    <div ref={cardRef} style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      color: 'white',
      padding: '20px',
      zIndex: 1000,
      opacity: 0,
      transform: 'translateY(-100%)',
      maxHeight: '80vh',
      overflowY: 'auto',
    }}>
      <button onClick={onClose} style={{ 
        float: 'right',
        backgroundColor: 'transparent',
        border: 'none',
        color: 'white',
        fontSize: '24px',
        cursor: 'pointer'
      }}>×</button>
      <h2>3D Miggles Info</h2>
      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={() => setActiveTab('about')} 
          style={activeTab === 'about' ? activeButtonStyle : buttonStyle}
        >
          About
        </button>
        <button 
          onClick={() => setActiveTab('roadmap')} 
          style={activeTab === 'roadmap' ? activeButtonStyle : buttonStyle}
        >
          Roadmap
        </button>
        <button 
          onClick={() => setActiveTab('memes')} 
          style={activeTab === 'memes' ? activeButtonStyle : buttonStyle}
        >
          Memes
        </button>
      </div>
      {activeTab === 'about' && (
        <div>
          <h3>About 3D Miggles</h3>
          <p>3D Miggles is a revolutionary crypto project that combines cute cats, pyramids, and memes!</p>
        </div>
      )}
      {activeTab === 'roadmap' && (
        <div>
          <h3>Roadmap</h3>
          <ul>
            <li>Q1 2024: Launch 3D Miggles token</li>
            <li>Q2 2024: Develop 3D Miggles NFT collection</li>
            <li>Q3 2024: Create 3D Miggles metaverse</li>
            <li>Q4 2024: To the moon! 🚀</li>
          </ul>
        </div>
      )}
      {activeTab === 'memes' && (
        <div>
          <h3>Meme Gallery</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            {memes.map((meme, index) => (
              <img key={index} src={meme} alt={`Meme ${index + 1}`} style={{ width: '200px', margin: '10px', maxWidth: '100%' }} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function Scene() {
  const [isInfoCardOpen, setIsInfoCardOpen] = useState(false);

  const toggleInfoCard = () => {
    setIsInfoCardOpen(!isInfoCardOpen);
  };

  return (
    <div className="scene-container" style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <Canvas style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
        <PerspectiveCamera makeDefault position={[0, 100, 600]} fov={50} />
        <CameraController isInfoCardOpen={isInfoCardOpen} />
        <OrbitControls enabled={!isInfoCardOpen} />
        <Suspense fallback={null}>
          <Pyramid />
          <Cat />
          <AnimatedText3D />
        </Suspense>
        <ambientLight intensity={2} />
        <spotLight position={[100, 100, 100]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <pointLight position={[-100, -100, -100]} intensity={0.5} />
      </Canvas>
      <Navbar onInfoClick={toggleInfoCard} />
      <Footer />
      <InfoCard isOpen={isInfoCardOpen} onClose={() => setIsInfoCardOpen(false)} onToggle={toggleInfoCard} />
    </div>
  );
}