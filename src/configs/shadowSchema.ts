const shadowSchema = {
  title: "shadow",
  type: "object",
  properties: {
    boxShadow: {
      description: "边框阴影",
      type: "string",
      format: "text"
    },
    textShadow: {
      description: "文字阴影",
      type: "string",
      format: "text"
    }
  }
};

export default shadowSchema;
