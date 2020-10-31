import styled from '@emotion/styled';
import React from 'react';
import { useDrop } from 'react-dnd';
import { ComponentTypes } from '../Utilities/ComponentTypes';

const selectBackgroundColor = (isActive: boolean, canDrop: boolean) => {
    if (isActive) {
      return 'lightgrey'
    } else if (canDrop) {
      return 'lightkhaki'
    } else {
      return '#eee'
    }
  }

const DroppableArea = styled.div<any>`
  padding: 10px 20px;
  width: 70%;
  background-color: ${({backgroundColor}) => backgroundColor};
`;


interface DroppableComponentProps {
    children: JSX.Element;
    onDrop(component: any): void;
}

export const DroppableComponent: React.FC<DroppableComponentProps> = (props) => {
    const [{ canDrop, isOver }, drop] = useDrop({
      accept: ComponentTypes,
      drop: (component) => {
          props.onDrop({...component, parent: null});
      },
      collect: (monitor: any) => ({
        isOver: monitor.isOver({ shallow: true }),
        canDrop: monitor.canDrop(),
      }),
    })
  
    const isActive = canDrop && isOver
    const backgroundColor = selectBackgroundColor(isActive, canDrop)
    return (
        <DroppableArea ref={drop} backgroundColor={backgroundColor} >
            { props.children }
        </DroppableArea>
    )
  }
  