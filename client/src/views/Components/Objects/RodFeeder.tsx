import { useEffect, useState } from 'react'
import { Select } from '@react-three/postprocessing'
import { ObjectLabel2 } from '../Tooltips/ObjectLabel';
import Model from './Model';

import { useWindowState } from '@/context/WindowStateContext';
import EquipmentLayout from '@/views/Layouts/EquipmentLayout';

import labelIdle from "@assets/panel/machine-name/idle/Rod Feeder Black.svg"
import labelRunning from "@assets/panel/machine-name/running/Rod Feeder Green.svg"
import labelWarning from "@assets/panel/machine-name/warning/Rod Feeder Red.svg"
import { useEquipmentLabel } from '@/util/handleEquipmentLabel';

const statusSvg: StatusSvgProps = {
  idle: labelIdle,
  running: labelRunning,
  warning: labelWarning
}

export default function RodFeeder({ keyId = "", position, rotation, scale, clickable = true }: ObjectProps) {

  const [isHover, setIsHover] = useState<boolean>(false)

  const mtlPath = './objects/RodFeeder/RodFeeder.mtl'
  const objPath = './objects/RodFeeder/RodFeeder.obj'

  const { windowState, toggleWindowState } = useWindowState()

  useEffect(() => {
    if (!windowState.sir) setIsHover(false)
  }, [windowState.sir])

  return (
    <Select enabled={isHover}>
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
          if (!windowState.sir) setIsHover(false)
        }}
      >
        <Model objPath={objPath} mtlPath={mtlPath} />

        <ObjectLabel2
          onHover={setIsHover}
          label={useEquipmentLabel(keyId, statusSvg)}
          position={[0, 250, 0]}
          size={100}
          keyId={keyId}
        />

      </mesh>
    </Select>
  )
}

type EquipmentDetailProps = {
  data: RodFeederDataProps;
  type: string;
}

export function RodFeederEquipmentDetail({ data, type }: EquipmentDetailProps) {
  return (
    <EquipmentLayout data={[
      data.tag?.DosisAltib
    ]} type={type} />
  )
}