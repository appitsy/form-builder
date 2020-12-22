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
  const commonProperties = {
    id, 
    isEditing: false,
    getComponents: () => undefined,
    type,
    name: type + nameSuffix,
    display: {
      label: 'a' + nameSuffix
    },
  }
  switch (type) {
    case Types.TextField:
    case Types.TextArea:
    case Types.Email:
    case Types.Password:
    case Types.Number:
    case Types.Checkbox:
    case Types.Button:
        return { ...commonProperties };
    case Types.MultiCheckbox: {
      const multiCheckbox = { 
        ...ComponentTypes, 
        data: { 
          checkboxes: [
            {
              name: '',
              label: ''
            }
          ] 
        } 
      }

      return multiCheckbox as any as ComponentSchemaWithId;
    }
    case Types.Panel: {
      let panel: any = { 
        ...commonProperties,
        components: [],
      }

      panel.getComponents = function(): ComponentSchemaWithId[] {
        return this.components;
      }

      return panel as ComponentSchemaWithId;
    }
    case Types.Tabs: {
      const newTab = (name: string, label: string) => ({ 
        id: uuidv4(), 
        name, 
        display: { label }, 
        components: [], 
        canHaveChildComponents: true 
      });

      const tab1: any = newTab('tab1', 'Tab1');

      tab1.getComponents = function() {
        return this.components;
      }

      const tabComponent: any = { 
        ...commonProperties,
        components: [ tab1 ] 
      }

      tabComponent.getComponents = function() {
        return this.components;
      }

      tabComponent.insertTab = function() {
        this.components.push(newTab('', ''));
      }
      
      return tabComponent as ComponentSchemaWithId;
    }
    case Types.Table: {
      const table: any = { 
        ...commonProperties,
        data: { 
          columns: [] 
        },
      };

      table.getComponents = function () {
        return this.data.columns;
      }

      return table;
    }
    case Types.ObjectComponent: {
      const objComponent: any = { 
        ...commonProperties,
        components: [],
      };

      objComponent.getComponents = function () {
        return this.components;
      }

      return objComponent;
    }
  
    default: return undefined;
  }
}
