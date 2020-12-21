import { Types } from 'appitsy/types/Types';
import { ComponentSchemaWithId } from "../Components/DesignerRenderer";
import { v4 as uuidv4 } from 'uuid';

export const ComponentTypes = [
  Types.TextField,
  Types.TextArea,
  Types.Email,
  Types.Password,
  Types.Number,
  Types.Checkbox,
  Types.MultiCheckbox,
  Types.Button,
  Types.Panel,
  Types.Tabs,
  Types.Table,
  Types.ObjectComponent,
]

export const getDefaultPropsForType = (type: string, nameSuffix: string): ComponentSchemaWithId | undefined => {
  const id = uuidv4();
  switch (type) {
    case Types.TextField:
      return { id, isEditing: false, canHaveChildComponents: false, type, name: 'textField' + nameSuffix, display: { label: 'Text Field ' + nameSuffix } }
    case Types.TextArea:
      return { id, isEditing: false, canHaveChildComponents: false, type, name: 'textArea' + nameSuffix, display: { label: 'Text Area ' + nameSuffix } }
    case Types.Email:
      return { id, isEditing: false, canHaveChildComponents: false, type, name: 'email' + nameSuffix, display: { label: 'Email ' + nameSuffix } }
    case Types.Password:
      return { id, isEditing: false, canHaveChildComponents: false, type, name: 'password' + nameSuffix, display: { label: 'Password ' + nameSuffix } }
    case Types.Number:
      return { id, isEditing: false, canHaveChildComponents: false, type, name: 'number' + nameSuffix, display: { label: 'Number ' + nameSuffix } }
    case Types.Checkbox:
        return { id, isEditing: false, canHaveChildComponents: false, type, name: 'checkbox' + nameSuffix, display: { label: 'Checkbox ' + nameSuffix } }
    case Types.MultiCheckbox:
      return { id, isEditing: false, canHaveChildComponents: false, type: 'multi-checkbox', name: 'multi-checkbox' + nameSuffix, display: { label: 'Multi Checkbox ' + nameSuffix }, data: { checkboxes: [
        {
          name: '',
          label: ''
        }
      ] } }
      case Types.Button:
      return { id, isEditing: false, canHaveChildComponents: false, type, name: 'button' + nameSuffix, display: { label: 'Button ' + nameSuffix } }
    case Types.Panel:
      return { id, isEditing: false, canHaveChildComponents: true, components: [], type, name: 'panel' + nameSuffix, display: { label: 'Panel ' + nameSuffix } }
    case Types.Tabs: {
      const tab1 = { id: uuidv4(), name: 'tab1', display: { label: 'Tab1' }, components: [], canHaveChildComponents: true } as any as ComponentSchemaWithId;
      return { id, isEditing: false, canHaveChildComponents: true, components: [ tab1 ], type, name: 'tabs' + nameSuffix, display: { label: 'Tabs ' + nameSuffix } }
    }
    case Types.Table: 
      return { id, isEditing: false, canHaveChildComponents: true, components: [], type: 'table', name: 'table' + nameSuffix, data: { columns: [] } };
    case Types.ObjectComponent: 
      return { id, isEditing: false, canHaveChildComponents: true, components: [], type, name: 'object' + nameSuffix };
  
    default: return undefined;
  }
}
