import { Types } from 'appitsy/dist/types/Types';
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
]

export const getDefaultPropsForType = (componentType: string, nameSuffix: string): ComponentSchemaWithId | undefined => {
  const id = uuidv4();
  switch (componentType) {
    case Types.TextField:
      return { id, canHaveChildComponents: false, type: Types.TextField, name: 'textField' + nameSuffix, display: { label: 'Text Field ' + nameSuffix } }
    case Types.TextArea:
      return { id, canHaveChildComponents: false, type: Types.TextArea, name: 'textArea' + nameSuffix, display: { label: 'Text Area ' + nameSuffix } }
    case Types.Email:
      return { id, canHaveChildComponents: false, type: Types.Email, name: 'email' + nameSuffix, display: { label: 'Email ' + nameSuffix } }
    case Types.Password:
      return { id, canHaveChildComponents: false, type: Types.Password, name: 'password' + nameSuffix, display: { label: 'Password ' + nameSuffix } }
    case Types.Number:
      return { id, canHaveChildComponents: false, type: Types.Number, name: 'number' + nameSuffix, display: { label: 'Number ' + nameSuffix } }
    case Types.Button:
      return { id, canHaveChildComponents: false, type: Types.Button, name: 'button' + nameSuffix, display: { label: 'Button ' + nameSuffix } }
    case Types.Panel:
      return { id, canHaveChildComponents: true, components: [], type: Types.Panel, name: 'panel' + nameSuffix, display: { label: 'Panel ' + nameSuffix } }

    default: return undefined;
  }
}
