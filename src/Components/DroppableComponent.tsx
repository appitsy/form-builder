import styled from '@emotion/styled';
import React from 'react';
import { useDrop } from 'react-dnd';
import { ComponentTypes } from '../Utilities/ComponentTypes';

const selectBorder = (isActive: boolean, canDrop: boolean) => {
    if (isActive) {
      return 'dashed 1px gray';
    } 
    // else if (canDrop) {
}

const DroppableArea = styled.div<any>`
  padding: 10px 20px;
  width: 100%;
  overflow-y: auto;
  border: ${({border}) => border};
`;

interface DroppableComponentProps {
    children: JSX.Element;
    id: string;
    onDrop(component: any): void;
    className?: string;
}

export const DroppableComponent: React.FC<DroppableComponentProps> = (props) => {
    const [{ canDrop, isOver }, drop] = useDrop({
      accept: ComponentTypes,
      drop: (component, monitor) => {
        if (monitor.isOver()) {
          props.onDrop({...component, parent: props.id});
        }
      },
      collect: (monitor: any) => ({
        isOver: monitor.isOver({ shallow: true }),
        canDrop: monitor.canDrop(),
      }),
    })
  
    const isActive = canDrop && isOver;
    const border = selectBorder(isActive, canDrop);
    return (
        <DroppableArea border={border} ref={drop} className={props.className}>
            { props.children }
        </DroppableArea>
    )
  }
  