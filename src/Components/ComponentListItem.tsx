import styled from '@emotion/styled'
import React from 'react'
import { DraggableComponent } from './DraggableComponent'

const StyledDraggableComponent = styled(DraggableComponent)`
    border-radius: 10px;
    z-index: 2;
    background-color: white;
    box-shadow: 0 1px 3px 0 rgba(0,0,0,.1), 0 1px 2px 0 rgba(0,0,0,.06);
    padding: 0.5rem 1rem;
    margin: 1rem 1rem 0rem 1rem;
    float: left;
`;

export interface ComponentListItemProps {
  name: string
  type: string;
  resetPreview(): void;
}

export const ComponentListItem: React.FC<ComponentListItemProps> = (props) => {
  return (
    <StyledDraggableComponent 
      name={props.name} 
      type={props.type} 
      operation='drop'
      resetPreview={props.resetPreview}
    >
      {props.name}
    </StyledDraggableComponent>
  )
}
