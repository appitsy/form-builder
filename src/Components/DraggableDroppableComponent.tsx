import React, { useRef } from 'react'
import { useDrag, useDrop, DragSourceMonitor, DropTargetMonitor, XYCoord } from 'react-dnd'
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
  const dragRef = useRef<HTMLDivElement>(null)
  const dropRef = useRef<HTMLDivElement>(null)
  const [, drop] = useDrop({
    accept: ComponentTypes,
    hover({ id: draggedId }: DragItem, monitor: DropTargetMonitor) {
      console.log('DragDrop - hover');

      if (!dropRef.current || draggedId === props.id) {
        return
      }
      
      // Determine rectangle on screen
      const hoverBoundingRect = dropRef.current?.getBoundingClientRect()
      
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

      // Determine mouse position
      const clientOffset = monitor.getClientOffset()

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top

      if (!draggedId) {
        // new component being dragged
        props.addPreview(props.type, props.id);
      } else if (draggedId !== props.id) {
        props.moveAdjacent(draggedId, props.id, hoverClientY > hoverMiddleY);
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

  drop(dropRef);
  drag(dragRef);

  const moveAction = (
    <div ref={dragRef}><Icon icon='arrows-alt'/></div>
  );

  return (
    <div ref={dropRef} className={props.className} style={{ opacity }}>
      <div ref={preview}></div>
      <Actions>
        {moveAction}
        {props.deleteAction}
      </Actions>
      
      {props.children}
    </div>
  )
}
