import ComponentConfig from "../types/ComponentConfig";
const configs: ComponentConfig[] = [
  {
    name: "common",
    showName: "HTML控件",
    categories: [
      {
        name: "layout",
        showName: "布局",
        components: [
          { name: "VerticalBox", showName: "垂直盒子" },
          { name: "HorizontalBox", showName: "水平盒子" },
          { name: "CenterBox", showName: "居中盒子" },
          { name: "AbsoluteBox", showName: "绝对盒子" },
          { name: "Div", showName: "普通Div" }
        ]
      },
      {
        name: "elements",
        showName: "常用元素",
        components: [
          { name: "Button", showName: "按钮" },
          { name: "Span", showName: "文本" },
          { name: "H1", showName: "H1" },
          { name: "H2", showName: "H2" },
          { name: "H3", showName: "H3" },
          { name: "H4", showName: "H4" },
          { name: "H5", showName: "H5" },
          { name: "H6", showName: "H6" },
          { name: "Hr", showName: "水平线" },
          { name: "Link", showName: "链接" }
        ]
      }
    ]
  },
  {
    name: "element",
    showName: "Element组件",
    categories: []
  }
];

export default configs;
