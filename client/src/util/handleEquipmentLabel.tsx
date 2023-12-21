import { useData } from "@/context/DataContext"

export function useEquipmentLabel(keyId: string, svg: StatusSvgProps) {
    const { data } = useData()

    const status = data[keyId]?.status

    if (status === 1) {
        return svg.running
    } else if (status === 2) {
        return svg.warning
    } else {
        return svg.idle
    }
}