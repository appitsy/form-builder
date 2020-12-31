import React from 'react';

import { getDisplayNameForType } from 'appitsy/types/Types';

import styled from '@emotion/styled';

import { ComponentTypes } from '../Utilities/ComponentTypes';
import { ComponentListItem } from './ComponentListItem';

const StackList = styled.div`
  display: flex;
  flex-direction: column;
`;

interface ComponentListProps {
  resetPreview(): void;
}

const ComponentList = (props: ComponentListProps) => (
  <StackList style={{ overflow: "hidden", clear: "both", height: '100%' }}>
    {
      ComponentTypes.map(type => (
        <ComponentListItem 
          name={getDisplayNameForType(type)} 
          type={type} 
          resetPreview={props.resetPreview} 
        />
      ))
    }
  </StackList>
);

export default ComponentList;
