import { ComponentSchema } from '@appitsy/forms/types/ComponentSchema';

import {
  DataTab,
  DisplayTab,
  Label,
  Name,
  Path,
  RequiredCheckbox,
  Tabs,
  ValidationsTab,
} from './templates/common';

const DefaultValueCheckbox = {
  type: "checkbox",
  name: "defaultValue",
  display: {
    label: "Default Value"
  }
};

export const CheckboxEditingSchema: ComponentSchema[] = [
  Name,
  Tabs([
    DisplayTab([
      Label,
    ]),
    DataTab([
      Path,
      DefaultValueCheckbox
    ]),
    ValidationsTab([
      RequiredCheckbox,
    ])
  ])
];