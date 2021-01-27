import { ComponentSchema } from '@appitsy/forms/types/ComponentSchema';

export const TableEditingSchema: ComponentSchema[] = [
  {
    "type": "text",
    "name": "name",
    "display": {
      "label": "Name"
    }
  },
  {
    "type": "tabs",
    "name": "tableConfig",
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
            "name": "label",
            "display": {
              "label": "Label",
              "placeholder": "",
              "prefix": "",
              "suffix": ""
            }
          }
        ]
      },
      {
        "components": [
          {
            "type": "checkbox",
            "name": "minOneRow",
            "display": {
              "label": "At Least 1 Row"
            }
          },
          {
            "type": "checkbox",
            "name": "allowSorting",
            "display": {
              "label": "Allow Sorting"
            }
          },
          {
            "type": "checkbox",
            "name": "allowAddRemove",
            "display": {
              "label": "Allow Add/Remove"
            }
          }
        ],
        "name": "data",
        "display": {
          "label": "Data"
        }
      }
    ]
  }
]
