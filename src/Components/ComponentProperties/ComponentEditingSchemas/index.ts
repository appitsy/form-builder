import { ComponentSchema } from '@appitsy/forms/types/ComponentSchema';
import { TabsTypeName } from '@appitsy/forms/types/LayoutComponentSchema';
import { Types } from '@appitsy/forms/types/Types';

import { ButtonEditingSchema } from './ButtonEditingSchema';
import { CheckboxEditingSchema } from './CheckboxEditingSchema';
import { ColumnsEditingSchema } from './ColumnsEditingSchema';
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

const logicTabComponents: any[] = [
//   {
//     "type": "text",
//     "name": "name",
//     "display": {
//       "label": "Name",
//       "placeholder": "",
//       "prefix": "",
//       "suffix": ""
//     },
//     "validations": {
//       "maxLength": ""
//     }
//   },
//   {
//     "type": "text",
//     "name": "code",
//     "display": {
//       "label": "Expression",
//       "placeholder": "",
//       "prefix": "",
//       "suffix": ""
//     }
//   }
];

const AddLogicTab = (type: string, schema: ComponentSchema[]) => {
	const rootElementsLength = schema.length;
	if (schema[rootElementsLength - 1].type !== TabsTypeName) {
		throw new Error(`schema for component type '${type}' doesn't contain a tabs component`);
	}
	// const configTabForComponent = schema[rootElementsLength - 1] as TabsProps;
	// configTabForComponent.components?.push({
	// 	name: "logic",
	// 	display: {
	// 		label: "Logic"
	// 	},
	// 	components: logicTabComponents
	// });

	return schema;
}

const ComponentEditingSchemas = {
	[Types.TextField]: AddLogicTab(Types.TextField, TextFieldEditingSchema),
	[Types.TextArea]: AddLogicTab(Types.TextArea, TextAreaEditingSchema),
	[Types.Email]: AddLogicTab(Types.Email, EmailEditingSchema),
	[Types.Number]: AddLogicTab(Types.Number, NumberEditingSchema),
	[Types.Checkbox]: AddLogicTab(Types.Checkbox, CheckboxEditingSchema),
	[Types.MultiCheckbox]: AddLogicTab(Types.MultiCheckbox, MultiCheckboxEditingSchema),
	[Types.Password]: AddLogicTab(Types.Password, PasswordEditingSchema),
	[Types.Select]: AddLogicTab(Types.Select, SelectEditingSchema),
	[Types.Radio]: AddLogicTab(Types.Radio, RadioEditingSchema),
	[Types.Button]: AddLogicTab(Types.Button, ButtonEditingSchema),
	[Types.Panel]: AddLogicTab(Types.Panel, PanelEditingSchema),
	[Types.Columns]: AddLogicTab(Types.Columns, ColumnsEditingSchema),
	[Types.Tabs]: AddLogicTab(Types.Tabs, TabsEditingSchema),

	[Types.Table]: AddLogicTab(Types.Table, TableEditingSchema),
	[Types.ObjectComponent]: AddLogicTab(Types.ObjectComponent, ObjectEditingSchema),
}

export { ComponentEditingSchemas };