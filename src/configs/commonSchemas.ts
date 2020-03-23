import unitList from "./unitList";
import sizeSchema from "./sizeSchema";
import positionSchema from "./positionSchema";
import marginSchema from "./marginSchema";
import paddingSchema from "./paddingSchema";
import fontSchema from "./fontSchema";
import shadowSchema from "./shadowSchema";
import borderSchema from "./borderSchema";
import backgroundSchema from "./backgroundSchema";
import displaySchema from "./displaySchema";

const commonSchemas: any = {
  rect: {
    title: "rect",
    type: "object",
    display: true,
    properties: {
      width: {
        type: "string",
        minimum: 0,
        format: "cssunit",
        enum: unitList
      },
      height: {
        type: "string",
        minimum: 0,
        format: "cssunit",
        enum: unitList
      },
      left: {
        type: "string",
        format: "cssunit",
        enum: unitList
      },
      top: {
        type: "string",
        format: "cssunit",
        enum: unitList
      },
      zIndex: {
        type: "number",
        minimum: 0,
        format: "cssunit"
      }
    }
  },
  font: {
    title: "font",
    type: "object",
    format: "FontPanel",
    properties: {
      color: {
        description: "颜色",
        type: "string",
        format: "color"
      },
      fontFamily: {
        description: "字体",
        type: "string",
        format: "text"
      },
      fontSize: {
        description: "字体大小",
        type: "string",
        minimum: 0,
        format: "cssunit",
        enum: [
          {
            text: "px",
            value: "px"
          },
          {
            text: "rem",
            value: "rem"
          },
          {
            text: "em",
            value: "em"
          }
        ]
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
      lineHeight: {
        description: "行高",
        type: "string",
        minimum: 0,
        format: "cssunit",
        enum: unitList
      },
      letterSpacing: {
        description: "行间距",
        type: "string",
        minimum: 0,
        format: "cssunit",
        enum: unitList
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
        format: "radio"
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
        format: "radio"
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
        format: "radio"
      }
    }
  },
  background: {
    title: "background",
    type: "object",
    format: "BackgroundPanel",
    properties: {
      opacity: {
        type: "number",
        format: "slider",
        defaultValue: 1
      },
      backgroundColor: {
        description: "background color",
        type: "string",
        format: "color"
      },
      backgroundSize: {
        description: "background size",
        type: "string",
        enum: [
          {
            text: "auto",
            value: "auto"
          },
          {
            text: "cover",
            value: "cover"
          },
          {
            text: "contain",
            value: "contain"
          }
        ],
        format: "select"
      },
      backgroundRepeat: {
        description: "background repeat",
        type: "string",
        enum: [
          {
            text: "repeat",
            value: "repeat"
          },
          {
            text: "repeat-x",
            value: "repeat-x"
          },
          {
            text: "repeat-y",
            value: "repeat-y"
          },
          {
            text: "no-repeat",
            value: "no-repeat"
          }
        ],
        format: "select"
      }
    }
  },
  border: {
    title: "border",
    type: "object",
    format: "BorderPanel",
    properties: {
      borderColor: {
        description: "边框颜色",
        type: "string",
        format: "color"
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
      borderWidth: {
        description: "边框宽度",
        type: "string",
        minimum: 0,
        format: "cssunit",
        enum: [
          {
            text: "px",
            value: "px"
          }
        ]
      },
      borderRadius: {
        description: "边框圆角",
        type: "string",
        minimum: 0,
        format: "cssunit",
        enum: [
          {
            text: "px",
            value: "px"
          },
          {
            text: "%",
            value: "%"
          }
        ]
      }
    }
  },
  padding: {
    title: "padding",
    type: "object",
    format: "BoxPanel",
    properties: {
      paddingTop: {
        description: "上",
        type: "string",
        format: "cssunit",
        enum: unitList
      },
      paddingRight: {
        description: "右",
        type: "string",
        format: "cssunit",
        enum: unitList
      },
      paddingBottom: {
        description: "下",
        type: "string",
        format: "cssunit",
        enum: unitList
      },
      paddingLeft: {
        description: "左",
        type: "string",
        format: "cssunit",
        enum: unitList
      }
    }
  },
  margin: {
    title: "margin",
    type: "object",
    format: "BoxPanel",
    properties: {
      marginTop: {
        description: "上",
        type: "string",
        format: "cssunit",
        enum: unitList
      },
      marginRight: {
        description: "右",
        type: "string",
        format: "cssunit",
        enum: unitList
      },
      marginBottom: {
        description: "下",
        type: "string",
        format: "cssunit",
        enum: unitList
      },
      marginLeft: {
        description: "左",
        type: "string",
        format: "cssunit",
        enum: unitList
      }
    }
  },
  boxShadow: {
    title: "boxShadow",
    type: "object",
    format: "BoxShadowPanel",
    properties: {
      boxShadow: {
        type: "string"
      }
    }
  }
};

export default commonSchemas;
