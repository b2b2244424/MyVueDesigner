const positionSchema = {
  title: "position",
  type: "object",
  properties: {
    position: {
      description: "定位方式",
      type: "string",
      enum: [
        {
          text: "相对定位 - relative",
          value: "relative"
        },
        {
          text: "绝对定位 - absolute",
          value: "absolute"
        },
        {
          text: "固定定位 - fixed",
          value: "fixed"
        },
        {
          text: "无定位 - static",
          value: "static"
        }
      ],
      format: "select"
    },
    top: {
      description: "上",
      type: "string",
      minimum: 0,
      format: "text"
    },
    right: {
      description: "右",
      type: "string",
      minimum: 0,
      format: "text"
    },
    bottom: {
      description: "下",
      type: "string",
      minimum: 0,
      format: "text"
    },
    left: {
      description: "左",
      type: "string",
      minimum: 0,
      format: "text"
    },
    zIndex: {
      description: "z序",
      type: "number",
      minimum: 1,
      format: "number"
    }
  }
};

export default positionSchema;
