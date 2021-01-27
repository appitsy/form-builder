import { ComponentSchema } from '@appitsy/forms/types/ComponentSchema';

import {
  DisplayTab,
  Label,
  Name,
  Tabs,
  TextInput,
} from './templates/common';

export const ButtonEditingSchema: ComponentSchema[] = [
  Name,
  TextInput('style', 'Style'),
  Tabs([
    DisplayTab([
      Label,
      TextInput('leftIcon', 'Left Icon'),
      TextInput('rightIcon', 'Right Icon'),
    ])
  ])
];