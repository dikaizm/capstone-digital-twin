import { useEffect, useState } from 'react';
import { Select } from '@react-three/postprocessing';

import { ObjectLabel2 } from '@Components/Tooltips/ObjectLabel';
import Model from './Model';
import { useWindowState } from '@/context/WindowStateContext';

import labelIdle from "@assets/panel/machine-name/idle/CFF Black.svg"
import labelRunning from "@assets/panel/machine-name/running/CFF Green.svg"
import labelWarning from "@assets/panel/machine-name/warning/CFF Red.svg"

import EquipmentLayout from '@/views/Layouts/EquipmentLayout';
import { useEquipmentLabel } from '@/util/handleEquipmentLabel';

interface CFFProps extends ObjectProps {
  keyId: string;
}

const statusSvg: StatusSvgProps = {
  idle: labelIdle,
  running: labelRunning,
  warning: labelWarning
}

export default function CFF({ keyId, position, rotation, scale, clickable = true }: CFFProps) {
  const [isHover, setIsHover] = useState<boolean>(false)

  const mtlPath = './objects/CFF/CFF.mtl'
  const objPath = './objects/CFF/CFF.obj'

  const { windowState, toggleWindowState } = useWindowState()

  useEffect(() => {
    if (!windowState[keyId]) setIsHover(false)
  }, [keyId, windowState])

  return (
    <Select enabled={isHover && clickable}>
      <mesh
        position={position}
        rotation={rotation}
        scale={scale}
        castShadow
        onClick={() => {
          clickable && toggleWindowState(keyId)
        }}
        onPointerOver={() => setIsHover(true)}
        onPointerOut={() => {
          if (!windowState[keyId]) setIsHover(false)
        }}
      >
        <Model objPath={objPath} mtlPath={mtlPath} />

        <ObjectLabel2
          onHover={setIsHover}
          label={useEquipmentLabel(keyId, statusSvg)}
          position={[0, 250, 0]}
          size={80}
          keyId={keyId}
        />

      </mesh >
    </Select>
  )
}

type EquipmentDetailProps = {
  data: CFFDataProps;
  type: string;
}

/**
 * Component
 * 
 * @param {Object} data - Equipment data containing information about the equipment.
 * @param {string} [type="tooltip" | type="window" | type="overview"] - Type of display, either "tooltip" or "window" or "overview".
 * @example
 * // Example usage of EquipmentDetail as a tooltip
 * <EquipmentDetail data={equipmentData} type="tooltip" />
 * 
*/
export function CFFEquipmentDetail({ data, type }: EquipmentDetailProps) {
  return (
    <EquipmentLayout data={[
      data.tag?.cff
    ]} type={type} />
  )
}