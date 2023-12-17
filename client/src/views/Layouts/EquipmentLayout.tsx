import TagNameDetail from "../Components/Cards/TagNameDetail";

interface EquipmentLayoutProps {
  data?: (DataProps | undefined)[];
  type: string;
}

/**
 * Component
 * 
 * @param {Array<Object>} data - Equipment data containing information about the equipment.
 * @param {string} [type="tooltip" | type="window" | type="overview"] - Type of display, either "tooltip" or "window" or "overview".
 * @example
 * // Example usage of EquipmentDetail as a tooltip
 * <EquipmentDetail data={[data.tag?.tagName]} type="tooltip" />
 * 
*/
export default function EquipmentLayout({ data, type }: EquipmentLayoutProps) {
  const handleTypeFlex = (type: string, elmType: string) => {
    if (elmType === "parent") {
      if (type === "tooltip") return "flex-row"
      else if (type === "window" || type === "overview") return "flex-col"
    } else if (elmType === "child") {
      if (type === "tooltip") return "flex-col"
      else if (type === "window") return "flex-row"
    }
    return null
  }

  const handleTypeColor = (type: string) => {
    if (type === "tooltip") return "light"
  }

  if (data && data.length > 0) {

    if (type !== "overview" && data.length > 1) {
      if (data.length > 8 && type === "tooltip") {
        return (
          <div className={'flex gap-2 h-full ' + handleTypeFlex(type, "parent")}>

            {data && splitTags(data, 4).map((subset, i) => {
              return (
                <div key={"tag-w-" + i} className={'flex gap-2 ' + handleTypeFlex(type, "child")}>
                  {subset.map((tag, j) => {
                    return (
                      <TagNameDetail
                        key={"tag-l-" + j}
                        data={tag}
                        color={handleTypeColor(type)}
                        type={type}
                      />
                    )
                  })}
                </div>
              )
            })}
          </div>
        )
      } else {
        return (
          <div className={'flex gap-2 h-full ' + handleTypeFlex(type, "parent")}>

            {data && splitTags(data, 2).map((subset, i) => {
              return (
                <div key={"tag-w-" + i} className={'flex gap-2 ' + handleTypeFlex(type, "child")}>
                  {subset.map((tag, j) => {
                    return (
                      <TagNameDetail
                        key={"tag-l-" + j}
                        data={tag}
                        color={handleTypeColor(type)}
                        type={type}
                      />
                    )
                  })}
                </div>
              )
            })}
          </div>
        )
      }
    } else {
      return (
        <div className={'flex gap-2 h-full ' + handleTypeFlex(type, "parent")}>
          {data && data.map((data, i) => {
            return (
              <TagNameDetail
                key={"tag-ov-" + i}
                data={data}
                color={handleTypeColor(type)}
                type={type}
              />
            )
          })}
        </div>
      )
    }
  }

  return null
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
function splitTags(data: (DataProps | undefined)[], parts: number): (DataProps | undefined)[][] {
  const result: (DataProps | undefined)[][] = [];

  const partSize: number = Math.floor(data.length / parts);
  let extraItems: number = data.length % parts;

  let startIndex = 0;

  for (let i = 0; i < parts; i++) {
    const endIndex = startIndex + partSize + (extraItems > 0 ? 1 : 0);

    result.push(data.slice(startIndex, endIndex));

    startIndex = endIndex;
    extraItems--;
  }

  return result;
}