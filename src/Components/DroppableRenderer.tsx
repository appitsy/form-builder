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

interface DroppableRendererProps {
  schema: ComponentSchemaWithId[];
  data: any;
  onDrop(component: any): void;
  onDelete(component: any): void;
  moveComponent: (id: string, atIndex: number) => void;
  findComponent: (id: string) => number;
}

export const DroppableRenderer: React.FC<DroppableRendererProps> = (props) => {
  return (
    <RendererAndProperties>
      <DroppableComponent onDrop={props.onDrop} id="root">
          <DesignerRenderer schema={props.schema} data={props.data} onDelete={props.onDelete} onDrop={props.onDrop} moveComponent={props.moveComponent} findComponent={props.findComponent} />
      </DroppableComponent>
      <StyledComponentProperties />
    </RendererAndProperties>
  )
}
