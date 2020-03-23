import uuid from "../utils/uuid";
export default class DragData {
  public libName: string = "common";
  public categoryName: string = "layout";
  public componentName: string = "AbsoluteBox";
  public id: string = "";
  public style: string = "";
  public defaultData!: any;
  public children: DragData[] = [];
  public css: { [key: string]: any } = {};
  public useless: string = "";
  public customComponentData: { [key: string]: any } = {};
}
