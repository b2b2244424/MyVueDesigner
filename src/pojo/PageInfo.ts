import ComponentInfo from './ComponentInfo';
export default class PageInfo {
  public pageName: string = "";
  public active: boolean = false;
  public id: string = '';
  public componentAttrs!: ComponentInfo;
  public pageComponents: ComponentInfo[] = [];
  public pageHtml: any;
}
