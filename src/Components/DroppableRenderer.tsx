import styled from '@emotion/styled';
import { ComponentSchema } from 'appitsy/dist/types/ComponentSchema';
import React from 'react'
import { ComponentProperties } from './ComponentProperties';
import { DesignerRenderer } from './DesignerRenderer';
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
  schema: ComponentSchema[];
  data: any;
  onDrop(component: any): void;
  onDelete(component: any): void;
}

export const DroppableRenderer: React.FC<DroppableRendererProps> = (props) => {
  return (
    <RendererAndProperties>
      <DroppableComponent onDrop={props.onDrop}>
          <DesignerRenderer schema={props.schema} data={props.data} onDelete={props.onDelete} onDrop={props.onDrop} />
      </DroppableComponent>
      <StyledComponentProperties />
    </RendererAndProperties>
  )
}
