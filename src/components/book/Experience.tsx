import { Environment, Float, OrbitControls } from "@react-three/drei";
import { Book } from "@/components/book/Book";

export const BookExperience = () => {
  return (
    <>
      <Float
        rotation-x={-Math.PI / 4}
        floatIntensity={1}
        speed={2}
        rotationIntensity={2}
      >
        <Book />
      </Float>
      <OrbitControls enablePan={false} minDistance={3} maxDistance={8} />
      <Environment preset="apartment" environmentIntensity={0.35} />
      <ambientLight intensity={0.25} />
      <hemisphereLight args={["#fff8ee", "#d8d0c4", 0.55]} />
      <directionalLight
        position={[1, 4, 3]}
        intensity={1.1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.0001}
      />
      <mesh position-y={-1.5} rotation-x={-Math.PI / 2} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <shadowMaterial transparent opacity={0.1} />
      </mesh>
    </>
  );
};
