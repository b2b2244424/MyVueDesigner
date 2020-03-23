import ComponentSchema from "../../../../../types/ComponentSchema";
const schema: ComponentSchema = {
  title: "Span",
  type: "object",
  properties: {
    text: {
      description: "显示文本",
      type: "string",
      format: "text"
    },
    url: {
      description: "链接地址",
      type: "string",
      format: "text"
    },
    target: {
      description: "指向地址",
      type: "string",
      format: "select",
      enum: [
        {
          text: "打开新窗口",
          value: "_blank"
        },
        {
          text: "当前页面打开",
          value: "_self"
        },
        {
          text: "在整个窗口中打开",
          value: "_top"
        },
        {
          text: "在父框架中打开",
          value: "_parent"
        }
      ]
    }
  }
};
export default schema;
