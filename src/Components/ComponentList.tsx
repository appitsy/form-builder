import styled from "@emotion/styled";
import React from "react";
import { ComponentListItem } from "./ComponentListItem";

const StackList = styled.div`
  display: flex;
  flex-direction: column;
`;

interface ComponentListProps {
  resetPreview(): void;
}

const ComponentList = (props: ComponentListProps) => (
  <StackList style={{ overflow: "hidden", clear: "both", height: '100%' }}>
    <ComponentListItem name="Text Field" type="text" resetPreview={props.resetPreview} />
    <ComponentListItem name="Text Area" type="textarea" resetPreview={props.resetPreview} />
    <ComponentListItem name="Password" type="password" resetPreview={props.resetPreview} />
    <ComponentListItem name="Email" type="email" resetPreview={props.resetPreview} />
    <ComponentListItem name="Number" type="number" resetPreview={props.resetPreview} />
    <ComponentListItem name="Button" type="button" resetPreview={props.resetPreview} />
    <ComponentListItem name="Panel" type="panel" resetPreview={props.resetPreview} />
    <ComponentListItem name="Tabs" type="tabs" resetPreview={props.resetPreview} />
  </StackList>
);

export default ComponentList;
