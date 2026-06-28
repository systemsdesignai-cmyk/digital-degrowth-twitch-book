import { BOOK_COVER_BACK, BOOK_COVER_FRONT, BOOK_COVER_SIDE, bookPages } from "@/components/book/bookPages";
import { pageAtom } from "@/components/book/bookState";
import { useCursor, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useAtom } from "jotai";
import { easing } from "maath";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Bone,
  BoxGeometry,
  ClampToEdgeWrapping,
  Color,
  Float32BufferAttribute,
  Group,
  MathUtils,
  MeshStandardMaterial,
  Skeleton,
  SkinnedMesh,
  SRGBColorSpace,
  Uint16BufferAttribute,
  Vector3,
} from "three";
import { degToRad } from "three/src/math/MathUtils.js";

const easingFactor = 0.5;
const easingFactorFold = 0.3;
const insideCurveStrength = 0.18;
const outsideCurveStrength = 0.05;
const turningCurveStrength = 0.09;

const PAGE_WIDTH = 1.28;
const PAGE_HEIGHT = 1.71;
const SIDE_TEXTURE_WIDTH = 843;
const SIDE_TEXTURE_HEIGHT = 1866;
const SIDE_TEXTURE_ASPECT = SIDE_TEXTURE_WIDTH / SIDE_TEXTURE_HEIGHT;
const SPINE_ART_WIDTH = PAGE_HEIGHT * SIDE_TEXTURE_ASPECT;
const BOOK_SPINE_THICKNESS = PAGE_WIDTH * 0.1;
const PAGE_DEPTH = BOOK_SPINE_THICKNESS / bookPages.length;
const PAGE_SEGMENTS = 30;
const SEGMENT_WIDTH = PAGE_WIDTH / PAGE_SEGMENTS;

const pageGeometry = new BoxGeometry(
  PAGE_WIDTH,
  PAGE_HEIGHT,
  PAGE_DEPTH,
  PAGE_SEGMENTS,
  2
);

pageGeometry.translate(PAGE_WIDTH / 2, 0, 0);

const position = pageGeometry.attributes.position;
const vertex = new Vector3();
const skinIndexes: number[] = [];
const skinWeights: number[] = [];

for (let index = 0; index < position.count; index++) {
  vertex.fromBufferAttribute(position, index);
  const x = vertex.x;
  const skinIndex = Math.max(0, Math.floor(x / SEGMENT_WIDTH));
  const skinWeight = (x % SEGMENT_WIDTH) / SEGMENT_WIDTH;

  skinIndexes.push(skinIndex, skinIndex + 1, 0, 0);
  skinWeights.push(1 - skinWeight, skinWeight, 0, 0);
}

pageGeometry.setAttribute(
  "skinIndex",
  new Uint16BufferAttribute(skinIndexes, 4)
);
pageGeometry.setAttribute(
  "skinWeight",
  new Float32BufferAttribute(skinWeights, 4)
);

const whiteColor = new Color("white");
const emissiveColor = new Color("#8a6a43");
const pageEdgeColor = new Color("#f3efe6");

const pageEdgeMaterials = [
  new MeshStandardMaterial({ color: pageEdgeColor, roughness: 0.35 }),
  new MeshStandardMaterial({ color: pageEdgeColor, roughness: 0.35 }),
  new MeshStandardMaterial({ color: "#ebe6dc", roughness: 0.35 }),
  new MeshStandardMaterial({ color: "#ebe6dc", roughness: 0.35 }),
];

useTexture.preload("/textures/book-cover-roughness.webp");
useTexture.preload(BOOK_COVER_FRONT);
useTexture.preload(BOOK_COVER_BACK);
useTexture.preload(BOOK_COVER_SIDE);

interface PageProps {
  number: number;
  front: string;
  back: string;
  page: number;
  opened: boolean;
  bookClosed: boolean;
}

