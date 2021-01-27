import { ComponentSchema } from '@appitsy/forms/types/ComponentSchema';

import {
  ColumnNoLabel,
  DataTab,
  DefaultValueNumberInput,
  Description,
  Disabled,
  DisplayTab,
  Hidden,
  Label,
  MaxLength,
  MaxValue,
  MinLength,
  MinValue,
  Name,
  Prefix,
  RequiredCheckbox,
  Suffix,
  Tabs,
  Tooltip,
  ValidationsTab,
} from './templates/common';

export const NumberEditingSchema: ComponentSchema[] = [
  Name,
  Tabs([
    DisplayTab([
      Label,
      Description,
      Prefix,
      Suffix,
      Tooltip,
      Disabled,
      Hidden,
    ]),
    DataTab([
      DefaultValueNumberInput,
    ]),
    ValidationsTab([
      RequiredCheckbox,
      ColumnNoLabel([
        MinValue,
        MaxValue,
      ]),
      ColumnNoLabel([
        MinLength,
        MaxLength,
      ])
    ]),
  ])
]