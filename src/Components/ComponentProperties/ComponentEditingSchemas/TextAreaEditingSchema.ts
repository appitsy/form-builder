import { ComponentSchema } from '@appitsy/forms/types/ComponentSchema';

export const TextAreaEditingSchema: ComponentSchema[] = [
  {
    "type": "text",
    "name": "name",
    "display": {
      "label": "Name"
    }
  },
  {
    "type": "tabs",
    "name": "textAreaEditing",
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
              "label": "Placeholder"
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
      }
    ]
  }
]