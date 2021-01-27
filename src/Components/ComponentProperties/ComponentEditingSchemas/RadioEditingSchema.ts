import { ComponentSchema } from '@appitsy/forms/types/ComponentSchema';

import {
  BaseTextInputDisplayProperties,
  DataTab,
  DisplayTab,
  Name,
  Table,
  Tabs,
  TextInput,
  ValidationsTab,
} from './templates/common';

export const RadioEditingSchema: ComponentSchema[] = [
  Name,
  Tabs([
    DisplayTab(BaseTextInputDisplayProperties),
    DataTab([
      Table('options', 'Options', [
        TextInput('value', 'Value'),
        TextInput('label', 'Label'),
      ])
    ]),
    ValidationsTab([]),
  ])
]