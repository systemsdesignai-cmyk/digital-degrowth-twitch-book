import { useFrame, useThree } from "@react-three/fiber";
import { easing } from "maath";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Group } from "three";

const MAX_TILT_Y = 0.14;
const MAX_TILT_X = 0.07;
const DAMPING = 0.12;

interface HeroBookPointerRotationProps {
  children: ReactNode;
  enabled?: boolean;
}

export const HeroBookPointerRotation = ({
  children,
  enabled = true,
}: HeroBookPointerRotationProps) => {
  const groupRef = useRef<Group>(null);
  const targetRotation = useRef({ x: 0, y: 0 });
  const [isPointerOver, setIsPointerOver] = useState(false);
  const gl = useThree((state) => state.gl);

  useEffect(() => {
    const canvas = gl.domElement;
    const handlePointerLeave = () => {
      setIsPointerOver(false);
      targetRotation.current.x = 0;
      targetRotation.current.y = 0;
    };

    canvas.addEventListener("pointerleave", handlePointerLeave);
    return () => canvas.removeEventListener("pointerleave", handlePointerLeave);
  }, [gl]);

  useEffect(() => {
    if (!enabled && groupRef.current) {
      targetRotation.current = { x: 0, y: 0 };
      groupRef.current.rotation.x = 0;
      groupRef.current.rotation.y = 0;
    }
  }, [enabled]);

  useFrame((_, delta) => {
    const group = groupRef.current;
    if (!group || !enabled) return;

    if (!isPointerOver) {
      targetRotation.current.x = 0;
      targetRotation.current.y = 0;
    }

    easing.damp(group.rotation, "x", targetRotation.current.x, DAMPING, delta);
    easing.damp(group.rotation, "y", targetRotation.current.y, DAMPING, delta);
  });

  const handlePointerMove = (event: {
    pointer: { x: number; y: number };
    stopPropagation: () => void;
  }) => {
    if (!enabled) return;
    event.stopPropagation();
    setIsPointerOver(true);
    targetRotation.current.y = event.pointer.x * MAX_TILT_Y;
    targetRotation.current.x = -event.pointer.y * MAX_TILT_X;
  };

  return (
    <group ref={groupRef}>
      <mesh
        position={[0.64, 0, 0]}
        onPointerMove={handlePointerMove}
        renderOrder={-1}
      >
        <planeGeometry args={[6, 6]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
      {children}
    </group>
  );
};
