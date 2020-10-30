import styled from "@emotion/styled";
import React from "react";
import { ComponentListItem } from "./ComponentListItem";

const StackList = styled.div`
  display: flex;
  flex-direction: column;
`;

const ComponentList = () => (
  <StackList style={{ overflow: "hidden", clear: "both" }}>
    <ComponentListItem name="Text Field" type="text" />
    <ComponentListItem name="Text Area" type="textarea" />
    <ComponentListItem name="Password" type="password" />
    <ComponentListItem name="Email" type="email" />
    <ComponentListItem name="Number" type="number" />
    <ComponentListItem name="Button" type="button" />
    <ComponentListItem name="Panel" type="panel" />
  </StackList>
);

export default ComponentList;
