import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { HeroBookExperience } from "@/components/book/HeroBookExperience";

const HeroBookScene = () => (
  <Canvas
    shadows
    dpr={[1, 1.5]}
    gl={{ alpha: true, antialias: true, toneMappingExposure: 0.88 }}
    camera={{
      position: [0, 0.08, 4.2],
      fov: 36,
    }}
  >
    <Suspense fallback={null}>
      <HeroBookExperience />
    </Suspense>
  </Canvas>
);

export default HeroBookScene;
