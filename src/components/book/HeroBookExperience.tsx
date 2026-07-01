import { Environment, Float } from "@react-three/drei";
import { useLoader, useThree } from "@react-three/fiber";
import { StaticBook } from "@/components/book/Book";
import { HeroBookPointerRotation } from "@/components/book/HeroBookPointerRotation";
import { COVER_BOOK_URLS } from "@/components/book/bookPages";
import { PageTextureLoader } from "@/components/book/pageTextureLoader";
import { useEffect, useState } from "react";
import { Vector3 } from "three";

useLoader.preload(PageTextureLoader, COVER_BOOK_URLS);

const HERO_BOOK_SCALE = 1.12;
const HERO_BOOK_OFFSET = new Vector3(0, -0.42, 0);
const HERO_LOOK_AT = new Vector3(0, -0.12, 0);

const HeroCameraSetup = () => {
  const { camera, size } = useThree();

  useEffect(() => {
    const aspect = size.width / Math.max(size.height, 1);
    const distance = aspect < 0.85 ? 4.35 : 3.95;

    camera.position.set(0, 0.08, distance);
    camera.lookAt(HERO_LOOK_AT);
    if ("fov" in camera) {
      camera.fov = 36;
      camera.updateProjectionMatrix();
    }
  }, [camera, size.height, size.width]);

  return null;
};

export const HeroBookExperience = () => {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReduceMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);
    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  const book = (
    <HeroBookPointerRotation enabled={!reduceMotion}>
      <StaticBook scale={HERO_BOOK_SCALE} />
    </HeroBookPointerRotation>
  );

  return (
    <>
      <HeroCameraSetup />
      <group position={HERO_BOOK_OFFSET}>
        {reduceMotion ? (
          book
        ) : (
          <Float
            rotation-x={-0.52}
            floatIntensity={0.45}
            speed={1.8}
            rotationIntensity={0.6}
          >
            {book}
          </Float>
        )}
      </group>
      <Environment preset="apartment" environmentIntensity={0.2} />
      <ambientLight intensity={0.15} />
      <hemisphereLight args={["#fff8ee", "#d8d0c4", 0.35]} />
      <directionalLight
        position={[1, 4, 3]}
        intensity={0.75}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-bias={-0.0001}
      />
    </>
  );
};
