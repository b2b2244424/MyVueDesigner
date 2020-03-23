import DragData from "../../../../../types/DragData";
import RegexUtils from "./../../../../../utils/RegexUtils";
import { IGenerator } from "../../../../../types/IGenerator";
export default function generate(
  dragData: DragData,
  type: string,
  generators: { [key: string]: IGenerator }
) {
  let result: string = "";
  let inner: string = dragData.defaultData["text"];
  let url: string = dragData.defaultData["url"];
  let urlpart: string = url && url.length > 0 ? `href=\"${url}\"` : "";
  let target: string = dragData.defaultData.target;
  let targetPart: string =
    target && target.length > 0 ? `target=\"${target}\"` : "";
  let css: string = "";
  for (var cssKey in dragData.css) {
    css =
      css + `${RegexUtils.camelCaseToHyphens(cssKey)}:${dragData.css[cssKey]};`;
  }
  result = `<a style="${css}" ${urlpart} ${targetPart}>${inner}</a>`;
  return result;
}
