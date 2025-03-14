const Hotspot = ({
  position,
  onClick,
}: {
  position: [number, number, number];
  onClick: () => void;
}) => (
  <mesh position={position} onClick={onClick}>
    <sphereGeometry args={[5, 16, 16]} />
    <meshBasicMaterial color="red" />
  </mesh>
);

export default Hotspot;
