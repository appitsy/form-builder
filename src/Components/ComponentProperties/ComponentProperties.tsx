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
  
  const componentEditingSchema = props.component ? ComponentEditingSchemas[props.component.type] : undefined;

  if (!componentEditingSchema) {
    return (
      <div> Please select a component to continue edit it.. </div>
    );
  }

  return (
    <PropertiesPane className={props.className}>
      Component Properties
      <Renderer schema={componentEditingSchema} data={props.component} onDataChange={props.updateComponentSchema}></Renderer>
    </PropertiesPane>
  );
};
