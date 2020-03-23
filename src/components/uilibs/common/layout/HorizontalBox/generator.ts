import DragData from "../../../../../types/DragData";
import RegexUtils from "./../../../../../utils/RegexUtils";
import { IGenerator } from "../../../../../types/IGenerator";
export default function generate(
  dragData: DragData,
  type: string,
  generators: { [key: string]: IGenerator }
) {
  let result: string = "";
  let inner: string = "";
  dragData.children.forEach((e: DragData) => {
    let key: string = `../components/uilibs/${e.libName}/${e.categoryName}/${e.componentName}/generator.ts`;
    inner = inner + generators[key].generate(e, type, generators);
  });
  let componentOwnCss: { [key: string]: any } = {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "flex-start",
    alignItems: "center"
  };

  let allCss: { [key: string]: any } = {};
  for (var cssKey in componentOwnCss) {
    allCss[cssKey] = componentOwnCss[cssKey];
  }
  for (var cssKey in dragData.css) {
    allCss[cssKey] = dragData.css[cssKey];
  }

  let css: string = "";
  for (var cssKey in allCss) {
    css = css + `${RegexUtils.camelCaseToHyphens(cssKey)}:${allCss[cssKey]};`;
  }

  result = `
    <div style="${css}">
      ${inner}
    </div>`;
  return result;
}
