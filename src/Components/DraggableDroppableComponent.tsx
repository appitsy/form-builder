import React, { useRef } from 'react';
import { useDrag, useDrop, DragSourceMonitor, DropTargetMonitor, XYCoord } from 'react-dnd'
import { ComponentTypes } from '../Utilities/ComponentTypes';

import Icon from 'appitsy/components/Basic/Icon';
import styled from '@emotion/styled';
import { PreviewComponent, PreviewComponentSchema } from './PreviewComponent';

const Actions = styled.div`
  display: flex; 
  flex-direction: row;

  * {
    margin: 0px 1px;
  }

  i {
    font-size: 14px;
  }
`;

export interface DraggableDroppableComponentProps {
  operation: string;
  type: string;
  id: string;
  onDrop(component: any): void;
  addPreview(componentType: string, adjacentComponentId: string, after: boolean): void;
  moveComponent: (id: string, newParentId: string) => void;
  moveAdjacent: (id: string, adjacentComponentId: string, after: boolean) => void;
  children: JSX.Element;
  previewComponent?: PreviewComponentSchema;
  className?: string;
  isEditing: boolean;
  editAction: JSX.Element;
  deleteAction: JSX.Element;
}

export interface DragItem {
  id: string;
  originalPath: string;
  type: string;
}

export const DraggableDroppableComponent: React.FC<DraggableDroppableComponentProps> = (props) => {
  const dragRef = useRef<HTMLDivElement>(null);
  const dropRef = useRef<HTMLDivElement>(null);

  const isAfter = (monitor: DropTargetMonitor) => {
    // Determine rectangle on screen
    // dropRef.current is checked and expected in the caller function to be defined
    const hoverBoundingRect = dropRef.current!.getBoundingClientRect()
    
    // Get vertical middle
    const hoverMiddleY =
      (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

    // Determine mouse position
    const clientOffset = monitor.getClientOffset()

    // Get pixels to the top
    const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top

    return hoverClientY > hoverMiddleY;
  };

  const [, drop] = useDrop({
    accept: ComponentTypes,
    hover({ id: draggedId, type: draggedType }: DragItem, monitor: DropTargetMonitor) {
      if (!dropRef.current || draggedId === props.id || !monitor.isOver({ shallow: true })) {
        return;
      }

      if (!draggedId) {
        // new component being dragged
        props.addPreview(draggedType, props.id, isAfter(monitor));
      } else if (draggedId !== props.id) {
        props.moveAdjacent(draggedId, props.id, isAfter(monitor));
      }
    },
    drop: (component, monitor) => {
      if (monitor.isOver()) {
        props.onDrop({...component, parent: props.id, isAfter: isAfter(monitor)});
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

  const previewComponent = props.previewComponent ? <PreviewComponent type={props.previewComponent.type} /> : null;

  return (
    <div ref={dropRef} className={props.className} style={{ opacity }}>
      <div ref={preview}></div>
      { props.previewComponent && !props.previewComponent.isAfter ? previewComponent : null }
      <Actions>
        {props.editAction}
        {moveAction}
        {props.deleteAction}
      </Actions>
      
      {props.children}
      { props.previewComponent && props.previewComponent.isAfter ? previewComponent : null }
    </div>
  )
}
