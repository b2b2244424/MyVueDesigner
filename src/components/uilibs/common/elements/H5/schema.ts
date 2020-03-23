import ComponentSchema from "../../../../../types/ComponentSchema";
const schema: ComponentSchema = {
  title: "H1",
  type: "object",
  properties: {
    text: {
      description: "显示文本",
      type: "string",
      format: "text"
    }
  }
};
export default schema;
