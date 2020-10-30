import styled from '@emotion/styled';
import React from 'react'
import { useDrag } from 'react-dnd'

const style: React.CSSProperties = {
  border: '1px dashed gray',
  backgroundColor: 'white',
  padding: '0.5rem 1rem',
  marginRight: '1.5rem',
  marginBottom: '1.5rem',
  float: 'left',
}

const Item = styled.div`
    margin: 10px 10px 0px 10px !important;
    flex: 1;
`;

export interface ComponentListItemProps {
  name: string
  type: string;
}

interface DropResult {
  dropEffect: string
  name: string
}

interface DragItem {
  name: string;
  type: string;
}

export const ComponentListItem: React.FC<ComponentListItemProps> = ({ name, type }) => {
  const item = { name, type }
  const [{ opacity }, drag] = useDrag({
    item,
    collect: (monitor: any) => ({
      opacity: monitor.isDragging() ? 0.6 : 1,
    }),
  })

  return (
    <Item ref={drag} style={{ ...style, opacity }}>
      {name}
    </Item>
  )
}
