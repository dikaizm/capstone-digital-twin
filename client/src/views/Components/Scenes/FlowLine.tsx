import { Line } from "@react-three/drei";

export default function FlowLine() {
  const line = {
    WIDTH: 8,
    COLOR: 0x3F80FE
  }

  return (
    <group position={[0, 0.5, 0]}>
      {/* Furnace to VDC */}
      <group>
        <mesh position={[185, 0, -46]}>
          <Line points={[
            [-10, 0, -5],
            [-40, 0, -5],
            [-40, 0, 22],
            [-250, 0, 22]
          ]} color={line.COLOR} lineWidth={line.WIDTH} />
        </mesh>

        <mesh position={[78, 0, -46]}>
          <Line points={[
            [30, 0, -5],
            [-10, 0, -5],
            [-10, 0, 22]
          ]} color={line.COLOR} lineWidth={line.WIDTH} />
        </mesh>
      </group>

      {/* VDC to Conveyor */}
      <mesh position={[-55, 0, -75]}>
        <Line points={[
          [0, 0, 32],
          [0, 0, 0],
          [-20, 0, 0]
        ]} color={line.COLOR} lineWidth={line.WIDTH} />
      </mesh>

      <mesh position={[-205, 1, -55]}>
        <Line points={[
          [130, 0, -20],
          [0, 0, -20],
          [0, 0, 0]
        ]} color={line.COLOR} lineWidth={line.WIDTH} />
      </mesh>

      {/* UT to Cooling One */}
      <group>
        <mesh position={[-205, 1, -44]}>
          <Line points={[
            [8, 0, 100],
            [8, 0, 125],
            [130, 0, 125],
            [130, 0, 22],
            [0, 0, 22],
            [0, 0, 0],
          ]} color={line.COLOR} lineWidth={line.WIDTH} />
        </mesh>

        <mesh position={[-110, 1, 70]}>
          <Line points={[
            [0, 0, 10],
            [0, 0, 0]
          ]} color={line.COLOR} lineWidth={line.WIDTH} />
        </mesh>

        <mesh position={[-152, 1, 65]}>
          <Line points={[
            [0, 0, 15],
            [0, 0, 0]
          ]} color={line.COLOR} lineWidth={line.WIDTH} />
        </mesh>

        <mesh position={[-175, 1, 58]}>
          <Line points={[
            [0, 0, 22],
            [0, 0, 0]
          ]} color={line.COLOR} lineWidth={line.WIDTH} />
        </mesh>
      </group>

      {/* Cooling One to Charging */}
      <group>
        <mesh position={[-197, 0, 80]}>
          <Line points={[
            [258, 0, 115],
            [258, 0, 25],
            [282, 0, 25],
            [282, 0, -34],
            [150, 0, -34],
            [150, 0, 20],
            [0, 0, 20],
            [0, 0, 0]
          ]} color={line.COLOR} lineWidth={line.WIDTH} />
        </mesh>

        {/* Storage */}
        <group>
          <mesh position={[56, 0, 160]}>
            <Line points={[
              [9.5, 0, 0],
              [0, 0, 0]
            ]} color={line.COLOR} lineWidth={line.WIDTH} />
          </mesh>

          <mesh position={[56, 0, 195]}>
            <Line points={[
              [9.5, 0, 0],
              [0, 0, 0]
            ]} color={line.COLOR} lineWidth={line.WIDTH} />
          </mesh>
        </group>
      </group>
    </group>
  )
}