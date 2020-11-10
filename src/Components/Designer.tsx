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
      let newComponent: ComponentSchemaWithId | undefined = getDefaultPropsForType(componentEl.type, "1");

      if (!newComponent) {
        return;
      }

      const schemaCopy = cloneDeep(schema);

      if (componentEl.parent === ROOT_PATH) {
        insertNewComponentAtIndex(schemaCopy, newComponent, -1);
      } else {
        const { component: parentComponent, parent: grandParentComponent } = findComponentById(componentEl.parent, schemaCopy);

        if (parentComponent && parentComponent.components) {
          insertNewComponentAtIndex(parentComponent.components, newComponent, -1);
        } else if (grandParentComponent) {
          // grand parents children should obviously be there
          // otherwise we would have not got this
          const parentIndex = grandParentComponent.components!.findIndex((x: ComponentSchemaWithId) => x.id === parentComponent?.id);
          insertNewComponentAtIndex(grandParentComponent.components!, newComponent, parentIndex);
        } else {
          const parentIndex = schemaCopy.findIndex((x: ComponentSchemaWithId) => x.id === parentComponent?.id);
          insertNewComponentAtIndex(schemaCopy, newComponent, parentIndex);
        }
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
        insertNewComponentAtIndex(schemaCopy, component, -1);
      } else {
        const { component: newParent, parent: newGrandParentComponent } = findComponentById(componentEl.parent, schemaCopy);

        if (!newParent) {
          return;
        }

        if (newParent.components) {
          insertNewComponentAtIndex(newParent.components!, component, -1);
        } else if (newGrandParentComponent) {
          const parentIndex = newGrandParentComponent.components!.findIndex((x: ComponentSchemaWithId) => x.id === newParent.id);
          insertNewComponentAtIndex(newGrandParentComponent.components!, component, parentIndex);
        } else {
          const parentIndex = schemaCopy.findIndex((x: ComponentSchemaWithId) => x.id === newParent.id);
          insertNewComponentAtIndex(newParent.components!, component, parentIndex);
        }
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

    insertComponent(newParent.components!, newParent.components!.length, component);
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

  const insertNewComponentAtIndex = (componentArray: ComponentSchemaWithId[], component: ComponentSchemaWithId, atIndex: number) => {
    if(atIndex === -1) {
      componentArray.push(component);
      return;
    }
      
    componentArray.splice(atIndex, 0, component);
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
