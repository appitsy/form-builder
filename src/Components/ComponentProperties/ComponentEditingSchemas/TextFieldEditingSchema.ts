import { ComponentSchema } from "appitsy/types/ComponentSchema";

export const TextFieldEditingSchema: ComponentSchema[] = [
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
            type: 'text',
            name: 'placeholder',
            display: {
              label: 'Placeholder'
            }
          },
        ]
      },
      {
        name: 'data',
        display: {
          label: 'Data',
        },
        components: [
          {
            type: 'text',
            name: 'defaultValue',
            display: {
              label: 'Default Value'
            }
          },
        ]
      }
    ]
  },
]