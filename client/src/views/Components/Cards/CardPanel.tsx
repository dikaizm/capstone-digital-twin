import { Html } from "@react-three/drei";

import panel from "@assets/panel/panel.svg"
import holder from "@assets/panel/holder.svg"
import { ReactNode } from "react";

type DataPanProps = {
  label: string;
  value: number | string;
  unit: string;
}

type CardPanelProps = {
  size?: number;
  position?: [number, number, number];
  equipmentName: string;
  children: ReactNode;
}

type PanelProps = {
  data: DataPanProps[]
}

const data: DataPanProps[] = [
  {
    label: "TEMPERATURE",
    value: 0,
    unit: "",
  },
  {
    label: "AIR TEMPERATURE Z1 LEFT",
    value: 0,
    unit: "",
  },
  {
    label: "AIR TEMPERATURE Z2 LEFT",
    value: 0,
    unit: "",
  },
  {
    label: "BILLET TEMPERATURE Z1 LEFT",
    value: 0,
    unit: "",
  },
  {
    label: "BILLET TEMPERATURE Z2 LEFT",
    value: 0,
    unit: "",
  },
  {
    label: "LOGTRACKING HM Z2",
    value: 0,
    unit: "",
  },
  {
    label: "AIR TEMPERATURE Z1 RIGHT",
    value: 0,
    unit: "",
  },
  {
    label: "AIR TEMPERATURE Z2 RIGHT",
    value: 0,
    unit: "",
  },
  {
    label: "BILLET TEMPERATURE Z1 RIGHT",
    value: 0,
    unit: "",
  },
  {
    label: "BILLET TEMPERATURE Z2 RIGHT",
    value: 0,
    unit: "",
  },
  {
    label: "STATUS",
    value: "OFF",
    unit: "",
  },
]

export default function CardPanel({ size = 90, position = [0, 500, 0], equipmentName }: CardPanelProps) {
  return (
    <Html
      center
      position={position}
      distanceFactor={size}
    >
      <div>
        <div className="flex flex-col items-center justify-between w-full gap-3">
          <div>
            <h2 className="text-5xl text-center font-bigmacca font-outline-2">{equipmentName}</h2>
          </div>

          <Panel data={data} />
        </div>
      </div>
    </Html>
  )
}

function Panel({ data }: PanelProps) {
  const splitTagsData = splitTags(data, 2)

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-2">
        <div className="mr-4 w-14">
          <img className="object-contain w-full h-full -scale-x-100" src={holder} alt="" />
        </div>

        {data && splitTagsData.main.map((subset, i) => {
          return (
            <div key={"tag-w-" + i} className='flex flex-col gap-3'>
              {subset.map((tag, j) => {
                return (
                  <PanelItem key={"tag-" + j} label={tag?.label} value={tag?.value} unit={tag?.unit} />
                )
              })}
            </div>
          )
        })}

        <div className="ml-4 w-14">
          <img className="object-contain w-full h-full" src={holder} alt="" />
        </div>
      </div>

      <div className="flex justify-center">
        <PanelItem label={splitTagsData.extra?.label} value={splitTagsData.extra?.value} unit={splitTagsData.extra?.unit} />
      </div>
    </div>
  )
}

interface SplitTagsProps {
  main: (DataProps | undefined)[][];
  extra: DataProps | undefined;
}

/**
  * Function Split (DataProps[])
  * 
  * Split an array into multiple arrays of equal or nearly equal size.
  * @param {Array<(DataProps | undefined)>} data - The array to split into multiple arrays.
  * @param {number} parts - The number of arrays to split the data into.
  * @returns {Array}
  */
// eslint-disable-next-line react-refresh/only-export-components
function splitTags(data: (DataProps | undefined)[], parts: number): SplitTagsProps {
  const main: (DataProps | undefined)[][] = [];

  const partSize: number = Math.floor(data.length / parts);
  const extraItems: number = data.length % parts;

  for (let i = 0; i < parts; i++) {
    const startIndex = i * partSize;
    const endIndex = startIndex + partSize;

    main.push(data.slice(startIndex, endIndex));
  }

  const result: SplitTagsProps = {
    main: main,
    extra: data.slice(-extraItems)[0],
  }

  return result;
}

type PanelItemProps = {
  label?: string;
  value?: number | string;
  unit?: string;
}

function PanelItem({ label, value, unit }: PanelItemProps) {
  return (
    <div className="relative">
      <div className="w-60">
        <img className="object-contain w-full h-full" src={panel} alt="" />
      </div>

      <div className="absolute inset-0 mx-auto">
        <div className="flex flex-col items-center font-bigmacca">
          <div className="flex items-center justify-center w-[72%]  h-9">
            <span className="text-xs font-semibold text-center text-white">{label}</span>
          </div>
          <div className="flex items-center justify-center w-[72%] h-[50px] ">
            <span className="text-2xl font-bold text-center text-white">{value} {unit}</span>
          </div>
        </div>
      </div>
    </div>
  )
}