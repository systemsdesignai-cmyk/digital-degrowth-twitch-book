import { ALL_PAGE_URLS, BOOK_COVER_SIDE, bookPages } from "@/components/book/bookPages";
import { pageAtom } from "@/components/book/bookState";
import { PageTextureLoader } from "@/components/book/pageTextureLoader";
import { useCursor, useTexture } from "@react-three/drei";
import { useFrame, useLoader } from "@react-three/fiber";
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
  MeshBasicMaterial,
  MeshStandardMaterial,
  Skeleton,
  SkinnedMesh,
  SRGBColorSpace,
  Texture,
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
const BOOK_SPINE_THICKNESS = PAGE_WIDTH * 0.055;
const PAGE_DEPTH = BOOK_SPINE_THICKNESS / bookPages.length;
const STACK_DEPTH = (bookPages.length - 1) * PAGE_DEPTH + PAGE_DEPTH;
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
const spineEdgeColor = new Color("#090d0a");

const createPageEdgeMaterials = (isCoverPage: boolean) => [
  new MeshStandardMaterial({ color: pageEdgeColor, roughness: 0.35 }),
  new MeshStandardMaterial({
    color: spineEdgeColor,
    transparent: isCoverPage,
    opacity: isCoverPage ? 0 : 1,
    depthWrite: !isCoverPage,
    roughness: 0.35,
  }),
  new MeshStandardMaterial({ color: "#ebe6dc", roughness: 0.35 }),
  new MeshStandardMaterial({ color: "#ebe6dc", roughness: 0.35 }),
];

useTexture.preload("/textures/book-cover-roughness.webp");
useTexture.preload(BOOK_COVER_SIDE);
useLoader.preload(PageTextureLoader, ALL_PAGE_URLS);

interface PageProps {
  number: number;
  frontTexture: Texture;
  backTexture: Texture;
  page: number;
  opened: boolean;
  bookClosed: boolean;
}

const Page = ({
  number,
  frontTexture,
  backTexture,
  page,
  opened,
  bookClosed,
  ...props
}: PageProps) => {
  const picture = frontTexture;
  const picture2 = backTexture;
  const [pictureRoughness] = useTexture(["/textures/book-cover-roughness.webp"]);

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
      ...createPageEdgeMaterials(number === 0 || number === bookPages.length - 1),
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
  }, [backTexture, frontTexture, number, pictureRoughness]);

  useEffect(() => {
    const mesh = skinnedMeshRef.current;
    if (!mesh) return;

    const materials = mesh.material as MeshStandardMaterial[];
    materials[4].map = frontTexture;
    materials[4].needsUpdate = true;
    materials[5].map = backTexture;
    materials[5].needsUpdate = true;
  }, [backTexture, frontTexture]);

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

  const spineMaterials = useMemo(() => {
    const map = sideTexture.clone();
    map.colorSpace = SRGBColorSpace;
    map.anisotropy = 8;
    map.wrapS = ClampToEdgeWrapping;
    map.wrapT = ClampToEdgeWrapping;

    return [
      new MeshStandardMaterial({ color: spineEdgeColor, roughness: 0.45 }),
      new MeshBasicMaterial({ map, toneMapped: true }),
      new MeshStandardMaterial({ color: spineEdgeColor, roughness: 0.45 }),
      new MeshStandardMaterial({ color: spineEdgeColor, roughness: 0.45 }),
      new MeshStandardMaterial({ color: spineEdgeColor, roughness: 0.45 }),
      new MeshStandardMaterial({ color: spineEdgeColor, roughness: 0.45 }),
    ];
  }, [sideTexture]);

  return (
    <mesh
      position={[-BOOK_SPINE_THICKNESS / 2, 0, stackCenterZ]}
      castShadow
      receiveShadow
      renderOrder={10}
      material={spineMaterials}
    >
      <boxGeometry args={[BOOK_SPINE_THICKNESS, PAGE_HEIGHT, STACK_DEPTH]} />
    </mesh>
  );
};

export const Book = (props: JSX.IntrinsicElements["group"]) => {
  const [page] = useAtom(pageAtom);
  const [delayedPage, setDelayedPage] = useState(page);
  const loadedTextures = useLoader(PageTextureLoader, ALL_PAGE_URLS);

  const textureByUrl = useMemo(() => {
    const map = new Map<string, Texture>();
    ALL_PAGE_URLS.forEach((url, index) => {
      map.set(url, loadedTextures[index]);
    });
    return map;
  }, [loadedTextures]);

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
      {bookPages.map((pageData, index) => (
        <Page
          key={index}
          page={delayedPage}
          number={index}
          opened={delayedPage > index}
          bookClosed={delayedPage === 0 || delayedPage === bookPages.length}
          frontTexture={textureByUrl.get(pageData.front)!}
          backTexture={textureByUrl.get(pageData.back)!}
        />
      ))}
      <BookSpine activePage={delayedPage} />
    </group>
  );
};
