import styled from '@emotion/styled';
import { ComponentSchema } from 'appitsy/dist/types/ComponentSchema';
import React from 'react'
import { useDrop } from 'react-dnd'
import { ComponentTypes } from '../Utilities/ComponentTypes';
import { ComponentProperties } from './ComponentProperties';
import { DesignerRenderer } from './DesignerRenderer';

const RendererAndProperties = styled.div`
  height: 100%;
  display: flex;
  flex-direction: row;
`;

const DroppableArea = styled.div<any>`
  padding: 10px 20px;
  width: 70%;
  background-color: ${({backgroundColor}) => backgroundColor};
`;

const StyledComponentProperties = styled(ComponentProperties)`
  background-color: #f8f9fa;
  flex: 1;
`;

function selectBackgroundColor(isActive: boolean, canDrop: boolean) {
  if (isActive) {
    return 'lightgrey'
  } else if (canDrop) {
    return 'lightkhaki'
  } else {
    return '#eee'
  }
}

interface DroppableRendererProps {
  schema: ComponentSchema[];
  data: any;
  onDrop(component: any): void;
  onDelete(component: any): void;
}

export const DroppableRenderer: React.FC<DroppableRendererProps> = (props) => {
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: ComponentTypes,
    drop: (component) => {
        props.onDrop({...component, parent: null});
    },
    collect: (monitor: any) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  })

  const isActive = canDrop && isOver
  const backgroundColor = selectBackgroundColor(isActive, canDrop)
  return (
    <RendererAndProperties>
      <DroppableArea ref={drop} backgroundColor={backgroundColor} >
          <DesignerRenderer schema={props.schema} data={props.data} onDelete={props.onDelete} />
      </DroppableArea>
      <StyledComponentProperties />
    </RendererAndProperties>
  )
}
