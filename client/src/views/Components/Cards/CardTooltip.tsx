import { Html } from "@react-three/drei";
import { JSXElementConstructor, ReactNode } from "react";
import { CircleIndicator, Close } from "../Icons/IconCard";

type CardTooltipProps = {
  size?: number;
  position?: [number, number, number];
  linePosition?: [number, number, number];
  lineLength?: string;
  equipmentName: string;
  icon: JSXElementConstructor<IconProps>;
  state: {
    openState: (state: boolean) => void;
    hoverState: (state: boolean) => void;
  };
  children: ReactNode;
}

/**
 * Component
 *  
  * @param {number} [size=100] - The size factor for the CardTooltip.
  * @param {Array<number>} [position=[0, 450, 0]] - The position of the CardTooltip in 3D space.
  * @param {Array<number>} [linePosition=[0, 200, 0]] - The position of the CardTooltip in 3D space.
  * @param {string} [lineLength="h-24"] - The length of the CardTooltip line, values can be either ["h-24", "h-28", "h-32", "h-36", "h-40", "h-44", "h-48"]
  * @param {string} [equipmentName]
  * @param {JSXElementConstructor<IconProps>}
  * @param {ReactNode} children - The content to be displayed within the CardTooltip.
  *
  * @example
  * Example usage of CardTooltip
  * <CardTooltip size={120} position={[0, 450, 0]} linePosition={[0,200,0]} lineLength="h-24" equipmentName={data.equipmentName} icon={FurnaceIcon}>
  *   <div>Additional information goes here.</div>
  * </CardTooltip>
*/

export default function CardTooltip({
  size = 100,
  position = [0, 450, 0],
  linePosition = [0, 200, 0],
  lineLength = "h-24",
  equipmentName,
  icon: Icon,
  state,
  children }: CardTooltipProps) {

  const { hoverState, openState } = state

  const handleCloseBtn = () => {
    openState(false)
    hoverState(false)
  }

  return (
    <>
      <Html
        distanceFactor={size}
        position={position}
        center
        zIndexRange={[30,0]}
      >
        <div className="p-3 text-black bg-white border border-gray-300 rounded-xl min-w-[14rem]">
          <div className="flex flex-col justify-between w-full gap-3">

            <div className="flex items-start justify-between w-full gap-2">
              <div className='flex items-center gap-2'>
                <CircleIndicator className='w-3 text-green-500' />
                <span className='text-sm font-semibold whitespace-nowrap'>Status: Operation</span>
              </div>

              <button type="button" onClick={() => handleCloseBtn()}>
                <Close className="p-[0.4rem] text-gray-600 rounded-full w-6 bg-slate-300" />
              </button>
            </div>

            <div className='flex items-center gap-3'>
              <div className="p-2 text-white bg-blue-600 rounded-full">
                <Icon className="w-6 h-6" />
              </div>
              <span className="font-bold">
                {equipmentName}
              </span>
            </div>

            {children}

          </div>
        </div>
      </Html>

      <Html
        distanceFactor={size}
        position={linePosition}
        center
        zIndexRange={[0, 0]}
      >
        <div className={"border-[1.5px] border-white tooltip " + lineLength} />
      </Html>
    </>
  )
}
