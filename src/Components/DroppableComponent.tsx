import styled from '@emotion/styled';
import React from 'react';
import { useDrop } from 'react-dnd';
import { ComponentTypes } from '../Utilities/ComponentTypes';
import { DragItem } from './DraggableDroppableComponent';
import { PreviewComponent, PreviewComponentSchema } from './PreviewComponent';

const selectBorder = (isActive: boolean, canDrop: boolean) => {
    if (isActive) {
      return 'dashed 1px gray';
    } else {
      return 'dashed 1px transparent';
    }
    // else if (canDrop) {
}

const DroppableArea = styled.div<any>`
  width: 100%;
  overflow-y: auto;
  border: ${({border}) => border};
`;

interface DroppableComponentProps {
    children: JSX.Element;
    previewComponent?: PreviewComponentSchema;
    id: string;
    onDrop(component: any): void;
    addPreview(componentType: string, adjacentComponentId: string, after: boolean): void;
    className?: string;
}

export const DroppableComponent: React.FC<DroppableComponentProps> = (props) => {
    const [{ canDrop, isOver }, drop] = useDrop({
      accept: ComponentTypes,
      hover({ id: draggedId, type }: DragItem, monitor) {
        if (!draggedId && monitor.isOver({ shallow: true })) {
          // new component being dragged
          props.addPreview(type, props.id, false);
        }
      },
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
            { props.previewComponent ? <PreviewComponent type={props.previewComponent.type} /> : null }
        </DroppableArea>
    )
  }
  