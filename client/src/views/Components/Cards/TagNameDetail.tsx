import { memo } from "react";
// import { CircleIndicator } from "../Icons/IconCard";
// import { FurnaceIcon } from "../Icons/IconObject";

type TagNameDetailProps = {
  data?: DataProps;
  color?: string;
  type?: "overview" | "tooltip" | "window" | string;
}

function Component({ data, color, type }: TagNameDetailProps) {

  return (
    <div className={"tagname-wrapper box-border justify-between flex flex-col gap-3 p-2 font-bold rounded-lg " + (color === "light" ? "bg-slate-200" : "bg-slate-900") + ((type === "overview") ? " w-full" : " w-48")}>
      <div className="flex items-start justify-between w-full gap-2">
        <div className={"text-sm w-full " + (color !== "light" ? "text-white" : "")}>
          <p>{data?.label}</p>
        </div>
        {/* <CircleIndicator className="w-2 text-green-400" /> */}
      </div>

      <div className="flex items-center w-full gap-3 ">
        {/* <FurnaceIcon className={color === "light" ? "text-gray-400" : "text-slate-500"} /> */}
        <div className="flex flex-col gap-1">
          <div className={"text-xl " + (color !== "light" ? "text-white" : "")}>{data?.value} <span>{data?.unit}</span></div>
        </div>
      </div>
    </div>
  )
}

const areEqual = (prev: TagNameDetailProps, next: TagNameDetailProps) => {
  return (
    prev.data?.value === next.data?.value &&
    prev.data?.label === next.data?.label &&
    prev.data?.unit === next.data?.unit
  )
}

const TagNameDetail = memo(Component, areEqual)

export default TagNameDetail
