import React from 'react'
import { useDrag, useDrop, DragSourceMonitor } from 'react-dnd'
import { ComponentTypes } from '../Utilities/ComponentTypes';

import Icon from 'appitsy/dist/components/BasicComponents/Icon';

export interface DraggableDroppableComponentProps {
  operation: string;
  type: string;
  id: string;
  moveComponent: (id: string, toIndex: number) => void;
  findComponent: (id: string) => number;
  children: JSX.Element;
  className?: string;
}

interface DragItem {
  id: string;
  originalIndex: string;
  type: string;
}

export const DraggableDroppableComponent: React.FC<DraggableDroppableComponentProps> = (props) => {
  const [, drop] = useDrop({
    accept: ComponentTypes,
    hover({ id: draggedId }: DragItem) {
      if (draggedId !== props.id) {
        const overIndex = props.findComponent(props.id)
        props.moveComponent(draggedId, overIndex)
      }
    },
  })

  const originalIndex = props.findComponent(props.id);
  const [{ isDragging }, drag, preview] = useDrag({
    item: { type: props.type, id: props.id, operation: props.operation, originalIndex },
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (dropResult, monitor) => {
      const { id: droppedId, originalIndex } = monitor.getItem()
      const didDrop = monitor.didDrop()
      if (!didDrop) {
        props.moveComponent(droppedId, originalIndex)
      }
    },
  })

  const opacity = isDragging ? 0.5 : 1;
  return (
    <div className={props.className} style={{ opacity }}>
      <div ref={preview}></div>
      <div ref={(node) => drag(drop(node))}><Icon icon='arrows-alt'/></div>
      {props.children}
    </div>
  )
}
