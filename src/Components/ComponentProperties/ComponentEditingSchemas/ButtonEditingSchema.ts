import { ComponentSchema } from "appitsy/types/ComponentSchema";

export const ButtonEditingSchema: ComponentSchema[] = [
  {
    type: 'text',
    name: 'name',
    display: {
      label: 'Name'
    }
  },
]