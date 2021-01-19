import { ComponentSchema } from '@appitsy/forms/types/ComponentSchema';

export const PasswordEditingSchema: ComponentSchema[] = [
  {
    "type": "text",
    "name": "name",
    "display": {
      "label": "Name"
    }
  },
  {
    "type": "tabs",
    "name": "textFieldEditing",
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
              "label": "Label"
            }
          },
          {
            "type": "text",
            "name": "placeholder",
            "display": {
              "label": "Placeholder",
              "placeholder": "",
              "prefix": "",
              "suffix": ""
            }
          },
          {
            "type": "text",
            "name": "prefix",
            "display": {
              "label": "Prefix",
              "placeholder": ""
            }
          },
          {
            "type": "text",
            "name": "suffix",
            "display": {
              "label": "Suffix"
            }
          }
        ]
      },
      {
        "name": "data",
        "display": {
          "label": "Data"
        },
        "components": [
          {
            "type": "text",
            "name": "path",
            "display": {
              "label": "Data Path"
            }
          }
        ]
      },
      {
        "components": [
          {
            "type": "checkbox",
            "name": "checkbox1",
            "display": {
              "label": "Checkbox 1"
            }
          },
          {
            "type": "text",
            "name": "minLength",
            "display": {
              "label": "Min Length",
              "placeholder": ""
            }
          },
          {
            "type": "text",
            "name": "maxLength",
            "display": {
              "label": "Max Length"
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
