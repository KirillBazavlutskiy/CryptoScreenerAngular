import {PaintingLevel} from "../../models/Options/StylingOptions.model";

export function getLevelColor(value: number, colorLevels: PaintingLevel[]) {
  let resultColor: string = "";
  colorLevels.forEach(colorLevel => {
    if (colorLevel.value < value) resultColor = colorLevel.color
  })
  return resultColor
}
