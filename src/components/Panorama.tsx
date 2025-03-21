import { Canvas } from "@react-three/fiber";
import { BackSide, Vector3 } from "three";
import { useState } from "react";
import { OrbitControls, useTexture } from "@react-three/drei";
import Hotspot from "./Hotspot";

const PanoramaView = ({ textures }: { textures: string[] }) => {
  const [currentTextureIndex, setCurrentTextureIndex] = useState(0);

  const texture = useTexture(textures[currentTextureIndex]);

  const changeTexture = (index: number) => {
    setCurrentTextureIndex(index);
  };

  return (
    <>
      <mesh>
        <sphereGeometry args={[500, 60, 60]} />
        <meshBasicMaterial map={texture} side={BackSide} />
      </mesh>

      <Hotspot position={[100, 0, 400]} onClick={() => changeTexture(1)} />
      <Hotspot position={[-300, 50, -200]} onClick={() => changeTexture(2)} />
      <Hotspot position={[100, -100, 60]} onClick={() => changeTexture(0)} />
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
    <div className="relative" style={{ width: "100vw", height: "100vh" }}>
      <span className="absolute z-10 top-5 left-5 text-3xl font-semibold">
        Demo
      </span>
      <Canvas camera={{ position: new Vector3(0, 0, 0.1) }}>
        <pointLight position={[10, 10, 10]} />
        <PanoramaView textures={textures} />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          zoomToCursor={true}
          rotateSpeed={-0.5}
        />
      </Canvas>
    </div>
  );
};

export default Panorama;
