import { ComponentSchema } from "appitsy/types/ComponentSchema";

export const TabsEditingSchema: ComponentSchema[] = [
  {
    type: 'text',
    name: 'name',
    display: {
      label: 'Name'
    }
  },
  {
    type: 'tabs',
    name: 'textFieldEditing',
    data: {
      path: '',
    },
    components: [
      {
        name: 'display',
        display: {
          label: 'Display',
        },
        components: [
          {
            type: 'text',
            name: 'label',
            display: {
              label: 'Label'
            }
          },
          {
            type: 'table',
            name: 'components',
            display: {
              label: 'Tabs'
            },
            data: {
              path: 'components',
              addNewDefault: '({ "id": uuid(), "canHaveChildComponents": true, components: [] })',
              columns: [
                {
                  name: 'name',
                  type: 'text',
                  display: {
                    label: 'Tab name'
                  }
                },
                {
                  name: 'display',
                  type: 'object',
                  display: {
                    label: 'Tab label',
                    hideLabel: true,
                  },
                  components: [
                    {
                      name: 'label',
                      type: 'text',
                      display: {
                        hideLabel: true,
                      }
                    },
                  ]
                },
              ]
            }
          },
        ]
      },
    ]
  },
]