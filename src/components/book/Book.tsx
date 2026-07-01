import {
  ALL_PAGE_URLS,
  BOOK_COVER_SIDE,
  COVER_BOOK_URLS,
  bookPages,
  getStaticBookPageTextures,
} from "@/components/book/bookPages";
import type { BookPageTextures } from "@/components/book/bookPages";
import { pageAtom } from "@/components/book/bookState";
import { PageTextureLoader } from "@/components/book/pageTextureLoader";
import { useCursor, useTexture } from "@react-three/drei";
import { useFrame, useLoader } from "@react-three/fiber";
import type { ThreeElements } from "@react-three/fiber";
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

const pageEdgeColor = new Color("#f3efe6");
const spineEdgeColor = new Color("#090d0a");

const createPageFaceMaterial = (texture: Texture) => {
  texture.anisotropy = 8;
  return new MeshBasicMaterial({
    map: texture,
    toneMapped: false,
  });
};

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

useTexture.preload(BOOK_COVER_SIDE);
useLoader.preload(PageTextureLoader, ALL_PAGE_URLS);

interface PageProps {
  number: number;
  frontTexture: Texture;
  backTexture: Texture;
  page: number;
  opened: boolean;
  bookClosed: boolean;
  interactive: boolean;
}

const Page = ({
  number,
  frontTexture,
  backTexture,
  page,
  opened,
  bookClosed,
  interactive,
  ...props
}: PageProps) => {
  const picture = frontTexture;
  const picture2 = backTexture;

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
      createPageFaceMaterial(picture),
      createPageFaceMaterial(picture2),
    ];
    const mesh = new SkinnedMesh(pageGeometry, materials);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh.frustumCulled = false;
    mesh.add(skeleton.bones[0]);
    mesh.bind(skeleton);
    return mesh;
  }, [backTexture, frontTexture, number]);

  useEffect(() => {
    const mesh = skinnedMeshRef.current;
    if (!mesh) return;

    const materials = mesh.material as MeshBasicMaterial[];
    frontTexture.anisotropy = 8;
    backTexture.anisotropy = 8;
    materials[4].map = frontTexture;
    materials[4].needsUpdate = true;
    materials[5].map = backTexture;
    materials[5].needsUpdate = true;
  }, [backTexture, frontTexture]);

  useFrame((_, delta) => {
    if (!skinnedMeshRef.current || !group.current) {
      return;
    }

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
  useCursor(interactive && highlighted);

  return (
    <group
      {...props}
      ref={group}
      raycast={interactive ? undefined : () => null}
      onPointerEnter={
        interactive
          ? (event) => {
              event.stopPropagation();
              setHighlighted(true);
            }
          : undefined
      }
      onPointerLeave={
        interactive
          ? (event) => {
              event.stopPropagation();
              setHighlighted(false);
            }
          : undefined
      }
      onClick={
        interactive
          ? (event) => {
              event.stopPropagation();
              setPage(opened ? number : number + 1);
              setHighlighted(false);
            }
          : undefined
      }
    >
      <primitive
        object={manualSkinnedMesh}
        ref={skinnedMeshRef}
        position-z={-number * PAGE_DEPTH + page * PAGE_DEPTH}
        raycast={interactive ? undefined : () => null}
      />
    </group>
  );
};

const BookSpine = ({
  activePage,
  interactive = true,
}: {
  activePage: number;
  interactive?: boolean;
}) => {
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
      raycast={interactive ? undefined : () => null}
    >
      <boxGeometry args={[BOOK_SPINE_THICKNESS, PAGE_HEIGHT, STACK_DEPTH]} />
    </mesh>
  );
};

export type BookProps = ThreeElements["group"] & {
  interactive?: boolean;
  fixedPage?: number;
  textureUrls?: string[];
  pageTextureData?: BookPageTextures[];
};

export const Book = ({
  interactive = true,
  fixedPage = 0,
  textureUrls = ALL_PAGE_URLS,
  pageTextureData = bookPages,
  ...props
}: BookProps) => {
  const [pageFromAtom] = useAtom(pageAtom);
  const page = interactive ? pageFromAtom : fixedPage;
  const [delayedPage, setDelayedPage] = useState(page);
  const loadedTextures = useLoader(PageTextureLoader, textureUrls);

  const textureByUrl = useMemo(() => {
    const map = new Map<string, Texture>();
    textureUrls.forEach((url, index) => {
      map.set(url, loadedTextures[index]);
    });
    return map;
  }, [loadedTextures, textureUrls]);

  useEffect(() => {
    if (!interactive) {
      setDelayedPage(fixedPage);
      return;
    }

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
  }, [fixedPage, interactive, page]);

  const activePage = interactive ? delayedPage : fixedPage;

  return (
    <group {...props} rotation-y={-Math.PI / 2}>
      {pageTextureData.map((pageData, index) => (
        <Page
          key={index}
          page={activePage}
          number={index}
          opened={activePage > index}
          bookClosed={activePage === 0 || activePage === bookPages.length}
          interactive={interactive}
          frontTexture={textureByUrl.get(pageData.front)!}
          backTexture={textureByUrl.get(pageData.back)!}
        />
      ))}
      <BookSpine activePage={activePage} interactive={interactive} />
    </group>
  );
};

export const StaticBook = (
  props: Omit<BookProps, "interactive" | "fixedPage">
) => (
  <Book
    {...props}
    interactive={false}
    fixedPage={0}
    textureUrls={props.textureUrls ?? COVER_BOOK_URLS}
    pageTextureData={props.pageTextureData ?? getStaticBookPageTextures()}
  />
);
