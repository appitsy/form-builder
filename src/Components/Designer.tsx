import styled from "@emotion/styled";
import React, { useState } from "react";
import ComponentList from "./ComponentList";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DroppableRenderer } from "./DroppableRenderer";
import { getDefaultPropsForType } from "../Utilities/ComponentTypes";
import cloneDeep from "lodash-es/cloneDeep";
import { ComponentSchemaWithId } from "./DesignerRenderer";
import { remove } from "lodash-es";
import { ComponentSchema } from "appitsy/dist/types/ComponentSchema";
import { v4 as uuidv4 } from 'uuid';

const DesignerPage = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
`;

const ComponentListContainer = styled.div`
  width: 240px;
`;

const DesignerPreview = styled.div`
  flex: 1;
`;

export const ROOT_ID = 'root';
export const ROOT_PATH = '';

// const getTextField = () => ({
//   name: "text-" + new Date().getMilliseconds(),
//   type: "text",
//   data: {
//     defaultValue: "asd",
//   },
//   validations: {
//     minLength: 10,
//   },
// });

const Designer = () => {
  const [data] = useState<Object>({});
  const [schema, setSchema] = useState<ComponentSchemaWithId[]>([]);

  const onDrop = (componentEl: any) => {
    if (componentEl.operation === "drop") {
      let newComponentProps: ComponentSchema | undefined = getDefaultPropsForType(componentEl.type, "1");

      if (!newComponentProps) {
        return
      }

      let newComponent: ComponentSchemaWithId = { ...newComponentProps,  id: uuidv4() } as any;

      if (!newComponent) {
        return;
      }

      const schemaCopy = cloneDeep(schema);

      if (componentEl.parent === ROOT_PATH) {
        insertNewComponentAtEndOfParent(schemaCopy, newComponent);
      } else {
        const parentComponent = findComponentById(componentEl.parent, schemaCopy);
        insertNewComponentAtEndOfParent((parentComponent as any)?.components || schemaCopy, newComponent);
      }

      setSchema(schemaCopy);
    }
    else if (componentEl.operation === 'move') {
      const schemaCopy = cloneDeep(schema);
      const { component, parent: oldParentComponent } = findComponentById(componentEl.id, schemaCopy);

      if (!component) {
        return;
      }

      removeComponent(oldParentComponent?.components || schemaCopy, component.id);

      if (componentEl.parent === ROOT_ID) {
        insertNewComponentAtEndOfParent(schemaCopy, component);
      } else {
        const { component: newParent } = findComponentById(componentEl.parent, schemaCopy);

        if (!newParent) {
          return;
        }
  
        if (!newParent?.components) {
          newParent.components = [];
        }
  
        insertNewComponentAtEndOfParent(newParent.components, component);
      }
      setSchema(schemaCopy);
    }
  };

  const onDelete = (componentId: string) => {
    const schemaCopy = cloneDeep(schema);
    const { component, parent } = findComponentById(componentId, schemaCopy);

    if (!component) {
      return;
    }

    if (parent) {
      if (parent.components) {
        removeComponent(parent.components, component.id);
      }
    } else {
      removeComponent(schemaCopy, component.id);
    }
    
    setSchema(schemaCopy);
  };

  const moveComponent = (id: string, newParentId: string) => {
    const schemaCopy = cloneDeep(schema);
    const { component, parent: oldParentComponent } = findComponentById(id, schemaCopy);

    if(!component) {
      return;
    }

    if (!oldParentComponent) {
      removeComponent(schemaCopy, id);
    } else {
      removeComponent(oldParentComponent.components!, id);
    }

    const { parent: newParent } = findComponentById(newParentId, schemaCopy);
    if (!newParent) {
      return;
    }

    if (!newParent.components) {
      newParent.components = [];
    }

    insertComponent(newParent.components, newParent.components.length, component);
    setSchema(schemaCopy);
  };

  const moveAdjacent = (id: string, adjacentComponentId: string) => {
    const schemaCopy = cloneDeep(schema);
    const { component, parent: oldParentComponent } = findComponentById(id, schemaCopy);

    if(!component) {
      return;
    }

    if (!oldParentComponent) {
      removeComponent(schemaCopy, id);
    } else {
      removeComponent(oldParentComponent.components!, id);
    }

    const { component: adjacentComponent, parent: newParent } = findComponentById(adjacentComponentId, schemaCopy);
    if (!adjacentComponent) {
      return;
    }

    if (!newParent) {
      // parent is not there but found adjacent component
      // means the adjacent component is in the root
      insertComponent(schemaCopy, schemaCopy.indexOf(adjacentComponent), component);
    } else {
      if (!newParent.components) {
        // shouldn't be the case
        alert('meh?');
        return;
      }

      insertComponent(newParent.components, newParent.components.indexOf(adjacentComponent), component); 
    }
    
    setSchema(schemaCopy);
  }

  const findComponentById = (id: string, findInSchema: ComponentSchemaWithId[]): { component: ComponentSchemaWithId | undefined, parent: ComponentSchemaWithId | undefined } => {
    let component = findInSchema.find(c => c.id === id);
    let parent: any = undefined;
    if (component) {
      return { component, parent: undefined };
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let _ = findInSchema.some(c => {
      let cx = c as any;

      if (!cx.components) {
        return false;
      }

      ({ component } = findComponentById(id, cx.components));
      if (component) {
        parent = cx;
      }

      return !!component;
    });

    return { component, parent };
  }

  const removeComponent = (componentArray: ComponentSchemaWithId[], componentId: string) => {
    remove(componentArray, x => x.id === componentId);
  }

  const insertComponent = (componentArray: ComponentSchemaWithId[], atIndex: number, component: ComponentSchemaWithId) => {
    componentArray.splice(atIndex, 0, component);
  }

  const insertNewComponentAtEndOfParent = (componentArray: ComponentSchemaWithId[], component: ComponentSchemaWithId) => {
      componentArray.push(component);
  }

  return (
    <DesignerPage>
      <DndProvider backend={HTML5Backend}>
        <ComponentListContainer className="bg-light">
          <ComponentList />
        </ComponentListContainer>

        <DesignerPreview>
          <DroppableRenderer
            schema={schema}
            data={data}
            onDrop={onDrop}
            onDelete={onDelete}
            moveComponent={moveComponent}
            moveAdjacent={moveAdjacent}
          />
        </DesignerPreview>
      </DndProvider>
    </DesignerPage>
  );
};

export default Designer;
