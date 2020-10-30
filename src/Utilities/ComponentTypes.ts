import { ComponentSchema } from "appitsy/dist/types/ComponentSchema"
import { Types } from 'appitsy/dist/types/Types';

export const ComponentTypes = [
  Types.TextField,
  Types.TextArea,
  Types.Email,
  Types.Password,
  Types.Number,
  Types.Button,
  Types.Panel,
]

export const getDefaultPropsForType = (componentType: string, nameSuffix: string): ComponentSchema | null => {
  switch (componentType) {
    case Types.TextField:
      return { type: Types.TextField, name: 'textField' + nameSuffix, display: { label: 'Text Field ' + nameSuffix } }
    case Types.TextArea:
      return { type: Types.TextArea, name: 'textArea' + nameSuffix, display: { label: 'Text Area ' + nameSuffix } }
    case Types.Email:
      return { type: Types.Email, name: 'email' + nameSuffix, display: { label: 'Email ' + nameSuffix } }
    case Types.Password:
      return { type: Types.Password, name: 'password' + nameSuffix, display: { label: 'Password ' + nameSuffix } }
    case Types.Number:
      return { type: Types.Number, name: 'number' + nameSuffix, display: { label: 'Number ' + nameSuffix } }
    case Types.Button:
      return { type: Types.Button, name: 'button' + nameSuffix, display: { label: 'Button ' + nameSuffix } }
    case Types.Panel:
      return { type: Types.Panel, name: 'panel' + nameSuffix, display: { label: 'Panel ' + nameSuffix } }

    default: return null;
  }
}
