import { ComponentSchema } from 'appitsy/types/ComponentSchema';
import {
  getDisplayNameForType,
  Types,
} from 'appitsy/types/Types';
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';

import { ComponentSchemaWithId } from '../Components/DesignerRenderer';

export const BasicComponentTypes = [
  Types.TextField,
  Types.TextArea,
  Types.Number,
  Types.Email,
  Types.Button,
  Types.Password,
  Types.Checkbox,
  Types.MultiCheckbox,
  Types.Select,
  Types.Radio,
]

export const LayoutComponentTypes = [
  Types.Panel,
  Types.Tabs,
]

export const DataComponentTypes = [
  Types.Table,
  Types.ObjectComponent,
]

export const ComponentTypes = [
  ...BasicComponentTypes,
  ...LayoutComponentTypes,
  ...DataComponentTypes,
]

const createNewTab = (tabProperties: any) => {
  const tab = {
    ...tabProperties, 
    id: uuidv4(), 
    components: [],
  }

  tab.getComponents = function() {
    return this.components;
  }

  tab.setComponents = function(components: ComponentSchemaWithId[]): void {
    this.components = components;
  }

  return tab;
}

export const getDefaultPropsForType = (type: string): ComponentSchemaWithId | undefined => {
  const id = uuidv4();
  const commonProperties = {
    id, 
    isEditing: false,
    getComponents: () => undefined,
    setComponents: () => undefined,
    type,
    name: type,
    display: {
      label: getDisplayNameForType(type)
    },
  }
  switch (type) {
    case Types.TextField:
    case Types.TextArea:
    case Types.Email:
    case Types.Number:
    case Types.Checkbox:
      return { ...commonProperties };
    case Types.Button:
      return _.defaultsDeep(
        {
          text: 'Submit',
          style: 'primary'
        },
        commonProperties);
    case Types.Password:
      return _.defaultsDeep(
        {          
          display: {
            placeholder: '********',
          },
        },
        commonProperties);
    case Types.Radio:
    case Types.Select: 
    // COMMON code for radio & select
    {
      const selectOrRadio = {
        ...commonProperties,
        data: {
          options: [
            {
              value: '',
              label: '',
            }
          ]
        }
      };

      return selectOrRadio as any as ComponentSchemaWithId;
    }
    case Types.MultiCheckbox: {
      const multiCheckbox = { 
        ...commonProperties, 
        data: { 
          checkboxes: [
            {
              value: '',
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
      const tab1 = createNewTab({
        name: 'tab1',
        display: {
          label: 'Tab1',
        },
      })
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

      return tabComponent as ComponentSchemaWithId;
    }
    case Types.Table: {
      const table: any = { 
        ...commonProperties,
        data: { 
          columns: [],
          allowSorting: true,
          allowAddRemove: true,
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

  // get default
  const defaultProps = getDefaultPropsForType(json.type) || {};
  const component = _.assign(defaultProps, json) as ComponentSchemaWithId;

  const childComponents = component.getComponents();
  if (childComponents !== undefined) {
    switch (component.type) {
      case Types.Tabs:
        component.setComponents(childComponents.map((x: any) => { 
            const tab: any = createNewTab(x);
            const tabChildren = x.components?.map((y: any) => parseTypeFromJson(y)) || [];
            tab.setComponents(tabChildren);
            return tab;
          })
        );
        break;
      default:
        component.setComponents(childComponents.map(x => parseTypeFromJson(x)));
    }
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
