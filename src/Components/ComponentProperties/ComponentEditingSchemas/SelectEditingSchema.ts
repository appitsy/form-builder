import { ComponentSchema } from '@appitsy/forms/types/ComponentSchema';

export const SelectEditingSchema: ComponentSchema[] = [
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
      "label": "Tabs 1"
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
            "name": "description",
            "display": {
              "label": "Description",
              "placeholder": "",
              "prefix": "",
              "suffix": ""
            }
          },
          {
            "type": "checkbox",
            "name": "hidden",
            "display": {
              "label": "Hidden"
            }
          },
          {
            "type": "checkbox",
            "name": "disabled",
            "display": {
              "label": "Disabled"
            }
          }
        ]
      },
      {
        "components": [
          {
            "type": "table",
            "name": "options",
            "display": {
              "label": "Table 1"
            },
            "components": [
              {
                "type": "text",
                "name": "value",
                "display": {
                  "label": "Value",
                  "placeholder": "",
                  "prefix": "",
                  "suffix": ""
                }
              },
              {
                "type": "text",
                "name": "label",
                "display": {
                  "label": "Label"
                }
              }
            ]
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
            "type": "number",
            "name": "minSelected",
            "display": {
              "label": "Number 1"
            }
          },
          {
            "type": "number",
            "name": "maxSelected",
            "display": {
              "label": "Number 1"
            }
          }
        ],
        "name": "validations",
        "display": {
          "label": "Validations"
        }
      }
    ]
  }
]