import { Canvas, useLoader, useThree } from "@react-three/fiber";
import { TextureLoader, Vector3 } from "three";
import { useState } from "react";

const Hotspot = ({
  position,
  onClick,
}: {
  position: [number, number, number];
  onClick: () => void;
}) => (
  <mesh position={position} onClick={onClick}>
    <sphereGeometry args={[5, 16, 16]} /> {/* Small sphere as the hotspot */}
    <meshBasicMaterial color="red" />
  </mesh>
);

const PanoramaView = ({ textures }: { textures: string[] }) => {
  const { camera } = useThree();
  const [currentTextureIndex, setCurrentTextureIndex] = useState(0);
  const texture = useLoader(TextureLoader, textures[currentTextureIndex]);

  const [isDragging, setIsDragging] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const rotationSpeed = 0.003;

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;

    const deltaX = e.clientX - mousePosition.x;
    const deltaY = e.clientY - mousePosition.y;

    const yaw = deltaX * rotationSpeed;
    const pitch = -deltaY * rotationSpeed;

    camera.rotation.order = "YXZ";
    camera.rotation.y += yaw;

    camera.rotation.x = Math.max(
      -Math.PI / 2,
      Math.min(Math.PI / 2, camera.rotation.x - pitch),
    );

    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  const changeTexture = (index: number) => {
    setCurrentTextureIndex(index);
  };

  return (
    <mesh
      onPointerDown={handleMouseDown}
      onPointerUp={handleMouseUp}
      onPointerMove={handleMouseMove}
    >
      <sphereGeometry args={[500, 60, 40]} />
      <meshBasicMaterial map={texture} side={2} />

      <Hotspot position={[100, 0, 400]} onClick={() => changeTexture(1)} />
      <Hotspot position={[-300, 50, -200]} onClick={() => changeTexture(2)} />
      <Hotspot position={[100, -100, 60]} onClick={() => changeTexture(0)} />
    </mesh>
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
