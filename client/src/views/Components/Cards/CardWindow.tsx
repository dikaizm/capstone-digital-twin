import { JSXElementConstructor, ReactNode } from "react";
import { Close } from "../Icons/IconCard";
import { useWindowState } from "@/context/WindowStateContext";

type CardWindowProps = {
  keyId: string;
  label: string;
  icon?: JSXElementConstructor<IconProps>;
  image?: {
    src: string;
    alt: string;
  };
  children: ReactNode;
}

export default function CardWindow({ keyId, label, icon: Icon, children }: CardWindowProps) {
  const { toggleWindowState } = useWindowState()

  const handleCloseBtn = () => {
    toggleWindowState(keyId)
  }

  return (
    <div className="relative border rounded-lg max-w-[100vw] border-slate-500 bg-slate-800 h-fit w-fit">

      <div className="flex flex-col w-full h-full gap-4 p-5">

        <div className="flex justify-between w-full gap-2">
          <div className='flex items-center gap-4'>
            <div className="p-2 text-white bg-blue-600 rounded-full">
              {Icon && <Icon className="w-6 h-6" />}
            </div>
            <div className="font-bold whitespace-nowrap">
              <h2 className="text-2xl">{label}</h2>
            </div>
          </div>

          <button type="button" onClick={() => handleCloseBtn()}>
            <Close className="p-[0.4rem] text-gray-200 rounded-full w-6 bg-slate-600" />
          </button>
        </div>

        <div className="flex h-full gap-8 overflow-x-auto">
          {/* <div className="flex flex-col justify-between w-full gap-2 max-h-fit">

            <div className="flex items-center justify-center h-full">
              {image && (
                <img className="object-contain w-full h-28" src={image.src} alt={image.alt} />
              )}
            </div>

            <div className="flex min-w-[10rem] gap-2 px-3 py-1 rounded-full bg-slate-900">
              <CircleIndicator className="w-6 text-green-500" />

              <div className="font-bold">
                <div className="text-xs">Status</div>
                <div className="text-sm">Operation</div>
              </div>
            </div>
          </div> */}

          <div className="h-full">{children}</div>
        </div>

      </div>
    </div>
  )
}