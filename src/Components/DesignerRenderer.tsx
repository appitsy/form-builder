import React from 'react';
import { Renderer, RendererProps } from "appitsy/dist/components/Renderer/Renderer";
import Styled from '@emotion/styled';
import { ComponentSchema } from 'appitsy/dist/types/ComponentSchema';
import { Types } from 'appitsy/dist/types/Types';
import { DroppableComponent } from './DroppableComponent';
import { DraggableDroppableComponent } from './DraggableDroppableComponent';
import styled from '@emotion/styled';

const StyledPage = Styled.div`
    display: flex;
    flex-direction: column;
    padding: 7px;
    .appitsy-component {
        margin: 7px;
        width: calc(100% - 14px);
    }
`;

const StyledDraggableDroppableComponent = styled(DraggableDroppableComponent)`
    background-color: white;
    margin: 10px 10px 0px 10px;
`;

export type ComponentSchemaWithId = ComponentSchema & {
  id: string;
}

interface DesignerRendererProps extends RendererProps {
  schema: ComponentSchemaWithId[];
  onDelete(path: string): void;
  onDrop(component: any): void;
  moveComponent: (id: string, atIndex: number) => void;
  findComponent: (id: string) => number;
}

export class DesignerRenderer extends Renderer<DesignerRendererProps> {
  renderDesignerComponent = (component: ComponentSchemaWithId, key: string, index: number) => {
    let renderedComponent;
    switch (component.type) {
      case Types.Panel: 
        let panelComponentSchema = component as any;
        panelComponentSchema.display = { ...panelComponentSchema.display, expandable: false };
        let panel = super.renderComponent(panelComponentSchema, key);
        renderedComponent = panel;
        break;
      default:
        renderedComponent = super.renderComponent(component, key);
        break;
    }

    return (
      <StyledDraggableDroppableComponent type={component.type} operation='move' id={component.id} key={component.id} moveComponent={this.props.moveComponent} findComponent={this.props.findComponent}>
        <>
          <button onClick={() => this.props.onDelete(component.name)}>Delete</button>
          { renderedComponent }
        </>
      </StyledDraggableDroppableComponent>
    );
  }

  renderChildren() {
    return this.props.schema.map((component, index) => this.renderDesignerComponent(component, `root-${index}`, index)
    );
  }

  renderLayoutChildren(childComponents: ComponentSchemaWithId[], parentComponent: ComponentSchemaWithId) {
    return [(
      <DroppableComponent id={parentComponent.id} onDrop={this.props.onDrop}>
        <div style={{minWidth: '100px'}}>
          {childComponents.map((panelChild, childIndex) => this.renderDesignerComponent(panelChild, parentComponent.name + '-child-' + childIndex, childIndex))}
        </div>
      </DroppableComponent>
    )];
  }

  renderRoot() {
    return <StyledPage>{this.renderChildren()}</StyledPage>;
  }
}
