const displaySchema = {
  title: "display",
  type: "object",
  properties: {
    display: {
      description: "display type",
      type: "string",
      format: "text"
    },
    flex: {
      description: "flex",
      type: "string",
      format: "text"
    },
    flexDirection: {
      description: "flex direction",
      type: "string",
      format: "text"
    },
    flexWrap: {
      description: "flex wrap",
      type: "string",
      format: "text"
    },
    flexFlow: {
      description: "flex flow",
      type: "string",
      format: "text"
    },
    justifyContent: {
      description: "justify content",
      type: "string",
      format: "text"
    },
    alignItems: {
      description: "align items",
      type: "string",
      format: "text"
    },
    alignContent: {
      description: "align content",
      type: "string",
      format: "text"
    },
    flexShrink: {
      description: "flex shrink",
      type: "string",
      format: "text"
    },
    flexBasis: {
      description: "flex basis",
      type: "string",
      format: "text"
    }
  }
};

export default displaySchema;
