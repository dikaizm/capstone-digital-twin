import { useWindowState } from "@/context/WindowStateContext";
import CardWindow from "../Components/Cards/CardWindow";
import { HomogenizingEquipmentDetail } from "../Components/Objects/Homogenezing";
import { SIREquipmentDetail } from "../Components/Objects/SirDegasser";
import { Furnace10FEquipmentDetail, Furnace9FEquipmentDetail } from "../Components/Objects/Furnace";
import { VDCEquipmentDetail } from "../Components/Objects/VDC";
import { ConveyorEquipmentDetail } from "../Components/Objects/Conveyor";
import { FurnaceIcon } from "../Components/Icons/IconObject";
import { CoolingOneEquipmentDetail, CoolingTwoEquipmentDetail } from "../Components/Objects/Cooling";
import { StillageOneEquipmentDetail, StillageTwoEquipmentDetail } from "../Components/Objects/Stillage";
import { UTEquipmentDetail } from "../Components/Objects/Ut";
import { SawingEquipmentDetail } from "../Components/Objects/SawingMachine";
import { WeighingEquipmentDetail } from "../Components/Objects/Weighing";
import { SwarfEquipmentDetail } from "../Components/Objects/SwarfBriquettin";
import { useData } from "@/context/DataContext";
import { JSXElementConstructor } from "react";
import { SawingEntryEquipmentDetail } from "../Components/Objects/SawingEntrySystem";
import { RodFeederEquipmentDetail } from "../Components/Objects/RodFeeder";

export default function Windows() {

  return (
    <div className="fixed z-30 origin-bottom-left scale-[0.85] bottom-8 left-28" >
      <div className="flex gap-4">

        <ShowWindow
          component={HomogenizingEquipmentDetail}
          keyId="homogenizing"
        />

        <ShowWindow
          component={SIREquipmentDetail}
          keyId="sir"
        />

        <ShowWindow
          component={Furnace9FEquipmentDetail}
          keyId="furnace9F"
        />

        <ShowWindow
          component={Furnace10FEquipmentDetail}
          keyId="furnace10F"
        />

        <ShowWindow
          component={VDCEquipmentDetail}
          keyId="vdc"
        />

        <ShowWindow
          component={ConveyorEquipmentDetail}
          keyId="conveyor"
        />

        <ShowWindow
          component={CoolingOneEquipmentDetail}
          keyId="coolingOne"
        />

        <ShowWindow
          component={CoolingTwoEquipmentDetail}
          keyId="coolingTwo"
        />

        <ShowWindow
          component={StillageOneEquipmentDetail}
          keyId="stillageOne"
        />

        <ShowWindow
          component={StillageTwoEquipmentDetail}
          keyId="stillageTwo"
        />

        <ShowWindow
          component={UTEquipmentDetail}
          keyId="ut"
        />

        <ShowWindow
          component={SawingEquipmentDetail}
          keyId="sawing"
        />

        <ShowWindow
          component={WeighingEquipmentDetail}
          keyId="weighing"
        />

        <ShowWindow
          component={SwarfEquipmentDetail}
          keyId="swarf"
        />

        <ShowWindow
          component={SawingEntryEquipmentDetail}
          keyId="sawingEntry"
        />

        <ShowWindow
          component={RodFeederEquipmentDetail}
          keyId="rodFeeder"
        />

      </div>
    </div >
  )
}

type EquipmentLayoutProps = {
  data: SwarfDataProps | WeighingDataProps | SIRDataProps | UTDataProps | StillageOneDataProps | CoolingOneDataProps | ConveyorDataProps | VDCDataProps | Furnace9FDataProps | Furnace10FDataProps | HomogenizingDataProps | StillageOneDataProps | StillageTwoDataProps | CoolingTwoDataProps;
  type: string;
}

type ShowWindowProps = {
  component: JSXElementConstructor<EquipmentLayoutProps>;
  keyId: string;
}

function ShowWindow({ component: Component, keyId }: ShowWindowProps) {
  const { windowState } = useWindowState()
  const { data } = useData()

  return (
    <>
      {windowState[keyId] &&
        <CardWindow
          icon={FurnaceIcon}
          label={data[keyId].equipmentName}
          keyId={keyId}
        >
          <Component data={data[keyId]} type="window" />
        </CardWindow>
      }
    </>
  )
}