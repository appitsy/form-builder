import { ComponentSchema } from 'appitsy/types/ComponentSchema';

export const CheckboxEditingSchema: ComponentSchema[] = [
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
      "label": "Tabs "
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
            "validations": {
              "maxLength": "",
              "checkbox1": true
            }
          }
        ]
      },
      {
        "components": [
          {
            "type": "text",
            "name": "path",
            "display": {
              "label": "Path",
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
          },
          {
            "type": "checkbox",
            "name": "defaultValue",
            "display": {
              "label": "Default Value"
            }
          }
        ],
        "name": "data",
        "display": {
          "label": "Data"
        }
      },
      {
        "components": [
          {
            "type": "checkbox",
            "name": "required",
            "display": {
              "label": "Required"
            }
          }
        ],
        "name": "validations",
        "display": {
          "label": "Validations"
        }
      }
    ],
    "data": {
      "path": "$"
    }
  }
]