import { ComponentSchema } from 'appitsy/types/ComponentSchema';

export const TextFieldEditingSchema: ComponentSchema[] = [
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
              "label": "Placeholder"
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
          },
          {
            "type": "text",
            "name": "defaultValue",
            "display": {
              "label": "Default Value"
            }
          }
        ]
      },
      {
        "components": [
          {
            "type": "checkbox",
            "name": "required",
            "display": {
              "label": "Required"
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