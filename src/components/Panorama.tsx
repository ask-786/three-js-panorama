import { Canvas, useLoader } from "@react-three/fiber";
import { TextureLoader, Vector3 } from "three";
import { useState } from "react";
import { OrbitControls } from "@react-three/drei";
import Hotspot from "./Hotspot";

const PanoramaView = ({ textures }: { textures: string[] }) => {
  const [currentTextureIndex, setCurrentTextureIndex] = useState(0);

  const texture = useLoader(TextureLoader, textures[currentTextureIndex]);

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

      <OrbitControls enableZoom={false} enablePan={false} rotateSpeed={-0.5} />
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
