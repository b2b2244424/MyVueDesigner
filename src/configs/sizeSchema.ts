const sizeSchema = {
  title: "size",
  type: "object",
  properties: {
    boxSizing: {
      description: "盒子模型",
      type: "string",
      format: "select",
      enum: [
        {
          text: "border-box",
          value: "border-box"
        },
        {
          text: "content-box",
          value: "content-box"
        }
      ]
    },
    width: {
      description: "元素宽度",
      type: "string",
      minimum: 0,
      format: "text"
    },
    minWidth: {
      description: "元素最小宽度",
      type: "string",
      minimum: 0,
      format: "text"
    },
    maxWidth: {
      description: "元素最大宽度",
      type: "string",
      minimum: 0,
      format: "text"
    },
    height: {
      description: "元素高度",
      type: "string",
      minimum: 0,
      format: "text"
    },
    minHeight: {
      description: "元素最小高度",
      type: "string",
      format: "text"
    },
    maxHeight: {
      description: "元素最大高度",
      type: "string",
      format: "text"
    }
  }
};

export default sizeSchema;
