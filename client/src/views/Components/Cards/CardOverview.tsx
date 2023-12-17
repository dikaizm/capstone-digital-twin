import { ReactNode } from "react";
import "./cards.scss"
import { CircleIndicator } from "../Icons/IconCard";

interface CardProps {
  data: EquipmentProps;
  children?: ReactNode;
}

export default function CardOverview({ data, children }: CardProps) {

  return (
    <div id="card-overview" className="h-fit">
      <div className="flex flex-col gap-2 container-card">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[12px] font-medium">Status: Operation</span>
          <CircleIndicator className="w-3 h-3 text-green-400" />
        </div>

        <h3 className="text-base font-bold">{data?.equipmentName}</h3>

        <div>{children}</div>
      </div>
    </div>
  )
}
