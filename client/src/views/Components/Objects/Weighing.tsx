import { useEffect, useState } from 'react'
import { Select } from '@react-three/postprocessing'
import { ObjectLabel2 } from '../Tooltips/ObjectLabel';

import label from "@assets/panel/machine-name/Weighing.svg"
import Model from './Model'
import EquipmentLayout from '@/views/Layouts/EquipmentLayout';
import { useWindowState } from '@/context/WindowStateContext';

interface WeighingProps extends ObjectProps {
  keyId: string;
}

export default function Weighing({ keyId, position, rotation, scale, clickable = true }: WeighingProps) {

  const [isHover, setIsHover] = useState<boolean>(false)

  const mtlPath = './objects/weighing/weighing.mtl'
  const objPath = './objects/weighing/weighing.obj'

  const { windowState, toggleWindowState } = useWindowState()
  const state = windowState[keyId]

  useEffect(() => {
    if (!state) setIsHover(false)
  }, [state])

  return (
    <Select enabled={isHover && clickable}>
      <mesh
        position={position}
        rotation={rotation}
        scale={scale}
        castShadow

        onClick={() => {
          setIsHover(true)
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
          label={label}
          position={[0, 250, 0]}
          size={100}
          keyId={keyId}
        />

      </mesh>
    </Select>
  )
}

type EquipmentDetailProps = {
  data: WeighingDataProps;
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
export function WeighingEquipmentDetail({ data, type }: EquipmentDetailProps) {
  return (
    <EquipmentLayout data={[
      data.tag?.weighing
    ]} type={type} />
  )
}