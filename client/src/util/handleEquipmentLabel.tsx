import { useData } from "@/context/DataContext"

export function useEquipmentLabel(keyId: string, svg: StatusSvgProps) {
    const { data } = useData()

    const status = data[keyId]?.status

    if (status === 0) {
        return svg.idle
    } else if (status === 1) {
        return svg.running
    } else {
        return svg.warning
    }
}