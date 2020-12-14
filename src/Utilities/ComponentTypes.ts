import { Types } from 'appitsy/types/Types';
import { ComponentSchemaWithId } from "../Components/DesignerRenderer";
import { v4 as uuidv4 } from 'uuid';

export const ComponentTypes = [
  Types.TextField,
  Types.TextArea,
  Types.Email,
  Types.Password,
  Types.Number,
  Types.Button,
  Types.Panel,
  Types.Tabs,
]

export const getDefaultPropsForType = (componentType: string, nameSuffix: string): ComponentSchemaWithId | undefined => {
  const id = uuidv4();
  switch (componentType) {
    case Types.TextField:
      return { id, isEditing: false, canHaveChildComponents: false, type: 'text', name: 'textField' + nameSuffix, display: { label: 'Text Field ' + nameSuffix } }
    case Types.TextArea:
      return { id, isEditing: false, canHaveChildComponents: false, type: Types.TextArea, name: 'textArea' + nameSuffix, display: { label: 'Text Area ' + nameSuffix } }
    case Types.Email:
      return { id, isEditing: false, canHaveChildComponents: false, type: Types.Email, name: 'email' + nameSuffix, display: { label: 'Email ' + nameSuffix } }
    case Types.Password:
      return { id, isEditing: false, canHaveChildComponents: false, type: Types.Password, name: 'password' + nameSuffix, display: { label: 'Password ' + nameSuffix } }
    case Types.Number:
      return { id, isEditing: false, canHaveChildComponents: false, type: Types.Number, name: 'number' + nameSuffix, display: { label: 'Number ' + nameSuffix } }
    case Types.Button:
      return { id, isEditing: false, canHaveChildComponents: false, type: Types.Button, name: 'button' + nameSuffix, display: { label: 'Button ' + nameSuffix } }
    case Types.Panel:
      return { id, isEditing: false, canHaveChildComponents: true, components: [], type: 'panel', name: 'panel' + nameSuffix, display: { label: 'Panel ' + nameSuffix } }
    case Types.Tabs: {
      const tab1 = { id: uuidv4(), name: 'tab1', display: { label: 'Tab1' }, components: [], canHaveChildComponents: true } as any as ComponentSchemaWithId;
      return { id, isEditing: false, canHaveChildComponents: true, components: [ tab1 ], type: 'tabs', name: 'tabs' + nameSuffix, display: { label: 'Tabs ' + nameSuffix } }
    }
  
    default: return undefined;
  }
}
