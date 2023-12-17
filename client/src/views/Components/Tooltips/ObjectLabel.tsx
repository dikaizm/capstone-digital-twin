import "./tooltip.scss"

import { JSXElementConstructor, memo } from "react";
import { Html } from "@react-three/drei"
import { CircleIndicator } from "../Icons/IconCard";
import { useWindowState } from "@/context/WindowStateContext";

interface ObjectLabel2Props {
  keyId: string;
  label: string;
  position?: [number, number, number];
  size?: number;
  onHover?: (state: boolean) => void;
  clickable?: boolean;
}

interface ObjectLabelProps {
  icon: JSXElementConstructor<IconProps>;
  position?: [number, number, number];
  size?: number;
  onHover?: (state: boolean) => void;
  onClick?: {
    clickState: boolean;
    setClick: (state: boolean) => void;
    clickable: boolean;
  };
  showStatus?: boolean;
  children: string;
}

export default function ObjectLabel({ icon: Icon, position = [0, 100, 0], size = 100, onHover, onClick, children, showStatus = true }: ObjectLabelProps) {

  return (
    <Html
      distanceFactor={size}
      position={position}
      center
      zIndexRange={[20, 0]}
    >
      <div
        className={'container-tooltip label' + " " +
          (onClick?.clickable ? "clickable" : "") + " " +
          (!showStatus ? "disabled" : "enabled")}

        onPointerOver={() => onHover && onHover(true)}
        onPointerOut={() => onHover && onHover(false)}
        onClick={() => {
          onClick?.clickable && onClick?.setClick(!onClick?.clickState)
        }}
      >
        <Icon className="w-12 h-12 icon-tooltip" />
        <div className="label-tooltip">
          <span>{children}</span>

          {showStatus && <CircleIndicator className="w-3 text-green-500" />}
        </div>
      </div>
    </Html>
  )
}

export function NonObjectLabel2({ keyId, label, position = [0, 100, 0], size = 100, onHover, clickable = true }: ObjectLabel2Props) {

  const { windowState, toggleWindowState } = useWindowState()

  return (
    <Html
      distanceFactor={size}
      position={position}
      center
      zIndexRange={[20, 0]}
    >
      <button
        className={'container-tooltip' + " " +
          (clickable ? "clickable" : "")}

        onPointerOver={() => onHover && onHover(true)}
        onPointerOut={() => !windowState[keyId] && onHover && onHover(false)}
        onClick={() => {
          onHover && onHover(true)
          clickable && toggleWindowState(keyId)
        }}
      >
        <div className="relative w-full h-full">
          <div className="w-80">
            <img src={label} alt="" />
          </div>
        </div>
      </button>
    </Html>
  )
}

const areEqual = (prev: ObjectLabel2Props, next: ObjectLabel2Props) => {
  return prev.label === next.label
}

export const ObjectLabel2 = memo(NonObjectLabel2, areEqual)