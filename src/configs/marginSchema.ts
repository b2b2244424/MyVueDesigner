const marginSchema = {
  title: "margin",
  type: "object",
  properties: {
    margin: {
      description: "margin",
      type: "string",
      minimum: 0,
      format: "text"
    },
    marginTop: {
      description: "上",
      type: "number",
      minimum: 0,
      format: "number"
    },
    marginRight: {
      description: "右",
      type: "number",
      minimum: 0,
      format: "number"
    },
    marginBottom: {
      description: "下",
      type: "number",
      minimum: 0,
      format: "number"
    },
    marginLeft: {
      description: "左",
      type: "number",
      minimum: 0,
      format: "number"
    }
  }
};

export default marginSchema;
