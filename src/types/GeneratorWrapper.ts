import { IGenerator } from "./IGenerator";
import DragData from "./DragData";
export default class GeneratorWrapper implements IGenerator {
  public generator!: Function;

  public constructor(generator: Function) {
    this.generator = generator;
  }

  public generate(
    dragData: DragData,
    type: string,
    generators: { [key: string]: IGenerator }
  ): string {
    if (type === "template") {
      if (
        dragData.customComponentData &&
        dragData.customComponentData.name &&
        dragData.customComponentData.name.length > 0
      ) {
        return `<${dragData.customComponentData.name} />`;
      } else {
        return this.generator(dragData, type, generators);
      }
    } else if (type === "html") {
      return this.generator(dragData, type, generators);
    } else {
      return "";
    }
  }
}
