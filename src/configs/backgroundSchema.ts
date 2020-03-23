const backgroundSchema = {
  title: "background",
  type: "object",
  properties: {
    background: {
      description: "background",
      type: "string",
      format: "text"
    },
    backgroundClip: {
      description: "background clip",
      type: "string",
      enum: [
        {
          text: "border-box",
          value: "border-box"
        },
        {
          text: "padding-box",
          value: "padding-box"
        },
        {
          text: "content-box",
          value: "content-box"
        },
        {
          text: "text",
          value: "text"
        }
      ],
      format: "select"
    },
    backgroundOrigin: {
      description: "background origin",
      type: "string",
      enum: [
        {
          text: "border-box",
          value: "border-box"
        },
        {
          text: "padding-box",
          value: "padding-box"
        },
        {
          text: "content-box",
          value: "content-box"
        }
      ],
      format: "autocomplete"
    },
    backgroundPosition: {
      description: "background position",
      type: "string",
      enum: [
        {
          text: "top",
          value: "top"
        },
        {
          text: "right",
          value: "right"
        },
        {
          text: "bottom",
          value: "bottom"
        },
        {
          text: "left",
          value: "left"
        },
        {
          text: "center",
          value: "center"
        },
        {
          text: "center",
          value: "center"
        }
      ],
      format: "autocomplete"
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
        },
        {
          text: "50% auto",
          value: "50% auto"
        }
      ],
      format: "autocomplete"
    },
    backgroundAttachment: {
      description: "background attachment",
      type: "string",
      enum: [
        {
          text: "scroll",
          value: "scroll"
        },
        {
          text: "fixed",
          value: "fixed"
        },
        {
          text: "local",
          value: "local"
        }
      ],
      format: "select"
    },
    backgroundColor: {
      description: "background color",
      type: "string",
      format: "color"
    }
  }
};

export default backgroundSchema;
