import React from 'react';
import { Renderer, RendererProps } from "appitsy/dist/components/Renderer/Renderer";
import Styled from '@emotion/styled';
import { ComponentSchema } from 'appitsy/dist/types/ComponentSchema';
import { DraggableComponent } from './DraggableComponent';
import { Types } from 'appitsy/dist/types/Types';
import { DroppableComponent } from './DroppableComponent';

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
  onDrop(component: any): void;
}

export class DesignerRenderer extends Renderer<DesignerRendererProps> {

  renderDesignerComponent = (component: ComponentSchema, key: string) => {
    let renderedComponent;
    switch (component.type) {
      case Types.Panel: 
        let panel = super.renderComponent(component, key);
        renderedComponent = (
            <DraggableComponent name={component.name} type={component.type} operation='move'>
              <DroppableComponent onDrop={this.props.onDrop}>
                { panel }
              </DroppableComponent>
            </DraggableComponent>
        );
        break;
      default:
        renderedComponent = super.renderComponent(component, key);
        break;
    }

    return (
      <DraggableComponent name={component.name} type={component.type} operation='move'>
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
