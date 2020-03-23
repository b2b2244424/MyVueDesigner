import DragData from "../../../../../types/DragData";
import RegexUtils from "./../../../../../utils/RegexUtils";
import { IGenerator } from "../../../../../types/IGenerator";
function generatePropertyString(dragData: DragData) {
  let result: string = "";
  for (var key in dragData.defaultData) {
    let value: any = dragData.defaultData[key];
    if (!value) continue;
    if (typeof value === "number") {
      if (value === -1) {
        continue;
      } else {
        result = result + " " + key + "=" + '"' + value + '"';
      }
    } else if (typeof value === "string") {
      if (value === "") {
        continue;
      } else {
        result = result + " " + key + "=" + '"' + value + '"';
      }
    } else if (typeof value === "boolean") {
      if (!value) {
        continue;
      } else {
        result = result + " " + key;
      }
    }
  }
  return result;
}
export default function generate(
  dragData: DragData,
  type: string,
  generators: { [key: string]: IGenerator }
) {
  let result: string = "";
  let inner: string = dragData.defaultData["text"];
  let propertyString: string = generatePropertyString(dragData);

  let css: string = "";
  for (var cssKey in dragData.css) {
    css =
      css +
      RegexUtils.camelCaseToHyphens(cssKey) +
      ":" +
      dragData.css[cssKey] +
      ";";
  }
  result =
    "<textarea style=" +
    '"' +
    css +
    '"' +
    " " +
    propertyString +
    "></textarea>";
  return result;
}
