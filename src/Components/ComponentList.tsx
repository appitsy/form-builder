import React from 'react';

import { getDisplayNameForType } from '@appitsy/forms/types/Types';
import styled from '@emotion/styled';

import {
  BasicComponentTypes,
  DataComponentTypes,
  LayoutComponentTypes,
} from '../Utilities/ComponentTypes';
import { DraggableComponent } from './DraggableComponent';

type ResetPreviewCallback = () => void;

interface ComponentListProps {
  resetPreview: ResetPreviewCallback;
}

const ComponentItems = styled.div`
  overflow: hidden;
  clear: both;
  height: 100%;
`;

const ComponentListItem = styled(DraggableComponent)`
  border-radius: 10px;
  z-index: 2;
  background-color: white;
  box-shadow: 0 1px 3px 0 rgba(0,0,0,.1), 0 1px 2px 0 rgba(0,0,0,.06);
  padding: 0.5rem 1rem;
  float: left;
  width: 90px;
  height: 55px;
  margin: 5px;
  font-size: 14px;
  text-align: center;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const ComponentTypeSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 15px;
`;

const ComponentSectionName = styled.h6`
  margin: 0px 10px 5px 10px;
  padding-bottom: 5px;
  border-bottom: 2px solid lightgrey;
`;

const ComponentSectionItems = styled.div`
  display: block;
`;

const RenderComponentTypes = (types: string[], resetPreviewCallback: ResetPreviewCallback) => {
  return types.map(type => {
    const name = getDisplayNameForType(type);
    return (
      <ComponentListItem 
        name={name} 
        type={type} 
        operation='drop'
        resetPreview={resetPreviewCallback}
      >
        <span>{name}</span>
      </ComponentListItem>
    );
  })
}

const ComponentList = (props: ComponentListProps) => (
  <ComponentItems>
    <ComponentTypeSection>
      <ComponentSectionName>Basic</ComponentSectionName>
      <ComponentSectionItems>
        { RenderComponentTypes(BasicComponentTypes, props.resetPreview) }
      </ComponentSectionItems>
      
    </ComponentTypeSection>
    <ComponentTypeSection>
      <ComponentSectionName>Layout</ComponentSectionName>
      <ComponentSectionItems>
        { RenderComponentTypes(LayoutComponentTypes, props.resetPreview) }
      </ComponentSectionItems>
    </ComponentTypeSection>
    <ComponentTypeSection>
      <ComponentSectionName>Data</ComponentSectionName>
      <ComponentSectionItems>
        { RenderComponentTypes(DataComponentTypes, props.resetPreview) }
      </ComponentSectionItems>
      
    </ComponentTypeSection>
  </ComponentItems>
);

export default ComponentList;
