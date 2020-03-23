import DragData from "../types/DragData";
import uuid from "../utils/uuid";
export default class DragDataUtils {
  public static removeId(dg: DragData) {
    dg.id = "";
    dg.children.forEach((e: DragData) => {
      this.removeId(e);
    });
  }

  public static generateStandardId(dg: DragData) {
    dg.id = "pageDesign";
    dg.children.forEach((e: DragData) => {
      this.generateId(e);
    });
  }

  public static generateId(dg: DragData) {
    dg.id = uuid();
    dg.children.forEach((e: DragData) => {
      this.generateId(e);
    });
  }

  public static getDataById(dragData: DragData, id: string): DragData | null {
    if (dragData.id === id) return dragData;
    else {
      return this.searchDataById(dragData.children, id);
    }
  }

  public static getParentByChildId(dg: DragData, id: string): DragData | null {
    let result: any = dg.children.find((e: DragData) => {
      return e.id === id;
    });

    if (result) {
      return dg;
    } else {
      for (let index: number = 0; index < dg.children.length; index++) {
        result = this.getParentByChildId(dg.children[index], id);
        if (result) return result;
      }
    }

    return null;
  }

  private static searchDataById(dragDatas: DragData[], id: string) {
    let index: number = -1;
    for (let index = 0; index < dragDatas.length; index++) {
      if (dragDatas[index].id === id) {
        return dragDatas[index];
      } else {
        let data: any = this.searchDataById(dragDatas[index].children, id);
        if (data) {
          return data;
        }
      }
    }
    return null;
  }
}
