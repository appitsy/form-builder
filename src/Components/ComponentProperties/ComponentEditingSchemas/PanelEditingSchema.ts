import { ComponentSchema } from '@appitsy/forms/types/ComponentSchema';

import {
  BaseComponentDataProperties,
  BaseComponentDisplayProperties,
  Checkbox,
  DataTab,
  DisplayTab,
  Name,
  Tabs,
} from './templates/common';

export const PanelEditingSchema: ComponentSchema[] = [
  Name,
  Tabs([
    DisplayTab([
      ...BaseComponentDisplayProperties,
      Checkbox('expanded', 'Initially Expanded'),
      Checkbox('expandable', 'Expandable'),
    ]),
    DataTab(BaseComponentDataProperties)
  ]),
]