const fontSchema = {
  title: "font",
  type: "object",
  properties: {
    font: {
      description: "font",
      type: "string",
      format: "text"
    },
    fontFamily: {
      description: "字体",
      type: "string",
      format: "text"
    },
    fontStyle: {
      description: "字体样式",
      type: "string",
      enum: [
        {
          text: "常规字体 - normal",
          value: "normal"
        },
        {
          text: "斜体字体 - italic",
          value: "italic"
        },
        {
          text: "倾斜体字体 - oblique",
          value: "oblique"
        }
      ],
      format: "select"
    },
    fontWeight: {
      description: "字体粗细",
      type: "string",
      enum: [
        {
          text: "100 - Thin",
          value: "100"
        },
        {
          text: "200 - Extra Light",
          value: "200"
        },
        {
          text: "300 - Light",
          value: "300"
        },
        {
          text: "400 - Normal",
          value: "400"
        },
        {
          text: "500 - Medium",
          value: "500"
        },
        {
          text: "600 - Semi Bold",
          value: "600"
        },
        {
          text: "700 - Bold",
          value: "700"
        },
        {
          text: "800 - Extra Bold",
          value: "800"
        },
        {
          text: "900 - Black",
          value: "900"
        },
        {
          text: "Lighter",
          value: "lighter"
        },
        {
          text: "Bolder",
          value: "bolder"
        }
      ],
      format: "select"
    },
    fontSize: {
      description: "字体大小",
      type: "string",
      format: "text"
    },
    lineHeight: {
      description: "行高",
      type: "string",
      format: "text"
    },
    letterSpacing: {
      description: "行间距",
      type: "string",
      format: "text"
    },
    textAlign: {
      description: "对齐方式",
      type: "string",
      enum: [
        {
          text: "左对齐",
          value: "left"
        },
        {
          text: "居中对齐",
          value: "center"
        },
        {
          text: "右对齐",
          value: "right"
        }
      ],
      format: "select"
    },
    textDecoration: {
      description: "文本排版",
      type: "string",
      enum: [
        {
          text: "none",
          value: "none"
        },
        {
          text: "underline",
          value: "underline"
        },
        {
          text: "overline",
          value: "overline"
        },
        {
          text: "line-through",
          value: "line-through"
        }
      ],
      format: "select"
    },
    color: {
      description: "颜色",
      type: "string",
      format: "color"
    }
  }
};

export default fontSchema;
