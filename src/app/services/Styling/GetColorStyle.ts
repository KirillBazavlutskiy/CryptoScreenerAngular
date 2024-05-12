import {PaintingBreakpoint} from "../../models/Options/StylingOptions.model";

export function getLevelColor(value: number, colorLevels: PaintingBreakpoint[]) {
  let resultColor: string = "";
  colorLevels.forEach(colorLevel => {
    if (colorLevel.value < value) resultColor = colorLevel.color
  })
  return resultColor
}
