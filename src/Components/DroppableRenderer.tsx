import React from 'react';

import styled from '@emotion/styled';

import { ComponentProperties } from './ComponentProperties/ComponentProperties';
import { RootComponent } from './Designer';
import {
  ComponentSchemaWithId,
  DesignerRenderer,
} from './DesignerRenderer';
import { DroppableComponent } from './DroppableComponent';

const RendererAndProperties = styled.div`
  height: 100%;
  display: flex;
  flex-direction: row;
`;

const StyledComponentProperties = styled(ComponentProperties)`
  background-color: #f8f9fa;
  flex: 1;
`;

const StyledDroppableComponent = styled(DroppableComponent)`
  width: 70%;
  margin: 10px;
  overflow: 
`;

interface DroppableRendererProps {
  rootComponent: RootComponent;
  editingComponent?: ComponentSchemaWithId;
  data: any;
  onDrop(component: any): void;
  onEdit(componentId: string): void;
  onDelete(componentId: string): void;
  addPreview(componentType: string, adjacentComponentId: string, after: boolean): void;
  moveComponent: (id: string, newPath: string) => void;
  moveAdjacent: (id: string, adjacentComponentId: string, after: boolean) => void;
  updateComponentSchema: (componentSchema: any) => void;
}

export const DroppableRenderer: React.FC<DroppableRendererProps> = (props) => {
  return (
    <RendererAndProperties>
      <StyledDroppableComponent 
        id="root"
        onDrop={props.onDrop} 
        previewComponent={props.rootComponent.preview}
        addPreview={props.addPreview}
      >
          <DesignerRenderer 
            schema={props.rootComponent.components} 
            data={props.data} 
            onEdit={props.onEdit} 
            onDelete={props.onDelete} 
            onDrop={props.onDrop} 
            addPreview={props.addPreview}
            moveComponent={props.moveComponent} 
            moveAdjacent={props.moveAdjacent} 
            onSubmit={(_) => {}}
          />
      </StyledDroppableComponent>
      <StyledComponentProperties component={props.editingComponent} updateComponentSchema={props.updateComponentSchema} />
    </RendererAndProperties>
  )
}
