const paddingSchema = {
  title: "padding",
  type: "object",
  properties: {
    padding: {
      description: "padding",
      type: "string",
      minimum: 0,
      format: "text"
    },
    paddingTop: {
      description: "上",
      type: "number",
      minimum: 0,
      format: "number"
    },
    paddingRight: {
      description: "右",
      type: "number",
      minimum: 0,
      format: "number"
    },
    paddingBottom: {
      description: "下",
      type: "number",
      minimum: 0,
      format: "number"
    },
    paddingLeft: {
      description: "左",
      type: "number",
      minimum: 0,
      format: "number"
    }
  }
};

export default paddingSchema;
