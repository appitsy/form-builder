import React from 'react';

import {
  TypeDisplayNames,
  Types,
} from 'appitsy/types/Types';

import styled from '@emotion/styled';

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
    <ComponentListItem name={TypeDisplayNames.TextField} type={Types.TextField} resetPreview={props.resetPreview} />
    <ComponentListItem name={TypeDisplayNames.TextArea} type={Types.TextArea} resetPreview={props.resetPreview} />
    <ComponentListItem name={TypeDisplayNames.Password} type={Types.Password} resetPreview={props.resetPreview} />
    <ComponentListItem name={TypeDisplayNames.Email} type={Types.Email} resetPreview={props.resetPreview} />
    <ComponentListItem name={TypeDisplayNames.Number} type={Types.Number} resetPreview={props.resetPreview} />
    <ComponentListItem name={TypeDisplayNames.Checkbox} type={Types.Checkbox} resetPreview={props.resetPreview} />
    <ComponentListItem name={TypeDisplayNames.MultiCheckbox} type={Types.MultiCheckbox} resetPreview={props.resetPreview} />
    <ComponentListItem name={TypeDisplayNames.Button} type={Types.Button} resetPreview={props.resetPreview} />
    <ComponentListItem name={TypeDisplayNames.Panel} type={Types.Panel} resetPreview={props.resetPreview} />
    <ComponentListItem name={TypeDisplayNames.Tabs} type={Types.Tabs} resetPreview={props.resetPreview} />
    <ComponentListItem name={TypeDisplayNames.Table} type={Types.Table} resetPreview={props.resetPreview} />
    <ComponentListItem name={TypeDisplayNames.ObjectComponent} type={Types.ObjectComponent} resetPreview={props.resetPreview} />
  </StackList>
);

export default ComponentList;
