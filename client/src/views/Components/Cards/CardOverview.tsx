import { ReactNode } from "react";
import "./cards.scss"
import { useAuth } from "@/context/AuthContext";
// import { CircleIndicator } from "../Icons/IconCard";

interface CardProps {
  data: EquipmentProps;
  children?: ReactNode;
}

export default function CardOverview({ data, children }: CardProps) {
  const { role } = useAuth()

  return (
    <div id="card-overview"
      className={"h-fit " +
        (data.status === 1 ? "bg-green-600" : data.status === 2 ? "bg-red-600" : "bg-gray-500")
      }>
      <div className="flex flex-col gap-2 container-card">
        {/* <div className="flex items-center justify-between gap-2">
          <span className="text-[12px] font-medium">Status: Operation</span>
          <CircleIndicator className="w-3 h-3 text-green-400" />
        </div> */}

        <h3 className="text-base font-bold">{data?.equipmentName}</h3>

        {role && (role !== "level1") && (
          <div>{children}</div>
        )}
      </div>
    </div>
  )
}