const Page = ({
  number,
  front,
  back,
  page,
  opened,
  bookClosed,
  ...props
}: PageProps) => {
  const [picture, picture2, pictureRoughness] = useTexture([
    front,
    back,
    ...(number === 0 || number === bookPages.length - 1
      ? ["/textures/book-cover-roughness.webp"]
      : []),
  ]);
  picture.colorSpace = picture2.colorSpace = SRGBColorSpace;

  const group = useRef<Group>(null);
  const turnedAt = useRef(0);
  const lastOpened = useRef(opened);
  const skinnedMeshRef = useRef<SkinnedMesh>(null);

  const manualSkinnedMesh = useMemo(() => {
    const bones: Bone[] = [];
    for (let index = 0; index <= PAGE_SEGMENTS; index++) {
      const bone = new Bone();
      bones.push(bone);
      if (index === 0) {
        bone.position.x = 0;
      } else {
        bone.position.x = SEGMENT_WIDTH;
      }
      if (index > 0) {
        bones[index - 1].add(bone);
      }
    }
    const skeleton = new Skeleton(bones);

    const materials = [
      ...pageEdgeMaterials,
      new MeshStandardMaterial({
        color: whiteColor,
        map: picture,
        ...(number === 0
          ? { roughnessMap: pictureRoughness }
          : { roughness: 0.1 }),
        emissive: emissiveColor,
        emissiveIntensity: 0,
      }),
      new MeshStandardMaterial({
        color: whiteColor,
        map: picture2,
        ...(number === bookPages.length - 1
          ? { roughnessMap: pictureRoughness }
          : { roughness: 0.1 }),
        emissive: emissiveColor,
        emissiveIntensity: 0,
      }),
    ];
    const mesh = new SkinnedMesh(pageGeometry, materials);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh.frustumCulled = false;
    mesh.add(skeleton.bones[0]);
    mesh.bind(skeleton);
    return mesh;
  }, []);

  useFrame((_, delta) => {
    if (!skinnedMeshRef.current || !group.current) {
      return;
    }

    const emissiveIntensity = highlighted ? 0.22 : 0;
    skinnedMeshRef.current.material[4].emissiveIntensity =
      skinnedMeshRef.current.material[5].emissiveIntensity = MathUtils.lerp(
        skinnedMeshRef.current.material[4].emissiveIntensity,
        emissiveIntensity,
        0.1
      );

    if (lastOpened.current !== opened) {
      turnedAt.current = +new Date();
      lastOpened.current = opened;
    }
    let turningTime = Math.min(400, new Date().getTime() - turnedAt.current) / 400;
    turningTime = Math.sin(turningTime * Math.PI);

    let targetRotation = opened ? -Math.PI / 2 : Math.PI / 2;
    if (!bookClosed) {
      targetRotation += degToRad(number * 0.8);
    }

    const bones = skinnedMeshRef.current.skeleton.bones;
    for (let index = 0; index < bones.length; index++) {
      const target = index === 0 ? group.current : bones[index];

      const insideCurveIntensity = index < 8 ? Math.sin(index * 0.2 + 0.25) : 0;
      const outsideCurveIntensity = index >= 8 ? Math.cos(index * 0.3 + 0.09) : 0;
      const turningIntensity =
        Math.sin(index * Math.PI * (1 / bones.length)) * turningTime;
      let rotationAngle =
        insideCurveStrength * insideCurveIntensity * targetRotation -
        outsideCurveStrength * outsideCurveIntensity * targetRotation +
        turningCurveStrength * turningIntensity * targetRotation;
      let foldRotationAngle = degToRad(Math.sign(targetRotation) * 2);
      if (bookClosed) {
        if (index === 0) {
          rotationAngle = targetRotation;
          foldRotationAngle = 0;
        } else {
          rotationAngle = 0;
          foldRotationAngle = 0;
        }
      }
      easing.dampAngle(
        target.rotation,
        "y",
        rotationAngle,
        easingFactor,
        delta
      );

      const foldIntensity =
        index > 8
          ? Math.sin(index * Math.PI * (1 / bones.length) - 0.5) * turningTime
          : 0;
      easing.dampAngle(
        target.rotation,
        "x",
        foldRotationAngle * foldIntensity,
        easingFactorFold,
        delta
      );
    }
  });

  const [, setPage] = useAtom(pageAtom);
  const [highlighted, setHighlighted] = useState(false);
  useCursor(highlighted);

  return (
    <group
      {...props}
      ref={group}
      onPointerEnter={(event) => {
        event.stopPropagation();
        setHighlighted(true);
      }}
      onPointerLeave={(event) => {
        event.stopPropagation();
        setHighlighted(false);
      }}
      onClick={(event) => {
        event.stopPropagation();
        setPage(opened ? number : number + 1);
        setHighlighted(false);
      }}
    >
      <primitive
        object={manualSkinnedMesh}
        ref={skinnedMeshRef}
        position-z={-number * PAGE_DEPTH + page * PAGE_DEPTH}
      />
    </group>
  );
};

const BookSpine = ({ activePage }: { activePage: number }) => {
  const sideTexture = useTexture(BOOK_COVER_SIDE);

  const stackCenterZ =
    -((bookPages.length - 1) * PAGE_DEPTH) / 2 + (activePage * PAGE_DEPTH) / 2;

  const spineMaterial = useMemo(() => {
    const map = sideTexture.clone();
    map.colorSpace = SRGBColorSpace;
    map.anisotropy = 8;
    map.wrapS = ClampToEdgeWrapping;
    map.wrapT = ClampToEdgeWrapping;

    const cropFraction = Math.min(1, BOOK_SPINE_THICKNESS / SPINE_ART_WIDTH);
    map.repeat.set(cropFraction, 1);
    map.offset.set((1 - cropFraction) / 2, 0);

    return new MeshStandardMaterial({
      map,
      roughness: 0.35,
      polygonOffset: true,
      polygonOffsetFactor: -1,
    });
  }, [sideTexture]);

  return (
    <mesh
      position={[0, 0, stackCenterZ]}
      rotation={[0, Math.PI / 2, 0]}
      castShadow
      receiveShadow
      renderOrder={1}
      material={spineMaterial}
    >
      <planeGeometry args={[BOOK_SPINE_THICKNESS, PAGE_HEIGHT]} />
    </mesh>
  );
};

export const Book = (props: JSX.IntrinsicElements["group"]) => {
  const [page] = useAtom(pageAtom);
  const [delayedPage, setDelayedPage] = useState(page);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const goToPage = () => {
      setDelayedPage((currentDelayedPage) => {
        if (page === currentDelayedPage) {
          return currentDelayedPage;
        }

        timeout = setTimeout(
          () => {
            goToPage();
          },
          Math.abs(page - currentDelayedPage) > 2 ? 50 : 150
        );

        if (page > currentDelayedPage) {
          return currentDelayedPage + 1;
        }
        if (page < currentDelayedPage) {
          return currentDelayedPage - 1;
        }

        return currentDelayedPage;
      });
    };
    goToPage();
    return () => {
      clearTimeout(timeout);
    };
  }, [page]);

  return (
    <group {...props} rotation-y={-Math.PI / 2}>
      <BookSpine activePage={delayedPage} />
      {bookPages.map((pageData, index) => (
        <Page
          key={index}
          page={delayedPage}
          number={index}
          opened={delayedPage > index}
          bookClosed={delayedPage === 0 || delayedPage === bookPages.length}
          {...pageData}
        />
      ))}
    </group>
  );
};
