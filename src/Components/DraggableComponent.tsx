import React from "react";
import { useDrag } from "react-dnd";

interface DraggableComponentProps {
  name: string;
  type: string;
  operation: string;
  className?: string;
  resetPreview(): void;
}

export const DraggableComponent: React.FC<DraggableComponentProps> = (
  props
) => {
  let item = {
    name: props.name,
    type: props.type,
    operation: props.operation,
  };
  const [{ opacity }, drag] = useDrag({
    item,
    options: {
      dropEffect: "copy",
    },
    collect: (monitor: any) => ({
      opacity: monitor.isDragging() ? 0.6 : 1,
    }),
    end: (dropResult, monitor) => {
      props.resetPreview();
    },
  });

  return (
    <div ref={drag} className={props.className} style={{ opacity }}>
      {props.children}
    </div>
  );
};
