import { ComponentSchema } from '@appitsy/forms/types/ComponentSchema';

export const ObjectEditingSchema: ComponentSchema[] = [
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
    "name": "objectComponentConfig",
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
            }
          }
        ]
      }
    ],
    "data": {
      "path": "$"
    }
  }
]