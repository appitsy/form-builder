import React from 'react';
import { Renderer, RendererProps } from "appitsy/dist/components/Renderer/Renderer";
import Styled from '@emotion/styled';
import { ComponentSchema } from 'appitsy/dist/types/ComponentSchema';
import { DraggableComponent } from './DraggableComponent';

const StyledPage = Styled.div`
    display: flex;
    flex-direction: column;
    padding: 7px;
    .appitsy-component {
        margin: 7px;
        width: calc(100% - 14px);
    }
`;

interface DesignerRendererProps extends RendererProps {
  onDelete(path: string): void;
}

export class DesignerRenderer extends Renderer<DesignerRendererProps> {

  renderDesignerComponent = (component: ComponentSchema, key: string) => {
    let renderedComponent = super.renderComponent(component, key);

    return (
      <DraggableComponent name={component.name} type={component.type}>
        <button onClick={() => this.props.onDelete(component.name)}>Delete</button>
        { renderedComponent }
      </DraggableComponent>
    );
  }

  renderChildren() {
    return this.props.schema.map((component, index) => this.renderDesignerComponent(component, `root-${index}`)
    );
  }

  renderRoot() {
    return <StyledPage>{this.renderChildren()}</StyledPage>;
  }
}
