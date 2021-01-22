import { ComponentSchema } from '@appitsy/forms/types/ComponentSchema';

export const TabsEditingSchema: ComponentSchema[] = [
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
            "type": "table",
            "name": "components",
            "display": {
              "label": "Tabs"
            },
            "components": [
              {
                "type": "text",
                "name": "name",
                "display": {
                  "label": "Tab name"
                }
              },
              {
                "type": "object",
                "name": "display",
                "display": {
                  "label": "Tab label",
                  "hideLabel": true
                },
                "components": [
                  {
                    "type": "text",
                    "name": "label",
                    "display": {
                      "hideLabel": true
                    }
                  }
                ]
              }
            ],
            "data": {
              "path": "$.components",
              "addNewDefault": "let tab = ({ \"id\": uuid(), components: [] }); tab;",
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
              "label": "Data Path",
              "placeholder": "",
              "prefix": "",
              "suffix": ""
            }
          }
        ],
        "name": "data",
        "display": {
          "label": "Data"
        }
      }
    ],
    "data": {
      "path": "$"
    }
  }
]