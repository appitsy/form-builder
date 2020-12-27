import { ComponentSchema } from 'appitsy/types/ComponentSchema';
import {
  getDisplayNameForType,
  Types,
} from 'appitsy/types/Types';
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';

import { ComponentSchemaWithId } from '../Components/DesignerRenderer';

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
    setComponents: () => undefined,
    type,
    name: type + nameSuffix,
    display: {
      label: getDisplayNameForType(type) + ' ' + nameSuffix
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
        ...commonProperties, 
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

      panel.setComponents = function(components: ComponentSchemaWithId[]): void {
        this.components = components;
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

      tab1.setComponents = function(components: ComponentSchemaWithId[]): void {
        this.components = components;
      }

      const tabComponent: any = { 
        ...commonProperties,
        components: [ tab1 ] 
      }

      tabComponent.getComponents = function() {
        return this.components;
      }

      tabComponent.setComponents = function(components: ComponentSchemaWithId[]): void {
        this.components = components;
      }

      // tabComponent.insertTab = function() {
      //   this.components.push(newTab('', ''));
      // }
      
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

      table.setComponents = function(components: ComponentSchemaWithId[]): void {
        this.data.columns = components;
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

      objComponent.setComponents = function(components: ComponentSchemaWithId[]): void {
        this.components = components;
      }

      return objComponent;
    }
  
    default: return undefined;
  }
}

export const parseTypeFromJson = (json: any): ComponentSchemaWithId => {
  if (json.type === undefined) {
    throw new Error('Wrong JSON being parsed');
  }

  const defaultProps = getDefaultPropsForType(json.type, '');
  const props = JSON.parse(json);
  const component = _.assign(defaultProps, props) as ComponentSchemaWithId;

  const childComponents = component.getComponents();
  if (childComponents !== undefined) {
    component.setComponents(childComponents.map(x => parseTypeFromJson(x)));
  }

  return component;
}

export const prepareJsonSchema = (schema: ComponentSchemaWithId[]): ComponentSchema[] => {
  let jsonSchema: any[] = _.cloneDeep(schema);
  
  jsonSchema = jsonSchema.map(x => {
    if (x.getComponents() !== undefined) {
      x.setComponents(prepareJsonSchema(x.getComponents()));  
    }
    return x;
  })

  return jsonSchema.map((x: any) => {
      delete x.id;
      delete x.isEditing;
      delete x.previewComponent;
      delete x.getComponents;
      delete x.setComponents;

      return x;
  });
}
