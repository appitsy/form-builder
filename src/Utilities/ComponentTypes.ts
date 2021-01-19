import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';

import { ComponentSchema } from '@appitsy/forms/types/ComponentSchema';
import {
  TableRowExpandedTypeName,
} from '@appitsy/forms/types/DataComponentSchema';
import {
  getDisplayNameForType,
  Types,
} from '@appitsy/forms/types/Types';

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
  Types.Columns,
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

  return tab;
}

const createTableRow = (): any => {
  return {
    id: uuidv4(),
    name: TableRowExpandedTypeName,
    type: TableRowExpandedTypeName,
    components: []
  };
}

export const getDefaultPropsForType = (type: string): ComponentSchemaWithId | undefined => {
  const id = uuidv4();
  const commonProperties = {
    id, 
    isEditing: false,
    components: undefined,
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
    case Types.Columns:
    case Types.Panel: 
    {
      let panelOrColumns: any = { 
        ...commonProperties,
        components: [],
      }

      return panelOrColumns as ComponentSchemaWithId;
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

      return tabComponent as ComponentSchemaWithId;
    }
    case Types.Table: {
      const table: any = { 
        ...commonProperties,
        components: [
          createTableRow()
        ],
        data: { 
          allowSorting: true,
          allowAddRemove: true,
        },
      };

      return table;
    }
    case Types.ObjectComponent: {
      const objComponent: any = { 
        ...commonProperties,
        components: [],
      };

      return objComponent;
    }
  
    default: return undefined;
  }
}

export const parseComponentJson = (json: any): ComponentSchemaWithId => {
  if (json.type === undefined) {
    throw new Error('Wrong JSON being parsed');
  }

  // get default
  const defaultProps = getDefaultPropsForType(json.type) || {};
  const component = _.assign(defaultProps, json) as ComponentSchemaWithId;

  const childComponents = component.components;
  if (childComponents !== undefined) {
    switch (component.type) {
      case Types.Tabs:
        component.components = childComponents.map((x: any) => { 
          const tab: any = createNewTab(x);
          tab.components = x.components?.map((y: any) => parseComponentJson(y)) || [];
          return tab;
        });
        break;
      case Types.Table:
        // Add back expanded rows if not present to make components droppable into it
        if (!childComponents.some(x => x.type === TableRowExpandedTypeName)) {
          component.components = [ 
            ...childComponents,
            createTableRow(),
          ]
        }
        break;
      default:
        component.components = childComponents.map(x => parseComponentJson(x));
    }
  }

  return component;
}

export const prepareJsonSchema = (schema: ComponentSchemaWithId[]): ComponentSchema[] => {
  let jsonSchema: any[] = _.cloneDeep(schema);
  
  jsonSchema = jsonSchema.map(x => {
    if (x.components !== undefined) {
      x.components = prepareJsonSchema(x.components); 
    }
    return x;
  });

  jsonSchema = jsonSchema.map(x => {
    // remove expanded rows if they are empty
    if (x.type === Types.Table) {
      x.components = x.components.filter((y: any) => !(y.type === TableRowExpandedTypeName && y.components?.length === 0));
    }

    return x;
  });

  return jsonSchema.map((x: any) => {
      delete x.id;
      delete x.isEditing;
      delete x.previewComponent;

      if (x.components === undefined) {
        delete x.components;
      }

      return x;
  });
}
