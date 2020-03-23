import DragData from "./DragData";
export interface IGenerator {
  generate(
    dragData: DragData,
    type: string,
    generators: { [key: string]: IGenerator }
  ): string;
}
