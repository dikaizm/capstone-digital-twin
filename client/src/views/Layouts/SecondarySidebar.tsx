import { ResizableBox, ResizeHandle } from "react-resizable"

import "@sass/layouts/secondarySidebar.scss"

import CardOverview from "@Components/Cards/CardOverview"
import { SIREquipmentDetail } from "../Components/Objects/SirDegasser";
import { ForwardedRef, ReactElement, RefObject, forwardRef, useEffect, useState } from "react";
import { VDCEquipmentDetail } from "../Components/Objects/VDC";
import { SawingEquipmentDetail } from "../Components/Objects/SawingMachine";
import { HomogenizingEquipmentDetail } from "../Components/Objects/Homogenezing";
import { useData } from "@/context/DataContext";
import { Furnace10FEquipmentDetail, Furnace9FEquipmentDetail } from "../Components/Objects/Furnace";
import { CoolingOneEquipmentDetail, CoolingTwoEquipmentDetail } from "../Components/Objects/Cooling";
import { StillageOneEquipmentDetail, StillageTwoEquipmentDetail } from "../Components/Objects/Stillage";
import { SawingEntryEquipmentDetail } from "../Components/Objects/SawingEntrySystem";
import { ConveyorEquipmentDetail } from "../Components/Objects/Conveyor";
import { UTEquipmentDetail } from "../Components/Objects/Ut";

interface SecondarySidebarProps {
  state: boolean;
}

interface SidebarHandleProps {
  handleAxis?: ResizeHandle;
}

