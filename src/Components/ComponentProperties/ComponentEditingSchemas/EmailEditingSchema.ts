import { ComponentSchema } from '@appitsy/forms/types/ComponentSchema';

import {
  DataTab,
  DefaultValueTextInput,
  DisplayTab,
  Label,
  MaxLength,
  MinLength,
  Name,
  Path,
  Prefix,
  RequiredCheckbox,
  Suffix,
  Tabs,
  ValidationsTab,
} from './templates/common';

export const EmailEditingSchema: ComponentSchema[] = [
  Name,
  Tabs([
    DisplayTab([
      Label,
      Prefix,
      Suffix,
    ]),
    DataTab([
      Path,
      DefaultValueTextInput,
    ]),
    ValidationsTab([
      RequiredCheckbox,
      MinLength,
      MaxLength,
    ])
  ])
]