import styled from "@emotion/styled";
import { Renderer } from "appitsy";
import React from "react";

import { ComponentSchemaWithId } from "../DesignerRenderer";
import { ComponentEditingSchemas } from './ComponentEditingSchemas';

interface ComponentPropertiesProps {
  className?: string;
  component?: ComponentSchemaWithId;
  updateComponentSchema(componentSchema: any): void;
}

const PropertiesPane = styled.div`
  padding: 15px;
`;

export const ComponentProperties = (props: ComponentPropertiesProps) => {
  
  if (props.component === undefined) {
    return (
      <div> Please select a component to continue edit it.. </div>
    )
  }

  const componentEditingSchema = ComponentEditingSchemas[props.component.type];

  return (
    <PropertiesPane className={props.className}>
      Component Properties
      <Renderer schema={componentEditingSchema} data={props.component} onSubmit={props.updateComponentSchema}></Renderer>
    </PropertiesPane>
  );
};
