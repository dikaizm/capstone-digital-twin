import { useEffect, useState } from 'react';
import { Select } from "@react-three/postprocessing"
import { ObjectLabel2 } from '../Tooltips/ObjectLabel';
import EquipmentLayout from '@/views/Layouts/EquipmentLayout';
import Model from './Model';

import { useWindowState } from '@/context/WindowStateContext';

interface FurnaceProps extends ObjectProps {
  keyId: string;
}

import { useEquipmentLabel } from '@/util/handleEquipmentLabel';

import labelIdle9F from "@assets/panel/machine-name/idle/Furnace MF-09 Black.svg"
import labelRunning9F from "@assets/panel/machine-name/running/Furnace MF-09 Green.svg"
import labelWarning9F from "@assets/panel/machine-name/warning/Furnace MF-09 Red.svg"

const statusSvg9F: StatusSvgProps = {
  idle: labelIdle9F,
  running: labelRunning9F,
  warning: labelWarning9F
}

import labelIdle10F from "@assets/panel/machine-name/idle/Furnace MF-10 Black.svg"
import labelRunning10F from "@assets/panel/machine-name/running/Furnace MF-10 Green.svg"
import labelWarning10F from "@assets/panel/machine-name/warning/Furnace MF-10 Red.svg"

const statusSvg10F: StatusSvgProps = {
  idle: labelIdle10F,
  running: labelRunning10F,
  warning: labelWarning10F
}

export function Furnace({ keyId, position, rotation, scale, clickable = true }: FurnaceProps) {
  const [isHover, setIsHover] = useState<boolean>(false)

  const mtlPath = './objects/Furnace/Furnace.mtl'
  const objPath = './objects/Furnace/Furnace.obj'

  const { windowState, toggleWindowState } = useWindowState()
  const state = windowState[keyId]

  useEffect(() => {
    if (!state) setIsHover(false)
  }, [state])

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
          if (!windowState[keyId]) setIsHover(false)
        }}
      >
        <Model objPath={objPath} mtlPath={mtlPath} />

        <ObjectLabel2
          onHover={setIsHover}
          label={
            // eslint-disable-next-line react-hooks/rules-of-hooks
            keyId === "furnace9F" ? useEquipmentLabel(keyId, statusSvg9F) : useEquipmentLabel(keyId, statusSvg10F)
          }
          position={[0, 3500, 0]}
          size={120}
          keyId={keyId}
        />

      </mesh >
    </Select>
  )
}

type EquipmentDetailProps = {
  data: Furnace9FDataProps | Furnace10FDataProps;
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
export function Furnace9FEquipmentDetail({ data, type }: EquipmentDetailProps) {
  return (
    <EquipmentLayout data={[
      data.tag?.['LSYS_E2_IO_Cabinet_Launder:1:I.Ch0Data']
    ]} type={type} />
  )
}

export function Furnace10FEquipmentDetail({ data, type }: EquipmentDetailProps) {
  return (
    <EquipmentLayout data={[
      data.tag?.['LSYS_E2_IO_Cabinet_Launder:2:I.Ch0Data']
    ]} type={type} />
  )
}

import labelLaunderIdle from "@assets/panel/machine-name/idle/Launder Black.svg"
import labelLaunderRunnning from "@assets/panel/machine-name/running/Launder Green.svg"
import labelLaunderWarning from "@assets/panel/machine-name/warning/Launder Red.svg"

const statusSvgLaunder: StatusSvgProps = {
  idle: labelLaunderIdle,
  running: labelLaunderRunnning,
  warning: labelLaunderWarning
}

export function FurnaceGround({ position, scale, rotation }: ObjectProps) {
  const mtlPath = './objects/Furnace/Base.mtl'
  const objPath = './objects/Furnace/Base.obj'

  return (
    <mesh
      position={position}
      rotation={rotation}
      scale={scale}
      receiveShadow
    >
      <Model objPath={objPath} mtlPath={mtlPath} />

      <ObjectLabel2
        label={useEquipmentLabel("launder", statusSvgLaunder)
        }
        position={[-30000, 3500, 21500]}
        size={90}
        keyId={"launder"}
      />
    </mesh>
  )
}