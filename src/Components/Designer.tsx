import React, { useState } from 'react';

import { remove } from 'lodash-es';
import cloneDeep from 'lodash-es/cloneDeep';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Modal from 'react-modal';

import styled from '@emotion/styled';

import { getDefaultPropsForType } from '../Utilities/ComponentTypes';
import ComponentList from './ComponentList';
import { ComponentSchemaWithId } from './DesignerRenderer';
import { DroppableRenderer } from './DroppableRenderer';
import { NewComponentConfirmForm } from './NewComponentConfirmForm';
import { PreviewComponentSchema } from './PreviewComponent';

const DesignerPage = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
`;

const ComponentListContainer = styled.div`
  width: 300px;
`;

const DesignerPreview = styled.div`
  flex: 1;
`;

const NewComponentConfirmModalWrapper = styled.div`
  height: 100%;
  display: flex;
  
`;

const NewComponentConfirmModal = styled(Modal)`
  height: 100%;
  width: 350px;
  margin: auto;
  padding-top: 300px;
  outline: none;
`;

const NewComponentConfirmFormWrapper = styled.div`
  border: 2px solid grey;
  border-radius: 5px;
`;

export const ROOT_ID = 'root';
export const ROOT_PATH = '';

export interface RootComponent {
  components: ComponentSchemaWithId[];
  preview?: PreviewComponentSchema;
}

interface NewComponentDroppedInfo {
  componentId: string;
  componentType: string;
}

interface DesignerProps {
  schema: ComponentSchemaWithId[];
  onSchemaChange?: (updatedSchema: ComponentSchemaWithId[]) => void;
}

const Designer = (props: DesignerProps) => {
  const [data] = useState<Object>({});
  const [rootComponent, setRootComponent] = useState<RootComponent>({ components: props.schema });
  const [editingComponent, setEditingComponent] = useState<ComponentSchemaWithId>();
  const [previewComponentParentId, setPreviewComponentParentId] = useState<string>();
  const [newComponentDropped, setNewComponentDropped] = useState<NewComponentDroppedInfo | undefined>(undefined);

  const updateRootComponent = (root: RootComponent, newEditComponent?: ComponentSchemaWithId): void => {
    setRootComponent(root);
    
    if (props.onSchemaChange) {
      props.onSchemaChange(root.components);
    }

    if (newEditComponent) {
      setEditingComponent(newEditComponent);
    } else if (editingComponent) {
      // re-trigger editing component change if any is selected
      const { component: updatedEditingComponent } = findComponentById(editingComponent.id, root.components);
      setEditingComponent(updatedEditingComponent);
    }
  };

  const onDrop = (componentEl: any) => {
    if (componentEl.operation === "drop") {
      let newComponent: ComponentSchemaWithId | undefined = getDefaultPropsForType(componentEl.type);

      if (!newComponent) {
        return;
      }

      const rootComponentCopy = cloneDeep(rootComponent);

      if (componentEl.parent === ROOT_PATH) {
        insertNewComponentAtIndex(rootComponentCopy, rootComponentCopy.components, newComponent, -1);
      } else {
        const { component: parentComponent, parent: grandParentComponent } = findComponentById(componentEl.parent, rootComponentCopy.components);
        const parentChildComponents = parentComponent?.getComponents();

        if (parentChildComponents) {
          insertNewComponentAtIndex(rootComponentCopy, parentChildComponents, newComponent, -1);
        } else {
          // grand parents children or if not present the root components
          const grandParentChildren = grandParentComponent?.getComponents() || rootComponentCopy.components;
          const parentIndex = grandParentChildren.findIndex((x: ComponentSchemaWithId) => x.id === parentComponent?.id);
          const isAfter = componentEl.isAfter === true;
          insertNewComponentAtIndex(rootComponentCopy, grandParentChildren, newComponent, parentIndex + (isAfter ? 1 : 0));
        }
      }
    }
    else if (componentEl.operation === 'move') {
      const rootComponentCopy = cloneDeep(rootComponent);
      const { component, parent: oldParentComponent } = findComponentById(componentEl.id, rootComponentCopy.components);

      if (!component) {
        return;
      }

      removeComponent(oldParentComponent?.getComponents() || rootComponentCopy.components, component.id);

      if (componentEl.parent === ROOT_ID) {
        insertNewComponentAtIndex(rootComponentCopy, rootComponentCopy.components, component, -1);
      } else {
        const { component: newParent, parent: newGrandParentComponent } = findComponentById(componentEl.parent, rootComponentCopy.components);

        if (!newParent) {
          return;
        }

        const newParentChildren = newParent.getComponents();

        if (newParentChildren) {
          insertNewComponentAtIndex(rootComponentCopy, newParentChildren, component, -1);
        } else {
          const newGrandParentChildren = newGrandParentComponent?.getComponents() || rootComponentCopy.components;
          const parentIndex = newGrandParentChildren.findIndex((x: ComponentSchemaWithId) => x.id === newParent.id);
          insertNewComponentAtIndex(rootComponentCopy, newGrandParentChildren, component, parentIndex);
        }
      }
    }
  };

  const onEditWithId = (componentId: string) => {
    const rootComponentCopy = cloneDeep(rootComponent);
    const { component } = findComponentById(componentId, rootComponentCopy.components);

    if (component === undefined) {
      return;
    }

    onEditWithComponentInternal(component, rootComponentCopy);
  }

  const onEditWithComponent = (component: ComponentSchemaWithId) => {
    const rootComponentCopy = cloneDeep(rootComponent);
    onEditWithComponentInternal(component, rootComponentCopy);
  }

  const onEditWithComponentInternal = (component: ComponentSchemaWithId, rootComponentCopy: RootComponent) => {
      // clear the earlier editing component
      if (editingComponent !== undefined) {
        const { component: previousEditingComponent } = findComponentById(editingComponent.id, rootComponentCopy.components);  
        if (previousEditingComponent) {
          previousEditingComponent.isEditing = false;
        }
      }
  
      component.isEditing = true;
      updateRootComponent(rootComponentCopy, component);
  }

  const onDelete = (componentId: string) => {
    const rootComponentCopy = cloneDeep(rootComponent);
    const { component, parent } = findComponentById(componentId, rootComponentCopy.components);

    if (!component) {
      return;
    }

    if (parent) {
      const parentChildren = parent.getComponents();
      if (parentChildren) {
        removeComponent(parentChildren, component.id);
      }
    } else {
      removeComponent(rootComponentCopy.components, component.id);
    }
    
    updateRootComponent(rootComponentCopy);
  };

  const moveComponent = (id: string, newParentId: string) => {
    const rootComponentCopy = cloneDeep(rootComponent);
    const { component, parent: oldParentComponent } = findComponentById(id, rootComponentCopy.components);

    if(!component) {
      return;
    }

    if (!oldParentComponent) {
      removeComponent(rootComponentCopy.components, id);
    } else {
      removeComponent(oldParentComponent.getComponents()!, id);
    }

    const { parent: newParent } = findComponentById(newParentId, rootComponentCopy.components);
    if (!newParent) {
      return;
    }

    const newParentChildren = (newParent.getComponents()!);
    insertComponent(newParent.getComponents()!, newParentChildren.length, component);
    updateRootComponent(rootComponentCopy);
  };

  const moveAdjacent = (id: string, adjacentComponentId: string, after: boolean) => {
    const rootComponentCopy = cloneDeep(rootComponent);
    const { component, parent: oldParentComponent } = findComponentById(id, rootComponentCopy.components);

    if(!component) {
      return;
    }

    if (!oldParentComponent) {
      if (isAlreadyAdjacent(id, adjacentComponentId, rootComponentCopy.components, after)) {
        return;
      }
      removeComponent(rootComponentCopy.components, id);
    } else {
      const oldParentChildren = oldParentComponent.getComponents()!;
      if (isAlreadyAdjacent(id, adjacentComponentId, oldParentChildren, after)) {
        return;
      }
      removeComponent(oldParentChildren, id);
    }

    const { component: adjacentComponent, parent: newParent } = findComponentById(adjacentComponentId, rootComponentCopy.components);
    if (!adjacentComponent) {
      return;
    }

    if (!newParent) {
      // parent is not there but found adjacent component
      // means the adjacent component is in the root
      insertComponent(rootComponentCopy.components, rootComponentCopy.components.indexOf(adjacentComponent) + (after ? 1 : 0), component);
    } else {
      const newParentChildren = newParent.getComponents();
      if (!newParentChildren) {
        // shouldn't be the case
        alert('meh?');
        return;
      }

      insertComponent(newParentChildren, newParentChildren.indexOf(adjacentComponent) + (after ? 1 : 0), component); 
    }
    
    updateRootComponent(rootComponentCopy);
  }

  const addPreview = (componentType: string, adjacentComponentId: string, after: boolean) => {
    const rootComponentCopy = cloneDeep(rootComponent);
    let previewComponentParent: ComponentSchemaWithId | undefined = undefined;
    
    // remove the earlier preview
    if (previewComponentParentId) {
      if (previewComponentParentId === adjacentComponentId) {
        if (previewComponentParentId === ROOT_ID) {
          if (rootComponentCopy.preview?.type === componentType) {
            return;
          }
          
          rootComponentCopy.preview = undefined;
          setPreviewComponentParentId(undefined);
        } else {
          let { component: previewComponentParentTemp } = findComponentById(previewComponentParentId, rootComponentCopy.components);
          if (previewComponentParentTemp) {
            previewComponentParent = previewComponentParentTemp;
  
            if (previewComponentParent.previewComponent?.type === componentType && previewComponentParent.previewComponent.isAfter === after) {
              return;
            }
  
            previewComponentParent.previewComponent = undefined;
            setPreviewComponentParentId(undefined);
          }
        }
      }
      else {
        // if preview component parent is not == adjacenComponentId
        // find the component object
        if (previewComponentParentId === ROOT_ID) {
          rootComponentCopy.preview = undefined;
          setPreviewComponentParentId(undefined);
        } else {
          let { component: previewComponentParentTemp } = findComponentById(previewComponentParentId, rootComponentCopy.components);
          if (previewComponentParentTemp) {
            previewComponentParent = previewComponentParentTemp;
            previewComponentParent.previewComponent = undefined;
            setPreviewComponentParentId(undefined);
          }
        }
      }
    }

    if (adjacentComponentId === ROOT_ID) {
      rootComponentCopy.preview = {
        type: componentType,
        isAfter: true
      }

      setPreviewComponentParentId(ROOT_ID);
    } else {
      let { component: previewComponentParentTemp } = findComponentById(adjacentComponentId, rootComponentCopy.components);
      if (!previewComponentParentTemp) {
        console.error('Preview component parent not found!');
        return;
      }

      previewComponentParent = previewComponentParentTemp;

      previewComponentParent.previewComponent = {
        type: componentType,
        isAfter: after,
      }

      setPreviewComponentParentId(adjacentComponentId);
    }

    updateRootComponent(rootComponentCopy);
  }

  const findComponentById = (id: string, findInSchema: ComponentSchemaWithId[]): { component: ComponentSchemaWithId | undefined, parent: ComponentSchemaWithId | undefined } => {
    let component = findInSchema.find(c => c.id === id);
    let parent: any = undefined;
    if (component) {
      return { component, parent: undefined };
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let _ = findInSchema.some(c => {
      let childChildren = c.getComponents();
      if (!childChildren) {
        return false;
      }

      ({ component, parent } = findComponentById(id, childChildren));
      if (!parent && component) {
        // if component is found, but the immediate recursive call just returned the component.
        // This means, this component is the parent - assign it.
        // otherwise return the parent which was returned form the call
        parent = c;
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

  const insertNewComponentAtIndex = (rootComponentCopy: RootComponent, componentArray: ComponentSchemaWithId[], component: ComponentSchemaWithId, atIndex: number) => {
    // ask the name & label from the user
    setNewComponentDropped({
      componentId: component.id,
      componentType: component.type,
    });

    if (atIndex === -1) {
      componentArray.push(component);
    } else {
      componentArray.splice(atIndex, 0, component);
    }
      
    updateRootComponent(rootComponentCopy);
  };

  const isAlreadyAdjacent = (componentId: string, adjacentComponentId: string, componentArray: ComponentSchemaWithId[], after: boolean) => {
    const componentIndex = componentArray.findIndex(x => x.id === componentId);
    
    if (after) {
      return componentIndex - 1 >= 0 && componentArray[componentIndex - 1].id === adjacentComponentId;
    } else {
      return componentIndex + 1 < componentArray.length && componentArray[componentIndex + 1].id === adjacentComponentId;
    }
  };

  const resetDragDropPreview = () => {
    if (!previewComponentParentId) {
      return;
    }

    const rootComponentCopy = cloneDeep(rootComponent);
    if (previewComponentParentId === ROOT_ID) {
      rootComponentCopy.preview = undefined;
    } else {
      const {component: previewComponentParent} = findComponentById(previewComponentParentId, rootComponentCopy.components);
      if (previewComponentParent) {
        previewComponentParent.previewComponent = undefined;
      }
    }

    updateRootComponent(rootComponentCopy);
    setPreviewComponentParentId(undefined);
  }

  const updateComponentSchema = (updatedComponentSchema: any) => {
    const rootComponentCopy = cloneDeep(rootComponent);
    
    // clear the earlier editing component
    if (editingComponent === undefined) {
      return;
    }

    const { component, parent: parentComponent } = findComponentById(editingComponent.id, rootComponentCopy.components);

    if (component === undefined) {
      // component wasn't found 
      return;
    }

    updatedComponentSchema.id = component.id;
    const parentComponentChildren = parentComponent?.getComponents() || rootComponentCopy.components;
    const componentIdx = parentComponentChildren.findIndex((x: ComponentSchemaWithId) => x.id === component.id);
    parentComponentChildren.splice(componentIdx, 1, cloneDeep(updatedComponentSchema));

    updateRootComponent(rootComponentCopy);
  }

  const onNewComponentConfirmed = (name: string, label: string) => {
    const { component: newComponent } = findComponentById(newComponentDropped!.componentId, rootComponent.components);
    
    if (newComponent === undefined) {
      return;
    }

    newComponent.name = name;
    newComponent.display = {
      ...(newComponent.display || {}),
      label
    };

    // reset the root component with the new component as the editing one. 
    // as probably that one will be the one the user will edit next.
    onEditWithComponent(newComponent);
    setNewComponentDropped(undefined);
  }

  const onNewComponentCancelled = () => {
    onDelete(newComponentDropped!.componentId);
    setNewComponentDropped(undefined);
  };
  
  return (
    <DesignerPage>
      <DndProvider backend={HTML5Backend}>
        <ComponentListContainer className="bg-light">
          <ComponentList resetPreview={resetDragDropPreview}/>
        </ComponentListContainer>

        <DesignerPreview>
          <DroppableRenderer
            rootComponent={rootComponent}
            data={data}
            editingComponent={editingComponent}
            onDrop={onDrop}
            onEdit={onEditWithId}
            onDelete={onDelete}
            addPreview={addPreview}
            moveComponent={moveComponent}
            moveAdjacent={moveAdjacent}
            updateComponentSchema={updateComponentSchema}
          />
        </DesignerPreview>
      </DndProvider>
      <NewComponentConfirmModalWrapper>

      <NewComponentConfirmModal isOpen={newComponentDropped !== undefined}>
        {
          newComponentDropped
          ? (
            <NewComponentConfirmFormWrapper>
              <NewComponentConfirmForm
                componentId={newComponentDropped.componentId}
                componentType={newComponentDropped.componentType}
                onConfirm={onNewComponentConfirmed}
                onCancel={onNewComponentCancelled}
              />
            </NewComponentConfirmFormWrapper>
            )
          : null
        }
        </NewComponentConfirmModal>
        
      </NewComponentConfirmModalWrapper>

    </DesignerPage>
  );
};

export default Designer;
