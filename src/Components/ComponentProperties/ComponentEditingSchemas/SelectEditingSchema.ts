import { ComponentSchema } from '@appitsy/forms/types/ComponentSchema';

import {
  BaseTextInputDisplayProperties,
  ColumnNoLabel,
  DataTab,
  DisplayTab,
  Name,
  NumberInput,
  Path,
  Table,
  Tabs,
  TextInput,
  ValidationsTab,
} from './templates/common';

export const SelectEditingSchema: ComponentSchema[] = [
  Name,
  Tabs([
    DisplayTab(BaseTextInputDisplayProperties),
    DataTab([
      Path,
      Table('options', 'Options', [
        TextInput('value', 'Value'),
        TextInput('label', 'Label'),
      ])
    ]),
    ValidationsTab([
      ColumnNoLabel([
        NumberInput('minSelected', 'Min Selected'),
        NumberInput('maxSelected', 'Max Selected'),
      ])
    ])
  ])
]