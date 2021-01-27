export const TextInput = (name: string, label: string) => ({
	type: 'text',
	name,
	display: {
		label,
		hideLabel: label.length === 0
	}
});

export const NumberInput = (name: string, label: string) => ({
	type: 'number',
	name,
	display: {
		label,
	}
})

export const Checkbox = (name: string, label: string) => ({
	type: 'checkbox',
	name,
	display: {
		label
	}
});

export const Table = (name: string, label: string, components: any[]) => ({
	type: 'table',
	name,
	display: {
		label
	},
	components
})

/// DISPLAY Fields
export const Name = TextInput('name', 'Name');
export const Label = TextInput('label', 'Label');
export const HideLabel = Checkbox('hideLabel', 'Hide Label');
export const Description = TextInput('description', 'Description');
export const Prefix = TextInput('prefix', 'Prefix');
export const Tooltip = TextInput('tooltip', 'Tooltip');
export const Suffix = TextInput('suffix', 'Suffix');
export const Placeholder = TextInput('placeholder', 'Placeholder');
export const Hidden = Checkbox('hidden', 'Hidden');
export const Disabled = Checkbox('disabled', 'Disabled');

/// DATA Fields
export const Path = TextInput('path', 'Path')
export const DefaultValueTextInput = TextInput('defaultValue', 'Default Value');
export const DefaultValueNumberInput = NumberInput('defaultValue', 'Default Value');

/// VALIDATION fields
export const RequiredCheckbox = Checkbox('required', 'Required');
export const MinLength = TextInput('minLength', 'Min Length');
export const MaxLength = TextInput('maxLength', 'Max Length')
export const MinValue = TextInput('minValue', 'Min Value');
export const MaxValue = TextInput('maxValue', 'Max Value');
export const InvalidChars = TextInput('invalidChars', 'Invalid Characters');

export const ColumnNoLabel = (components: any[]) => ({
	type: 'columns',
	display: {
		hideLabel: true,
	},
	components,
})

export const ObjectNoLabel = (name: string, components: any[]) => ({
	type: "object",
	name,
	display: {
		hideLabel: true
	},
	components
})

export const Tabs = (tabs: any[]) => (
	{
    type: 'tabs',
    name: 'configTabs',
		components: tabs,
		data: {
			path: '$',
		}
	}
);

export const Tab = (name: string, label: string, components: any[]) => (
	{
		name,
		display: {
			label
		},
		components
	}
)

export const DisplayTab = (components: any[]) => Tab('display', 'Display', components);
export const DataTab = (components: any[]) => Tab('data', 'Data', components);
export const ValidationsTab = (components: any[]) => Tab('validations', 'Validations', components);

export const BaseComponentDisplayProperties = [
	Label,
	HideLabel,
];

export const BaseInputDisplayProperties = [
	...BaseComponentDisplayProperties,
	Description,
	Tooltip,
	ColumnNoLabel([
		Hidden,
		Disabled,
	])
]

export const BaseTextInputDisplayProperties = [
	...BaseComponentDisplayProperties,
	Placeholder,
	ColumnNoLabel([
		Prefix,
		Suffix,
	])
];

export const BaseComponentDataProperties = [
	Path,
];

export const BaseTextInputDataProperties = [
	...BaseComponentDataProperties,
	DefaultValueTextInput,
];

export const BaseTextInputValidationsProperties = [
	RequiredCheckbox,
	MinLength,
	MaxLength,
]