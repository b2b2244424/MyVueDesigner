import PageConfig from "./PageConfig";
import PageInfo2 from "./PageInfo2";
import ColorInfo from "./ColorInfo";
import PageTemplateInfo from "./PageTemplateInfo";
import ComponentTemplateInfo from "./ComponentTemplateInfo";
import FontSizeInfo from "./FontSizeInfo";
export default class ProjectInfo {
  public id: string = "";
  public config: PageConfig = new PageConfig();
  public pages: PageInfo2[] = [];
  public colors: ColorInfo[] = [];
  public fontSizes: FontSizeInfo[] = [];
  public pageTemplates: PageTemplateInfo[] = [];
  public componentTemplates: ComponentTemplateInfo[] = [];
  public name: string = "";
  public componentDir: string = "";
  public pageDir: string = "";
  public defaultPageTemplate!: PageTemplateInfo;
}
