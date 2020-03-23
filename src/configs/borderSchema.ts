const borderSchema = {
  title: "border",
  type: "object",
  properties: {
    borderWidth: {
      description: "边框宽度",
      type: "string",
      minimum: 0,
      format: "text"
    },
    borderRadius: {
      description: "边框圆角",
      type: "string",
      minimum: 0,
      format: "text"
    },
    borderStyle: {
      description: "边框样式",
      type: "string",
      enum: [
        {
          text: "none",
          value: "none"
        },
        {
          text: "solid",
          value: "solid"
        },
        {
          text: "dashed",
          value: "dashed"
        },
        {
          text: "dotted",
          value: "dotted"
        },
        {
          text: "double",
          value: "double"
        }
      ],
      format: "select"
    },
    borderColor: {
      description: "边框颜色",
      type: "string",
      format: "color"
    }
  }
};

export default borderSchema;
