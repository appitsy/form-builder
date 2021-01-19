import { ComponentSchema } from '@appitsy/forms/types/ComponentSchema';

export const ColumnsEditingSchema: ComponentSchema[] = [
  {
    type: 'text',
    name: 'name',
    display: {
      label: 'Name'
    }
  },
  {
    "type": "tabs",
    "name": "textFieldEditing",
    "components": [
      
    ]
  }
]