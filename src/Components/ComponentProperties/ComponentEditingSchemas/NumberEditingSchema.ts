import { ComponentSchema } from '@appitsy/forms/types/ComponentSchema';

export const NumberEditingSchema: ComponentSchema[] = [
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
    "type": "tabs",
    "name": "tabs1",
    "display": {
      "label": ""
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
              "label": "Label",
              "placeholder": "",
              "prefix": "",
              "suffix": ""
            },
            "data": {
              "defaultValue": ""
            },
            "validations": {
              "maxLength": ""
            }
          }
        ]
      },
      {
        "components": [],
        "name": "data",
        "display": {
          "label": "Data"
        }
      },
      {
        "components": [],
        "name": "validations",
        "display": {
          "label": "Validations"
        }
      }
    ]
  }
]