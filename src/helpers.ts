import { Dimensions } from "react-native";
import { heightBreakPoint } from "../configs.json";

const { height } = Dimensions.get("window");

let scaleFactor = 1;
if (height < heightBreakPoint.small) scaleFactor = 0.85;
if (height >= heightBreakPoint.large) scaleFactor = 1.4;
if (height >= heightBreakPoint.xLarge) scaleFactor = 1.8;

function scaleUp(styles: any): any {
  return Object.entries(styles)
    .map(([key, value]) => ({
      [key]:
        typeof value === "object"
          ? scaleUp(value)
          : typeof value === "number"
          ? value * scaleFactor
          : value,
    }))
    .reduce((newStyles, style) => ({ ...newStyles, ...style }), {});
}

export const responsive = (styles: any) => {
  if (typeof styles === "number") return styles * scaleFactor;
  return scaleUp(styles);
};
