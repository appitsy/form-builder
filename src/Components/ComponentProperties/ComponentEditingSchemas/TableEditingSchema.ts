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

export const TableEditingSchema: ComponentSchema[] = [
  Name,
  Tabs([
    DisplayTab([
      ...BaseComponentDisplayProperties,
      Checkbox('minOneRow', 'Min One Row'),
      Checkbox('allowSorting', 'Allow Sorting'),
      Checkbox('allowAddRemove', 'Allow Add/Remove'),
    ]),
    DataTab(BaseComponentDataProperties),

  ])
];
