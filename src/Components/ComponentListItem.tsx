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
}

export const ComponentListItem: React.FC<ComponentListItemProps> = ({ name, type }) => {
  return (
    <StyledDraggableComponent name={name} type={type} operation='drop'>
      {name}
    </StyledDraggableComponent>
  )
}
