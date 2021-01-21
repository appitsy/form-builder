import React, {
  useEffect,
  useState,
} from 'react';

import { remove } from 'lodash-es';
import cloneDeep from 'lodash-es/cloneDeep';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Modal from 'react-modal';

import styled from '@emotion/styled';

import { getDefaultPropsForType } from '../Utilities/ComponentTypes';
import ComponentList from './ComponentList';
import { DroppableForm } from './DroppableForm';
import { ComponentSchemaWithId } from './FormDesigner';
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
  const [previewComponentState, setPreviewComponentState] = useState<any>(undefined);
  const [newComponentDropped, setNewComponentDropped] = useState<NewComponentDroppedInfo | undefined>(undefined);

  useEffect(() => {
    setRootComponent({ components: props.schema });
  }, [props.schema])

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
        insertComponentAtIndex(rootComponentCopy, rootComponentCopy.components, newComponent, -1, true);
      } else {
        const { component: parentComponent, parent: grandParentComponent } = findComponentById(componentEl.parent, rootComponentCopy.components);
        const parentChildComponents = parentComponent?.components;

        if (parentChildComponents) {
          insertComponentAtIndex(rootComponentCopy, parentChildComponents, newComponent, -1, true);
        } else {
          // grand parents children or if not present the root components
          const grandParentChildren = grandParentComponent?.components || rootComponentCopy.components;
          const parentIndex = grandParentChildren.findIndex((x: ComponentSchemaWithId) => x.id === parentComponent?.id);
          const isAfter = componentEl.isAfter === true;
          insertComponentAtIndex(rootComponentCopy, grandParentChildren, newComponent, parentIndex + (isAfter ? 1 : 0), true);
        }
      }
    }
    else if (componentEl.operation === 'move') {
      const rootComponentCopy = cloneDeep(rootComponent);
      const { component, parent: oldParentComponent } = findComponentById(componentEl.id, rootComponentCopy.components);

      if (!component) {
        return;
      }

      removeComponent(oldParentComponent?.components || rootComponentCopy.components, component.id);

      if (componentEl.parent === ROOT_ID) {
        insertComponentAtIndex(rootComponentCopy, rootComponentCopy.components, component, -1, false);
      } else {
        const { component: newParent, parent: newGrandParentComponent } = findComponentById(componentEl.parent, rootComponentCopy.components);

        if (!newParent) {
          return;
        }

        const newParentChildren = newParent.components;

        if (newParentChildren) {
          insertComponentAtIndex(rootComponentCopy, newParentChildren, component, -1, false);
        } else {
          const newGrandParentChildren = newGrandParentComponent?.components || rootComponentCopy.components;
          const parentIndex = newGrandParentChildren.findIndex((x: ComponentSchemaWithId) => x.id === newParent.id);
          insertComponentAtIndex(rootComponentCopy, newGrandParentChildren, component, parentIndex, false);
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

    const parentChildren = parent?.components || rootComponentCopy.components;
    removeComponent(parentChildren, component.id);
    
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
      removeComponent(oldParentComponent.components!, id);
    }

    const { parent: newParent } = findComponentById(newParentId, rootComponentCopy.components);
    if (!newParent) {
      return;
    }

    const newParentChildren = (newParent.components!);
    insertComponent(newParentChildren, newParentChildren.length, component);
    updateRootComponent(rootComponentCopy);
  };

  const moveAdjacent = (id: string, adjacentComponentId: string, after: boolean) => {
    const rootComponentCopy = cloneDeep(rootComponent);
    const { component, parent: oldParentComponent } = findComponentById(id, rootComponentCopy.components);

    if(!component) {
      return;
    }

    /// --> Remove from old parent
    const oldParentChildren = oldParentComponent?.components || rootComponentCopy.components;
    if (isAlreadyAdjacent(id, adjacentComponentId, oldParentChildren, after)) {
      return;
    }

    removeComponent(oldParentChildren, id);

    /// --> Add to new parent
    const { component: adjacentComponent, parent: newParent } = findComponentById(adjacentComponentId, rootComponentCopy.components);
    if (!adjacentComponent) {
      return;
    }

    const newParentChildren = newParent?.components || rootComponentCopy.components;
    insertComponent(newParentChildren, newParentChildren.indexOf(adjacentComponent) + (after ? 1 : 0), component); 

    updateRootComponent(rootComponentCopy);
  }

  const addPreview = (componentType: string, adjacentComponentId: string, after: boolean) => {
    const rootComponentCopy = cloneDeep(rootComponent);
    let previewComponentParent: ComponentSchemaWithId | undefined = undefined;
    
    if (previewComponentState !== undefined) {
      // if similar state just return else remove and proceed
      if (previewComponentState.parentId === adjacentComponentId 
            && previewComponentState.componentType === componentType 
            && previewComponentState.isAfter === after) {
        return;
      }

      resetDragDropPreviewInternal(rootComponentCopy);
    }
          
    if (adjacentComponentId === ROOT_ID) {
      rootComponentCopy.preview = {
        type: componentType,
        isAfter: true
      }

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
    }

    setPreviewComponentState({
      parentId: adjacentComponentId,
      componentType,
      isAfter: after
    });

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
      let childChildren = c.components;
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

  const insertComponentAtIndex = (rootComponentCopy: RootComponent, componentArray: ComponentSchemaWithId[], component: ComponentSchemaWithId, atIndex: number, isNew: boolean) => {
    if (isNew) {
      // ask the name & label from the user
      setNewComponentDropped({
        componentId: component.id,
        componentType: component.type,
      });
    }

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
    if (!previewComponentState) {
      return;
    }

    const rootComponentCopy = cloneDeep(rootComponent);

    resetDragDropPreviewInternal(rootComponentCopy);
    updateRootComponent(rootComponentCopy);
    setPreviewComponentState(undefined);
  }

  const resetDragDropPreviewInternal = (rootComponentCopy: RootComponent) => {
    if (previewComponentState.parentId === ROOT_ID) {
      rootComponentCopy.preview = undefined;
    } else {
      const {component: previewComponentParent} = findComponentById(previewComponentState.parentId, rootComponentCopy.components);
      if (previewComponentParent) {
        previewComponentParent.previewComponent = undefined;
      }
    }
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
    const parentComponentChildren = parentComponent?.components || rootComponentCopy.components;
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
          <DroppableForm
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
