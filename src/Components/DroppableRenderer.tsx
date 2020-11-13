import styled from '@emotion/styled';
import React from 'react'
import { ComponentProperties } from './ComponentProperties';
import { ComponentSchemaWithId, DesignerRenderer } from './DesignerRenderer';
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
  schema: ComponentSchemaWithId[];
  data: any;
  onDrop(component: any): void;
  onDelete(componentId: string): void;
  addPreview(componentType: string, adjacentComponentId: string): void;
  moveComponent: (id: string, newPath: string) => void;
  moveAdjacent: (id: string, adjacentComponentId: string, after: boolean) => void;
}

export const DroppableRenderer: React.FC<DroppableRendererProps> = (props) => {
  return (
    <RendererAndProperties>
      <StyledDroppableComponent 
        id="root"
        onDrop={props.onDrop} 
        addPreview={props.addPreview}
      >
          <DesignerRenderer 
            schema={props.schema} 
            data={props.data} 
            onDelete={props.onDelete} 
            onDrop={props.onDrop} 
            addPreview={props.addPreview}
            moveComponent={props.moveComponent} 
            moveAdjacent={props.moveAdjacent} 
          />
      </StyledDroppableComponent>
      <StyledComponentProperties />
    </RendererAndProperties>
  )
}
