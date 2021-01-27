import { ComponentSchema } from '@appitsy/forms/types/ComponentSchema';

import {
  DataTab,
  DisplayTab,
  Name,
  ObjectNoLabel,
  Path,
  Table,
  Tabs,
  TextInput,
} from './templates/common';

export const TabsEditingSchema: ComponentSchema[] = [
  Name,
  Tabs([
    DisplayTab([
      {
        ...Table('components', 'Tabs', 
          [
            TextInput('name', 'Tab Name'),
            ObjectNoLabel('display', [
              TextInput('label', '')
            ])
          ]
        ),
        data: {
          path: "$.components",
          addNewDefault: "let tab = ({ \"id\": uuid(), components: [] }); tab;",
        }
      }
    ]),
    DataTab([
      Path,
    ])
  ])
]