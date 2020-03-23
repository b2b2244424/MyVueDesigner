export default class ComponentType {
  public static TYPE_COMPONENT = "component";
  public static TYPE_NONE = "";
  public static TYPE_PAGE = "page";
  public type: string = "";
  public libName: string = "";
  public categoryName: string = "";
  public componentName: string = "";
  public id: string = "";
  public schema: { [key: string]: any } = {};
  public data: any = {};
  public css: { [key: string]: any } = {};
}
