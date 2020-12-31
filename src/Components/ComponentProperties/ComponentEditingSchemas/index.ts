import { Types } from 'appitsy/types/Types';

import { ButtonEditingSchema } from './ButtonEditingSchema';
import { CheckboxEditingSchema } from './CheckboxEditingSchema';
import { EmailEditingSchema } from './EmailEditingSchema';
import { MultiCheckboxEditingSchema } from './MultiCheckboxEditingSchema';
import { NumberEditingSchema } from './NumberEditingSchema';
import { ObjectEditingSchema } from './ObjectEditingSchema';
import { PanelEditingSchema } from './PanelEditingSchema';
import { PasswordEditingSchema } from './PasswordEditingSchema';
import { RadioEditingSchema } from './RadioEditingSchema';
import { SelectEditingSchema } from './SelectEditingSchema';
import { TableEditingSchema } from './TableEditingSchema';
import { TabsEditingSchema } from './TabsEditingSchema';
import { TextAreaEditingSchema } from './TextAreaEditingSchema';
import { TextFieldEditingSchema } from './TextFieldEditingSchema';

export const ComponentEditingSchemas = {
    [Types.TextField]: TextFieldEditingSchema,
    [Types.TextArea]: TextAreaEditingSchema,
    [Types.Email]: EmailEditingSchema,
    [Types.Number]: NumberEditingSchema,
    [Types.Checkbox]: CheckboxEditingSchema,
    [Types.MultiCheckbox]: MultiCheckboxEditingSchema,
    [Types.Password]: PasswordEditingSchema,
    [Types.Select]: SelectEditingSchema,
    [Types.Radio]: RadioEditingSchema,
    [Types.Button]: ButtonEditingSchema,
    [Types.Panel]: PanelEditingSchema,
    [Types.Tabs]: TabsEditingSchema,

    [Types.Table]: TableEditingSchema,
    [Types.ObjectComponent]: ObjectEditingSchema,
}