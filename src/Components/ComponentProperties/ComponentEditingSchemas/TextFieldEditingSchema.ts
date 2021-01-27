import { ComponentSchema } from '@appitsy/forms/types/ComponentSchema';

import {
  BaseTextInputDataProperties,
  BaseTextInputDisplayProperties,
  ColumnNoLabel,
  DataTab,
  DisplayTab,
  InvalidChars,
  MaxLength,
  MinLength,
  Name,
  RequiredCheckbox,
  Tabs,
  ValidationsTab,
} from './templates/common';

export const TextFieldEditingSchema: ComponentSchema[] = [
  Name,
  Tabs([
    DisplayTab(BaseTextInputDisplayProperties),
    DataTab(BaseTextInputDataProperties),
    ValidationsTab([
      RequiredCheckbox,
      ColumnNoLabel([
        MinLength,
        MaxLength
      ]),
      InvalidChars,
    ])
  ])
];
