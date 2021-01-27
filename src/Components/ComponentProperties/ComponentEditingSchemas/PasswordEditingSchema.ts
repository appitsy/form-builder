import { ComponentSchema } from '@appitsy/forms/types/ComponentSchema';

import {
  BaseTextInputDisplayProperties,
  BaseTextInputValidationsProperties,
  DataTab,
  DisplayTab,
  Name,
  Path,
  Tabs,
  ValidationsTab,
} from './templates/common';

export const PasswordEditingSchema: ComponentSchema[] = [
  Name,
  Tabs([
    DisplayTab(BaseTextInputDisplayProperties),
    DataTab([
      Path,
    ]),
    ValidationsTab(BaseTextInputValidationsProperties)
  ])
];
