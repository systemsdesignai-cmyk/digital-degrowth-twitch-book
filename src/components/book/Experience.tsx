import { Environment, Float, OrbitControls } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { Book } from "@/components/book/Book";
import { bookPages } from "@/components/book/bookPages";
import { pageAtom } from "@/components/book/bookState";
import { useAtom } from "jotai";
import { easing } from "maath";
import { useMemo, useRef } from "react";
import { Vector3 } from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";

const BookCameraRig = () => {
  const [page] = useAtom(pageAtom);
  const { camera, size } = useThree();
  const controlsRef = useRef<OrbitControlsImpl>(null);
  const isMobile = size.width <= 800;
  const isReading = page > 0 && page < bookPages.length;

  const defaultPosition = useMemo(
    () => new Vector3(-0.5, 1, isMobile ? 7 : 4),
    [isMobile]
  );
  const focusedPosition = useMemo(
    () => new Vector3(-0.28, 0.78, isMobile ? 4.3 : 2.5),
    [isMobile]
  );

  useFrame((_, delta) => {
    const target = isReading ? focusedPosition : defaultPosition;
    easing.damp3(camera.position, target, 0.12, delta);
    controlsRef.current?.update();
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enablePan={false}
      minDistance={isReading ? 2.2 : 3}
      maxDistance={isReading ? 5 : 8}
    />
  );
};

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
      <BookCameraRig />
      <Environment preset="apartment" environmentIntensity={0.2} />
      <ambientLight intensity={0.15} />
      <hemisphereLight args={["#fff8ee", "#d8d0c4", 0.35]} />
      <directionalLight
        position={[1, 4, 3]}
        intensity={0.75}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.0001}
      />
      <mesh position-y={-1.5} rotation-x={-Math.PI / 2} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <shadowMaterial transparent opacity={0.08} />
      </mesh>
    </>
  );
};
