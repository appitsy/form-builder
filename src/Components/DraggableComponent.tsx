import React from 'react';
import { useDrag } from 'react-dnd';

const style: React.CSSProperties = {
    border: '1px dashed gray',
    backgroundColor: 'white',
    padding: '0.5rem 1rem',
    marginRight: '1.5rem',
    marginBottom: '1.5rem',
    float: 'left',
};

interface DraggableComponentProps {
    name: string;
    type: string;
}

export const DraggableComponent: React.FC<DraggableComponentProps> = (props) => {
    const item = { name: props.name, type: props.type }
    const [{ opacity }, drag] = useDrag({
      item,
      collect: (monitor: any) => ({
        opacity: monitor.isDragging() ? 0.6 : 1,
      }),
    })
  
    return (
      <div ref={drag} style={{ ...style, opacity }}>
        {props.children}
      </div>
    )
}