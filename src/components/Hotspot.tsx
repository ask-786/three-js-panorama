import { useEffect, useState } from "react";

export const HotspotState = {
  ENTERED: "ENTERED",
  LEFT: "LEFT",
};

export type HotspotState = (typeof HotspotState)[keyof typeof HotspotState];

type Props = { position: [number, number, number]; onClick: () => void };

const Hotspot = ({ position, onClick }: Props) => {
  const [state, setState] = useState<HotspotState>(HotspotState.LEFT);

  useEffect(() => {
    document.body.style.cursor =
      state === HotspotState.ENTERED ? "pointer" : "auto";
  }, [state]);

  const onPointerEnter = () => {
    setState(HotspotState.ENTERED);
  };

  const onPointerLeave = () => {
    setState(HotspotState.LEFT);
  };

  return (
    <mesh
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      position={position}
      onClick={onClick}
    >
      <sphereGeometry
        args={[HotspotState.ENTERED === state ? 10 : 5, 16, 16]}
      />
      <meshBasicMaterial
        color={state === HotspotState.ENTERED ? "blue" : "red"}
      />
    </mesh>
  );
};

export default Hotspot;
