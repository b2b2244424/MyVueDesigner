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
  let css: string = "";
  for (var cssKey in dragData.css) {
    css =
      css + `${RegexUtils.camelCaseToHyphens(cssKey)}:${dragData.css[cssKey]};`;
  }
  result = `<button
    style="${css}"
    >${inner}
    </button>`;
  return result;
}
