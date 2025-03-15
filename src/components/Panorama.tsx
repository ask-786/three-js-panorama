import { Canvas, useLoader, useThree } from "@react-three/fiber";
import { PerspectiveCamera, TextureLoader, Vector3 } from "three";
import { useEffect, useState } from "react";
import { OrbitControls } from "@react-three/drei";
import Hotspot from "./Hotspot";

const PanoramaView = ({ textures }: { textures: string[] }) => {
  const [currentTextureIndex, setCurrentTextureIndex] = useState(0);
  const { camera } = useThree();

  const texture = useLoader(TextureLoader, textures[currentTextureIndex]);

  useEffect(() => {
    const abortController = new AbortController();

    let touchStartDistance = 0;

    const getTouchDistance = (touches: TouchList) => {
      if (touches.length < 2) return 0;
      const dx = touches[0].clientX - touches[1].clientX;
      const dy = touches[0].clientY - touches[1].clientY;
      return Math.sqrt(dx * dx + dy * dy);
    };

    window.addEventListener(
      "wheel",
      (event) => {
        if (!(camera instanceof PerspectiveCamera)) return;

        camera.fov = Math.max(
          30,
          Math.min(90, camera.fov + event.deltaY * 0.05),
        );

        camera.updateProjectionMatrix();
      },
      { signal: abortController.signal },
    );

    window.addEventListener(
      "touchstart",
      (event) => {
        if (event.touches.length < 2) return;
        touchStartDistance = getTouchDistance(event.touches);
      },
      { signal: abortController.signal },
    );

    window.addEventListener(
      "touchmove",
      (event) => {
        if (event.touches.length < 2 || !(camera instanceof PerspectiveCamera))
          return;

        const newDistance = getTouchDistance(event.touches);
        const zoomFactor = (touchStartDistance - newDistance) * 0.05;
        camera.fov = Math.max(30, Math.min(90, camera.fov + zoomFactor));
        camera.updateProjectionMatrix();
        touchStartDistance = newDistance;
      },
      { signal: abortController.signal },
    );

    return () => abortController.abort();
  }, [camera]);

  const changeTexture = (index: number) => {
    setCurrentTextureIndex(index);
  };

  return (
    <>
      <mesh>
        <sphereGeometry args={[500, 60, 40]} />
        <meshBasicMaterial map={texture} side={2} />
      </mesh>

      <Hotspot position={[100, 0, 400]} onClick={() => changeTexture(1)} />
      <Hotspot position={[-300, 50, -200]} onClick={() => changeTexture(2)} />
      <Hotspot position={[100, -100, 60]} onClick={() => changeTexture(0)} />

      <OrbitControls enableZoom={true} enablePan={true} rotateSpeed={-0.5} />
    </>
  );
};

const Panorama = () => {
  const textures = [
    "/textures/panorama1.jpg",
    "/textures/panorama2.jpg",
    "/textures/panorama3.jpg",
  ];

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas camera={{ position: new Vector3(0, 0, 0.1) }}>
        <pointLight position={[10, 10, 10]} />
        <PanoramaView textures={textures} />
      </Canvas>
    </div>
  );
};

export default Panorama;
