import { Selection, EffectComposer, Outline } from "@react-three/postprocessing"

// Components
import RodFeeder from './RodFeeder';
import Homogenezing from './Homogenezing';
import { Furnace, FurnaceGround } from "./Furnace";
import ChargingBillet from "./ChargingBillet";
import SawingMachine from "./SawingMachine";
import SirDegasser from "./SirDegasser";
import CFF from "./CFF";
import { Storage } from "./Storage";
import SwarfBriquettin from "./SwarfBriquettin";
import UT from "@/views/Components/Objects/Ut";
import Weighing from "./Weighing";
import VDC from "./VDC";
import Conveyor from "./Conveyor";
import { Cooling } from "./Cooling";
import { Stillage } from "./Stillage";
import Strapping from "./Strapping";
import { useRef } from 'react';
import { Group, Object3DEventMap } from 'three';
import SawingEntrySystem from "./SawingEntrySystem";
import Timbangan from "./Timbangan";

export default function GroupObjects() {

  const ref = useRef<Group<Object3DEventMap> | null>(null);

  return (
    <group ref={ref} position={[-35, 0, -95]}>

      <Selection>
        <EffectComposer
          enabled

          multisampling={8}
          autoClear={false}
        >
          <Outline
            visibleEdgeColor={0x0e4d92}
            edgeStrength={60}
            width={800}
            pulseSpeed={0.15}
            hiddenEdgeColor={0x0e4d92}
          />
        </EffectComposer>

        {/* Objects */}

        <group position={[-20, 0, -5]}>

          <group position={[5, 0, 21]}>
            <RodFeeder
              keyId="rodFeeder"
              position={[80, 0, 78]}
              rotation={[0, Math.PI / -1.5, 0]}
              scale={0.1}
            />

            <SirDegasser
              keyId="sir"
              position={[75, 0, 45.5]}
              scale={0.15}
            />

            <CFF
              keyId="cff"
              position={[34, 0, 55.5]}
              rotation={[0, Math.PI / -2, 0]}
              scale={0.1}
            />

            <VDC
              keyId="vdc"
              position={[-4, -33.5, 55.8]}
              rotation={[0, Math.PI / -2, 0]}
              scale={0.1}
            />
          </group>

          <group position={[70, 0, 14]}>
            <Furnace
              keyId="furnace9F"
              position={[170, 20, 24]}
              scale={0.005}
            />

            <Furnace
              keyId="furnace10F"
              position={[97, 20, 24]}
              scale={0.005}
            />

            <FurnaceGround
              position={[239, -0.25, -39]}
              scale={0.0047}
            />

            <Timbangan
              position={[358, 16.5, -24]}
              scale={0.046}
              rotation={[0, Math.PI, 0]}
            />

            <Timbangan
              position={[-49, 16.5, -200]}
              scale={0.046}
              rotation={[0, Math.PI / 2, 0]}
            />
          </group>

          <group position={[-16, 0, 18]}>
            <Conveyor
              keyId="conveyor"
              position={[-70, 0, 40]}
              rotation={[0, Math.PI / 1, 0]}
              scale={0.4}
            />

            <UT
              keyId="ut"
              position={[-130, 0.3, 33]}
              scale={0.06}
            />
          </group>

        </group>

        <group position={[-35, 0, 40]}>
          <group scale={1.6} position={[0, 0, 100]}>
            <Cooling
              keyId="coolingOne"

              position={[-52, 0, 1]}
              rotation={[0, Math.PI / -2, 0]}
              scale={0.08}
            />

            <Cooling
              keyId="coolingTwo"

              position={[-80, 0, 1]}
              rotation={[0, Math.PI / -2, 0]}
              scale={0.08}
            />

            <Stillage
              keyId="stillageTwo"

              position={[-65, 0, 0]}
              rotation={[0, Math.PI / 1, 0]}
              scale={0.08}
            />

            <Homogenezing
              position={[-25, 0, 0]}
              rotation={[0, Math.PI / 2, 0]}
              scale={0.1}
              keyId="homogenizing"
            />

            <Stillage
              keyId="stillageOne"
              position={[-4, 0, 0]}
              rotation={[0, Math.PI / 1, 0]}
              scale={0.08}
            />
          </group>

          <group scale={1.5} position={[65, 0, 100]}>
            <ChargingBillet
              keyId="chargingBillet"
              position={[0, 0, 6]}
              rotation={[0, Math.PI / -0.5, 0]}
              scale={0.25}
              clickable={false}
            />

            <SawingEntrySystem
              keyId="sawingEntry"
              position={[1, 0, 0]}
              rotation={[0, Math.PI / 1, 0]}
              scale={0.13}
            />
          </group>
        </group>

        <group position={[15, 0, 40]}>
          <group position={[5, 0, 0]}>
            <SawingMachine
              keyId="sawing"
              position={[103, 0, 120]}
              rotation={[0, Math.PI / -2, 0]}
              scale={0.08}
            />

            <Strapping
              keyId="strapping"
              position={[80, -0.95, 160]}
              rotation={[0, Math.PI / 2, 0]}
              scale={0.12}
              clickable={false}
            />

            <Weighing
              keyId="weighing"
              position={[115, 0, 157]}
              rotation={[0, Math.PI / 2, 0]}
              scale={0.08}
            />
          </group>

          <SwarfBriquettin
            keyId="swarf"
            position={[86, 0, 120]}
            scale={0.08}
          />

          <group position={[41, 0, 60]}>
            <Storage
              keyId="storage"
              position={[50, 0, 190]}
              rotation={[0, Math.PI / 2, 0]}
              scale={0.07}
              clickable={false}
            />
            <Storage
              keyId="storage"
              position={[30, 0, 190]}
              rotation={[0, Math.PI / 2, 0]}
              scale={0.07}
              clickable={false}
            />
            <Storage
              keyId="storage"
              position={[50, 0, 155]}
              rotation={[0, Math.PI / 2, 0]}
              scale={0.07}
              clickable={false}
            />
            <Storage
              keyId="storage"
              position={[30, 0, 155]}
              rotation={[0, Math.PI / 2, 0]}
              scale={0.07}
              clickable={false}
            />
          </group>
        </group>

      </Selection>
    </group>
  )
}