const SidebarHandle = forwardRef<HTMLDivElement, SidebarHandleProps>((props: SidebarHandleProps, ref: ForwardedRef<HTMLDivElement>) => {
  const { handleAxis, ...restProps } = props;
  const [isDragging, setIsDragging] = useState<boolean>(false)

  const handleDragStart = () => {
    setIsDragging(true)
    document.body.style.cursor = 'col-resize';
  }

  const handleDragEnd = () => {
    setIsDragging(false)
    document.body.style.cursor = 'auto';
  }

  useEffect(() => {
    const handle = ref as RefObject<HTMLDivElement>;
    const handleMouseDown = () => {
      handleDragStart();
    };
    const handleMouseUp = () => {
      handleDragEnd();
    };

    if (handle && handle.current) {
      handle.current.addEventListener('mousedown', handleMouseDown);
      document.addEventListener('mouseup', handleMouseUp);

      return () => {
        handle.current?.removeEventListener('mousedown', handleMouseDown);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [ref]);

  return (
    <div ref={ref} className={"react-resizable-handle-w " + handleAxis + " " + (isDragging ? "dragging" : "")} {...restProps} />
  )
})

interface EquipmentsProps {
  component: ReactElement;
  data: SIRDataProps | VDCDataProps | SwarfDataProps | HomogenizingDataProps | SawingDataProps;
}


const DEFAULT_SIDEBAR_WIDTH: number = 486
const OVERVIEW: string = "overview"

export default function SecondarySidebar({ state }: SecondarySidebarProps) {
  const { data } = useData()

  const [halfWindowWidth, setHalfWindowWidth] = useState<number>(window.innerWidth / 2)
  const [sidebarWidth, setSidebarWidth] = useState<number>(DEFAULT_SIDEBAR_WIDTH)

  useEffect(() => {
    const handleResize = () => {
      setHalfWindowWidth(window.innerWidth / 2)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  /**
   * Array of equipment objects, each containing a React component and corresponding data.
   * @type {Array<EquipmentsProps>}
   */
  const equipments: EquipmentsProps[] = [
    {
      component: <ConveyorEquipmentDetail data={data.conveyor} type={OVERVIEW} />,
      data: data.conveyor
    },
    {
      component: <UTEquipmentDetail data={data.ut} type={OVERVIEW} />,
      data: data.ut
    },
    {
      component: <CoolingOneEquipmentDetail data={data.coolingOne} type={OVERVIEW} />,
      data: data.coolingOne
    },
    {
      component: <CoolingTwoEquipmentDetail data={data.coolingTwo} type={OVERVIEW} />,
      data: data.coolingTwo
    },
    {
      component: <Furnace9FEquipmentDetail data={data.furnace9F} type={OVERVIEW} />,
      data: data.furnace9F
    },
    {
      component: <Furnace10FEquipmentDetail data={data.furnace10F} type={OVERVIEW} />,
      data: data.furnace10F
    },
    {
      component: <HomogenizingEquipmentDetail data={data.homogenizing} type={OVERVIEW} />,
      data: data.homogenizing
    },
    {
      component: <SIREquipmentDetail data={data.sir} type={OVERVIEW} />,
      data: data.sir
    },
    {
      component: <SawingEquipmentDetail data={data.sawing} type={OVERVIEW} />,
      data: data.sawing
    },
    {
      component: <SawingEntryEquipmentDetail data={data.sawingEntry} type={OVERVIEW} />,
      data: data.sawingEntry
    },
    {
      component: <StillageOneEquipmentDetail data={data.stillageOne} type={OVERVIEW} />,
      data: data.stillageOne
    },
    {
      component: <StillageTwoEquipmentDetail data={data.stillageTwo} type={OVERVIEW} />,
      data: data.stillageTwo
    },
    {
      component: <VDCEquipmentDetail data={data.vdc} type={OVERVIEW} />,
      data: data.vdc
    },
  ]

  return (
    <div id="sidebar-right" className={"overflow-hidden" + " " + (state ? "active" : "inactive")}>
      <ResizableBox
        width={sidebarWidth}
        axis="x"
        minConstraints={[300, Infinity]}
        maxConstraints={[halfWindowWidth, Infinity]}
        height={Infinity}
        resizeHandles={['w']}
        onResize={(_, data) => {
          setSidebarWidth(data.size.width)
        }}
        handle={<SidebarHandle />}
      >
        <div className="relative container-sidebar">
          <h2>Overview</h2>

          <div className="overview-wrapper">
            <div className={"grid-wrapper" + " " + (sidebarWidth < 390 ? "grid-cols-1" : sidebarWidth > DEFAULT_SIDEBAR_WIDTH + 40 ? "grid-cols-3" : "grid-cols-2")}>
              {sidebarWidth < 390 ? (
                <div className="col-wrapper">
                  {equipments && equipments.map((equipment, i) => {
                    return (
                      <CardOverview key={"equipment-" + i} data={equipment.data}>
                        {equipment.component}
                      </CardOverview>
                    )
                  })}
                </div>
              ) : (sidebarWidth > DEFAULT_SIDEBAR_WIDTH + 40) && (equipments.length >= 3) ? (
                <>
                  {equipments && splitArray(equipments, 3).map((subset, subIdx) => {
                    return (
                      <div key={"subset-" + subIdx} className="col-wrapper">
                        {subset.map((equipment, i) => {
                          return (
                            <CardOverview key={"equipment-" + i} data={equipment.data}>
                              {equipment.component}
                            </CardOverview>
                          )
                        })}
                      </div>
                    )
                  })}
                </>
              ) : (
                <>
                  {equipments && splitArray(equipments, 2).map((subset, subIdx) => {
                    return (
                      <div key={"subset-" + subIdx} className="col-wrapper">
                        {subset.map((equipment, i) => {
                          return (
                            <CardOverview key={"equipment-" + i} data={equipment.data}>
                              {equipment.component}
                            </CardOverview>
                          )
                        })}
                      </div>
                    )
                  })}
                </>
              )}
            </div>
          </div>
        </div>
      </ResizableBox>
    </div>
  )
}

/**
  * Function Split Equipments
  * 
  * Split an array into multiple arrays of equal or nearly equal size.
  * @param {Array<EquipmentsProps>} data - The array to split into multiple arrays.
  * @param {number} parts - The number of arrays to split the data into.
  * @returns {Array}
  */
function splitArray(data: EquipmentsProps[], parts: number): EquipmentsProps[][] {
  const result: EquipmentsProps[][] = [];

  const partSize: number = Math.floor(data.length / parts);
  const extraItems: number = data.length % parts;

  for (let i = 0; i < parts; i++) {
    const startIndex = i * partSize;
    const endIndex = startIndex + partSize + (i < extraItems ? 1 : 0);

    result.push(data.slice(startIndex, endIndex));
  }

  return result;
}