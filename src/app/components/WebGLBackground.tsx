import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

function BlobSphere({ position, color }: { position: [number, number, number]; color: string }) {
  const meshRef = useRef<any>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime();
      meshRef.current.rotation.y = time * 0.1;
      meshRef.current.rotation.x = Math.sin(time * 0.15) * 0.2;

      // Animate scale for pulsing effect
      const scale = 1 + Math.sin(time * 0.5) * 0.1;
      meshRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[1.5, 32, 32]} />
      <meshStandardMaterial
        color={color}
        transparent={true}
        opacity={0.8}
        roughness={0.4}
        metalness={0.1}
      />
    </mesh>
  );
}

export default function WebGLBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{ background: '#FAFBFC' }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 10]} intensity={1} />
        <directionalLight position={[-10, -10, -10]} intensity={0.3} />

        <BlobSphere position={[-2, 1, 0]} color="#FFE5F1" />
        <BlobSphere position={[2, -1, -1]} color="#E5F4FF" />
        <BlobSphere position={[0, 0, -2]} color="#FFF4E5" />
      </Canvas>
    </div>
  );
}
