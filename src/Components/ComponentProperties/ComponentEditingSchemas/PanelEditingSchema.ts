import { ComponentSchema } from "appitsy/types/ComponentSchema";

export const PanelEditingSchema: ComponentSchema[] = [
  {
    type: 'text',
    name: 'name',
    display: {
      label: 'Name'
    }
  },
]