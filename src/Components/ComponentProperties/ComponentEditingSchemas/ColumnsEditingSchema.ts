import { ComponentSchema } from '@appitsy/forms/types/ComponentSchema';

import {
  DisplayTab,
  Label,
  Name,
  Tabs,
} from './templates/common';

export const ColumnsEditingSchema: ComponentSchema[] = [
  Name,
  Tabs([
    DisplayTab([
      Label,
    ])
  ]),
]