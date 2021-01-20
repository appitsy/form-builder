import React from 'react';

import classNames from 'classnames';
import _ from 'lodash';

import { Form } from '@appitsy/forms';
import styled from '@emotion/styled';

import { ComponentSchemaWithId } from '../FormDesigner';
import { ComponentEditingSchemas } from './ComponentEditingSchemas';

interface ComponentPropertiesProps {
  className?: string;
  component?: ComponentSchemaWithId;
  updateComponentSchema(componentSchema: any): void;
}

const PropertiesPane = styled.div`
  padding: 15px;
`;

const checkRenderer = (prevProps: ComponentPropertiesProps, nextProps: ComponentPropertiesProps) => {
  return _.isEqual(prevProps.component, nextProps.component);
};

export const ComponentProperties = React.memo<ComponentPropertiesProps>((props) => {
  
  const componentEditingSchema = props.component ? ComponentEditingSchemas[props.component.type] : undefined;

  return (
    <PropertiesPane className={classNames(props.className, 'bg-light')}>
      {
          componentEditingSchema ? (
            <>
              <span>Component Properties</span>
              <Form 
                schema={componentEditingSchema} 
                data={props.component} 
                onDataChange={props.updateComponentSchema} 
              />
            </>
          ): (
            <h6>Select a component to continue edit it..</h6>
          )
      }
      
    </PropertiesPane>
  );
}, checkRenderer);
