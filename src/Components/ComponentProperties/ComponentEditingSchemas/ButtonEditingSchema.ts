import { ComponentSchema } from '@appitsy/forms/types/ComponentSchema';

export const ButtonEditingSchema: ComponentSchema[] = [
  {
    "type": "text",
    "name": "name",
    "display": {
      "label": "Name",
      "placeholder": "",
      "prefix": "",
      "suffix": ""
    }
  },
  {
    "type": "text",
    "name": "style",
    "display": {
      "label": "Style",
      "placeholder": "",
      "prefix": "",
      "suffix": ""
    },
    "data": {
      "defaultValue": "",
      "path": ""
    },
    "validations": {
      "maxLength": ""
    }
  },
  {
    "type": "tabs",
    "name": "buttonConfig",
    "display": {
      "label": "Button Configuration"
    },
    "components": [
      {
        "name": "display",
        "display": {
          "label": "Display"
        },
        "components": [
          {
            "type": "text",
            "name": "label",
            "display": {
              "label": "Label"
            }
          },
          {
            "type": "text",
            "name": "leftIcon",
            "display": {
              "label": "Left Icon"
            }
          },
          {
            "type": "text",
            "name": "rightIcon",
            "display": {
              "label": "Right Icon"
            }
          }
        ]
      }
    ]
  }
]