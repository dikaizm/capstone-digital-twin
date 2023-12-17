import { useEffect, useState } from 'react';
import { Select } from "@react-three/postprocessing"
import { ObjectLabel2 } from '../Tooltips/ObjectLabel';
import EquipmentLayout from '@/views/Layouts/EquipmentLayout';
import Model from './Model';
import { useWindowState } from '@/context/WindowStateContext';

import { useEquipmentLabel } from '@/util/handleEquipmentLabel';

import labelIdleOne from "@assets/panel/machine-name/idle/Stillage 1 Black.svg"
import labelRunningOne from "@assets/panel/machine-name/running/Stillage 1 Green.svg"
import labelWarningOne from "@assets/panel/machine-name/warning/Stillage 1 Red.svg"

const statusSvgOne: StatusSvgProps = {
  idle: labelIdleOne,
  running: labelRunningOne,
  warning: labelWarningOne
}

import labelIdleTwo from "@assets/panel/machine-name/idle/Stillage 2 Black.svg"
import labelRunningTwo from "@assets/panel/machine-name/running/Stillage 2 Green.svg"
import labelWarningTwo from "@assets/panel/machine-name/warning/Stillage 2 Red.svg"

const statusSvgTwo: StatusSvgProps = {
  idle: labelIdleTwo,
  running: labelRunningTwo,
  warning: labelWarningTwo
}

interface StillageProps extends ObjectProps {
  keyId: string;
}

type EquipmentDetailProps = {
  data: StillageOneDataProps | StillageTwoDataProps;
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
export function StillageOneEquipmentDetail({ data, type }: EquipmentDetailProps) {
  return (
    <EquipmentLayout data={[
      data.tag?.['LtNoLogs[19]']
    ]} type={type} />
  )
}

export function StillageTwoEquipmentDetail({ data, type }: EquipmentDetailProps) {
  return (
    <EquipmentLayout data={[
      data.tag?.['LtNoLogs[15]']
    ]} type={type} />
  )
}

export function Stillage({ keyId, position, rotation, scale, clickable = true }: StillageProps) {
  const [isHover, setIsHover] = useState<boolean>(false)

  const mtlPath = './objects/Stillage/Stillage.mtl'
  const objPath = './objects/Stillage/Stillage.obj'

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
          label={
            // eslint-disable-next-line react-hooks/rules-of-hooks
            keyId === "stillageOne" ? useEquipmentLabel(keyId, statusSvgOne) : useEquipmentLabel(keyId, statusSvgTwo)
          }
          position={[0, 150, 0]}
          size={110}
          keyId={keyId}
        />

      </mesh >
    </Select>
  )
}