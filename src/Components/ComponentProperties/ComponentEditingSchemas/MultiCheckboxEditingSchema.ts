import { ComponentSchema } from '@appitsy/forms/types/ComponentSchema';

import {
  ColumnNoLabel,
  DataTab,
  Description,
  Disabled,
  DisplayTab,
  Hidden,
  Label,
  Name,
  NumberInput,
  Table,
  Tabs,
  TextInput,
  ValidationsTab,
} from './templates/common';

export const MultiCheckboxEditingSchema: ComponentSchema[] = [
  Name,
  Tabs([
    DisplayTab([
      Label,
      Description,
      Hidden,
      Disabled,
    ]),
    DataTab([
      Table('checkboxes', 'Checkboxes', [
        TextInput('value', 'Value'),
        TextInput('label', 'Label'),
      ])
    ]),
    ValidationsTab([
      ColumnNoLabel([
        NumberInput('minSelected', 'Min Selected'),
        NumberInput('maxSelected', 'Max Selected'),
      ])
    ]),
  ])
]