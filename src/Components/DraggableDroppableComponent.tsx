import React from 'react'
import { useDrag, useDrop, DragSourceMonitor } from 'react-dnd'
import { ComponentTypes } from '../Utilities/ComponentTypes';

import Icon from 'appitsy/dist/components/BasicComponents/Icon';
import styled from '@emotion/styled';

const Actions = styled.div`
  display: flex; 
  flex-direction: row;
`;

export interface DraggableDroppableComponentProps {
  operation: string;
  type: string;
  id: string;
  onDrop(component: any): void;
  addPreview(componentType: string, adjacentComponentId: string): void;
  moveComponent: (id: string, newParentId: string) => void;
  moveAdjacent: (id: string, adjacentComponentId: string, after: boolean) => void;
  children: JSX.Element;
  className?: string;
  deleteAction: JSX.Element;
}

export interface DragItem {
  id: string;
  originalPath: string;
  type: string;
}

export const DraggableDroppableComponent: React.FC<DraggableDroppableComponentProps> = (props) => {
  const [, drop] = useDrop({
    accept: ComponentTypes,
    hover({ id: draggedId }: DragItem) {
      if (!draggedId) {
        // new component being dragged
        props.addPreview(props.type, props.id);
      } else if (draggedId !== props.id) {
        props.moveAdjacent(draggedId, props.id, false);
      }
    },
    drop: (component, monitor) => {
      if (monitor.isOver()) {
        props.onDrop({...component, parent: props.id});
      }
    },
  })

  const [{ isDragging }, drag, preview] = useDrag({
    item: { type: props.type, id: props.id, operation: props.operation },
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (dropResult, monitor) => {
      const { id: droppedId } = monitor.getItem();
      const didDrop = monitor.didDrop();
      if (droppedId === props.id) {
        return;
      }

      if (!didDrop) {
        props.moveComponent(droppedId, props.id)
      }
    },
  })

  const opacity = isDragging ? 0.5 : 1;
  const moveAction = (
    <div ref={(node) => drag(node)}><Icon icon='arrows-alt'/></div>
  );

  return (
    <div ref={(node) => drop(node)} className={props.className} style={{ opacity }}>
      <div ref={preview}></div>
      <Actions>
        {moveAction}
        {props.deleteAction}
      </Actions>
      
      {props.children}
    </div>
  )
}
