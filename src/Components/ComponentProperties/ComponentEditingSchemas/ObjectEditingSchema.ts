import { ComponentSchema } from '@appitsy/forms/types/ComponentSchema';

import {
  BaseComponentDataProperties,
  BaseComponentDisplayProperties,
  DataTab,
  DisplayTab,
  Name,
  Tabs,
} from './templates/common';

export const ObjectEditingSchema: ComponentSchema[] = [
  Name,
  Tabs([
    DisplayTab(BaseComponentDisplayProperties),
    DataTab(BaseComponentDataProperties),
  ]),
]