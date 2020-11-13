import styled from '@emotion/styled'
import React from 'react'
import { DraggableComponent } from './DraggableComponent'

const StyledDraggableComponent = styled(DraggableComponent)`
    border: 1px dashed gray;
    backgroundColor: white;
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
